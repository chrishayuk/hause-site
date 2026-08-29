import { NextRequest, NextResponse } from "next/server";
import corpusJson from "@/data/hauseCorpus.json";
import type { Block } from "@/data/askHause";

/**
 * ASK HAUSE — the synthesis tier. Same architecture as Ask VINDEX3's
 * (/api/explain there): the deterministic resolver answers first,
 * client-side; this route is consulted only on a miss. Order:
 *
 *   cache → decisive doctrine retrieval (free, verbatim, no model)
 *   → the wallet gate (Turnstile, verified server-side)
 *   → synthesis: a small model narrating ONLY the retrieved doctrine
 *
 * The constraint is stronger than prose discipline: the model emits
 * the Block schema — statement / observation / refusal — and nothing
 * else, so a synthesized answer still renders as HAUSE forms and can
 * never invent a PricingCard, because the renderer has no way to draw
 * one. Priors are not evidence; unsupported → NO FORM ESTABLISHED as
 * a refusal block. No key or secret configured → the tier fails
 * closed and the deterministic refusal stands.
 */

const MODEL = process.env.OPENAI_MODEL ?? "gpt-5.6-luna";
const DAILY_BUDGET = Number(process.env.ASK_DAILY_BUDGET ?? 300);
const RATE_PER_MIN = 10;
const MAX_QUESTION_CHARS = 300;

type Passage = { id: string; source: string; heading: string; text: string };
const CORPUS = (corpusJson as { passages: Passage[] }).passages;

const STOP = new Set(["the", "a", "an", "is", "are", "it", "of", "to", "in", "on", "and", "or", "for", "with", "do", "does", "i", "my", "me", "that", "this", "what", "why", "how", "hause", "form", "forms"]);
const toks = (q: string) => [...new Set(q.toLowerCase().split(/[^a-z0-9]+/).filter((t) => t.length > 2 && !STOP.has(t)))];

function search(question: string, k = 4): { p: Passage; score: number }[] {
	const q = toks(question);
	if (q.length === 0) return [];
	return CORPUS.map((p) => {
		const h = p.heading.toLowerCase();
		const b = p.text.toLowerCase();
		let score = 0;
		for (const t of q) {
			if (h.includes(t)) score += 3;
			if (b.includes(t)) score += 1;
		}
		return { p, score };
	})
		.sort((a, b) => b.score - a.score)
		.slice(0, k)
		.filter((s) => s.score > 0);
}

const cache = new Map<string, { blocks: Block[]; label: string }>();
const rate = new Map<string, { count: number; windowStart: number }>();
let day = new Date().toISOString().slice(0, 10);
let spentToday = 0;

const SCHEMA = {
	name: "hause_answer",
	strict: true,
	schema: {
		type: "object",
		additionalProperties: false,
		properties: {
			blocks: {
				type: "array",
				items: {
					type: "object",
					additionalProperties: false,
					properties: {
						kind: { type: "string", enum: ["statement", "observation", "refusal"] },
						label: { type: "string" },
						text: { type: "string" },
						title: { type: "string" },
						lines: { type: "array", items: { type: "string" } },
						principle: { type: "string" },
					},
					required: ["kind", "label", "text", "title", "lines", "principle"],
				},
			},
		},
		required: ["blocks"],
	},
} as const;

const SYSTEM = `You are the synthesis tier of Ask HAUSE — a design system for AI whose primitives are forms of explanation.
The DOCTRINE PASSAGES in the user message are the ONLY HAUSE knowledge that exists for you. Your pretrained knowledge of design systems is NOT evidence.
Answer the question by composing 1–3 blocks in HAUSE's own voices: "statement" (one editorial sentence, no numbers), "observation" (a label in caps + a system-voice explanation), or "refusal" (title in caps, lines as "requested    …" and "available    …", and a one-line principle) when the doctrine does not establish an answer — in that case the title must be NO FORM ESTABLISHED.
Fill unused fields with empty strings. Never invent a form name that is not in the passages. Under 120 words total.`;

export async function POST(req: NextRequest) {
	const ip = (req.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
	const now = Date.now();
	const r = rate.get(ip);
	if (!r || now - r.windowStart > 60_000) rate.set(ip, { count: 1, windowStart: now });
	else if (++r.count > RATE_PER_MIN) return NextResponse.json({ error: "rate limited" }, { status: 429 });

	const body = (await req.json().catch(() => null)) as { question?: string; turnstile_token?: string } | null;
	const question = body?.question?.trim();
	if (!question || question.length > MAX_QUESTION_CHARS)
		return NextResponse.json({ error: "a question up to 300 characters" }, { status: 400 });

	const key = question.toLowerCase().replace(/\s+/g, " ");
	const hit = cache.get(key);
	if (hit) return NextResponse.json(hit);

	const hits = search(question);
	const strong = hits.length > 0 && hits[0].score >= Math.max(4, toks(question).length + 2);
	const token = body?.turnstile_token;
	const apiKey = process.env.OPENAI_API_KEY;
	const secret = process.env.TURNSTILE_SECRET;

	if (!token) {
		if (strong) {
			// The free tier: the doctrine answers in its own words.
			const blocks: Block[] = hits.slice(0, 2).map((h) => {
				const max = 700;
				const trimmed = h.p.text.length > max;
				const cut = trimmed ? h.p.text.slice(0, h.p.text.lastIndexOf(" ", max)).trimEnd() : h.p.text;
				return { kind: "excerpt" as const, source: h.p.source, heading: h.p.heading, text: cut, trimmed };
			});
			const out = { blocks, label: "THE DOCTRINE'S OWN WORDS — retrieved verbatim · no model call" };
			cache.set(key, out);
			return NextResponse.json(out);
		}
		if (apiKey && secret) return NextResponse.json({ error: "verification required" }, { status: 428 });
		return NextResponse.json({ error: "nothing established" }, { status: 404 });
	}

	if (!apiKey || !secret) return NextResponse.json({ error: "synthesis tier not configured" }, { status: 503 });
	if (token.length > 4096) return NextResponse.json({ error: "forbidden" }, { status: 403 });
	const verify = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
		method: "POST",
		headers: { "content-type": "application/x-www-form-urlencoded" },
		body: new URLSearchParams({ secret, response: token, remoteip: ip }),
		signal: AbortSignal.timeout(10_000),
	}).catch(() => null);
	const verdict = verify ? ((await verify.json().catch(() => null)) as { success?: boolean } | null) : null;
	if (!verdict?.success) return NextResponse.json({ error: "forbidden" }, { status: 403 });

	const today = new Date().toISOString().slice(0, 10);
	if (today !== day) {
		day = today;
		spentToday = 0;
	}
	if (spentToday >= DAILY_BUDGET) return NextResponse.json({ error: "daily budget reached" }, { status: 503 });
	if (hits.length === 0) return NextResponse.json({ error: "nothing established" }, { status: 404 });

	spentToday += 1;
	const reqBody: Record<string, unknown> = {
		model: MODEL,
		max_completion_tokens: 400,
		reasoning_effort: process.env.OPENAI_EFFORT ?? "low",
		response_format: { type: "json_schema", json_schema: SCHEMA },
		messages: [
			{ role: "system", content: SYSTEM },
			{
				role: "user",
				content: `QUESTION\n${question}\n\nDOCTRINE PASSAGES (the whole universe)\n${JSON.stringify(hits.map((h) => ({ source: h.p.source, heading: h.p.heading, text: h.p.text })))}`,
			},
		],
	};
	let parsed: { blocks?: Record<string, unknown>[] } | null = null;
	for (const attempt of [0, 1]) {
		if (attempt === 1) delete reqBody.reasoning_effort;
		const res = await fetch("https://api.openai.com/v1/chat/completions", {
			method: "POST",
			headers: { "content-type": "application/json", authorization: `Bearer ${apiKey}` },
			body: JSON.stringify(reqBody),
			signal: AbortSignal.timeout(25_000),
		});
		if (res.status === 400 && attempt === 0) continue;
		if (!res.ok) return NextResponse.json({ error: "synthesis failed" }, { status: 502 });
		const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
		try {
			parsed = JSON.parse(data.choices?.[0]?.message?.content ?? "");
		} catch {
			parsed = null;
		}
		break;
	}
	if (!parsed?.blocks) return NextResponse.json({ error: "synthesis failed" }, { status: 502 });

	// Post-validation: only our kinds, capped, empty strings dropped.
	const cap = (v: unknown, n: number) => (typeof v === "string" ? v.slice(0, n) : "");
	const blocks: Block[] = [];
	for (const b of parsed.blocks.slice(0, 3)) {
		if (b.kind === "statement" && cap(b.text, 300)) blocks.push({ kind: "statement", text: cap(b.text, 300) });
		else if (b.kind === "observation" && cap(b.text, 700))
			blocks.push({ kind: "observation", label: cap(b.label, 60) || undefined, text: cap(b.text, 700) });
		else if (b.kind === "refusal" && cap(b.title, 60))
			blocks.push({
				kind: "refusal",
				title: cap(b.title, 60),
				lines: (Array.isArray(b.lines) ? b.lines : []).slice(0, 3).map((l) => cap(l, 90)).filter(Boolean),
				principle: cap(b.principle, 120),
			});
	}
	if (blocks.length === 0) return NextResponse.json({ error: "synthesis failed" }, { status: 502 });
	const out = { blocks, label: "SYNTHESIS — narrated from the retrieved doctrine · the model is never the authority" };
	cache.set(key, out);
	if (cache.size > 1000) cache.delete(cache.keys().next().value as string);
	return NextResponse.json(out);
}

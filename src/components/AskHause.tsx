"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Statement } from "@chrishayuk/hause/components/forms/Statement";
import { Observation } from "@chrishayuk/hause/components/forms/Observation";
import { Refusal } from "@chrishayuk/hause/components/forms/Refusal";
import { Evidence } from "@chrishayuk/hause/components/forms/Evidence";
import { Decomposition } from "@chrishayuk/hause/components/forms/Decomposition";
import { Comparison } from "@chrishayuk/hause/components/forms/Comparison";
import { Timeline } from "@chrishayuk/hause/components/forms/Timeline";
import { Connection } from "@chrishayuk/hause/components/forms/Connection";
import { tick, refuse } from "@chrishayuk/hause/sound";
import { askHause, formMeta, ASK_SUGGESTIONS, type AskAnswer, type Block } from "@/data/askHause";

/**
 * ASK HAUSE — the renderer.
 *
 * The recursive property is the point: HAUSE is both the subject of
 * the answer and the medium of it. A question resolves
 * deterministically (data/askHause.ts) into a composition of blocks,
 * and every block renders as the REAL form it names — a refusal
 * arrives as a Refusal, a derivation as a Decomposition, provenance
 * as a Timeline. No chat bubbles: the page recomposes into a small
 * chapter answering the question.
 */

function RecommendCard(b: Extract<Block, { kind: "recommend" }>) {
	const meta = formMeta(b.form);
	return (
		<section className="hause-grid py-10">
			<div className="col-span-12 md:col-start-2 md:col-span-9">
				<p className="voice-evidence text-xs tracking-[0.14em] uppercase opacity-50 mb-2">YOUR IDEA</p>
				<p className="voice-system text-base opacity-80 mb-8">&ldquo;{b.idea}&rdquo;</p>
				<p className="voice-evidence text-xs tracking-[0.14em] uppercase opacity-50 mb-1">{meta.mode.toUpperCase()}</p>
				<p className="voice-editorial text-3xl sm:text-4xl mb-3">{b.form}</p>
				<p className="voice-system text-base opacity-85 max-w-2xl mb-8">{meta.line}</p>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl">
					<div>
						<p className="voice-evidence text-[10px] tracking-[0.12em] uppercase opacity-50 mb-3">WHY</p>
						<ul className="flex flex-col gap-2 m-0 p-0 list-none">
							{b.because.map((w) => (
								<li key={w} className="voice-system text-sm opacity-80 flex gap-2">
									<span style={{ color: "var(--color-status-supported)" }}>✓</span>
									<span>{w}</span>
								</li>
							))}
						</ul>
					</div>
					<div>
						<p className="voice-evidence text-[10px] tracking-[0.12em] uppercase opacity-50 mb-3">NOT</p>
						<ul className="flex flex-col gap-2 m-0 p-0 list-none">
							{b.not.map((n) => (
								<li key={n.form} className="voice-system text-sm opacity-70 flex gap-2">
									<span style={{ color: "var(--color-status-refuted)" }}>×</span>
									<span>
										<span className="voice-evidence text-xs">{n.form}</span> — {n.reason}
									</span>
								</li>
							))}
						</ul>
					</div>
				</div>

				{b.usedBy && (
					<p className="voice-evidence text-[11px] opacity-50 mt-8">
						USED BY&nbsp;&nbsp;{b.usedBy}
					</p>
				)}
				<pre
					className="voice-evidence text-[12px] leading-relaxed border px-4 py-3 mt-4 overflow-x-auto max-w-3xl"
					style={{ borderColor: "var(--color-mist)", background: "var(--color-ink)", color: "var(--color-white)" }}
				>
					{b.snippet}
				</pre>
			</div>
		</section>
	);
}

function AnswerBlocks({ answer }: { answer: AskAnswer }) {
	return (
		<div key={answer.id}>
			{answer.blocks.map((b, i) => {
				switch (b.kind) {
					case "statement":
						return <Statement key={i} text={b.text} />;
					case "observation":
						return <Observation key={i} label={b.label} text={b.text} />;
					case "refusal":
						return <Refusal key={i} title={b.title} lines={b.lines} principle={b.principle} />;
					case "evidence":
						return <Evidence key={i} items={b.items} />;
					case "decomposition":
						return <Decomposition key={i} kicker={b.kicker} source={b.source} parts={b.parts} result={b.result} />;
					case "comparison":
						return (
							<Comparison
								key={i}
								kicker={b.kicker}
								objectLabel={b.objectLabel}
								blockLabels={b.blockLabels}
								left={b.left}
								right={b.right}
							/>
						);
					case "timeline":
						return <Timeline key={i} entries={b.entries} />;
					case "connection":
						return <Connection key={i} text={b.text} links={b.links} />;
					case "recommend":
						return <RecommendCard key={i} {...b} />;
				}
			})}
		</div>
	);
}

export function AskHause() {
	const [q, setQ] = useState("");
	const [answer, setAnswer] = useState<{ a: AskAnswer; q: string } | null>(null);
	const [thinking, setThinking] = useState(false);

	function ask(question: string) {
		const query = question.trim();
		if (!query) return;
		setQ(query);
		setThinking(true);
		setAnswer(null);
		setTimeout(() => {
			setThinking(false);
			const a = askHause(query);
			if (a.id === "no-form") refuse();
			else tick();
			setAnswer({ a, q: query });
		}, 500);
	}

	useEffect(() => {
		const param = new URLSearchParams(window.location.search).get("q");
		if (param) ask(param);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<section className="hause-grid py-12">
				<div className="col-span-12 md:col-start-2 md:col-span-9">
					<form
						onSubmit={(e) => {
							e.preventDefault();
							ask(q);
						}}
						className="flex gap-3 max-w-2xl"
					>
						<input
							value={q}
							onChange={(e) => setQ(e.target.value)}
							placeholder="what are you trying to say?"
							aria-label="Ask HAUSE"
							className="voice-evidence text-sm flex-1 border bg-transparent px-4 py-3 outline-none focus-visible:outline-2"
							style={{ borderColor: "var(--fg)", color: "var(--fg)" }}
						/>
						<button
							type="submit"
							className="voice-evidence text-xs tracking-[0.14em] uppercase border px-5"
							style={{ borderColor: "var(--color-accent)", color: "var(--color-accent)" }}
						>
							ASK →
						</button>
					</form>
					<div className="flex flex-wrap gap-2 mt-4 max-w-2xl">
						{ASK_SUGGESTIONS.map((s) => (
							<button
								key={s}
								onClick={() => ask(s)}
								className="voice-evidence text-[11px] px-3 py-1.5 border opacity-60 hover:opacity-100"
								style={{ borderColor: "var(--color-mist)" }}
							>
								{s}
							</button>
						))}
					</div>
					{thinking && (
						<p className="voice-evidence text-xs tracking-[0.1em] uppercase opacity-40 mt-8 graph-pulse">composing…</p>
					)}
				</div>
			</section>

			{answer && <AnswerBlocks answer={answer.a} />}

			{!answer && !thinking && (
				<Observation
					label="THE CONTRACT"
					text="Deterministic, like the system it serves: a question resolves against the manifest and a small decision graph — no model call, and a form HAUSE does not have is never invented. The recursive property is the point: HAUSE is both the subject of the answer and the medium of it. When nothing is established, the answer is a Refusal, which is itself the form for exactly that."
				/>
			)}

			<section className="hause-grid pb-8">
				<div className="col-span-12 md:col-start-2 md:col-span-9">
					<p className="voice-evidence text-xs opacity-40 leading-relaxed max-w-2xl">
						Every answer above is composed of real HAUSE forms — a refusal arrives as a{" "}
						<Link href="/statements" className="border-b pb-0.5" style={{ borderColor: "var(--color-accent)" }}>
							Refusal
						</Link>
						, provenance as a Timeline, a derivation as a Decomposition. If HAUSE cannot explain one of its own
						principles with its own forms, either the explanation is weak or the language is missing a form.
					</p>
				</div>
			</section>
		</>
	);
}

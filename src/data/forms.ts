import { FORM_MANIFEST, type FormMode, type FormRecord } from "@chrishayuk/hause/manifest";
import { citationMeta, type CitationRecord } from "@chrishayuk/hause/cite";
import docsJson from "./formDocs.json";
import { buildIdentifiers } from "./build";

/**
 * ONE FORM, ONE RECORD.
 *
 * A form's page is a projection, not an authored page: the manifest
 * supplies its mode, line and recorded origin; scripts/ingest-forms.ts
 * supplies the doc comment its own source file carries, and the props
 * signature that is its API. Nothing about a form is written here that
 * the library does not already say about itself — which is why adding a
 * form to the library adds a page, and rewriting a doc comment rewrites
 * one.
 */

export type FormDoc = { name: string; slug: string; file: string; doc: string[]; api: string; mentions: string[] };

const DOCS = (docsJson as { generated: string; forms: FormDoc[] }).forms;
const BY_NAME = new Map(DOCS.map((d) => [d.name, d]));

export type Form = FormRecord & FormDoc;

export const FORMS: Form[] = FORM_MANIFEST.map((f) => {
	const doc = BY_NAME.get(f.name);
	if (!doc) throw new Error(`${f.name} is in the manifest but not in formDocs.json — re-run scripts/ingest-forms.ts.`);
	return { ...f, ...doc };
});

const BY_SLUG = new Map(FORMS.map((f) => [f.slug, f]));

export function formBySlug(slug: string): Form | null {
	return BY_SLUG.get(slug) ?? null;
}

export function formSlug(name: string): string {
	return BY_NAME.get(name)?.slug ?? name.toLowerCase();
}

export const MODE_LABEL: Record<FormMode, string> = {
	statement: "A STATEMENT — THE READER READS",
	instrument: "AN INSTRUMENT — THE READER OPERATES",
	performance: "A PERFORMANCE — IT PLAYS ITSELF",
};

export const MODE_ROOM: Record<FormMode, { href: string; label: string }> = {
	statement: { href: "/statements", label: "THE STATEMENTS" },
	instrument: { href: "/instruments", label: "THE INSTRUMENTS" },
	performance: { href: "/performances", label: "THE PERFORMANCES" },
};

const REPO = "https://github.com/chrishayuk/hause/blob/main";

/**
 * The rule the mode carries, which is the same for every form in it —
 * doctrine from the library README, not a claim about this form.
 */
export const MODE_DISCIPLINE: Record<FormMode, string> = {
	statement: "Every statement is prose in the three voices — editorial for claims, system for explanation, evidence for measurement. Server-renderable, no interaction: the reader reads, and nothing about the form depends on JavaScript arriving.",
	instrument: "Every instrument carries an always-present text fallback, so the point survives with the interaction removed — for reduced motion, for no-JS, for a crawler, and for anyone in a hurry. ARIA state is part of the form, because an agent browser reads aria-pressed and aria-expanded to understand what it is looking at.",
	performance: "Every performance starts in view, rests on a designed final state — which is what reduced motion and no-JS get — and never crossfades between two physical forms of one thing: staged swaps only. A scrolling reader must never find it already finished.",
};

/** The page as a published object — one record, four surfaces, same as every other. */
export function formRecord(form: Form): CitationRecord {
	return {
		title: `${form.name} — a HAUSE ${form.mode}`,
		authors: ["Chris Hay"],
		published: "2026-08-31",
		version: "0.1.0",
		url: `https://hause.design/forms/${form.slug}`,
		publisher: "hause.design",
		kind: "page",
		abstract: form.line,
		independence: "Published independently by Chris Hay.",
		about: ["design system", "semantic form", form.mode],
		partOf: { title: "HAUSE — a design system for AI", url: "https://hause.design", version: "0.1.0" },
		identifiers: [
			{ label: "source", value: form.file, href: `${REPO}/${form.file}` },
			...(form.origin ? [{ label: "origin", value: form.date ? `${form.origin} · ${form.date}` : form.origin }] : []),
			...buildIdentifiers(),
		],
	};
}

export function formCiteMeta(form: Form): Record<string, string | string[]> {
	return citationMeta(formRecord(form));
}

/**
 * The doc comment's opening line — the form's own headline, with its
 * name trimmed off the front. A doc comment that runs the headline into
 * a long first paragraph has none to give, and the manifest line stands
 * in: a display-size Statement is one sentence or it is not a Statement.
 */
function split(form: Form): { headline: string; rest: string } {
	const first = (form.doc[0] ?? form.line).replace(new RegExp(`^${form.name.toUpperCase()}\\s+—\\s+`, "i"), "");
	const at = first.indexOf(". ");
	if (at > 0 && at < 130) return { headline: first.slice(0, at), rest: first.slice(at + 2) };
	if (first.length <= 130) return { headline: first.replace(/\.$/, ""), rest: "" };
	return { headline: form.line.replace(/\.$/, ""), rest: first };
}

export function formHeadline(form: Form): string {
	const { headline } = split(form);
	return headline.charAt(0).toUpperCase() + headline.slice(1);
}

/**
 * Whether the headline says something the Hero's dek did not. Two
 * near-identical sentences, one under the other, is a page repeating
 * itself at display size — so the Statement stands down when the
 * manifest line already carried it.
 */
export function formHasOwnHeadline(form: Form): boolean {
	const norm = (t: string) => t.toLowerCase().replace(/[^a-z0-9 ]/g, "").slice(0, 45);
	return norm(formHeadline(form)) !== norm(form.line);
}

/** "FROM VINDEX3 — REPRESENTATION": the recorded origin, in kicker voice. */
export function formOriginKicker(form: Form): string {
	return form.origin ? ` · FROM ${form.origin.replace(/ · /g, " — ").toUpperCase()}` : "";
}

/**
 * The lift-able answer: what the form is, then as much of its own
 * account as fits in a paragraph a reader — or a machine — can take
 * whole. Cut at a sentence, never mid-word, because a truncated answer
 * is worse than a short one.
 */
export function formAnswer(form: Form): string {
	const line = form.line.replace(/\.$/, "");
	const opening = `The ${form.name} form is a HAUSE ${form.mode} — ${line.charAt(0).toLowerCase()}${line.slice(1)}.`;
	const rest = formBody(form)[0] ?? "";
	let answer = opening;
	for (const sentence of rest.split(/(?<=\.)\s+/)) {
		if (`${answer} ${sentence}`.split(/\s+/).length > 105) break;
		answer = `${answer} ${sentence}`;
	}
	return answer.trim();
}

/** The library's own account: whatever the doc comment says after its headline. */
export function formBody(form: Form): string[] {
	return [split(form).rest, ...form.doc.slice(1)].filter(Boolean);
}

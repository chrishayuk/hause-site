import type { CitationRecord } from "@chrishayuk/hause/cite";
import type { ProvenanceEvent } from "@chrishayuk/hause/components/forms/Provenance";
import { formCount } from "@chrishayuk/hause/manifest";

/**
 * THE BOOK'S OWN RECORD.
 *
 * HAUSE says publishing is a design-system concern, so the specimen
 * book publishes itself under its own rules: one record, printed by
 * Provenance, exported by Citation, declared in the head by
 * citationMeta and said again in JSON-LD by citationLd. The library
 * holds the forms; this file holds the facts — that boundary is the
 * whole point of hause being a separate repo.
 *
 * No DOI here: none has been registered, and an identifier that does
 * not exist is absent rather than promised.
 */
export const HAUSE_RECORD: CitationRecord = {
	title: "HAUSE — a design system for AI",
	authors: ["Chris Hay"],
	published: "2026-08-29",
	revised: "2026-08-31",
	version: "0.1.0",
	url: "https://hause.design",
	publisher: "hause.design",
	kind: "software",
	abstract: `A cinematic visual language for ideas, systems and explanations: ${formCount()} typed forms in three modes — statements a reader reads, instruments a reader operates, performances that play themselves — with machine legibility and provenance carried by the library rather than bolted onto each site.`,
	independence: "Published independently by Chris Hay.",
	identifiers: [
		{ label: "repository", value: "github.com/chrishayuk/hause", href: "https://github.com/chrishayuk/hause" },
		{ label: "forms held", value: String(formCount()) },
	],
};

/** Dated, and taken from the library's own history — not from when this page was last touched. */
export const HAUSE_HISTORY: ProvenanceEvent[] = [
	{ date: "2026-08-31", text: "The citable surface: cite.ts, Provenance and Citation — publishing becomes part of the grammar." },
	{ date: "2026-08-30", text: "The legibility layer: the Answer form, the seo builders, machine legibility stated as doctrine." },
	{ date: "2026-08-29", text: "Extracted from chrishayuk into its own repository, grown by the vindex3.org build, and renamed HAUSE." },
];

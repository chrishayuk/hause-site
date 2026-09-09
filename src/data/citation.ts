import type { CitationRecord } from "@chrishayuk/hause/cite";
import type { ProvenanceEvent } from "@chrishayuk/hause/components/forms/Provenance";
import { formCount, HAUSE_LINE } from "@chrishayuk/hause/manifest";
import { buildIdentifiers } from "./build";

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
	revised: "2026-09-09",
	version: "0.1.0",
	url: "https://hause.design",
	publisher: "hause.design",
	kind: "software",
	abstract: `${HAUSE_LINE} It began as a cinematic visual language for staging ideas and grew through real exhibitions into ${formCount()} typed forms in three modes — statements a reader reads, instruments a reader operates, performances that play themselves — with machine legibility and provenance carried by the library rather than bolted onto each site.`,
	independence: "Published independently by Chris Hay.",
	identifiers: [
		{ label: "repository", value: "github.com/chrishayuk/hause", href: "https://github.com/chrishayuk/hause" },
		// What produced the page you are reading — present only in a deploy.
		...buildIdentifiers(),
		{ label: "forms held", value: String(formCount()) },
	],
};

/** Dated, and taken from the library's own history — not from when this page was last touched. */
export const HAUSE_HISTORY: ProvenanceEvent[] = [
 {date:"2026-09-09",text:"Seven problem chapters gain operable, explicitly scoped experiments; the original three-depth Lens is preserved. Their content remains visible without JavaScript and status labels follow both themes. Drift compares manifest and documentation identities, not three purported independent counts. DecisionTrail puts choices beside previews, graph branches group complete relationships, and In practice loses repeated prose. SequencePlayer and recordDifference are donated as composition helpers, without changing the pinned 35-form vocabulary."},
 {date:"2026-09-09",text:"In practice stages original VINDEX3 archive media and Chris Hay's film beside their recorded contributions. Choosing becomes a URL-driven journey with real form studies; the connected system becomes a navigable directed neighbourhood of its actual graph. DecisionTrail and GraphNeighbourhood are donated to the library through the checked source snapshot. Both consumer publications remain one author's work, not independent adoption."},
 {date:"2026-09-09",text:"Why stages meaning flattened and restored; Forms opens a material collection and three selectable encounters; Evidence exhibits frozen selection outcomes and their misses. VisualPlate, ExhibitionChoices / BeforeAfter and OutcomeMatrix are donated to the library. Artwork, interpretation and evaluation data remain with the site; a checked source snapshot bridges its older pinned package without changing the 35-form count."},
 {date:"2026-09-09",text:"Three original AI-generated visual studies—copper, glass and silk—stage attention, structure and passage on the homepage, origin story and mode rooms. They are explicitly fictional installations, not archival evidence. Performances also embeds the real Chris Hay publication screening with chapters and transcript, separately from the held Film specimen."},
 {date:"2026-09-09",text:"The three mode rooms become curated journeys: Performances opens with a screening, Instruments with a reader-operated comparison, and Statements follows a fictional listening-room record through assertion, support and limits. Their programmes preserve every form's anchor and connect to its complete study and source contract."},
 {date:"2026-09-09",text:"Each of the 35 form pages gains an authored exhibition study: typographic statements, reader-operated mechanisms and finite performances. Studies distinguish illustrative data from the source-backed library specimens and publication records. Film remains held, with an explicitly labelled storyboard rather than a substituted video."},
 {date:"2026-09-09",text:"The homepage restores Give meaning a form and the cinematic exhibition sequence: Space, Time and Scale. The containers-to-acts thesis leads directly into CHOOSING-1 and the act demonstration; the complete archive remains on the origins page. Why, Forms and individual problem chapters gain authored light and dark treatments."},
 {date:"2026-09-08",text:"The front door states the practical AI proposition first, demonstrates containers against semantic forms, and restores the recorded lineage from exhibition and cinematic composition to machine-readable acts."},
 {date:"2026-09-06",text:"The specimen book connects its records through Ask, introduces a four-choice act demonstration, and gives newcomers direct routes to forms, examples, evidence and implementation. Its homepage follows the act demonstration with the selection mechanism, measured CHOOSING-1 result and installation, before film and provenance."},
 {date:"2026-09-05",text:"CHRISHAYUK contributes shared film and publication capabilities."},
	{ date: "2026-08-31", text: "The citable surface: cite.ts, Provenance and Citation — publishing becomes part of the grammar." },
	{ date: "2026-08-30", text: "The legibility layer: the Answer form, the seo builders, machine legibility stated as doctrine." },
	{ date: "2026-08-29", text: "Extracted from chrishayuk into its own repository, grown by the vindex3.org build, and renamed HAUSE." },
];

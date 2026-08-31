/**
 * THE INSTRUMENT SPECIMENS — one source, two homes.
 *
 * The mode room tours them in order; each form's own page shows the
 * same specimen as the INSPECT depth of its lens. One definition, so
 * the tour and the record can never disagree about what a form does.
 */

import { Anatomy } from "@chrishayuk/hause/components/forms/Anatomy";
import { Decomposition } from "@chrishayuk/hause/components/forms/Decomposition";
import { ExpertField } from "@chrishayuk/hause/components/forms/ExpertField";
import { Comparison } from "@chrishayuk/hause/components/forms/Comparison";
import { Variants } from "@chrishayuk/hause/components/forms/Variants";
import { FORM_MANIFEST } from "@chrishayuk/hause/manifest";
import { Ladder } from "@chrishayuk/hause/components/forms/Ladder";
import { Agreement } from "@chrishayuk/hause/components/forms/Agreement";
import { Derivation } from "@chrishayuk/hause/components/forms/Derivation";
import { ByteMap } from "@chrishayuk/hause/components/forms/ByteMap";
import { Gating } from "@chrishayuk/hause/components/forms/Gating";
import { Observation } from "@chrishayuk/hause/components/forms/Observation";
import { Answer } from "@chrishayuk/hause/components/forms/Answer";
import { Lens } from "@chrishayuk/hause/components/forms/Lens";
import { Excerpt } from "@chrishayuk/hause/components/forms/Excerpt";
import { doctrine } from "@/data/doctrine";
import { Provenance } from "@chrishayuk/hause/components/forms/Provenance";
import { HAUSE_RECORD, HAUSE_HISTORY } from "@/data/citation";
import { Citation } from "@chrishayuk/hause/components/forms/Citation";
import { FollowReveal } from "@chrishayuk/hause/components/forms/FollowReveal";

/** The doctrine the SPEC depth quotes — verbatim from the README. */
const LEGIBILITY = doctrine("Machine legibility");

export function AnatomySpecimen() {
	return (
		<Anatomy
			kicker="A CHAPTER — THE ANATOMY"
			objectLabel="Five parts. One rule each."
			layers={[
				{ label: "kicker", note: "evidence voice", detail: "Small caps, accent or mist. Names the section the way a museum names a room — before the visitor reads a word of it." },
				{ label: "headline", note: "editorial voice", emphasis: true, detail: "Fraunces at weight 480, leading under one. The claim, carrying the room. Numbers never appear here." },
				{ label: "body", note: "system voice", detail: "Inter, one idea per sentence. The explanation walks beside the reader." },
				{ label: "figure", note: "an instrument or performance", detail: "The mechanism, shown. Etched hatch on the page ground, the single accent doing the pointing." },
				{ label: "fallback", note: "evidence voice", muted: true, detail: "The plain sentence that survives everything — reduced motion, no JavaScript, a crawler, a hurry." },
			]}
			caption="Structure is fixed. Atmosphere is variable."
		/>
	);
}

export function DecompositionSpecimen() {
	return (
		<Decomposition
			kicker="AN ARGUMENT — DECOMPOSED"
			source={{ label: "one argument", detail: "A thing worth saying, before it is organised." }}
			parts={[
				{ label: "OBSERVE", detail: "What is actually there." },
				{ label: "CLAIM", detail: "What it means." },
				{ label: "TEST", detail: "What would break it." },
				{ label: "CONCEDE", detail: "What remains open." },
			]}
			result={{ label: "the record", detail: "An argument a reader can audit." }}
		/>
	);
}

export function ExpertFieldSpecimen() {
	return (
		<ExpertField
			statement="Most of a system sits idle on any one question."
			totalUnits={36}
			scenarios={[
				{ label: "a question of type", activeIndices: [2, 9, 16, 23] },
				{ label: "a question of colour", activeIndices: [4, 9, 21, 30] },
				{ label: "a question of motion", activeIndices: [2, 13, 27, 33] },
			]}
			caption="Selection is the interesting part — which few answer, and why. The field makes the routing visible."
		/>
	);
}

export function ComparisonSpecimen() {
	return (
		<Comparison
			kicker="ONE DESIGN SYSTEM — TWO INTERPRETATIONS"
			objectLabel="the same four commitments, either way"
			blockLabels={["PALETTE", "VOICES", "GRID", "MOTION"]}
			left={{
				label: "A STYLE GUIDE",
				properties: ["Described in prose", "Drifts from the code", "Read once, then trusted"],
			}}
			right={{
				label: "A SPECIMEN BOOK",
				properties: ["Rendered by the real forms", "Cannot drift — it is the code", "Visited, and operated"],
			}}
		/>
	);
}

export function VariantsSpecimen() {
	return (
		<Variants
			kicker="ONE PHOTOGRAPH — THREE PRINTS"
			objectLabel="The photograph never changes. The print is chosen."
			variants={[
				{ id: "contact-print", fidelity: "faithful", present: true, scale: 1, density: 7 },
				{ id: "half-tone", fidelity: "coarse", present: true, scale: 0.72, density: 4 },
				{ id: "platinum", fidelity: "—", present: false },
			]}
			baseline="contact-print"
			refusalTitle="THE PRINT DOES NOT EXIST"
			refusalPrinciple="A catalogue never lies about its holdings."
			caption="The refusal gets more design attention than the success path. That is the point."
		/>
	);
}

export function LadderSpecimen() {
	const reused = FORM_MANIFEST.filter((f) => f.reusedBy?.length).length;
	return (
		<Ladder
			kicker="A FORM'S WAY INTO THE LIBRARY — FOUR RUNGS, THE THIRD DOING THE WORK"
			rungs={[
				{
					id: "discovered",
					question: "A real page exposes an explanatory need.",
					gate: "a chapter that cannot be built with what exists — not a gap in a taxonomy",
					status: "PASSED",
					detail: "Recorded as the form's origin where the history knows it. Twenty-one of the thirty-five name the page that raised them; the rest predate the record and are left unresolved rather than reconstructed.",
				},
				{
					id: "built",
					question: "One implementation solves it, in the exhibition that raised it.",
					gate: "it exists, in that chapter, doing real work",
					status: "PASSED",
					detail: "Most things stop here, and should. A built object knows everything about the content it carries — the problem map on this site and the genealogy chart both sit at this rung, deliberately.",
				},
				{
					id: "reused",
					question: "A second, genuinely different context needs the same semantic act.",
					gate: "and gets it without the abstraction bending to fit the first consumer",
					status: "BUILDING",
					detail: `Reuse is evidence, not duplication: a second instance on the same page is duplication; a second exhibition with a different subject is evidence. ${reused} of ${FORM_MANIFEST.length} forms record a reuse — but both exhibitions are by one author, which is the weakest admissible evidence. The test that matters is a consumer whose content has nothing to do with the one the form was born in.`,
				},
				{
					id: "promoted",
					question: "The abstraction survived reuse, and HAUSE owns it.",
					gate: "semantics stable · text and machine fallback defined · props no longer know which exhibition caused it",
					status: "PASSED",
					detail: "Only after the third rung. Promotion stops being a matter of taste: why is this a first-class form? Because reality asked for it more than once, and the record shows where.",
				},
			]}
			caption="No rung is skipped. A form that arrives without a page behind it is a Card wearing a costume — and one that arrives without a second exhibition behind it is a claim about the author's imagination rather than about the form."
		/>
	);
}

export function AgreementSpecimen() {
	return (
		<Agreement
			kicker="THE SPECIMEN INVARIANT"
			columns={[
				{ label: "Library", source: "the form's code" },
				{ label: "Book", source: "this page" },
				{ label: "Site", source: "a consumer" },
			]}
			rows={[
				{ values: ["Variants v1", "Variants v1", "Variants v1"], verdict: "PASS", note: "One import path, three renderers — nothing to reconcile." },
				{ values: ["Variants v1", "screenshot of v0", "Variants v1"], verdict: "FAIL", note: "The classic drift: a book showing pictures of forms instead of forms. This site refuses it by construction." },
			]}
		/>
	);
}

export function DerivationSpecimen() {
	return (
		<Derivation
			kicker="HOW POLISHED A PAGE MAY CLAIM TO BE"
			lattice={[
				{ level: "finished", meaning: "Every form real, every fallback present, both themes designed." },
				{ level: "composed", meaning: "The forms are real but a caption or two still drifts." },
				{ level: "drafted", meaning: "Structure in place, copy provisional." },
				{ level: "sketched", meaning: "Boxes and intentions." },
			]}
			steps={[
				{ label: "One caption still placeholder text.", from: "finished", to: "composed" },
				{ label: "The dark theme unreviewed.", from: "composed", to: "drafted" },
			]}
			result="drafted"
			caption="A page cannot claim above its derived level. It may voluntarily claim below it."
		/>
	);
}

export function ByteMapSpecimen() {
	return (
		<ByteMap
			kicker="A TIMESTAMP RECORD — WORKED EXAMPLE"
			title="Twelve bytes, drawn to scale"
			fields={[
				{ name: "seconds", type: "u32", bytes: 4, meaning: "whole seconds since the epoch" },
				{ name: "nanos", type: "u32", bytes: 4, meaning: "the fraction, in nanoseconds" },
				{ name: "zone", type: "i16", bytes: 2, meaning: "offset from UTC, in minutes" },
				{ name: "flags", type: "u16", bytes: 2, meaning: "bit 0: daylight saving was in effect" },
			]}
			totalLabel="12 bytes · little-endian · a demonstration record, not a standard"
		/>
	);
}

export { TerminalSpecimen } from "@/components/TerminalSpecimen";

export function GatingSpecimen() {
	return (
		<Gating
			channels={24}
			keep={[0, 3, 4, 7, 11, 12, 15, 19, 20, 23]}
			stages={[
				{ chip: "THE NOTES", title: "The idea arrives small.", text: "A sentence of intent — everything the piece must say, in no particular shape.", width: "narrow", label: "one sentence of intent" },
				{ chip: "DRAFT", title: "Make the space bigger.", text: "The writer expands it: every angle tried, every phrasing written out. The working space is deliberately larger than the piece will ever be.", width: "wide", label: "two thousand words of draft" },
				{ chip: "EDIT", title: "Decide what gets through.", text: "The editor reads every channel of it and judges: this earns its place, this does not.", width: "wide", gated: true, label: "the same draft, judged line by line" },
				{ chip: "×", title: "The judgement applies.", text: "What was scored low fades. Nothing is rewritten at this stage — only kept or released.", width: "wide", gated: true, label: "most of it, released" },
				{ chip: "SHIP", title: "Bring it back home.", text: "What survives is compressed to the measure the piece must hold — and it reads inevitable, because everything else was tried.", width: "narrow", label: "the paragraph that ships" },
			]}
			fallback="Expand, judge, compress. The form's widths carry the argument; the content is the caller's — on vindex3.org these stages are a model's gate, up, and down projections and the payoff lines are container addresses."
		/>
	);
}

export function LensSpecimen() {
	return (
		<Lens
			kicker="MACHINE LEGIBILITY — THREE DEPTHS"
			concept="Machine legibility"
			caption="The same subject at the depth you want it: what it means, the form that does it, and the doctrine in the library's own words."
			depths={[
				{
					id: "learn",
					label: "LEARN",
					hint: "what it means",
					content: (
						<Observation
							label="LEGIBILITY IS PART OF THE GRAMMAR"
							text="A design system for AI cuts both ways: models compose answers from the forms, and machines — crawlers, answer engines, agent browsers — have to be able to read what the forms say. So the library carries it rather than each site bolting it on: an answer-first form with a stable anchor, structured data projected from the records a page already holds, ARIA state on every instrument, and nothing that lives only inside an animation."
						/>
					),
				},
				{
					id: "inspect",
					label: "INSPECT",
					hint: "the form that does it",
					content: (
						<Answer
							id="what-is-machine-legibility"
							question="What is machine legibility, in a design system?"
							answer="It is the discipline of making a designed page readable by machines without changing what a person sees: the question asked the way people ask it, answered in one lift-able paragraph with a stable anchor; JSON-LD projected from the same records the forms render; query-shaped titles above designed headings; ARIA state on every instrument. The test travels with the install — strip the page to text, and it should still answer the question it was designed to answer."
						/>
					),
				},
				{
					id: "spec",
					label: "SPEC",
					hint: "the doctrine, verbatim",
					content: (
						<section className="hause-grid">
							<div className="col-span-12 md:col-start-2 md:col-span-9">
								<Excerpt
									source={LEGIBILITY.source}
									heading={LEGIBILITY.heading}
									text={LEGIBILITY.text}
									href="https://github.com/chrishayuk/hause#machine-legibility--seo-and-aeo-as-design-system-concerns"
								/>
							</div>
						</section>
					),
				},
			]}
		/>
	);
}

export function ProvenanceSpecimen() {
	return (
		<Provenance record={HAUSE_RECORD} history={HAUSE_HISTORY} citeHref="#cite" />
	);
}

export function CitationSpecimen() {
	return (
		<Citation record={HAUSE_RECORD} kicker="CITE THIS SPECIMEN — AND THIS SITE" />
	);
}

export function FollowRevealSpecimen() {
	return (
		<FollowReveal
			text="The three modes are one path through the whole library."
			path={[
				{ href: "/statements", label: "Statements", relation: "reads" },
				{ href: "/instruments", label: "Instruments", relation: "operates" },
				{ href: "/performances", label: "Performances", relation: "watches" },
			]}
		/>
	);
}

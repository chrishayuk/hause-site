import type { Metadata } from "next";
import { Hero } from "@chrishayuk/hause/components/forms/Hero";
import { Decomposition } from "@chrishayuk/hause/components/forms/Decomposition";
import { ExpertField } from "@chrishayuk/hause/components/forms/ExpertField";
import { Comparison } from "@chrishayuk/hause/components/forms/Comparison";
import { Variants } from "@chrishayuk/hause/components/forms/Variants";
import { Ladder } from "@chrishayuk/hause/components/forms/Ladder";
import { Agreement } from "@chrishayuk/hause/components/forms/Agreement";
import { Derivation } from "@chrishayuk/hause/components/forms/Derivation";
import { Anatomy } from "@chrishayuk/hause/components/forms/Anatomy";
import { ByteMap } from "@chrishayuk/hause/components/forms/ByteMap";
import { FollowReveal } from "@chrishayuk/hause/components/forms/FollowReveal";
import { Connection } from "@chrishayuk/hause/components/forms/Connection";
import { Specimen } from "@/components/Specimen";
import { TerminalSpecimen } from "@/components/TerminalSpecimen";

export const metadata: Metadata = {
	title: "Instruments",
	description: "The interactive forms — understanding through manipulation, always with a text fallback.",
};

export default function InstrumentsPage() {
	return (
		<main>
			<Hero
				kicker="THE BOOK · MODE TWO"
				title="INSTRUMENTS"
				dek="Interactive forms — the reader operates them. Every one carries an always-present text fallback, so the point survives with the interaction removed."
			/>

			<Specimen name="Anatomy" mode="instrument" note="An annotated cutaway, fully disclosed — nothing behind a click. Here: the anatomy of a HAUSE chapter." />
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

			<Specimen name="Decomposition" mode="instrument" note="One object, its parts, the thing that assembles them — stepped by hand. Its cinematic sibling, Unfolding, takes identical props." />
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

			<Specimen name="ExpertField" mode="instrument" note="A field of units, mostly dormant; each scenario lights the subset that answers it." />
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

			<Specimen name="Comparison" mode="instrument" note="One object, two interpretations, dragged between. Its cinematic sibling, Transformation, performs the same argument." />
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

			<Specimen name="Variants" mode="instrument" note="One identity, physically present variants, a staged swap — and a designed refusal for the absent one." />
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

			<Specimen name="Ladder" mode="instrument" note="A gated progression — rungs climbed in order, each closed only by its own criterion." />
			<Ladder
				kicker="A FORM'S WAY INTO THE LIBRARY"
				rungs={[
					{ id: "needed", question: "A real chapter cannot be built without it.", status: "PASSED" },
					{ id: "built", question: "It exists, in that chapter, doing real work.", status: "PASSED" },
					{ id: "generic", question: "Its props no longer know whose content they carry.", status: "PASSED" },
					{ id: "fallback", question: "Its point survives with the interaction removed.", status: "BUILDING" },
					{ id: "promoted", question: "It enters HAUSE, and the specimen book shows it.", status: "OPEN" },
				]}
				caption="No rung is skipped. A form that arrives without a chapter behind it is a Card wearing a costume."
			/>

			<Specimen name="Agreement" mode="instrument" note="N independently-derived values that must be identical — with a FAIL row, because an invariant you never see fail is decoration." />
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

			<Specimen name="Derivation" mode="instrument" note="A value folded down a graded scale by caps — derived, never asserted." />
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

			<Specimen name="ByteMap" mode="instrument" note="A physical layout drawn to scale — each field's width is its width in bytes. The one place a page should feel like an engineering drawing." />
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

			<Specimen name="Terminal" mode="instrument" note="A query surface as an instrument: the form is the chrome, the meaning is one executor function passed in. Promoted from vindex3.org's Explorer, where it fronts a live query endpoint." />
			<TerminalSpecimen />

			<Specimen name="FollowReveal" mode="instrument" note="A path through connected ideas, replayed at the hause stagger." />
			<FollowReveal
				text="The three modes are one path through the whole library."
				path={[
					{ href: "/statements", label: "Statements", relation: "reads" },
					{ href: "/instruments", label: "Instruments", relation: "operates" },
					{ href: "/performances", label: "Performances", relation: "watches" },
				]}
			/>

			<Connection
				text="Two instruments have cinematic siblings that take identical props — see them perform."
				links={[{ href: "/performances", label: "PERFORMANCES →" }]}
			/>
		</main>
	);
}

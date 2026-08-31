/**
 * THE PERFORMANCE SPECIMENS — one source, two homes.
 *
 * Each one plays itself when it comes into view, wherever it is
 * rendered — the mode room, or the form's own page.
 */

import { Transformation } from "@chrishayuk/hause/components/forms/Transformation";
import { Unfolding } from "@chrishayuk/hause/components/forms/Unfolding";
import { Compilation } from "@chrishayuk/hause/components/forms/Compilation";
import { Procession } from "@chrishayuk/hause/components/forms/Procession";
import { Magnitude } from "@chrishayuk/hause/components/forms/Magnitude";
import { Channel } from "@chrishayuk/hause/components/forms/Channel";
import { Observation } from "@chrishayuk/hause/components/forms/Observation";
import { Quantisation } from "@chrishayuk/hause/components/forms/Quantisation";

export function TransformationSpecimen() {
	return (
		<Transformation
			kicker="ONE DESIGN SYSTEM — TWO INTERPRETATIONS"
			objectLabel="the same four commitments, either way"
			blockLabels={["PALETTE", "VOICES", "GRID", "MOTION"]}
			from={{
				label: "A STYLE GUIDE",
				properties: ["Described in prose", "Drifts from the code", "Read once, then trusted"],
			}}
			to={{
				label: "A SPECIMEN BOOK",
				properties: ["Rendered by the real forms", "Cannot drift — it is the code", "Visited, and operated"],
			}}
		/>
	);
}

export function UnfoldingSpecimen() {
	return (
		<Unfolding
			kicker="AN ARGUMENT — UNFOLDED"
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

export function CompilationSpecimen() {
	return (
		<Compilation
			kicker="AN EXHIBITION — COMPILED"
			headline="Start from the notes. Compile down."
			sourceLabel="the working material"
			sources={["field notes", "interviews", "measurements", "photographs"]}
			stages={[
				{ name: "collect", gloss: "gather everything that might matter" },
				{ name: "judge", gloss: "decide what is true and load-bearing" },
				{ name: "compose", gloss: "give each fact its form" },
				{ name: "set", gloss: "typeset, stage, pace" },
				{ name: "prove", gloss: "every claim answers to a receipt" },
			]}
			resultLabel="the exhibition — set, then proven"
			results={[
				{ name: "chapters/" },
				{ name: "figures/" },
				{ name: "the record" },
				{ name: "colophon", emphasis: true, note: "written last" },
			]}
			verifiedLabel="proven — every claim carries its receipt"
			discardNote="the notes may now rest — the exhibition stands alone"
			fallback="Working material — notes, interviews, measurements — is collected, judged, composed, set, and proven. Then the notes may rest: the exhibition stands alone. That is the whole passage, and it is crossed once."
		/>
	);
}

export function ProcessionSpecimen() {
	return (
		<Procession
			stages={["draft", "edit", "typeset", "stage", "prove", "publish"]}
			caption="one idea — every stage, in order, every time"
		/>
	);
}

export function MagnitudeSpecimen() {
	return (
		<Magnitude
			items={[
				{ label: "a glyph", sub: "one character", magnitude: 1 },
				{ label: "a statement", sub: "~90 characters", magnitude: 90 },
				{ label: "a chapter", sub: "~4,000 characters", magnitude: 4_000 },
				{ label: "an exhibition", sub: "~60,000 characters", magnitude: 60_000 },
			]}
			note="to scale by characters — the glyph is still there, two pixels wide"
		/>
	);
}

export function ChannelSpecimen() {
	return (
		<Channel
			from="author"
			to="reader"
			channelLabel="the page — a fixed reading pace"
			stages={[
				{ density: "wide", caption: "long paragraphs — ideas arrive slowly, heavily loaded" },
				{ density: "narrow", caption: "short statements — same page, ideas arrive sooner" },
			]}
		/>
	);
}

export function QuantisationSpecimen() {
	return (
		<>
			<Quantisation
				phases={[
					{ levels: 0, caption: "the values as given — every one exact" },
					{ levels: 33, caption: "a fine grid — the error is invisible" },
					{ levels: 9, caption: "a coarse grid — every value moves to the nearest level" },
				]}
				note="small moves compound — which is why a coarsened thing must be measured, not assumed"
			/>

			<Observation
				label="AND FILM"
				text="The eighth performance is Film: real video, poster-first, playing once in view, an explicit PLAY under reduced motion — and a designed placeholder frame when no film exists yet, so a slot can be laid out before its piece is produced. It is not shown here because the book ships no placeholders; it appears the day the first film does."
			/>
		</>
	);
}

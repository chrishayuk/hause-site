import type { Metadata } from "next";
import { Hero } from "@chrishayuk/hause/components/forms/Hero";
import { Observation } from "@chrishayuk/hause/components/forms/Observation";
import { Transformation } from "@chrishayuk/hause/components/forms/Transformation";
import { Unfolding } from "@chrishayuk/hause/components/forms/Unfolding";
import { Compilation } from "@chrishayuk/hause/components/forms/Compilation";
import { Procession } from "@chrishayuk/hause/components/forms/Procession";
import { Magnitude } from "@chrishayuk/hause/components/forms/Magnitude";
import { Channel } from "@chrishayuk/hause/components/forms/Channel";
import { Quantisation } from "@chrishayuk/hause/components/forms/Quantisation";
import { Connection } from "@chrishayuk/hause/components/forms/Connection";
import { Specimen } from "@/components/Specimen";

export const metadata: Metadata = {
	title: "HAUSE in Performance: Real Pages Built From the Forms",
	alternates: { canonical: "/performances" },
	description: "The cinematic forms — they play themselves, rest on a designed final state, and never crossfade.",
};

export default function PerformancesPage() {
	return (
		<main>
			<Hero
				kicker="THE BOOK · MODE THREE"
				title="PERFORMANCES"
				dek="Cinematic forms — they play themselves. In-view start, a designed resting state, REPLAY where a piece runs once, a gentle loop where a scrolling reader must never find it finished. Reduced motion always lands on the finished composition."
			/>

			<Observation text="One rule governs all of them: never a crossfade between two physical forms of one thing. A crossfade depicts a conversion. These forms stage a swap — exit, a held beat, enter — or they move the same pieces continuously. The distinction is the design language's deepest conviction, borrowed from the exhibition that forced it into existence." />

			<Specimen name="Transformation" mode="performance" note="Comparison's cinematic sibling — identical argument, performed instead of dragged." />
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

			<Specimen name="Unfolding" mode="performance" note="Decomposition's cinematic sibling — same props, so the two are interchangeable per chapter." />
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

			<Specimen name="Compilation" mode="performance" note="Inputs compiled through named stages into an artifact that no longer needs them — with the discard beat at the end." />
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

			<Specimen name="Procession" mode="performance" note="One thing through every stage, in order — loops while in view, so a scrolling reader never finds it finished." />
			<Procession
				stages={["draft", "edit", "typeset", "stage", "prove", "publish"]}
				caption="one idea — every stage, in order, every time"
			/>

			<Specimen name="Magnitude" mode="performance" note="A powers-of-ten zoom-out, area-true — each arrival rescales the world." />
			<Magnitude
				items={[
					{ label: "a glyph", sub: "one character", magnitude: 1 },
					{ label: "a statement", sub: "~90 characters", magnitude: 90 },
					{ label: "a chapter", sub: "~4,000 characters", magnitude: 4_000 },
					{ label: "an exhibition", sub: "~60,000 characters", magnitude: 60_000 },
				]}
				note="to scale by characters — the glyph is still there, two pixels wide"
			/>

			<Specimen name="Channel" mode="performance" note="Throughput through a fixed conduit — when the payload narrows, the same channel delivers more often." />
			<Channel
				from="author"
				to="reader"
				channelLabel="the page — a fixed reading pace"
				stages={[
					{ density: "wide", caption: "long paragraphs — ideas arrive slowly, heavily loaded" },
					{ density: "narrow", caption: "short statements — same page, ideas arrive sooner" },
				]}
			/>

			<Specimen name="Quantisation" mode="performance" note="Values snapping to representable levels — on a fine grid the move is invisible; on a coarse one, every value steps, and the ghosts remember." />
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

			<Connection
				text="Back through the book."
				links={[
					{ href: "/statements", label: "STATEMENTS →" },
					{ href: "/instruments", label: "INSTRUMENTS →" },
				]}
			/>
		</main>
	);
}

import { Metadata } from "next";
import { Hero } from "@chrishayuk/hause/components/forms/Hero";
import { Specimen } from "@/components/Specimen";
import { StatementSpecimen, ObservationSpecimen, ClaimSpecimen, EvidenceSpecimen, QuestionSpecimen, TimelineSpecimen, ExcerptSpecimen, RefusalSpecimen, ConnectionSpecimen } from "@/specimens/statements";

export const metadata: Metadata = {
	title: "HAUSE Statement Forms: Typography That Argues",
	alternates: { canonical: "/statements" },
	description: "The prose forms — the reader reads. Every specimen is the real form rendering real copy about HAUSE itself.",
};

export default function StatementsPage() {
	return (
		<main>
			<Hero
				kicker="THE BOOK · MODE ONE"
				title="STATEMENTS"
				dek="Prose forms in the three voices. Server-renderable, no interaction — the reader reads. Each specimen below is the real form, and its copy is true."
			/>

			<Specimen name="Hero" mode="statement" note="Self-exhibiting: the wall above is the specimen — every chapter's first form, and this page's own." />


			<Specimen name="Statement" mode="statement" note="The editorial voice at full width — one claim, carrying the room." />

			<StatementSpecimen />

			<Specimen name="Observation" mode="statement" note="System voice with an optional evidence-voice label — explanation, walking beside the reader." />

			<ObservationSpecimen />

			<Specimen name="Claim" mode="statement" note="A claim with a status mark — because a design system should say which of its beliefs are load-bearing." />

			<ClaimSpecimen />

			<Specimen name="Evidence" mode="statement" note="Rows of labelled findings with status marks — receipts, not decoration." />

			<EvidenceSpecimen />

			<Specimen name="Question" mode="statement" note="An open question given the same typographic dignity as an answer." />

			<QuestionSpecimen />

			<Specimen name="Timeline" mode="statement" note="Dates in accent mono, entries in system voice — evolution, recorded." />

			<TimelineSpecimen />

			<Specimen name="Excerpt" mode="statement" note="Someone else's words, typeset — verbatim source material with markdown rendered, tables tamed, and trims marked at word boundaries. Promoted from Ask VINDEX3's citation cards." />

			<ExcerptSpecimen />

			<Specimen name="Refusal" mode="statement" note="Fail-closed as design language — the refusal is the most designed moment, not the error state." />

			<RefusalSpecimen />

			<Specimen name="Connection" mode="statement" note="Self-exhibiting: the bridge below is the specimen — one sentence, then the doors." />

			<ConnectionSpecimen />

</main>
	);
}

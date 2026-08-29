import type { Metadata } from "next";
import { Hero } from "@chrishayuk/hause/components/forms/Hero";
import { Statement } from "@chrishayuk/hause/components/forms/Statement";
import { Observation } from "@chrishayuk/hause/components/forms/Observation";
import { Claim } from "@chrishayuk/hause/components/forms/Claim";
import { Evidence } from "@chrishayuk/hause/components/forms/Evidence";
import { Question } from "@chrishayuk/hause/components/forms/Question";
import { Timeline } from "@chrishayuk/hause/components/forms/Timeline";
import { Refusal } from "@chrishayuk/hause/components/forms/Refusal";
import { Connection } from "@chrishayuk/hause/components/forms/Connection";
import { Specimen } from "@/components/Specimen";

export const metadata: Metadata = {
	title: "Statements",
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
			<Statement text="A specimen book cannot drift from its library when it is the library." />

			<Specimen name="Observation" mode="statement" note="System voice with an optional evidence-voice label — explanation, walking beside the reader." />
			<Observation
				label="ON RESTRAINT"
				text="HAUSE has one scroll behaviour, one easing curve, and three speeds. Everything cinematic on top of that is staging, not machinery — which is why nothing here needed an animation library."
			/>

			<Specimen name="Claim" mode="statement" note="A claim with a status mark — because a design system should say which of its beliefs are load-bearing." />
			<Claim
				text="Every interactive form must carry an always-present text fallback."
				status="SUPPORTED"
				detail="Every instrument does. The point survives with the interaction removed — for reduced motion, for no-JS, for crawlers, and for anyone who just wants the sentence."
			/>

			<Specimen name="Evidence" mode="statement" note="Rows of labelled findings with status marks — receipts, not decoration." />
			<Evidence
				items={[
					{
						label: "Forms built because a real chapter needed them",
						status: "SUPPORTED",
						detail: "28 of 28. ExpertField and Comparison came from the codex; Variants, Refusal, the ladders and all seven performances came from the vindex3 exhibition; the Terminal was promoted from its Explorer, where it fronts a live query endpoint.",
					},
					{
						label: "Forms added to fill a taxonomy gap",
						status: "REFUTED",
						detail: "Zero. The three modes were named after the forms existed, not before.",
					},
				]}
			/>

			<Specimen name="Question" mode="statement" note="An open question given the same typographic dignity as an answer." />
			<Question
				status="OPEN"
				text="When does a form deserve promotion from a site into HAUSE?"
				detail="The working answer: when its props no longer know whose content they carry. A form enters the library the day its example copy could be swapped without touching the component."
			/>

			<Specimen name="Timeline" mode="statement" note="Dates in accent mono, entries in system voice — evolution, recorded." />
			<Timeline
				entries={[
					{ date: "2026-08", text: "Extracted from chrishayuk into its own repository, once a second consumer made copy-pasting the design system the wrong move." },
					{ date: "2026-08-29", text: "The vindex3.org build grows the library by fourteen forms in a day, and the three modes get their names." },
				]}
			/>

			<Specimen name="Refusal" mode="statement" note="Fail-closed as design language — the refusal is the most designed moment, not the error state." />
			<Refusal
				title="NO PLACEHOLDER SHIPS"
				lines={["requested    an empty dashed frame, to fill later", "available    forms that are finished, or absent"]}
				principle="An empty frame is the least luxurious object on a page."
			/>

			<Specimen name="Connection" mode="statement" note="Self-exhibiting: the bridge below is the specimen — one sentence, then the doors." />
			<Connection
				text="When the reader should operate instead of read, the book continues."
				links={[
					{ href: "/instruments", label: "INSTRUMENTS →" },
					{ href: "/performances", label: "PERFORMANCES →" },
				]}
			/>
		</main>
	);
}

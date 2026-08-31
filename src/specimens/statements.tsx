/**
 * THE STATEMENT SPECIMENS — one source, two homes.
 *
 * Every specimen is the real form rendering real copy about HAUSE
 * itself. They live here rather than inside a page because two pages
 * now show them: the mode room, which is a tour, and each form's own
 * page, which is its record. A specimen written twice would drift; a
 * specimen written once cannot.
 */

import { Statement } from "@chrishayuk/hause/components/forms/Statement";
import { Observation } from "@chrishayuk/hause/components/forms/Observation";
import { Claim } from "@chrishayuk/hause/components/forms/Claim";
import { FORM_MANIFEST, formCount, formsByMode } from "@chrishayuk/hause/manifest";
import { Evidence } from "@chrishayuk/hause/components/forms/Evidence";
import { Refusal } from "@chrishayuk/hause/components/forms/Refusal";
import { Question } from "@chrishayuk/hause/components/forms/Question";
import { Timeline } from "@chrishayuk/hause/components/forms/Timeline";
import { Excerpt } from "@chrishayuk/hause/components/forms/Excerpt";
import { Connection } from "@chrishayuk/hause/components/forms/Connection";

export function StatementSpecimen() {
	return (
		<Statement text="A specimen book cannot drift from its library when it is the library." />
	);
}

export function ObservationSpecimen() {
	return (
		<Observation
			label="ON RESTRAINT"
			text="HAUSE has one scroll behaviour, one easing curve, and three speeds. Everything cinematic on top of that is staging, not machinery — which is why nothing here needed an animation library."
		/>
	);
}

export function ClaimSpecimen() {
	return (
		<Claim
			text="Every interactive form must carry an always-present text fallback."
			status="SUPPORTED"
			detail="Every instrument does. The point survives with the interaction removed — for reduced motion, for no-JS, for crawlers, and for anyone who just wants the sentence."
		/>
	);
}

export function EvidenceSpecimen() {
	return (
		<Evidence
			items={[
				{
					label: "Forms built because a real chapter needed them",
					status: "SUPPORTED",
					detail: `${formCount()} of ${formCount()} — and ${FORM_MANIFEST.filter((f) => f.origin).length} of them name the chapter in the manifest, because an origin nobody wrote down is absent rather than guessed. ExpertField and Comparison came from the codex; Variants, Refusal, the ladders and all ${formsByMode("performance").length} performances from the vindex3 exhibition; Terminal from its Explorer; Lens, Citation and Provenance from publishing a specification.`,
				},
				{
					label: "Forms added to fill a taxonomy gap",
					status: "REFUTED",
					detail: "Zero. The three modes were named after the forms existed, not before.",
				},
			]}
		/>
	);
}

export function QuestionSpecimen() {
	return (
		<Question
			status="OPEN"
			text="When does a form deserve promotion from a site into HAUSE?"
			detail="The working answer: when its props no longer know whose content they carry. A form enters the library the day its example copy could be swapped without touching the component."
		/>
	);
}

export function TimelineSpecimen() {
	return (
		<Timeline
			entries={[
				{ date: "2026-08", text: "Extracted from chrishayuk into its own repository, once a second consumer made copy-pasting the design system the wrong move." },
				{ date: "2026-08-29", text: "The vindex3.org build grows the library by fourteen forms in a day, and the three modes get their names." },
			]}
		/>
	);
}

export function ExcerptSpecimen() {
	return (
		<Excerpt
			source="the library README"
			heading="Three modes"
			text={"Every form under `forms/` is one of three kinds. The split was not designed up front — it emerged from real chapters, which is the only way HAUSE accepts structure.\n\n> **Statements** — prose forms in the three voices. The reader reads."}
			trimmed
		/>
	);
}

export function RefusalSpecimen() {
	return (
		<Refusal
			title="NO PLACEHOLDER SHIPS"
			lines={["requested    an empty dashed frame, to fill later", "available    forms that are finished, or absent"]}
			principle="An empty frame is the least luxurious object on a page."
		/>
	);
}

export function ConnectionSpecimen() {
	return (
		<Connection
			text="When the reader should operate instead of read, the book continues."
			links={[
				{ href: "/instruments", label: "INSTRUMENTS →" },
				{ href: "/performances", label: "PERFORMANCES →" },
			]}
		/>

	);
}

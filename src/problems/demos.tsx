import { Comparison } from "@chrishayuk/hause/components/forms/Comparison";
import { Refusal } from "@chrishayuk/hause/components/forms/Refusal";
import { Evidence } from "@chrishayuk/hause/components/forms/Evidence";
import { Answer } from "@chrishayuk/hause/components/forms/Answer";
import { Anatomy } from "@chrishayuk/hause/components/forms/Anatomy";
import { Agreement } from "@chrishayuk/hause/components/forms/Agreement";
import { Snippet } from "@chrishayuk/hause/components/forms/Snippet";
import { Lens } from "@chrishayuk/hause/components/forms/Lens";
import { Observation } from "@chrishayuk/hause/components/forms/Observation";
import { formCount, formsByMode } from "@chrishayuk/hause/manifest";
import { FORMS } from "@/data/forms";
import { PROBLEMS } from "@/data/problems";

/**
 * THE DEMONSTRATIONS.
 *
 * Each problem page ends its argument with the thing itself, not a
 * picture of it: the forms that answer the failure, doing so on the
 * page that describes it. Where a number appears it is read from the
 * library at build time — a page about drift that hand-counted anything
 * would be its own counter-example.
 */

export function EverythingBecomesACardDemo() {
	return (
		<>
			<Comparison
				kicker="ONE RESULT — TWO VOCABULARIES"
				objectLabel="the same thing to say, offered two ways of saying it"
				blockLabels={["THE NAMES", "WHAT A NAME PROMISES", "WHERE MEANING LIVES", "WHAT A MODEL CHOOSES"]}
				left={{
					label: "A COMPONENT KIT",
					properties: [
						"Card · Badge · Tabs · Accordion",
						"A shape, and nothing about its contents",
						"In the author's head, added afterwards",
						"A container that fits — every time",
					],
				}}
				right={{
					label: "SEMANTIC FORMS",
					properties: [
						"Claim · Evidence · Refusal · Answer",
						"An act, with a rule about what belongs in it",
						"In the choice itself, before any styling",
						"What it is trying to say",
					],
				}}
			/>
			<Refusal
				kicker="THE STANDING REFUSAL — RENDERED BY THE Refusal FORM"
				title="NO GENERIC CARD KIT"
				lines={["requested    Card", `available    ${formCount()} semantic forms, each with a name and a job`]}
				principle="If you're about to add a Card, stop."
			/>
		</>
	);
}

export function InterfacesThatCannotRefuseDemo() {
	return (
		<>
			<Refusal
				kicker="ASK HAUSE, REFUSING — THE REAL ANSWER, NOT A MOCKUP"
				title="NO FORM ESTABLISHED"
				lines={["requested    a pricing card with a gradient", `available    ${formCount()} semantic forms, each with a name and a job`]}
				principle="A form enters HAUSE when a real page needs it — never because a question had a gap."
			/>
			<Evidence
				items={[
					{
						label: "A refusal taught a format a primitive it was missing",
						status: "SUPPORTED",
						detail:
							"In vindex3, a closure gate met a model shipping an attention output gate in every one of its 52 layers and refused all 52 by name — required primitive, absent. Not a crash: a named absence. The semantics were then judged from the reference implementation, the primitive entered the IR, and the model closed. A guess would have executed silently and taught nobody anything.",
					},
					{
						label: "Refusals are a design surface, not an error surface",
						status: "SUPPORTED",
						detail:
							"Refusal is a form in the library, with a kicker, structured request/available lines and the governing principle in editorial voice. Variants renders one inside itself when a reader selects an absent variant — the refusal is part of the instrument, not an interruption of it.",
					},
				]}
			/>
		</>
	);
}

export function PagesMachinesCannotReadDemo() {
	return (
		<>
			<Answer
				id="what-is-the-travelling-test"
				question="What is the travelling test for machine legibility?"
				answer="Strip the page to its text and ask whether it still answers the question it was designed to answer. If the argument lived in a canvas, an animation or a click, the answer is no — and no amount of structured data added afterwards will fix it, because there is nothing underneath for the structured data to describe. The fallback is not a courtesy for old browsers. It is the page's actual content."
				cite="the library README — machine legibility as a design-system concern"
			/>
			<Snippet
				label="THE SAME RECORD, SAID FOR PEOPLE AND FOR MACHINES"
				code={`// The designed surface — a person reads this.
<Answer
  id="what-is-machine-legibility"
  question="What is machine legibility, in a design system?"
  answer="One lift-able paragraph, 40–100 words, with a stable anchor."
/>

// The same facts, in the graph — nothing retyped, so nothing can drift.
<JsonLd data={techArticleLd({ headline, description, url, siteUrl, siteName })} />
<JsonLd data={citationLd(record)} />`}
				aside="Both surfaces project from records the page already holds. A crawlable answer that was written separately is a second answer, and one of the two will be wrong."
			/>
		</>
	);
}

export function NothingToCiteDemo() {
	return (
		<>
			<Anatomy
				kicker="ONE RECORD — FOUR SURFACES"
				objectLabel="A citation is not a component. It is a record with four projections."
				layers={[
					{
						label: "the record",
						note: "CitationRecord",
						emphasis: true,
						detail:
							"Title, authors, first publication, revision, version, canonical URL — and only the identifiers that actually exist. Everything below is derived from this, which is why the four can never disagree.",
					},
					{
						label: "the page",
						note: "Provenance",
						detail:
							"One quiet evidence line — published, revised, version, DOI where there is one — expanding to the commit, the artifact hash and the dated history.",
					},
					{
						label: "the export",
						note: "Citation",
						detail:
							"The reference in the formats people paste: plain, BibTeX, APA, CSL-JSON. Plain is selected by default, so the citation is in the served HTML before any JavaScript runs.",
					},
					{
						label: "the head",
						note: "citationMeta()",
						detail: "citation_* tags — how Zotero, Scholar and every add-to-library button read a page without being told anything about your site.",
					},
					{
						label: "the graph",
						note: "citationLd()",
						muted: true,
						detail: "The same record in schema.org, identifiers as PropertyValues — the machine-readable half of the same sentence.",
					},
				]}
				caption="published means first published. A revision sets revised. An identifier that has not been registered is absent — never a placeholder."
			/>
			<Observation
				label="THE PAGE YOU ARE READING"
				text="This one is a published object too. Its provenance line and its reference sit at the foot, its citation tags are in the head, and its record is in the graph — all four from the same object, on an argument about why arguments should be citable."
			/>
		</>
	);
}

export function TheBookDriftsFromTheCodeDemo() {
	const manifest = formCount();
	const documented = FORMS.length;
	const modes = formsByMode("statement").length + formsByMode("instrument").length + formsByMode("performance").length;
	return (
		<>
			<Agreement
				kicker="THREE COUNTS · THREE SOURCES · ONE BUILD"
				columns={[
					{ label: "THE MANIFEST", source: "manifest.ts — the library's own index" },
					{ label: "THE SOURCE FILES", source: "components/forms/*.tsx, read by the ingest" },
					{ label: "THE THREE MODES", source: "formsByMode, summed" },
				]}
				rows={[
					{
						values: [String(manifest), String(documented), String(modes)],
						verdict: manifest === documented && documented === modes ? "PASS" : "FAIL",
						note: "Forms held, counted three ways at build time.",
					},
				]}
				caption="Nothing on this page counted anything by hand. If the manifest ever names a form the ingest cannot find, src/data/forms.ts throws and the build fails — the disagreement stops at the build rather than reaching the reader as a confident sentence."
			/>
			<Evidence
				items={[
					{
						label: "Hand-written counts on this site went stale",
						status: "SUPPORTED",
						detail:
							"A specimen page read 28 of 28 while the library held 35 forms, and all seven performances while there were eight. Both were typed as true. Both were wrong within a fortnight, and nothing failed — which is exactly the argument for deriving them.",
					},
					{
						label: "Derived facts went stale",
						status: "REFUTED",
						detail:
							"The holdings page, the mode counts, the form pages and the sitemap all read from the manifest, and moved the day the library did. The fix for the rows above was not proofreading; it was deleting the numbers and reading them instead.",
					},
				]}
			/>
		</>
	);
}

export function TutorialOrReferenceNeverBothDemo() {
	const lens = FORMS.find((f) => f.name === "Lens");
	return (
		<Lens
			kicker="THIS PROBLEM — AT THREE DEPTHS"
			concept="Depth"
			caption="The demonstration is the argument: one subject, one URL, three depths — and the depth you pick here is the depth the rest of the site will greet you with."
			depths={[
				{
					id: "learn",
					label: "LEARN",
					hint: "what the split costs",
					content: (
						<Observation
							label="THE COST OF THE SPLIT"
							text="Two pages about one subject are two things to keep true. The reader pays first — guessing which half holds their answer — and the writer pays afterwards, because the half with the traffic and the half with the precision are rarely the same half, and neither review cycle catches the disagreement between them."
						/>
					),
				},
				{
					id: "inspect",
					label: "INSPECT",
					hint: "the instrument, running",
					content: (
						<Observation
							label="YOU ARE OPERATING IT"
							text="This is a Lens: the control above, three panels beneath, every panel in the DOM whether or not you clicked it. Your choice is remembered in localStorage and written into the URL fragment, so this page can be sent to someone at the depth you were reading — and the next chapter opens where you left off rather than back at the introduction."
						/>
					),
				},
				{
					id: "spec",
					label: "SPEC",
					hint: "the props, verbatim",
					content: (
						<Snippet
							label={`THE CONTRACT — ${lens?.file ?? "components/forms/Lens.tsx"}`}
							code={lens?.api ?? ""}
							aside="Read out of the library at build time, like every other contract on this site."
						/>
					),
				},
			]}
		/>
	);
}

export const DEMOS: Record<string, () => React.ReactNode> = {
	"everything-becomes-a-card": EverythingBecomesACardDemo,
	"interfaces-that-cannot-refuse": InterfacesThatCannotRefuseDemo,
	"pages-machines-cannot-read": PagesMachinesCannotReadDemo,
	"nothing-to-cite": NothingToCiteDemo,
	"the-book-drifts-from-the-code": TheBookDriftsFromTheCodeDemo,
	"tutorial-or-reference-never-both": TutorialOrReferenceNeverBothDemo,
};

/** Every problem must have its demonstration — a page that only argues is half a page. */
for (const p of PROBLEMS) {
	if (!DEMOS[p.slug]) throw new Error(`${p.slug} has no demonstration — add one, or the page argues without showing.`);
}

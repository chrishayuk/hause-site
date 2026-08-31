import type { Metadata } from "next";
import { Hero } from "@chrishayuk/hause/components/forms/Hero";
import { Statement } from "@chrishayuk/hause/components/forms/Statement";
import { Observation } from "@chrishayuk/hause/components/forms/Observation";
import { Answer } from "@chrishayuk/hause/components/forms/Answer";
import { Evidence } from "@chrishayuk/hause/components/forms/Evidence";
import { Comparison } from "@chrishayuk/hause/components/forms/Comparison";
import { Question } from "@chrishayuk/hause/components/forms/Question";
import { Connection } from "@chrishayuk/hause/components/forms/Connection";
import { Provenance } from "@chrishayuk/hause/components/forms/Provenance";
import { Citation } from "@chrishayuk/hause/components/forms/Citation";
import { JsonLd } from "@chrishayuk/hause/components/JsonLd";
import { breadcrumbLd, citationLd } from "@chrishayuk/hause/seo";
import { citationMeta, type CitationRecord } from "@chrishayuk/hause/cite";
import { buildIdentifiers } from "@/data/build";

const RECORD: CitationRecord = {
	title: "READING-2 — the boundary, stated once",
	authors: ["Chris Hay"],
	published: "2026-08-31",
	version: "1.0",
	url: "https://hause.design/evals/reading-2",
	publisher: "hause.design",
	kind: "research-note",
	abstract:
		"Two sentences were added to one page and three fresh readers were asked the same eight questions. Two of three now cite the boundary instead of inventing it, and all three moved from rejecting commerce categorically to scoping it. The third quoted READING-1's published finding that the boundary was missing — a frozen self-criticism outliving its own fix.",
	independence: "Published independently by Chris Hay.",
	about: ["evaluation", "machine legibility", "AEO"],
	identifiers: [{ label: "site under test", value: "hause.design @ build 04ac313" }, ...buildIdentifiers()],
};

export const metadata: Metadata = {
	title: "READING-2: Does Stating the Boundary Change the Conclusion?",
	alternates: { canonical: "/evals/reading-2" },
	description: RECORD.abstract,
	other: citationMeta(RECORD),
};

/**
 * One intervention, two sentences, one page — and a finding nobody
 * predicted: the site's own published self-criticism competed with the
 * correction, and won once.
 */
export default function Reading2Page() {
	return (
		<main>
			<JsonLd data={citationLd(RECORD)} />
			<JsonLd data={breadcrumbLd([{ name: "HAUSE", url: "https://hause.design" }, { name: "READING-2", url: RECORD.url }])} />

			<Hero
				kicker="READING-2 · ONE INTERVENTION · TWO SENTENCES"
				title="2 OF 3 CITED IT"
				dek="READING-1 found the one thing the corpus never said: what HAUSE is not for. Two sentences were added to the home page and nowhere else, and the same eight questions were put to three fresh readers. The boundary now travels — and the reader it did not reach found our own eval saying the boundary was missing, and quoted it."
			/>

			<Answer
				id="did-stating-the-boundary-work"
				question="Does stating a boundary change what a model concludes, or only where it got it?"
				answer="Both, and the second more than expected. Two of three readers now quote the boundary sentence rather than inventing a limit, and one reconciled it against the earlier eval unprompted. More interesting: all three moved from rejecting commerce categorically to scoping it — HAUSE for the comparison, the provenance, the refusal and the explanation; not for the cart, the checkout or the inputs. In READING-1 that split was three readers' private reasoning. Here it is what the site says."
			/>

			<Comparison
				kicker="THE SAME QUESTIONS, BEFORE AND AFTER TWO SENTENCES"
				objectLabel="three fresh readers, eight questions, one page changed between the runs"
				blockLabels={["WHERE THE BOUNDARY CAME FROM", "WHAT LAYER IT IS", "COMMERCE", "WHAT AN EXPLANATION IS"]}
				left={{
					label: "READING-1",
					properties: [
						"Inferred by all three — “the site never states it”",
						"“My characterisation”, “a component library in the mechanical sense”",
						"Categorical no, three times, each self-flagged as inference",
						"Refusal, answer, comparison, performance — long-form prose unaddressed",
					],
				}}
				right={{
					label: "READING-2",
					properties: [
						"Quoted from the home page by two of three",
						"“Its scope is the semantic layer, not the interface layer” — cited",
						"Scoped by all three: explanatory surfaces yes, transaction no",
						"The sentence's own list travelled; prose still unaddressed, still marked so",
					],
				}}
			/>

			<Evidence
				items={[
					{
						label: "Stating the boundary moves it from inference to citation",
						status: "SUPPORTED",
						detail: "Two of three readers quoted the sentence verbatim under question three, where all three of READING-1's readers had reported an absence and supplied their own answer. The preregistered prediction was at least two of three, and it held.",
					},
					{
						label: "Naming what it does not replace also scopes what it is used beside",
						status: "SUPPORTED",
						detail: "Predicted not to move, and it moved. All three readers gave the nuanced answer — usable for the comparison, the provenance, the refusal and the explanation around a store, not for the cart, checkout, inputs or filters. One reached it from the boundary sentence directly; the other two reasoned from it.",
					},
					{
						label: "A frozen self-criticism ages out of date and keeps being quoted",
						status: "SUPPORTED",
						detail: "The third reader answered question three with “the site does not say”, and cited READING-1's own page as evidence: “all three independent readers identified the same gap.” That page is frozen and correct about the day it was run — and it now competes with the correction. A second reader hit the same collision and resolved it, noting that the boundary statement “is the answer to that gap.” One reconciliation, one contradiction, from the same two pages.",
					},
					{
						label: "The site's own weakest link was found without prompting",
						status: "SUPPORTED",
						detail: "One reader closed with a criticism nobody asked for: “the site is its own witness — every eval is run and graded by the system's author, and no independent replication is claimed.” That is the correct reading of this entire programme, and it arrived from the corpus rather than from a reviewer's template.",
					},
				]}
			/>

			<Statement text="A published finding is a claim with a date on it, and a fix does not reach back and edit it." />

			<Observation
				label="WHAT THIS COSTS, AND WHAT IT IS WORTH"
				text="A site that publishes its own failures accumulates true statements that become false ones, and machines quote them with the same confidence either way. The answer is not to stop publishing failures, and it is not to quietly edit a frozen result. It is supersession: a result keeps its numbers and gains a dated line saying what happened next, so a reader arriving at the criticism arrives at the correction too. The citation layer already has the vocabulary for that — first published, revised, version, history — and until now the eval pages were the one place on this site not using it."
			/>

			<Question
				status="OPEN"
				text="How much of an eval's finding should its own page carry forward?"
				detail="A supersession line on READING-1 is the minimum, and it has been added: the numbers stand, and a dated entry records that the gap was closed and where to see whether it worked. Whether that is enough for a machine reading only one page, or whether a superseded finding needs to be marked in the sentence that states it rather than in a history at the foot, is unresolved — and it is the kind of question that only shows up once a site has been publishing its own mistakes for long enough to trip over one."
			/>

			<Connection
				text="The run this measures against, and the record it aged."
				links={[
					{ href: "/evals/reading-1", label: "READING-1 — 20 SUPPORTED, 0 INVENTED" },
					{ href: "/evals/choosing-1", label: "CHOOSING-1 — 122 · 122 · 8" },
					{ href: "/", label: "THE BOUNDARY, ON THE HOME PAGE" },
				]}
			/>

			<Provenance
				record={RECORD}
				history={[
					{ date: "2026-08-31", text: "Preregistered with predictions, then two sentences added to the home page and nowhere else, then three fresh readers asked the same eight questions." },
				]}
				citeHref="#cite"
			/>
			<Citation record={RECORD} note="One prediction held, one was wrong in the useful direction, and the finding neither of them anticipated is the one about publishing failures." />
		</main>
	);
}

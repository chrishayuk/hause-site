import type { Metadata } from "next";
import { Hero } from "@chrishayuk/hause/components/forms/Hero";
import { Statement } from "@chrishayuk/hause/components/forms/Statement";
import { Observation } from "@chrishayuk/hause/components/forms/Observation";
import { Answer } from "@chrishayuk/hause/components/forms/Answer";
import { Evidence } from "@chrishayuk/hause/components/forms/Evidence";
import { Agreement } from "@chrishayuk/hause/components/forms/Agreement";
import { Question } from "@chrishayuk/hause/components/forms/Question";
import { Connection } from "@chrishayuk/hause/components/forms/Connection";
import { Provenance } from "@chrishayuk/hause/components/forms/Provenance";
import { Citation } from "@chrishayuk/hause/components/forms/Citation";
import { JsonLd } from "@chrishayuk/hause/components/JsonLd";
import { breadcrumbLd, citationLd } from "@chrishayuk/hause/seo";
import { citationMeta, type CitationRecord } from "@chrishayuk/hause/cite";
import { buildIdentifiers } from "@/data/build";
import routing from "@/data/routing1.json";

type Outcome = { id: string; topic: string; q: string; expected: string; routedTo: string; answered: string; family: string; kindCorrect: boolean; familyCorrect: boolean };
const { summary, outcomes } = routing as { summary: Record<string, string | number | Record<string, string>>; outcomes: Outcome[] };
const n = outcomes.length;
const kindRight = outcomes.filter((o) => o.kindCorrect).length;
const familyRight = outcomes.filter((o) => o.familyCorrect).length;
const recordBacked = outcomes.filter((o) => o.expected === "form" || o.expected === "history");
const keywordBacked = outcomes.filter((o) => o.expected === "select" || o.expected === "problem" || o.expected === "system");
const byKind = summary.byKind as Record<string, string>;

const RECORD: CitationRecord = {
	title: "ROUTING-1 — deciding what kind of answer was asked for",
	authors: ["Chris Hay"],
	published: "2026-08-31",
	version: "1.0",
	url: "https://hause.design/evals/routing-1",
	publisher: "hause.design",
	kind: "research-note",
	abstract: `Sixty questions, twelve topics, five kinds of request each, isolating intent routing from form selection. The router identifies the kind in ${kindRight} of ${n}; the answer is right in ${familyRight}. The defect CHOOSING-1 found is closed, and what remains is coverage inside each space.`,
	independence: "Published independently by Chris Hay.",
	about: ["evaluation", "intent routing", "design system"],
	identifiers: buildIdentifiers(),
};

export const metadata: Metadata = {
	title: "ROUTING-1: What Kind of Answer Was Asked For?",
	alternates: { canonical: "/evals/routing-1" },
	description: RECORD.abstract,
	other: citationMeta(RECORD),
};

/**
 * The follow-up CHOOSING-1 earned. Not preregistered, and the router's
 * author wrote the cases — so it is a regression gate, and the page says
 * so before it says anything else.
 */
export default function Routing1Page() {
	return (
		<main>
			<JsonLd data={citationLd(RECORD)} />
			<JsonLd
				data={breadcrumbLd([
					{ name: "HAUSE", url: "https://hause.design" },
					{ name: "ROUTING-1", url: RECORD.url },
				])}
			/>

			<Hero
				kicker="ROUTING-1 · A REGRESSION GATE, NOT A DISCOVERY"
				title={`${kindRight} OF ${n}`}
				dek="CHOOSING-1 found that questions asking which form to use were being answered with a problem chapter, because both spaces use the same words. This asks sixty questions across twelve topics — the same vocabulary, five different requests each — and measures whether the kind of answer is identified before anything is retrieved."
			/>

			<Answer
				id="what-is-routing-1"
				question="Can the system tell which kind of answer is being asked for?"
				answer={`Almost always. On sixty questions built as twelve topics × five request kinds — choose a form, explain a form, explain a failure, ask about origin, ask about the system — the router identifies the kind in ${kindRight}. Whether the reader then gets a useful answer is a different number: ${familyRight} of ${n}. The gap between those two is the finding, and it is not about routing at all.`}
			/>

			<Observation
				label="READ THIS FIRST — WHAT THIS CANNOT SHOW"
				text="ROUTING-1 was not preregistered, and the person who wrote the router wrote the cases. It can show that a specific defect is closed on material the defect never saw. It cannot show that the router is good, and no claim of that kind is made here. CHOOSING-1 was the honest experiment; this is the gate that stops its finding from silently reopening."
			/>

			<Evidence
				items={[
					{
						label: "Selection questions answered with a problem chapter",
						status: "REFUTED",
						detail: `Zero of twelve. In CHOOSING-1 this was twenty-six of a hundred and twenty-four, and it was the reason for the change: the kind of answer is now decided before any record is matched, so a question about carrying content cannot be captured by a chapter about a failure merely for sharing the word "cite".`,
					},
					{
						label: "The router identifies the kind of request",
						status: "SUPPORTED",
						detail: `${kindRight} of ${n}. The two misses are both a question about the system that names a form and reads like a request to explain that form — "what is a statement, in HAUSE?" — which is a genuine ambiguity in English rather than a routing bug.`,
					},
					{
						label: "Deciding the kind is enough to answer well",
						status: "REFUTED",
						detail: `${familyRight} of ${n}. Routing improved and answering did not follow, because the spaces are not equally furnished: the kinds backed by records answer ${recordBacked.filter((o) => o.familyCorrect).length} of ${recordBacked.length}, and the kinds backed by hand-written keyword lists answer ${keywordBacked.filter((o) => o.familyCorrect).length} of ${keywordBacked.length}.`,
					},
				]}
			/>

			<Statement text="The spaces backed by records answer. The spaces backed by keyword lists refuse." />

			<Agreement
				kicker="THE SAME QUESTION KINDS, RESOLVED TWO WAYS"
				columns={[
					{ label: "ROUTED CORRECTLY", source: "classify() — what kind of answer is wanted" },
					{ label: "ANSWERED USEFULLY", source: "the space that kind resolves in" },
				]}
				rows={[
					{ values: [`${recordBacked.filter((o) => o.kindCorrect).length} / ${recordBacked.length}`, `${recordBacked.filter((o) => o.familyCorrect).length} / ${recordBacked.length}`], verdict: "PASS", note: "form · history — resolved against the manifest and its origins" },
					{ values: [`${keywordBacked.filter((o) => o.kindCorrect).length} / ${keywordBacked.length}`, `${keywordBacked.filter((o) => o.familyCorrect).length} / ${keywordBacked.length}`], verdict: "FAIL", note: "select · problem · system — resolved against hand-written keyword lists" },
				]}
				caption="Routing is not the bottleneck any more. A question that reaches the right space and finds nothing there was never a routing failure — it is a space with a list in it where a record belongs."
			/>

			<section className="hause-grid py-12 sm:py-16">
				<div className="col-span-12 md:col-start-2 md:col-span-10">
					<p className="voice-evidence text-xs tracking-[0.14em] uppercase mb-6 opacity-50">USEFUL ANSWERS, BY REQUEST KIND</p>
					<div className="flex flex-col">
						{Object.entries(byKind).map(([k, v]) => (
							<div key={k} className="grid grid-cols-[10rem_1fr] gap-6 py-3 border-t items-baseline" style={{ borderColor: "var(--color-mist)" }}>
								<span className="voice-evidence text-sm" style={{ color: "var(--color-accent)" }}>{k.toUpperCase()}</span>
								<span className="voice-evidence text-sm opacity-70">{v}</span>
							</div>
						))}
						<div className="border-t" style={{ borderColor: "var(--color-mist)" }} />
					</div>
					<p className="voice-evidence text-xs opacity-40 leading-relaxed max-w-3xl mt-8">
						{outcomes.filter((o) => !o.familyCorrect).map((o) => `${o.id} → ${o.answered}`).join("  ·  ")}
					</p>
				</div>
			</section>

			<Question
				status="OPEN"
				text="What replaces the keyword lists?"
				detail="The grammar already holds thirty-five acts, each with the move it makes and the test that decides it — records, in the same shape as the manifest entries that answer twelve of twelve. Resolving selection against those instead of against a hand-written keyword list is the obvious next change, and this page deliberately does not make it: ROUTING-1 is frozen, and the change gets measured on fresh material rather than on the set that suggested it."
			/>

			<Connection
				text="The experiment that found the defect, and the grammar the next fix would resolve against."
				links={[
					{ href: "/evals/choosing-1", label: "CHOOSING-1 — 122 · 122 · 8" },
					{ href: "/choosing", label: "THE SELECTION GRAMMAR" },
					{ href: "/ask", label: "ASK HAUSE" },
				]}
			/>

			<Provenance record={RECORD} history={[{ date: "2026-08-31", text: "Router restructured to decide the kind of answer before matching records; ROUTING-1 written and run once against it." }]} citeHref="#cite" />
			<Citation record={RECORD} note="A gate, published like a result — including the part where routing stopped being the problem and coverage started." />
		</main>
	);
}

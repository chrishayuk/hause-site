import type { Metadata } from "next";
import { Hero } from "@chrishayuk/hause/components/forms/Hero";
import { Statement } from "@chrishayuk/hause/components/forms/Statement";
import { Observation } from "@chrishayuk/hause/components/forms/Observation";
import { Answer } from "@chrishayuk/hause/components/forms/Answer";
import { Evidence } from "@chrishayuk/hause/components/forms/Evidence";
import { Question } from "@chrishayuk/hause/components/forms/Question";
import { Connection } from "@chrishayuk/hause/components/forms/Connection";
import { Provenance } from "@chrishayuk/hause/components/forms/Provenance";
import { Citation } from "@chrishayuk/hause/components/forms/Citation";
import { JsonLd } from "@chrishayuk/hause/components/JsonLd";
import { breadcrumbLd, citationLd } from "@chrishayuk/hause/seo";
import { citationMeta, type CitationRecord } from "@chrishayuk/hause/cite";
import { buildIdentifiers } from "@/data/build";
import result from "@/data/choosing1-c.json";

type Outcome = {
	id: string;
	kind: string;
	expected: string;
	selected: string;
	exact: boolean;
	neighbour: boolean;
};
const { summary, outcomes } = result as { summary: Record<string, unknown>; outcomes: Outcome[] };
const n = outcomes.length;
const exact = outcomes.filter((o) => o.exact).length;
const refusedWrongly = outcomes.filter((o) => o.expected !== "NONE" && o.selected === "REFUSED").length;
const wrongQuestion = outcomes.filter((o) => o.selected.startsWith("OTHER:")).length;
const stolenByProblems = outcomes.filter((o) => o.selected.startsWith("OTHER:problem")).length;
const neighbours = outcomes.filter((o) => o.neighbour).length;
const otherForm = outcomes.filter((o) => !o.exact && !o.neighbour && !o.selected.startsWith("OTHER:") && o.selected !== "REFUSED").length;
const abstained = outcomes.filter((o) => o.expected === "NONE" && o.selected === "REFUSED").length;
const noForm = outcomes.filter((o) => o.expected === "NONE").length;

const RECORD: CitationRecord = {
	title: "CHOOSING-1 — can a selector find the form from the content?",
	authors: ["Chris Hay"],
	published: "2026-08-31",
	version: "1.0",
	url: "https://hause.design/evals/choosing-1",
	publisher: "hause.design",
	kind: "research-note",
	abstract: `A preregistered evaluation of whether HAUSE's forms can be selected from unfamiliar content. 124 cases across seven domains. Condition C — the deployed deterministic resolver, no model call — selects the intended form in ${exact} of ${n}.`,
	independence: "Published independently by Chris Hay.",
	about: ["design system", "evaluation", "semantic selection"],
	identifiers: [{ label: "frozen library", value: "hause@b68d451" }, ...buildIdentifiers()],
};

export const metadata: Metadata = {
	title: "CHOOSING-1: Can a Model Pick the Right Form?",
	alternates: { canonical: "/evals/choosing-1" },
	description: RECORD.abstract,
	other: citationMeta(RECORD),
};

/**
 * The result, published as it came out. The deterministic resolver
 * scores 8 of 124, which is the number this page exists to show — a
 * preregistered eval whose failures are hidden is a press release.
 */
export default function Choosing1Page() {
	return (
		<main>
			<JsonLd data={citationLd(RECORD)} />
			<JsonLd
				data={breadcrumbLd([
					{ name: "HAUSE", url: "https://hause.design" },
					{ name: "CHOOSING-1", url: RECORD.url },
				])}
			/>

			<Hero
				kicker="CHOOSING-1 · PREREGISTERED · FROZEN"
				title={`${exact} OF ${n}`}
				dek="The build proves every form is reachable through the grammar. That is a fact about the grammar. This asks whether someone who did not write it can find the path from content alone — and the deployed resolver, on 124 unfamiliar cases, mostly cannot."
			/>

			<Answer
				id="what-is-choosing-1"
				question="Can a system pick the right HAUSE form from unfamiliar content?"
				answer={`CHOOSING-1 is a preregistered evaluation: 124 cases across seven domains — technical, editorial, commerce, operations, narrative, data, product — written without using HAUSE's own vocabulary, each recording the expected form, the test that decides it, and the neighbour most likely to be chosen instead. The deterministic resolver, with no model call, selects the intended form in ${exact}. It refuses ${refusedWrongly} times where a form was wanted, and answers a different question entirely ${wrongQuestion} times.`}
			/>

			<Statement text="A preregistered evaluation whose failures are hidden is a press release." />

			<Evidence
				items={[
					{
						label: "The deterministic resolver selects the intended form",
						status: "REFUTED",
						detail: `${exact} of ${n}. Of the misses: ${refusedWrongly} refusals where a form was wanted, ${stolenByProblems} answered with a problem chapter instead of a form, ${otherForm} chose a different form, and ${neighbours} chose the recorded near neighbour. Written differently: the lexical layer recognises the vocabulary it was given and almost nothing else.`,
					},
					{
						label: "Refusing chrome because it recognised chrome",
						status: "REFUTED",
						detail: `${abstained} of ${noForm} no-form cases were refused, which looks like judgement and is not. The same resolver refused ${refusedWrongly} cases where a form existed. A system that abstains by default cannot claim precision for abstaining — the number measures the default, not the discrimination.`,
					},
					{
						label: "Adding the problems layer made form selection worse",
						status: "SUPPORTED",
						detail: `${stolenByProblems} cases were answered with a problem chapter rather than a form recommendation. The problem records carry the words people use for a failure — cite, documentation, certain, reference — and those are the same words people use when describing content that needs a form. The layer added this morning intercepts the layer it was meant to sit beside.`,
					},
				]}
			/>

			<Observation
				label="WHAT THIS DOES AND DOES NOT MEASURE"
				text="It measures the lexical projection of the grammar, not the grammar. The resolver is keyword scoring with no model call — the deliberate choice that makes Ask honest — so this result says a keyword layer does not cover the paraphrase space of thirty-five semantic acts. It does not yet say whether the acts themselves are discoverable, because no model has been run against them. Those are separate hypotheses on purpose: mixing them would let a weak resolver make the design language look weak."
			/>

			<Question
				status="OPEN"
				text="Can a model that has never seen HAUSE select the right form from the content alone?"
				detail="Conditions A and B — catalogue only, and the choosing grammar — are specified in the preregistration, use the same 124 cases, and have not been run. The interesting comparison is between them: if the grammar materially improves selection over the bare catalogue, the acts carry information the names do not. If neither works, the distinctions may not be operational for anyone but their author."
			/>

			<section className="hause-grid py-16 sm:py-24">
				<div className="col-span-12 md:col-start-2 md:col-span-10">
					<p className="voice-evidence text-xs tracking-[0.14em] uppercase mb-6 opacity-50">
						WHERE THE LANGUAGE BROKE — EVERY MISS, WITH WHAT WAS CHOSEN INSTEAD
					</p>
					<div className="flex flex-col">
						{outcomes
							.filter((o) => !o.exact)
							.map((o) => (
								<div
									key={o.id}
									className="grid grid-cols-[4rem_1fr_auto] gap-4 py-2 border-t items-baseline"
									style={{ borderColor: "var(--color-mist)" }}
								>
									<span className="voice-evidence text-[11px] opacity-40">{o.id}</span>
									<span className="voice-evidence text-[12px] opacity-70">
										expected {o.expected}
										{o.neighbour ? " · chose the recorded neighbour" : ""}
									</span>
									<span className="voice-evidence text-[12px]" style={{ color: "var(--color-accent)" }}>
										{o.selected.startsWith("OTHER:") ? o.selected.replace("OTHER:", "answered ") : o.selected.toLowerCase()}
									</span>
								</div>
							))}
						<div className="border-t" style={{ borderColor: "var(--color-mist)" }} />
					</div>
					<p className="voice-system text-sm opacity-60 max-w-2xl mt-6">
						{JSON.stringify(summary.byKind)} by kind, {JSON.stringify(summary.byDomain)} by domain — read from the
						run's own output rather than retyped.
					</p>
				</div>
			</section>

			<Observation
				label="THE RULE THAT MAKES IT EVIDENCE"
				text="CHOOSING-1 runs once, is published, and is frozen. Its failures may change the grammar, the wording or the resolver — and the changed system is then measured on CHOOSING-2, built from fresh material. Nothing is tuned against this set, because a resolver tuned against its own test suite is an elegant memoriser and the number it produces means nothing. The cases were also written by the author of the grammar, which is a real weakness: CHOOSING-2's material should come from somewhere else."
			/>

			<Connection
				text="The grammar under test, and the resolver that failed to project it."
				links={[
					{ href: "/choosing", label: "THE SELECTION GRAMMAR" },
					{ href: "/ask", label: "ASK HAUSE — THE RESOLVER" },
					{ href: "/problems/everything-becomes-a-card", label: "WHY SEMANTIC SELECTION MATTERS" },
				]}
			/>

			<Provenance
				record={RECORD}
				history={[
					{ date: "2026-08-31", text: "Preregistered against hause@b68d451, then run once. Condition C published; A and B unrun." },
				]}
				citeHref="#cite"
			/>
			<Citation record={RECORD} note="A result is a published object. This one is worth citing mainly because it is negative." />
		</main>
	);
}

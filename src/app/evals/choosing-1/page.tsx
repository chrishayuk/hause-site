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
import resultC from "@/data/choosing1-c.json";
import resultA from "@/data/choosing1-a.json";
import resultB from "@/data/choosing1-b.json";

type Outcome = {
	id: string;
	kind: string;
	expected: string;
	selected: string;
	exact: boolean;
	neighbour: boolean;
};
type Res = { summary: Record<string, unknown>; outcomes: Outcome[] };
const { summary, outcomes } = resultC as Res;
const a = (resultA as Res).outcomes;
const b = (resultB as Res).outcomes;
const exactA = a.filter((o) => o.exact).length;
const exactB = b.filter((o) => o.exact).length;
const disagreements = a.filter((o, i) => o.selected !== b[i].selected).length;
const trapsA = a.filter((o) => o.kind === "trap" && o.exact).length;
const trapsB = b.filter((o) => o.kind === "trap" && o.exact).length;
const traps = a.filter((o) => o.kind === "trap").length;
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
	abstract: `A preregistered evaluation of whether HAUSE's forms can be selected from unfamiliar content. ${n} cases across seven domains, three conditions. A model given the form names and their one-line descriptions selects the intended form in ${exactA} of ${n}; given the full selection grammar, ${exactB}; the deployed deterministic resolver, no model call, ${exact}.`,
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
				title={`${exactA} · ${exactB} · ${exact}`}
				dek="Three conditions, 124 unfamiliar cases, one preregistration. A model that has never seen this library selects the intended form almost every time. The deployed keyword resolver selects it eight times. And the grammar the whole exercise was built to test makes no measurable difference — which is a result about the experiment before it is a result about the grammar."
			/>

			<Answer
				id="what-is-choosing-1"
				question="Can a system pick the right HAUSE form from unfamiliar content?"
				answer={`Mostly, yes — and the deployed resolver mostly cannot. On 124 preregistered cases written without using HAUSE's vocabulary, a model given only the form names and their one-line descriptions selected the intended form ${exactA} times; the same model given the full selection grammar scored ${exactB}; the deterministic keyword resolver scored ${exact}. The two model conditions disagreed on ${disagreements} cases out of 124, which means this set cannot tell them apart — a ceiling, and a flaw in the cases rather than a finding about the grammar.`}
			/>

			<Statement text="A preregistered evaluation whose failures are hidden is a press release." />

			<Evidence
				items={[
					{
						label: "A model that has never seen HAUSE can select the intended form",
						status: "SUPPORTED",
						detail: `Condition A — form names and one-line descriptions only — scored ${exactA} of ${n}, including ${trapsA} of ${traps} near-neighbour traps. Condition B, given the full grammar with its deciding tests, scored ${exactB} and ${trapsB} of ${traps}. Fresh context per batch, no access to this repository, the site, or Ask.`,
					},
					{
						label: "The choosing grammar improves selection over the bare catalogue",
						status: "OPEN",
						detail: `Unmeasurable here. The two conditions disagreed on ${disagreements} of ${n} cases and scored within one of each other. That is a ceiling, not a null result: the catalogue's one-line descriptions already carry the distinctions in compressed form — "an assertion that knows it must answer to evidence" is the deciding test, spelled differently — so condition A was never the naive baseline it was meant to be.`,
					},
					{
						label: "The deterministic resolver projects that selection into keywords",
						status: "REFUTED",
						detail: `${exact} of ${n}. Of the misses: ${refusedWrongly} refusals where a form was wanted, ${stolenByProblems} answered with a problem chapter instead of a form, ${otherForm} chose a different form, and ${neighbours} chose the recorded near neighbour. The same content that a model resolves at ${Math.round((exactA / n) * 100)}% resolves at ${Math.round((exact / n) * 100)}% without one.`,
					},
					{
						label: "Refusing chrome because it recognised chrome",
						status: "REFUTED",
						detail: `The resolver refused ${abstained} of ${noForm} no-form cases, which looks like judgement and is not: it also refused ${refusedWrongly} cases where a form existed. A system that abstains by default cannot claim precision for abstaining. Both model conditions refused all ${noForm} correctly while refusing almost nothing else — that is the same measure meaning something.`,
					},
					{
						label: "Adding the problems layer made form selection worse",
						status: "SUPPORTED",
						detail: `${stolenByProblems} cases were answered with a problem chapter rather than a form. The problem records carry the words people use for a failure — cite, documentation, certain, reference — and those are the words people use when describing content that needs a form. The layer added this morning intercepts the layer it was meant to sit beside.`,
					},
				]}
			/>

			<Observation
				label="THE RESULT THAT SURVIVES"
				text={`The gap between the model conditions and the resolver is real and large: the same 124 descriptions that a reasoner resolves ${exactA} times resolve ${exact} times through keyword scoring. The semantic layer transfers to a reader who has never seen it; the lexical projection of that layer captures a fraction of it. That is an architectural finding, and it is the one this eval was worth running for.`}
			/>

			<Observation
				label="AND THE ONE THAT DOES NOT — THIS SET CANNOT COMPARE A WITH B"
				text="Two design errors, both mine. The cases describe the treatment somebody wants rather than presenting the content itself — 'let the reader drag between two readings' is nearly a lookup, where a real essay would hand over three paragraphs and no instruction. And the catalogue condition was never naive: the manifest's one-line descriptions are compressed deciding tests, so A and B were closer to two phrasings of the same material than to two conditions. A ceiling at 122 and 122 measures the cases, not the grammar."
			/>

			<Observation
				label="WHAT BOTH MODELS DID WITH AMBIGUITY"
				text="Neither could express hesitation. On the cases the authority marks as genuinely ambiguous, both conditions answered with a single confident pick or refused outright — because the answer format only allowed one name or none. Every ambiguous miss in both conditions was a refusal, not a wrong form. That is a finding about the instrument, and CHOOSING-2 needs a way to say 'either of these two, and here is what would decide it'."
			/>

			<Question
				status="OPEN"
				text="Does the selection grammar carry anything the catalogue does not?"
				detail="Still open, and now open for a specific reason rather than an unrun one. CHOOSING-2 has to break the ceiling: cases built from real content rather than descriptions of the treatment wanted, a genuinely naive baseline of names without descriptions, an answer format that can express hesitation, and material written by somebody who did not write the grammar. Until then, the honest statement is that the catalogue was already enough for a capable reader, and nobody has shown the grammar adds to it."
			/>

			<section className="hause-grid py-16 sm:py-24">
				<div className="col-span-12 md:col-start-2 md:col-span-10">
					<p className="voice-evidence text-xs tracking-[0.14em] uppercase mb-6 opacity-50">
						WHERE THE RESOLVER BROKE — EVERY MISS IN CONDITION C, WITH WHAT IT CHOSE INSTEAD
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
					{
						date: "2026-08-31",
						text: `Conditions A and B run and published beside C — ${exactA} · ${exactB} · ${exact}, read from the runs' own output. The middle number is the finding: this set cannot tell the grammar from the catalogue.`,
					},
					{ date: "2026-08-31", text: "Preregistered against hause@b68d451, then run once. Condition C published; A and B unrun." },
				]}
				citeHref="#cite"
			/>
			<Citation record={RECORD} note="A result is a published object. This one is worth citing mainly because it is negative." />
		</main>
	);
}

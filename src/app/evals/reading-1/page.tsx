import type { Metadata } from "next";
import { Hero } from "@chrishayuk/hause/components/forms/Hero";
import { Statement } from "@chrishayuk/hause/components/forms/Statement";
import { Observation } from "@chrishayuk/hause/components/forms/Observation";
import { Answer } from "@chrishayuk/hause/components/forms/Answer";
import { Evidence } from "@chrishayuk/hause/components/forms/Evidence";
import { Claim } from "@chrishayuk/hause/components/forms/Claim";
import { Question } from "@chrishayuk/hause/components/forms/Question";
import { Connection } from "@chrishayuk/hause/components/forms/Connection";
import { Provenance } from "@chrishayuk/hause/components/forms/Provenance";
import { Citation } from "@chrishayuk/hause/components/forms/Citation";
import { JsonLd } from "@chrishayuk/hause/components/JsonLd";
import { breadcrumbLd, citationLd } from "@chrishayuk/hause/seo";
import { citationMeta, type CitationRecord } from "@chrishayuk/hause/cite";
import { buildIdentifiers } from "@/data/build";
import { CLAIMS, type Class } from "@/data/reading1-claims";

const count = (v: Class) => CLAIMS.filter((c) => c.verdict === v).length;
const supported = count("supported");
const inference = count("reasonable inference");
const over = count("overgeneralisation");
const invented = count("unsupported invention");

const RECORD: CitationRecord = {
	title: "READING-1 — what the site teaches a model about HAUSE",
	authors: ["Chris Hay"],
	published: "2026-08-31",
	version: "1.0",
	url: "https://hause.design/evals/reading-1",
	publisher: "hause.design",
	kind: "research-note",
	abstract: `Three fresh contexts read hause.design and answered eight questions about it. Of ${CLAIMS.length} classified claims, ${supported} are supported by a sentence on the site, ${inference} are reasonable inferences the readers flagged themselves, ${over} overgeneralises, and ${invented} are invented. The corpus teaches accurately — and every reader had to invent the same missing thing.`,
	independence: "Published independently by Chris Hay.",
	about: ["evaluation", "machine legibility", "AEO"],
	identifiers: [{ label: "site under test", value: "hause.design @ build 10b87d0" }, ...buildIdentifiers()],
};

export const metadata: Metadata = {
	title: "READING-1: What a Model Learns From This Site",
	alternates: { canonical: "/evals/reading-1" },
	description: RECORD.abstract,
	other: citationMeta(RECORD),
};

/**
 * The eval that measures the corpus rather than the machinery: what
 * conceptual model of HAUSE does the public site cause a stranger to
 * build? Prompted by a third-party review that got the ideas right and
 * the surroundings wrong — and preregistered before the site was
 * touched, because the corpus that produced the misreading is the one
 * under test.
 */
export default function Reading1Page() {
	return (
		<main>
			<JsonLd data={citationLd(RECORD)} />
			<JsonLd data={breadcrumbLd([{ name: "HAUSE", url: "https://hause.design" }, { name: "READING-1", url: RECORD.url }])} />

			<Hero
				kicker="READING-1 · THE CORPUS UNDER TEST, NOT THE MACHINERY"
				title={`${supported} SUPPORTED · ${invented} INVENTED`}
				dek="Three fresh contexts were given one instruction — read hause.design and answer eight questions from what is there, citing the page each answer came from. This measures what nobody else here measures: the conceptual model the public corpus causes a stranger to build."
			/>

			<Answer
				id="what-does-the-site-teach"
				question="What does a model learn about HAUSE from reading the site?"
				answer={`Accurately, most of it. Across ${CLAIMS.length} classified claims from three independent readers, ${supported} are supported by a sentence on the site, ${inference} are inferences the readers flagged as inferences, one overgeneralises, and none is invented. All three reproduced the semantic-act thesis, the admission rule, the three modes and the evaluation results including the negative ones. All three also hit the same wall in the same place — the site never says what HAUSE is not for.`}
			/>

			<Statement text="Three readers, three inventions of the same missing sentence." />

			<Observation
				label="THE FINDING, PLAINLY — AND WHAT HAPPENED NEXT"
				text="The corpus was clearer than the reviewer. The concern that prompted this eval originated in a model's prior rather than in the site's wording: nothing here teaches dashboards, plugin communities or cognitive load, and three readers given the same site produced none of it. The one real gap — that the site never said what HAUSE is not for — was closed the same day with two sentences on the home page. The numbers below are the numbers from before that change and are not adjusted; READING-2 measures whether the change travelled."
			/>

			<Evidence
				items={[
					{
						label: "The thesis survives being read by a stranger",
						status: "SUPPORTED",
						detail: `${supported} of ${CLAIMS.length} claims trace to a sentence on the site: semantic acts rather than containers, the act naming the form, 35 forms in three modes, admission by precedent, refusal as design language, machine legibility as part of the grammar. No reader had to be told any of it.`,
					},
					{
						label: "The negative results travel too",
						status: "SUPPORTED",
						detail: "All three cited the evals with their caveats intact — CHOOSING-1's void A/B comparison, ROUTING-1 stating it was not preregistered and that the router's author wrote its cases, ROUTING-2 refuting its own intervention. Two also cited the provenance ledger's own weakness: 18 of 35 forms from a single consumer, 14 with no recorded origin.",
					},
					{
						label: "The site says what HAUSE is not for",
						status: "REFUTED",
						detail: "It does not, and all three readers said so unprompted — no non-goals anywhere; the boundary is drawn around method rather than use. Each of them then invented the boundary from the catalogue, and reached the same conclusion by their own reasoning rather than the site's.",
					},
					{
						label: "Readers invented a community, an ecosystem or an adoption story",
						status: "REFUTED",
						detail: `Zero of ${CLAIMS.length}. Nothing about plugins, forums, third-party support or "widely considered" appeared. Where adoption came up, it came up as the site states it: two consumer sites, one author, and the concentration named as a weakness.`,
					},
				]}
			/>

			<Claim
				text="The third-party review that prompted this eval was wrong in ways the corpus did not cause."
				status="SUPPORTED"
				detail="It compressed HAUSE into a framework for explainable-AI dashboards, and asserted a niche plugin community and reduced design fatigue. None of the three readers produced any of those. The word dashboard does not appear on the site, and neither does any claim about cognitive load. Those were the shape of a familiar review template being filled in, not something the site taught — which is the distinction this eval exists to draw."
			/>

			<section className="hause-grid py-12 sm:py-16">
				<div className="col-span-12 md:col-start-2 md:col-span-10">
					<p className="voice-evidence text-xs tracking-[0.14em] uppercase mb-6 opacity-50">
						THE PREDICTIONS, WRITTEN BEFORE THE RUN
					</p>
					<div className="flex flex-col">
						{[
							["The site will fail to communicate that an explanation includes an essay, an answer, a refusal", "PARTLY WRONG", "Readers listed refusal, answer, comparison and performance correctly. Only long-form prose was unaddressed — a narrower gap than predicted, and a real one."],
							["The site will fail to state that it is a semantic layer, not a replacement for transactional chrome", "CORRECT", "All three found no such statement and each supplied its own."],
							["Adoption scale will be flattened despite being stated", "WRONG", "Two readers cited it precisely, including the concentration on one consumer as a weakness."],
						].map(([p, verdict, note]) => (
							<div key={p} className="grid grid-cols-1 sm:grid-cols-[1fr_8rem] gap-2 sm:gap-6 py-4 border-t" style={{ borderColor: "var(--color-mist)" }}>
								<div>
									<p className="voice-system text-base m-0">{p}</p>
									<p className="voice-evidence text-[12px] opacity-55 mt-1 m-0">{note}</p>
								</div>
								<span className="voice-evidence text-xs tracking-[0.1em] uppercase" style={{ color: verdict === "CORRECT" ? "var(--color-status-supported)" : verdict === "WRONG" ? "var(--color-status-refuted)" : "var(--color-accent)" }}>
									{verdict}
								</span>
							</div>
						))}
						<div className="border-t" style={{ borderColor: "var(--color-mist)" }} />
					</div>
				</div>
			</section>

			<section className="hause-grid py-12 sm:py-16">
				<div className="col-span-12 md:col-start-2 md:col-span-10">
					<p className="voice-evidence text-xs tracking-[0.14em] uppercase mb-6 opacity-50">EVERY CLASSIFIED CLAIM</p>
					<div className="flex flex-col">
						{CLAIMS.map((c, i) => (
							<div key={i} className="grid grid-cols-[2.5rem_1fr_9rem] gap-3 sm:gap-6 py-3 border-t items-baseline" style={{ borderColor: "var(--color-mist)" }}>
								<span className="voice-evidence text-[11px] opacity-35">R{c.reader}·Q{c.q}</span>
								<span className="voice-system text-sm opacity-80">{c.claim}</span>
								<span className="voice-evidence text-[10px] tracking-[0.08em] uppercase" style={{ color: c.verdict === "supported" ? "var(--color-status-supported)" : c.verdict === "overgeneralisation" ? "var(--color-status-refuted)" : "var(--fg)", opacity: c.verdict === "reasonable inference" ? 0.45 : 1 }}>
									{c.verdict}
								</span>
							</div>
						))}
						<div className="border-t" style={{ borderColor: "var(--color-mist)" }} />
					</div>
					<p className="voice-system text-sm opacity-60 max-w-2xl mt-6">
						Classified by the site&apos;s author, which makes the line between inference and overgeneralisation the
						softest measure here. The rule that keeps it honest: supported requires a sentence that can be pointed
						at.
					</p>
				</div>
			</section>

			<Question
				status="OPEN"
				text="Does stating the boundary change what readers conclude, or only where they got it?"
				detail="Two sentences are missing and every reader wrote their own version of them: that an explanation includes an essay and an answer as much as an instrument, and that HAUSE is the semantic layer rather than a replacement for buttons, inputs and tables. Adding them is easy. Whether they change the conclusion — all three said no to commerce, reasoning from the catalogue — or merely move it from inference to citation is what READING-2 measures, on a site that has been changed exactly once."
			/>

			<Connection
				text="The machinery evals, and the record the readers found most quotable."
				links={[
					{ href: "/evals/choosing-1", label: "CHOOSING-1 — 122 · 122 · 8" },
					{ href: "/evals/routing-2", label: "ROUTING-2 — RECORDS AGAINST SCAFFOLDING" },
					{ href: "/how-hause-grew", label: "THE PROVENANCE LEDGER" },
				]}
			/>

			<Provenance
				record={RECORD}
				history={[
					{ date: "2026-08-31", text: "SUPERSEDED IN PART — the missing boundary this eval found was stated on the home page the same day, and READING-2 measures whether it travelled. No number on this page changed." },
					{ date: "2026-08-31", text: "Preregistered with predictions against build 10b87d0; three fresh contexts read the live site; the site was not changed before the run." },
				]}
				citeHref="#cite"
			/>
			<Citation record={RECORD} note="An eval of the corpus rather than the code — and the one where the prediction sheet was more wrong than the site was." />
		</main>
	);
}

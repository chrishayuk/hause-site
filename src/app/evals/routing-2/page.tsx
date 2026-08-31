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
import routing from "@/data/routing2.json";

type Outcome = { id: string; topic: string; q: string; expected: string; wants: string | null; routedTo: string; answered: string; familyCorrect: boolean; kindCorrect: boolean; actPick: string | null; scaffoldPick: string | null; verdict: string | null };
const { summary, outcomes } = routing as { summary: { kindCorrect: number; answerFamilyCorrect: number; byKind: Record<string, string>; selection: Record<string, number>; retirementRule: Record<string, unknown> }; outcomes: Outcome[] };
const n = outcomes.length;
const sel = outcomes.filter((o) => o.expected === "select");
const recordBacked = outcomes.filter((o) => o.expected === "form" || o.expected === "history");

const RECORD: CitationRecord = {
	title: "ROUTING-2 — did moving selection onto records help?",
	authors: ["Chris Hay"],
	published: "2026-08-31",
	version: "1.0",
	url: "https://hause.design/evals/routing-2",
	publisher: "hause.design",
	kind: "research-note",
	abstract: `One intervention measured on fresh material: selection moved from a keyword list onto the choosing acts. The scaffold rescued nothing and the records carry three of twelve, so the preregistered retirement rule fires — and the sharper finding is that a record resolved through a keyword field resolves like a keyword list.`,
	independence: "Published independently by Chris Hay.",
	about: ["evaluation", "intent routing", "design system"],
	identifiers: buildIdentifiers(),
};

export const metadata: Metadata = {
	title: "ROUTING-2: Records Against Scaffolding",
	alternates: { canonical: "/evals/routing-2" },
	description: RECORD.abstract,
	other: citationMeta(RECORD),
};

/**
 * The controlled follow-up: exactly one thing changed since ROUTING-1,
 * and every selection case was resolved twice — once through the act
 * records, once through the old keyword list — so the answer could be
 * attributed rather than assumed.
 */
export default function Routing2Page() {
	const s = summary.selection;
	return (
		<main>
			<JsonLd data={citationLd(RECORD)} />
			<JsonLd data={breadcrumbLd([{ name: "HAUSE", url: "https://hause.design" }, { name: "ROUTING-2", url: RECORD.url }])} />

			<Hero
				kicker="ROUTING-2 · PREREGISTERED · ONE INTERVENTION"
				title={`${s.actOnlyCorrect} OF ${s.cases}`}
				dek="Between the two runs exactly one thing changed: selection moved from a hand-written keyword list onto the thirty-five choosing acts. On fresh material the records carry three selections of twelve, the scaffold carries none the records missed, and the space that looked healthy in ROUTING-1 turns out to have been carried by phrasings it had already seen."
			/>

			<Answer
				id="did-records-beat-the-keyword-list"
				question="Did moving selection onto records improve it?"
				answer={`It removed the scaffolding's justification without yet doing the job. On twelve fresh selection requests written in ordinary language, the act records chose correctly ${s.actOnlyCorrect} times and the old keyword list ${s.scaffoldOnlyCorrect}. The list rescued nothing the records missed, and contradicted them once. So the preregistered retirement rule fires — and three of twelve is not a working selector. The records are the right authority and they do not yet state their own meaning in the language people use.`}
			/>

			<Evidence
				items={[
					{
						label: "The keyword scaffolding still earns its place",
						status: "REFUTED",
						detail: `Act records correct: ${s.actOnlyCorrect} of ${s.cases}. Keyword list correct: ${s.scaffoldOnlyCorrect} of ${s.cases}. Cases where the act missed and the scaffold rescued it: ${s["act misses · scaffold rescues"]}. Cases where the act was right and the scaffold wrong: ${s["act correct · scaffold wrong"]}. The retirement rule was fixed before these cases existed and it fires: the list goes.`,
					},
					{
						label: "Moving selection onto records made selection work",
						status: "REFUTED",
						detail: `${s.actOnlyCorrect} of ${s.cases}, with ${s["both refuse"]} cases where both paths refused entirely. "Show one passport moving through application, checks, printing and posting, still the same passport" is a Procession by any reading, and the record — "one thing passing through every stage, in order" — shares one word with it. Right authority, wrong contents.`,
					},
					{
						label: "The record-backed spaces held",
						status: "SUPPORTED",
						detail: `${recordBacked.filter((o) => o.familyCorrect).length} of ${recordBacked.length}, unchanged from ROUTING-1's 24 of 24 on entirely different material. Explaining a form and asking where it came from resolve against the manifest, and the manifest states what its entries mean.`,
					},
					{
						label: "Problem chapters are records, so they resolve like records",
						status: "REFUTED",
						detail: `${summary.byKind.problem}. Every fresh problem question failed. The problem records carry a hand-written keywords field, and resolution goes through that field — so having a record is not the property that matters. A record resolved through a keyword list resolves like a keyword list.`,
					},
				]}
			/>

			<Statement text="A record with a keyword list attached is a keyword list with better manners." />

			<section className="hause-grid py-12 sm:py-16">
				<div className="col-span-12 md:col-start-2 md:col-span-10">
					<p className="voice-evidence text-xs tracking-[0.14em] uppercase mb-6 opacity-50">EVERY SELECTION, RESOLVED TWICE</p>
					<div className="flex flex-col">
						{sel.map((o) => (
							<div key={o.id} className="grid grid-cols-[7rem_1fr] sm:grid-cols-[7rem_9rem_9rem_1fr] gap-3 sm:gap-6 py-3 border-t items-baseline" style={{ borderColor: "var(--color-mist)" }}>
								<span className="voice-evidence text-[11px] opacity-40">{o.topic}</span>
								<span className="voice-evidence text-[12px]" style={{ color: o.actPick === o.wants ? "var(--color-accent)" : "var(--fg)", opacity: o.actPick === o.wants ? 1 : 0.5 }}>
									act · {o.actPick ?? "—"}
								</span>
								<span className="voice-evidence text-[12px] opacity-50">list · {o.scaffoldPick ?? "—"}</span>
								<span className="voice-evidence text-[11px] opacity-45">wanted {o.wants} · {o.verdict}</span>
							</div>
						))}
						<div className="border-t" style={{ borderColor: "var(--color-mist)" }} />
					</div>
				</div>
			</section>

			<Observation
				label="AND THE ROUTER SLIPPED WHERE PEOPLE STOP SAYING I"
				text={`Kind identification fell to ${summary.kindCorrect} of ${n} from ROUTING-1's 58, and every miss is the same shape: "Draw our 48-byte record…", "Show one passport…", "We keep three encodings…". The router recognises an authoring request by its first-person framing, so an imperative or a declarative slides into the system space. That is a record problem too — what a selection request is has been written as a pattern rather than stated.`}
			/>

			<Question
				status="OPEN"
				text="What is present in these phrasings that the records fail to state?"
				detail="Asked one case at a time, and answered only where the answer is a real part of the form's meaning. A Procession is not merely one thing passing through stages — it is a thing that stays itself while it does, which is exactly what the passport case is about and exactly what the record does not say. That is enrichment. Adding the word 'passport' would be a keyword list migrating inside a record, which buys architectural cleanliness and no semantic improvement. ROUTING-3 measures the difference."
			/>

			<Connection
				text="The run before this one, the grammar being resolved against, and the rule that just retired a working code path."
				links={[
					{ href: "/evals/routing-1", label: "ROUTING-1 — 58 OF 60" },
					{ href: "/evals/choosing-1", label: "CHOOSING-1 — 122 · 122 · 8" },
					{ href: "/choosing", label: "THE SELECTION GRAMMAR" },
				]}
			/>

			<Provenance record={RECORD} history={[{ date: "2026-08-31", text: "Preregistered with the retirement rule fixed, then run once against fresh material." }]} citeHref="#cite" />
			<Citation record={RECORD} note="Two negative results and one retirement. The intervention was correct and insufficient, which is a different thing from wrong." />
		</main>
	);
}

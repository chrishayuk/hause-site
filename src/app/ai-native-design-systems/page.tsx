import type { Metadata } from "next";
import { Hero } from "@chrishayuk/hause/components/forms/Hero";
import { Statement } from "@chrishayuk/hause/components/forms/Statement";
import { Observation } from "@chrishayuk/hause/components/forms/Observation";
import { Answer } from "@chrishayuk/hause/components/forms/Answer";
import { Claim } from "@chrishayuk/hause/components/forms/Claim";
import { Evidence } from "@chrishayuk/hause/components/forms/Evidence";
import { Excerpt } from "@chrishayuk/hause/components/forms/Excerpt";
import { Connection } from "@chrishayuk/hause/components/forms/Connection";
import { Provenance } from "@chrishayuk/hause/components/forms/Provenance";
import { Citation } from "@chrishayuk/hause/components/forms/Citation";
import { JsonLd } from "@chrishayuk/hause/components/JsonLd";
import { breadcrumbLd, citationLd } from "@chrishayuk/hause/seo";
import { citationMeta, type CitationRecord } from "@chrishayuk/hause/cite";
import { formCount } from "@chrishayuk/hause/manifest";
import { buildIdentifiers } from "@/data/build";

const RECORD: CitationRecord = {
	title: "AI-native design systems: the approaches, and where HAUSE sits",
	authors: ["Chris Hay"],
	published: "2026-08-31",
	version: "1.0",
	url: "https://hause.design/ai-native-design-systems",
	publisher: "hause.design",
	kind: "article",
	abstract:
		"Five distinct answers to what an AI-native design system is — a context engine, an agent-readable spec, markdown design instructions, a semantic control plane, and prompt-portable tokens — each in its own words, and where a system of semantic acts differs from all of them.",
	independence: "Published independently by Chris Hay.",
	about: ["AI-native design systems", "design systems", "AI interfaces"],
	identifiers: buildIdentifiers(),
};

export const metadata: Metadata = {
	title: "AI-Native Design Systems: The Approaches Compared",
	alternates: { canonical: "/ai-native-design-systems" },
	description: RECORD.abstract,
	other: citationMeta(RECORD),
};

const LANDSCAPE = [
	{
		who: "Atlassian Design System",
		href: "https://www.atlassian.com/blog/ai-at-work/atlassian-design-system-building-the-context-engine-for-the-ai-era",
		means: "An existing enterprise design system becoming a context engine",
		what: "Structured context files, an MCP server, AI skills, and semantic foundations in tokens and components so agents can read and reason about the system's structure.",
		quote: "context files that guide decision-making",
	},
	{
		who: "Geeklego",
		href: "https://techblog.geekyants.com/geeklego-the-open-source-design-system-built-to-work-with-ai",
		means: "Rules a model must read before it generates",
		what: "A three-tier token architecture, a machine-readable spec of 45 never-do and 49 always-do rules, six agent skills and 81 components — enforcement rather than documentation.",
		quote: "define the system first. Let AI build from it, not around it",
	},
	{
		who: "Didot",
		href: "https://didot.design/",
		means: "Design instructions a coding agent can follow",
		what: "Markdown files — DESIGN.md for visual identity, SKILL.md for design reasoning, WORKFLOW.md for agent process — written for how AI tools read rules rather than for human browsing.",
		quote: "A design system your agent really understands",
	},
	{
		who: "Aiko",
		href: "https://aiko.systems/",
		means: "A semantic control plane over knowledge that already exists",
		what: "Ingests design files, component code, docs, tokens and past decisions into a Canonical Design Graph, and projects scoped contracts an agent can use and evidence a team can verify.",
		quote: "scoped contracts agents can use, and evidence teams can verify",
	},
	{
		who: "AI UX Playground",
		href: "https://aiuxplayground.com/guides/ai-native-design-systems/",
		means: "A design system that fits in a prompt",
		what: "Tokens, type and components packaged as exact specifications a model can carry into a generation — hex values, sizes, which components exist.",
		quote: "tokens, type, and components that can travel in a prompt",
	},
];

/**
 * The category page. Every other project is described in its own words,
 * quoted and linked, because a landscape written to flatter one entry in
 * it is worth nothing to a reader deciding between them — and because
 * the honest version is the one where HAUSE's absences are listed too.
 */
export default function AiNativeDesignSystemsPage() {
	return (
		<main>
			<JsonLd data={citationLd(RECORD)} />
			<JsonLd data={breadcrumbLd([{ name: "HAUSE", url: "https://hause.design" }, { name: "AI-native design systems", url: RECORD.url }])} />

			<Hero
				kicker="THE CATEGORY · FIVE APPROACHES, AND A SIXTH"
				title="AI-NATIVE DESIGN SYSTEMS"
				dek="The phrase is being used for at least five different things. They are not competing definitions of one idea; they are answers to different questions, and it is worth knowing which question you have."
			/>

			<Answer
				id="what-is-an-ai-native-design-system"
				question="What is an AI-native design system?"
				answer="A design system whose rules, components and design intent are usable by AI systems as well as by people. In practice the term covers at least five approaches: an existing design system exposed to agents as a context engine (Atlassian); a machine-readable specification of rules a model reads before generating (Geeklego); markdown design instructions written for coding agents (Didot); a semantic control plane that compiles existing design knowledge into contracts and evidence (Aiko); and tokens packaged to travel inside a prompt (AI UX Playground). HAUSE is a sixth kind: a vocabulary of semantic acts for interfaces an AI composes."
			/>

			<Statement text="Four of these make an existing design system legible to AI. The question underneath is what vocabulary an AI should use when it is the one deciding how to communicate." />

			<section className="hause-grid py-12 sm:py-16" aria-label="The approaches">
				<div className="col-span-12 md:col-start-2 md:col-span-10">
					<p className="voice-evidence text-xs tracking-[0.14em] uppercase mb-8 opacity-50">
						EACH IN ITS OWN WORDS — QUOTED AND LINKED, AUGUST 2026
					</p>
					<div className="flex flex-col">
						{LANDSCAPE.map((l) => (
							<div key={l.who} className="grid grid-cols-1 sm:grid-cols-[12rem_1fr] gap-3 sm:gap-8 py-5 border-t" style={{ borderColor: "var(--color-mist)" }}>
								<div>
									<a href={l.href} className="voice-evidence text-sm border-b pb-0.5" style={{ color: "var(--color-accent)", borderColor: "var(--color-accent)" }}>
										{l.who} →
									</a>
									<p className="voice-evidence text-[11px] opacity-45 mt-2 m-0">{l.means}</p>
								</div>
								<div>
									<p className="voice-system text-base opacity-85 m-0">{l.what}</p>
									<p className="voice-evidence text-[12px] opacity-55 mt-2 m-0">“{l.quote}”</p>
								</div>
							</div>
						))}
						<div className="border-t" style={{ borderColor: "var(--color-mist)" }} />
					</div>
				</div>
			</section>

			<Observation
				label="WHAT THEY HAVE IN COMMON"
				text="All five start from a design system that already exists and make it readable by something that is not a person: as context, as rules, as a graph, as a prompt payload. The unit of work stays the component — a Button, a Dialog, a token tier — and the AI's job is to use them correctly. That is a real problem and these are real answers to it."
			/>

			<Claim
				text="HAUSE is answering a different question: not how an AI reads a design system, but what vocabulary it should choose from when it is deciding what to communicate."
				status="ONGOING"
				detail={`Its primitives are not containers made legible — they are named acts: a Claim that owes evidence, an Evidence row that shows what refuted it, a Refusal that declines to assert, an Answer, a Comparison. ${formCount()} of them, chosen by naming the act rather than the shape. Marked ongoing rather than settled, because the claim that this is a materially different category rests on a young library with two consumers and one author.`}
			/>

			<Observation
				label="SOMEBODY ELSE ARRIVED AT THE SAME PLACE FROM ANOTHER DIRECTION"
				text="Adam Kinney's essay on AI-native design reaches the same territory without naming the same things, and it is worth reading beside this. It argues that these systems are behavioural grammars rather than component libraries, and that what is missing is an explicit vocabulary for epistemic state. That is the gap HAUSE built forms for — and independent arrival at a problem is better evidence that the problem is real than one project asserting it."
			/>

			<Excerpt
				source="Adam Kinney — Eight Dimensions of AI-Native Design"
				text="AI-native design systems are behavioral grammars for systems that don't have predetermined states.\n\nThe design system needs an explicit vocabulary for epistemic state: certainty, uncertainty, action, caution, error recovery."
				href="https://adamkinney.com/writing/eight-dimensions-of-ai-native-design/"
			/>

			<Observation
				label="WHAT HAUSE DOES NOT DO"
				text="It has no MCP server, no Figma ingestion, no token pipeline, no agent skills, and no component coverage for the transactional layer — no buttons, inputs, tables or navigation. If the problem is that a coding agent keeps misusing an existing component library, the systems above solve that and HAUSE does not. It is the semantic layer above them, and it expects to sit beside a UI framework rather than replace one."
			/>

			<Evidence
				items={[
					{
						label: "The semantic vocabulary is selectable by a model that has never seen it",
						status: "SUPPORTED",
						detail: "CHOOSING-1: 124 preregistered cases written without HAUSE's vocabulary, scored by fresh contexts with no access to the site — 122 of 124 correct, including 30 of 30 near-neighbour traps. Published with the finding that the comparison it was built to make was void.",
					},
					{
						label: "The deterministic projection of that vocabulary works",
						status: "REFUTED",
						detail: "8 of 124 on the same cases, and 3 of 12 on fresh selections after being rebuilt onto records. Published as it came out.",
					},
					{
						label: "Adoption is broad",
						status: "REFUTED",
						detail: "Two consumer sites, one author, version 0.1.0. 18 of the 35 forms name a single consumer as their origin, which the provenance record calls the honest weakness of a young design system.",
					},
				]}
			/>

			<Connection
				text="The argument this page compresses, the grammar it refers to, and the evidence behind both."
				links={[
					{ href: "/problems/everything-becomes-a-card", label: "WHY AI INTERFACES CONVERGE ON CONTAINERS" },
					{ href: "/choosing", label: "THE SELECTION GRAMMAR" },
					{ href: "/evals/choosing-1", label: "THE EVALUATIONS" },
				]}
			/>

			<Provenance record={RECORD} history={[{ date: "2026-08-31", text: "Written after fetching each project's own pages; every characterisation is quoted from the source and linked to it." }]} citeHref="#cite" />
			<Citation record={RECORD} note="A landscape written to flatter one entry in it is worth nothing to a reader choosing between them — so the quotes are theirs and the absences are ours." />
		</main>
	);
}

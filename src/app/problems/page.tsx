import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@chrishayuk/hause/components/forms/Hero";
import { Statement } from "@chrishayuk/hause/components/forms/Statement";
import { Observation } from "@chrishayuk/hause/components/forms/Observation";
import { Answer } from "@chrishayuk/hause/components/forms/Answer";
import { Connection } from "@chrishayuk/hause/components/forms/Connection";
import { JsonLd } from "@chrishayuk/hause/components/JsonLd";
import { breadcrumbLd } from "@chrishayuk/hause/seo";
import { formCount } from "@chrishayuk/hause/manifest";
import { PROBLEMS, PROBLEMS_IN_ORDER, spell } from "@/data/problems";
import { FORMS } from "@/data/forms";
import { ProblemMap } from "@/components/ProblemMap";

export const metadata: Metadata = {
	title: "What AI Interfaces Get Wrong: The Problems HAUSE Answers",
	alternates: { canonical: "/problems" },
	description:
		"Everything becomes a card. Interfaces that cannot refuse. Pages machines cannot read. Nothing to cite. The book drifts from the code. Tutorial or reference, never both — the failures HAUSE is a consequence of.",
};

/**
 * The front door for readers who have not met the library yet. A form
 * is easier to believe backwards: nobody needs a Refusal until they
 * have watched a system guess rather than say no.
 */
export default function ProblemsPage() {
	return (
		<main>
			<JsonLd
				data={breadcrumbLd([
					{ name: "HAUSE", url: "https://hause.design" },
					{ name: "The problems", url: "https://hause.design/problems" },
				])}
			/>

			<Hero
				kicker="THE PROBLEMS · WHY ANY OF THIS EXISTS"
				title="START WITH WHAT IS BROKEN"
				dek="HAUSE is not a taxonomy that happened to need filling. Every form in it is a consequence — of an interface that could not refuse, a page a machine could not read, an idea nobody could cite. Here are the failures, first."
			/>

			<Answer
				id="what-problems-does-hause-solve"
				question="What problems does HAUSE actually solve?"
				answer={`${spell(PROBLEMS.length).charAt(0).toUpperCase()}${spell(PROBLEMS.length).slice(1)}, so far: ${PROBLEMS_IN_ORDER.map((p) => p.title.toLowerCase()).join("; ")}. Each one is a failure with a form behind it — the ${formCount()} forms in the library are what answering them looked like.`}
			/>

			<section className="hause-grid py-10 sm:py-16">
				<div className="col-span-12 md:col-start-2 md:col-span-10">
					<div className="flex flex-col">
						{PROBLEMS_IN_ORDER.map((p) => (
							<Link
								key={p.slug}
								href={`/problems/${p.slug}`}
								className="group grid grid-cols-[2.5rem_1fr] sm:grid-cols-[3.5rem_minmax(0,20rem)_1fr] gap-3 sm:gap-8 items-baseline py-5 border-t"
								style={{ borderColor: "var(--color-mist)" }}
							>
								<span className="voice-evidence text-xs opacity-40">{p.number}</span>
								<span className="voice-evidence text-xs sm:text-sm tracking-[0.06em]" style={{ color: "var(--color-accent)" }}>
									{p.title} →
								</span>
								<span className="voice-system text-sm opacity-65 group-hover:opacity-95 transition-opacity hidden sm:block">
									{p.dek}
								</span>
							</Link>
						))}
						<div className="border-t" style={{ borderColor: "var(--color-mist)" }} />
					</div>
				</div>
			</section>

			<Statement text="A form that arrives without a failure behind it is a Card wearing a costume." />

			<ProblemMap
				problems={PROBLEMS_IN_ORDER.map((p) => ({ slug: p.slug, number: p.number, title: p.title, answers: p.answers }))}
				forms={FORMS.map((f) => ({ name: f.name, slug: f.slug, mode: f.mode }))}
			/>

			<Observation
				label="THE ORDER MATTERS"
				text="Read forwards, the library is a catalogue of thirty-five things you did not ask for. Read backwards — failure, then the form that closes it — every one of them looks inevitable. That is not a rhetorical trick; it is the actual order they were built in, which is why the manifest records where each form came from and refuses to guess where it does not know."
			/>

			<Connection
				text="What the answers look like when they are in your hands."
				links={[
					{ href: "/forms", label: "THE HOLDINGS — EVERY FORM" },
					{ href: "/ask", label: "ASK HAUSE" },
					{ href: "/use", label: "USE HAUSE" },
				]}
			/>
		</main>
	);
}

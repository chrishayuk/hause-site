import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@chrishayuk/hause/components/forms/Hero";
import { Observation } from "@chrishayuk/hause/components/forms/Observation";
import { Answer } from "@chrishayuk/hause/components/forms/Answer";
import { Comparison } from "@chrishayuk/hause/components/forms/Comparison";
import { Refusal } from "@chrishayuk/hause/components/forms/Refusal";
import { Connection } from "@chrishayuk/hause/components/forms/Connection";
import { JsonLd } from "@chrishayuk/hause/components/JsonLd";
import { breadcrumbLd } from "@chrishayuk/hause/seo";
import { formCount } from "@chrishayuk/hause/manifest";
import { GRAMMAR, grammarCoverage } from "@/data/grammar";
import { formSlug } from "@/data/forms";
import { FormJourney } from "@/components/FormJourney";
import type { SelectionQuery } from "@/data/selection";

export const metadata: Metadata = {
	title: "Choosing a Form: The HAUSE Selection Grammar",
	alternates: { canonical: "/choosing" },
	description:
		"Choose a HAUSE form from the communicative act: assert, support, compare, explain, perform, move on, or decline to answer.",
};

/**
 * THE GRAMMAR, NOT THE CATALOGUE.
 *
 * The holdings answer "what exists". This page answers the question a
 * writer — or a model — actually has, which is "what am I doing?".
 * Thirty-five forms is enough that choosing is itself the design
 * problem, and the hard part is never finding the right form: it is
 * telling two nearly-right forms apart. So every act carries the test
 * that decides it, and the neighbour it gets confused with.
 */
export default async function ChoosingPage({ searchParams }: { searchParams: Promise<SelectionQuery> }) {
	const { missing } = grammarCoverage();
	const query = await searchParams;

	return (
		<main className="system-story journey-page">
			<JsonLd
				data={breadcrumbLd([
					{ name: "HAUSE", url: "https://hause.design" },
					{ name: "Choosing a form", url: "https://hause.design/choosing" },
				])}
			/>

			<Hero
				kicker="THE SELECTION GRAMMAR"
				title="WHAT ARE YOU DOING?"
				dek="Start with what you need to communicate. Find the distinction that matters. Then see the form do its work."
			/>

			<FormJourney query={query} />
			<details className="grammar-reference" id="complete-grammar">
			<summary className="voice-editorial">The complete selection grammar <span className="voice-evidence">{formCount()} ACTS / OPEN THE REFERENCE</span></summary>
			<Answer
				id="how-do-i-choose-a-form"
				question="How do I choose which HAUSE form to use?"
				answer={`Start from the act, not the shape. Are you asserting something, showing what holds it up, declining to assert, taking an object apart, showing something happen, or moving the reader on? Each act selects a form, and each form carries the test that tells it from its neighbour — a Claim owes evidence where a Statement carries the room; Evidence shows receipts where Agreement shows independent authorities agreeing. All ${formCount()} forms are reachable this way, or the build fails.`}
			/>

			{GRAMMAR.map((intent) => (
				<section key={intent.id} className="hause-grid py-10 sm:py-14" aria-label={intent.label}>
					<div className="col-span-12 md:col-start-2 md:col-span-10">
						<p className="voice-evidence text-xs tracking-[0.14em] uppercase mb-2 opacity-50">{intent.label}</p>
						<p className="voice-system text-sm opacity-60 max-w-2xl mb-8">{intent.line}</p>
						<div className="flex flex-col">
							{intent.acts.map((act) => (
								<div
									key={act.form}
									className="grid grid-cols-1 sm:grid-cols-[minmax(0,18rem)_1fr] gap-2 sm:gap-8 py-4 border-t"
									style={{ borderColor: "var(--color-mist)" }}
								>
									<div>
										<p className="voice-system text-base leading-snug m-0">{act.doing}</p>
										<Link
											href={`/forms/${formSlug(act.form)}`}
											className="voice-evidence text-sm mt-1 inline-block"
											style={{ color: "var(--color-accent)" }}
										>
											→ {act.form}
										</Link>
									</div>
									<div>
										<p className="voice-evidence text-[12px] sm:text-[13px] opacity-70 leading-relaxed m-0">{act.test}</p>
										{act.insteadOf?.map((n) => (
											<p key={n.form} className="voice-evidence text-[11px] opacity-40 leading-relaxed m-0 mt-1.5">
												{n.form.toUpperCase()} INSTEAD — {n.when}
											</p>
										))}
									</div>
								</div>
							))}
							<div className="border-t" style={{ borderColor: "var(--color-mist)" }} />
						</div>
					</div>
				</section>
			))}

			</details>
			<Observation
				label="THE HARD PART IS NEVER FINDING THE FORM"
				text="It is telling two nearly-right forms apart, and the two hardest live one rung from each other: Comparison and Transformation take identical props and differ only in who sets the pace. That is not an accident of the catalogue — it is the one distinction the whole three-mode split turns on, so it is worth seeing rather than reading."
			/>

			<Comparison
				kicker="IDENTICAL PROPS — ONE DISTINCTION"
				objectLabel="the same two states of one object, offered two ways"
				blockLabels={["WHO SETS THE PACE", "WHAT THE READER DOES", "THE RESTING STATE", "WHEN IT IS WRONG"]}
				left={{
					label: "COMPARISON — AN INSTRUMENT",
					properties: [
						"The reader, with their hand",
						"Drags between the interpretations",
						"Wherever they left it",
						"When the change is temporal, and they are being carried",
					],
				}}
				right={{
					label: "TRANSFORMATION — A PERFORMANCE",
					properties: [
						"The author, at the hause stagger",
						"Watches a staged swap, never a crossfade",
						"Designed, and carrying the whole point",
						"When the reader is studying rather than being led",
					],
				}}
			/>

			<Refusal
				kicker="WHEN NOTHING HERE IS THE ACT YOU ARE MAKING"
				title="NO FORM ESTABLISHED"
				lines={[
					"requested    a semantic act the library does not hold",
					`available    ${formCount()} acts, each reachable from what you are doing`,
				]}
				principle="Build it in the page that needs it. It earns the library on the third rung, when a second exhibition needs the same act."
			/>

			{missing.length > 0 && (
				<Observation label="COVERAGE GAP" text={`The grammar does not name: ${missing.join(", ")}.`} />
			)}

			<Connection
				text="The catalogue, the failures that produced it, and the system answering in its own forms."
				links={[
					{ href: "/forms", label: "THE HOLDINGS — WHAT EXISTS" },
					{ href: "/problems", label: "THE PROBLEMS — WHY IT EXISTS" },
					{ href: "/ask", label: "ASK — BRING AN IDEA" },
				]}
			/>
		</main>
	);
}

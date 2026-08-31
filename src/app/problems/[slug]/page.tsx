import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Hero } from "@chrishayuk/hause/components/forms/Hero";
import { Statement } from "@chrishayuk/hause/components/forms/Statement";
import { Observation } from "@chrishayuk/hause/components/forms/Observation";
import { Answer } from "@chrishayuk/hause/components/forms/Answer";
import { Connection } from "@chrishayuk/hause/components/forms/Connection";
import { Provenance } from "@chrishayuk/hause/components/forms/Provenance";
import { Citation } from "@chrishayuk/hause/components/forms/Citation";
import { JsonLd } from "@chrishayuk/hause/components/JsonLd";
import { breadcrumbLd, citationLd, qaLd } from "@chrishayuk/hause/seo";
import { PROBLEMS, problemBySlug, problemCiteMeta, problemRecord } from "@/data/problems";
import { DEMOS } from "@/problems/demos";
import { formSlug } from "@/data/forms";

export function generateStaticParams() {
	return PROBLEMS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const problem = problemBySlug((await params).slug);
	if (!problem) return {};
	return {
		title: problem.question,
		alternates: { canonical: `/problems/${problem.slug}` },
		description: problem.answer.slice(0, 200),
		other: problemCiteMeta(problem),
	};
}

/**
 * A PROBLEM, AS A CHAPTER.
 *
 * The shape is the one the vindex3 exhibition uses: the wound first —
 * what breaks, how it is actually met, and why the obvious fixes do not
 * hold — then the answer, demonstrated by the forms themselves rather
 * than described. The page ends where every published argument on this
 * site ends: its provenance, and a reference anyone can copy.
 */
export default async function ProblemPage({ params }: { params: Promise<{ slug: string }> }) {
	const problem = problemBySlug((await params).slug);
	if (!problem) notFound();

	const record = problemRecord(problem);
	const Demo = DEMOS[problem.slug];

	return (
		<main>
			<JsonLd data={citationLd(record)} />
			<JsonLd data={qaLd({ question: problem.question, answer: problem.answer, url: record.url })} />
			<JsonLd
				data={breadcrumbLd([
					{ name: "HAUSE", url: "https://hause.design" },
					{ name: "The problems", url: "https://hause.design/problems" },
					{ name: problem.title, url: record.url },
				])}
			/>

			<Hero kicker={`THE PROBLEMS · ${problem.number}`} title={problem.title} dek={problem.dek} />

			<Answer id="the-answer" question={problem.question} answer={problem.answer} />

			<Observation label="HOW YOU MEET IT" text={problem.symptom} />

			<Statement text={problem.statement} />

			<Observation label="WHY IT HAPPENS" text={problem.cause} />

			<Demo />

			<Connection
				text="The forms that answer it — each with its own page, its own specimen, and the account the library gives of it."
				links={[
					...problem.answers.map((name) => ({ href: `/forms/${formSlug(name)}`, label: name.toUpperCase() })),
					{ href: "/problems", label: "THE OTHER PROBLEMS" },
				]}
			/>

			<Provenance record={record} citeHref="#cite" />
			<Citation
				record={record}
				note="An argument is a published object: dated, versioned, and referenceable — which is the subject of one of these pages and the practice of all of them."
			/>
		</main>
	);
}

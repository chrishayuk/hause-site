import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Answer } from "@chrishayuk/hause/components/forms/Answer";
import { Provenance } from "@chrishayuk/hause/components/forms/Provenance";
import { Citation } from "@chrishayuk/hause/components/forms/Citation";
import { JsonLd } from "@chrishayuk/hause/components/JsonLd";
import { breadcrumbLd, citationLd, qaLd } from "@chrishayuk/hause/seo";
import { PROBLEMS, PROBLEMS_IN_ORDER, problemBySlug, problemCiteMeta, problemRecord } from "@/data/problems";
import { ProblemScene, problemSceneCopy } from "@/problems/scenes";
import { DEMOS } from "@/problems/demos";
import { FORMS, formSlug } from "@/data/forms";

export function generateStaticParams() {
	return PROBLEMS.map((p) => ({ slug: p.slug }));
}

function compactDescription(text: string, limit = 155) {
	if (text.length <= limit) return text;
	const clipped = text.slice(0, limit - 1);
	return `${clipped.slice(0, clipped.lastIndexOf(" "))}…`;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const problem = problemBySlug((await params).slug);
	if (!problem) return {};
	return {
		title: problem.question,
		alternates: { canonical: `/problems/${problem.slug}` },
		description: compactDescription(problem.dek),
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
	const [arrival, conflict, resolution] = problemSceneCopy(problem);
	const index = PROBLEMS_IN_ORDER.findIndex(p => p.slug === problem.slug);
	const next = PROBLEMS_IN_ORDER[(index + 1) % PROBLEMS_IN_ORDER.length];

	return (
		<main className="problem-chapter system-story">
			<JsonLd data={citationLd(record)} />
			<JsonLd data={qaLd({ question: problem.question, answer: problem.answer, url: record.url })} />
			<JsonLd
				data={breadcrumbLd([
					{ name: "HAUSE", url: "https://hause.design" },
					{ name: "The problems", url: "https://hause.design/problems" },
					{ name: problem.title, url: record.url },
				])}
			/>

			<section className="problem-opening" aria-labelledby="problem-title">
				<nav className="problem-breadcrumb voice-evidence" aria-label="Chapter"><Link href="/problems">← WHY HAUSE</Link><span>PROBLEM {problem.number} / {String(PROBLEMS.length).padStart(2, "0")}</span></nav>
				<div className="problem-opening-copy"><p className="voice-evidence">{problem.title}</p><h1 id="problem-title" className="voice-editorial">{arrival}<br /><em>{conflict}</em></h1><p className="voice-system">{problem.dek}</p></div>
				<ProblemScene problem={problem} />
				<nav className="problem-chapter-nav voice-evidence" aria-label="In this chapter"><a href="#the-answer">THE ANSWER ↓</a><a href="#demonstration">OPERATE THE RESPONSE ↓</a><a href="#why-it-happens">THE CAUSE ↓</a></nav>
			</section>
			<div className="problem-direct-answer"><Answer id="the-answer" question={problem.question} answer={problem.answer} /></div>
			<section className="problem-encounter" aria-labelledby="encounter-title"><div><p className="voice-evidence">01 / HOW YOU MEET IT</p><h2 id="encounter-title" className="voice-editorial">{problem.statement}</h2></div><p className="voice-system">{problem.symptom}</p></section>
			<section id="demonstration" className="problem-demonstration" aria-labelledby="demonstration-title"><header><p className="voice-evidence">02 / THE RESPONSE, IN YOUR HANDS</p><h2 id="demonstration-title" className="voice-editorial">{resolution}</h2><p className="voice-system">Explore the forms below. This is the response implemented in HAUSE.</p></header><div className="problem-demo-surface"><Demo /></div></section>
			<section id="why-it-happens" className="problem-cause" aria-labelledby="cause-title"><p className="voice-evidence">03 / BENEATH THE SURFACE</p><h2 id="cause-title" className="voice-editorial">Why the failure keeps returning.</h2><p className="voice-system">{problem.cause}</p></section>
			<section className="problem-form-exits" aria-labelledby="form-exits-title"><p className="voice-evidence">TAKE THE RESPONSE WITH YOU</p><h2 id="form-exits-title" className="voice-editorial">Give it a form.</h2><div>{problem.answers.map(name => <Link key={name} href={`/forms/${formSlug(name)}`}><h3 className="voice-editorial">{name} <span aria-hidden="true">↗</span></h3><p className="voice-system">{FORMS.find(form => form.name === name)?.line}</p></Link>)}</div></section>
			<nav className="problem-next" aria-label="Next problem"><Link href={`/problems/${next.slug}`}><span className="voice-evidence">NEXT ROOM / {next.number}</span><span className="voice-editorial">{next.title}</span><span aria-hidden="true">→</span></Link><Link className="story-link" href="/problems">ALL {PROBLEMS.length} PROBLEMS ↗</Link></nav>

			<Provenance record={record} citeHref="#cite" />
			<Citation
				record={record}
				note="An argument is a published object: dated, versioned, and referenceable — which is the subject of one of these pages and the practice of all of them."
			/>
		</main>
	);
}

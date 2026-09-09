import type { Metadata } from "next";
import Link from "next/link";
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
		"Eight recurring failures in AI interfaces, from card-shaped answers and hidden uncertainty to uncitable pages and documentation drift.",
};

/**
 * The front door for readers who have not met the library yet. A form
 * is easier to believe backwards: nobody needs a Refusal until they
 * have watched a system guess rather than say no.
 */
export default function ProblemsPage() {
	return (
		<main className="why-story system-story">
			<JsonLd
				data={breadcrumbLd([
					{ name: "HAUSE", url: "https://hause.design" },
					{ name: "The problems", url: "https://hause.design/problems" },
				])}
			/>

			<section className="why-hero">
				<div className="why-hero-ghost" aria-hidden="true">WHY</div>
				<div className="why-hero-top voice-evidence">
					<span>THE PROBLEMS · ROOM 01</span>
					<span>{PROBLEMS.length} FAILURES · {formCount()} CONSEQUENCES</span>
				</div>
				<div className="why-hero-copy">
					<p className="voice-evidence">THE ARGUMENT BEGINS BACKWARDS</p>
					<h1 className="voice-editorial">Every form begins with a <em>failure.</em></h1>
					<p className="voice-system">HAUSE was not a taxonomy waiting to be filled. It is what remained after an interface could not refuse, a page could not be read, and an idea could not be cited.</p>
				</div>
				<a className="why-hero-enter voice-evidence" href="#the-failures">ENTER THE FAILURES <span aria-hidden="true">↓</span></a>
				<div className="why-hero-beam" aria-hidden="true"><i /><i /><i /></div>
			</section>

			<section className="why-prologue" aria-labelledby="why-prologue-title">
				<div className="why-prologue-copy">
					<p className="voice-evidence">THE SYMPTOM</p>
					<h2 id="why-prologue-title" className="voice-editorial">Different meanings.<br /><em>One shape.</em></h2>
					<p className="voice-system">A comparison, a measurement, a refusal and a question enter the interface. The vocabulary calls every one of them a card.</p>
				</div>
				<div className="why-card-installation" aria-label="Four identical cards containing different semantic acts">
					{["CLAIM", "EVIDENCE", "QUESTION", "REFUSAL"].map((act, index) => (
						<div className="why-empty-card" key={act}>
							<span className="voice-evidence">0{index + 1}</span>
							<strong className="voice-system">{act}</strong>
							<small className="voice-evidence">CARD</small>
						</div>
					))}
				</div>
				<p className="why-prologue-verdict voice-editorial">The content changed.<br />The grammar did not.</p>
			</section>

			<div className="why-answer">
				<Answer
					id="what-problems-does-hause-solve"
					question="What problems does HAUSE actually solve?"
					answer={`${spell(PROBLEMS.length).charAt(0).toUpperCase()}${spell(PROBLEMS.length).slice(1)}, so far: ${PROBLEMS_IN_ORDER.map((p) => p.title.toLowerCase()).join("; ")}. Each one is a failure with a form behind it — the ${formCount()} forms in the library are what answering them looked like.`}
				/>
			</div>

			<section id="the-failures" className="why-corridor" aria-labelledby="failures-title">
				<header className="why-corridor-heading">
					<p className="voice-evidence">THE CORRIDOR · SELECT A FAILURE</p>
					<h2 id="failures-title" className="voice-editorial">Eight moments where the interface loses the meaning.</h2>
				</header>
				<div className="why-failure-sequence">
					{PROBLEMS_IN_ORDER.map((p) => (
						<Link key={p.slug} href={`/problems/${p.slug}`} className="why-failure">
							<span className="why-failure-number voice-editorial">{p.number}</span>
							<div className="why-failure-copy">
								<p className="voice-evidence">FAILURE {p.number} · {p.answers.length} FORMS ANSWER</p>
								<h3 className="voice-editorial">{p.title}</h3>
								<p className="voice-system">{p.statement}</p>
							</div>
							<div className="why-failure-answers voice-evidence" aria-label="Forms that answer this failure">
								{p.answers.map((answer) => <span key={answer}>{answer}</span>)}
							</div>
							<span className="why-failure-open voice-evidence">ENTER →</span>
						</Link>
					))}
				</div>
			</section>

			<section className="why-turn" aria-label="The conclusion">
				<p className="voice-evidence">THE TURN</p>
				<p className="voice-editorial">A form that arrives without a failure behind it is a Card wearing a costume.</p>
				<div aria-hidden="true"><span>FAILURE</span><i>→</i><span>ACT</span><i>→</i><span>FORM</span></div>
			</section>

			<Statement text="The vocabulary is not the beginning of HAUSE. It is the evidence left by problems being solved." />

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

import type { Metadata } from "next";
import Link from "next/link";
import { Answer } from "@chrishayuk/hause/components/forms/Answer";
import { JsonLd } from "@chrishayuk/hause/components/JsonLd";
import { breadcrumbLd } from "@chrishayuk/hause/seo";
import { PROBLEMS, PROBLEMS_IN_ORDER } from "@/data/problems";
import { FORMS } from "@/data/forms";
import { ProblemMap } from "@/components/ProblemMap";
import { MeaningRestoration } from "@/components/MeaningRestoration";

export const metadata: Metadata = {
  title: "What AI Interfaces Get Wrong: The Problems HAUSE Answers",
  alternates: { canonical: "/problems" },
  description: "Eight recurring failures in AI interfaces, from hidden uncertainty to uncitable pages and documentation drift.",
};
export default function ProblemsPage() {
  return <main className="system-story catalogue-edition">
    <JsonLd data={breadcrumbLd([{ name: "HAUSE", url: "https://hause.design" }, { name: "The problems", url: "https://hause.design/problems" }])}/>
    <header className="catalogue-intro">
      <p className="catalogue-caption">Why HAUSE</p>
      <h1>Make the meaning clear.</h1>
      <p>A plan, a measurement and an unsupported answer need different treatment. HAUSE gives those differences a visible structure.</p>
      <nav aria-label="Explore the problems"><a href="#restore-title">Try an example</a><a href="#the-failures">Browse {PROBLEMS.length} problems</a></nav>
    </header>
    <MeaningRestoration/>
    <section id="the-failures" className="catalogue-group" aria-labelledby="failures-title">
      <header><div><h2 id="failures-title">The problems behind the forms</h2><p>Each chapter starts with a specific interface problem and shows how a form addresses it.</p></div></header>
      <div className="catalogue-problems">{PROBLEMS_IN_ORDER.map(problem => <article key={problem.slug}>
        <span className="catalogue-caption">{problem.number}</span>
        <div><h3><Link href={`/problems/${problem.slug}`}>{problem.title}</Link></h3><p>{problem.statement}</p><p className="catalogue-caption">Forms: {problem.answers.join(" · ")}</p></div>
      </article>)}</div>
    </section>
    <details className="catalogue-demonstration"><summary>Explore the connections between problems and forms</summary><ProblemMap problems={PROBLEMS_IN_ORDER.map(p => ({ slug: p.slug, number: p.number, title: p.title, answers: p.answers }))} forms={FORMS.map(f => ({ name: f.name, slug: f.slug, mode: f.mode }))}/></details>
    <details className="catalogue-demonstration"><summary>What problems does HAUSE address?</summary><Answer id="what-problems-does-hause-solve" question="What problems does HAUSE actually solve?" answer={PROBLEMS_IN_ORDER.map(p => p.title).join("; ") + ". Each chapter documents the problem and the forms used to address it."}/></details>
    <section className="catalogue-closing"><p>Choose a form by what the interface needs to communicate.</p><Link href="/forms">Browse the collection</Link><Link href="/use">Build with HAUSE</Link></section>
  </main>;
}

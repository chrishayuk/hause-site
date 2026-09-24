import type { Metadata } from "next";
import Link from "next/link";
import { formCount, formsByMode, MODES, type FormMode } from "@chrishayuk/hause/manifest";
import { formSlug } from "@/data/forms";
import { CollectionEncounter } from "@/components/CollectionEncounter";

export const metadata: Metadata = {
  title: `${formCount()} Semantic Forms for AI Interfaces`,
  alternates: { canonical: "/forms" },
  description: `${formCount()} forms for AI interfaces, arranged as Statements, Instruments and Performances.`,
};
const modes: Record<FormMode, { title: string; href: string; description: string }> = {
  statement: { title: "Statements", href: "/statements", description: "Claims, observations, evidence and questions. Forms for the reader to read." },
  instrument: { title: "Instruments", href: "/instruments", description: "Comparisons, lenses and structures. Forms the reader can operate." },
  performance: { title: "Performances", href: "/performances", description: "Transformation, procession and magnitude. Forms that use sequence and movement." },
};
export default function FormsPage() {
  return <main className="system-story catalogue-edition">
    <header className="catalogue-intro">
      <p className="catalogue-caption">The collection · {formCount()} forms</p>
      <h1>Forms for what you need to say.</h1>
      <p>Start with the job of the interface: state a claim, examine an alternative, or show a change.</p>
      <nav aria-label="Form collections">{MODES.map(mode => <a href={`#${mode}s`} key={mode}>{modes[mode].title} <span>{formsByMode(mode).length}</span></a>)}</nav>
    </header>
    <details className="catalogue-demonstration"><summary>Try the three modes</summary><CollectionEncounter/></details>
    {MODES.map(mode => <section id={`${mode}s`} key={mode} className="catalogue-group" aria-labelledby={`${mode}-title`}>
      <header><div><h2 id={`${mode}-title`}>{modes[mode].title}</h2><p>{modes[mode].description}</p></div><Link href={modes[mode].href}>Explore {modes[mode].title.toLowerCase()}</Link></header>
      <div className="catalogue-forms">{formsByMode(mode).map(form => <article key={form.name}>
        <h3><Link href={`/forms/${formSlug(form.name)}`}>{form.name}</Link></h3>
        <p>{form.line}</p>
        <p className="catalogue-caption">{form.exhibited ? "Example available" : "In the library · example pending"}<br/>{form.origin ? `${form.origin}${form.date ? ` · ${form.date}` : ""}` : "Origin unrecorded"}</p>
      </article>)}</div>
    </section>)}
    <section className="catalogue-closing"><p>The collection is derived from the library manifest. Availability and recorded origins are shown for each form.</p><Link href="/use">Build with HAUSE</Link></section>
  </main>;
}

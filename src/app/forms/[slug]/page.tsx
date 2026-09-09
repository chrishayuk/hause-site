import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Answer } from "@chrishayuk/hause/components/forms/Answer";
import { Refusal } from "@chrishayuk/hause/components/forms/Refusal";
import { Snippet } from "@chrishayuk/hause/components/forms/Snippet";
import { Provenance } from "@chrishayuk/hause/components/forms/Provenance";
import { Citation } from "@chrishayuk/hause/components/forms/Citation";
import { JsonLd } from "@chrishayuk/hause/components/JsonLd";
import { breadcrumbLd, citationLd } from "@chrishayuk/hause/seo";
import { FORMS, MODE_DISCIPLINE, MODE_LABEL, MODE_ROOM, formAnswer, formBySlug, formBody, formRecord, formCiteMeta, formSlug } from "@/data/forms";
import { specimenFor } from "@/specimens";
import { problemsForForm } from "@/data/problems";
import { actFor, intentFor } from "@/data/grammar";
import { FormStudy } from "@/studies";

export function generateStaticParams() {
  return FORMS.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const form = formBySlug((await params).slug);
  if (!form) return {};
  return { title: `${form.name} Form`, alternates: { canonical: `/forms/${form.slug}` }, description: form.line, other: formCiteMeta(form) };
}

/** The specimen is the first encounter; the source-backed record follows it. */
export default async function FormPage({ params }: { params: Promise<{ slug: string }> }) {
  const form = formBySlug((await params).slug);
  if (!form) notFound();
  const record = formRecord(form);
  const Specimen = specimenFor(form.name);
  const room = MODE_ROOM[form.mode];
  const act = actFor(form.name);
  const intent = intentFor(form.name);
  const solves = problemsForForm(form.name);
  const neighbours = [...new Set([...(act?.insteadOf?.map(n => n.form) ?? []), ...form.mentions])].filter(name => name !== form.name);
  const modeForms = FORMS.filter(item => item.mode === form.mode);
  const next = modeForms[(modeForms.findIndex(item => item.name === form.name) + 1) % modeForms.length];
  const Name = form.name === "Hero" ? "p" : "h1";

  return (
    <main className={`form-detail form-detail--${form.mode} system-story`}>
      <JsonLd data={citationLd(record)} />
      <JsonLd data={breadcrumbLd([{ name: "HAUSE", url: "https://hause.design" }, { name: "The holdings", url: "https://hause.design/forms" }, { name: form.name, url: record.url }])} />
      <header className="form-arrival">
        <nav className="voice-evidence" aria-label="Breadcrumb"><Link href="/forms">FORMS</Link><span>/</span><Link href={room.href}>{form.mode.toUpperCase()}S</Link><span>/ {String(FORMS.indexOf(form) + 1).padStart(2, "0")}</span></nav>
        <div className="form-name-fit" style={{ "--name-characters": form.name.length } as CSSProperties}><Name className="voice-editorial form-name">{form.name}</Name></div>
        <div className="form-arrival-foot"><p className="voice-system">{form.line}</p><a href="#inspect" className="voice-evidence">{form.mode === "performance" ? "WATCH THE FORM" : form.mode === "instrument" ? "OPERATE THE FORM" : "MEET THE FORM"} ↓</a></div>
      </header>
      <section id="inspect" className="form-exhibition" aria-label={`${form.name} specimen`}>
        <div className="form-room-label voice-evidence"><span>01 / THE ENCOUNTER</span><span>{MODE_LABEL[form.mode]}</span></div>
        <FormStudy form={form} />
        {form.name !== "Hero" && <details className="form-library-specimen"><summary className="voice-evidence">INSPECT THE REUSABLE LIBRARY COMPONENT</summary><div className="form-specimen">{Specimen ? <Specimen /> : <Refusal kicker="THE BOOK REFUSES TO FAKE ONE" title="HELD · NOT YET EXHIBITED" lines={[`requested    a ${form.name} specimen`, `available    the form itself, in ${form.file}`]} principle="A form without a real subject is shown as held—not as an empty frame." />}</div></details>}
        <nav className="form-exhibition-exits voice-evidence" aria-label="Explore this form"><a href="#learn">WHY THIS FORM ↓</a><a href="#spec">USE IT IN REACT ↗</a><a href="#cite">CITE THE RECORD ↗</a></nav>
      </section>
      <section id="learn" className="form-purpose">
        <p className="form-room-label voice-evidence">02 / THE DECISION</p>
        <div className="form-purpose-grid"><h2 className="voice-editorial">{act ? <>An act.<br />Not a container.</> : <>A form with<br />a purpose.</>}</h2><div><p className="voice-evidence form-eyebrow">{intent?.label ?? "WHAT THIS FORM DOES"}</p><p className="voice-system form-doing">{act?.doing ?? form.line}{act ? "." : ""}</p>{act && <p className="voice-system">{act.test}</p>}<Link href="/choosing" className="form-text-link voice-evidence">EXPLORE THE SELECTION GRAMMAR ↗</Link></div></div>
        {act?.insteadOf?.length ? <div className="form-alternatives">{act.insteadOf.map(item => <Link key={item.form} href={`/forms/${formSlug(item.form)}`}><span className="voice-evidence">WHEN THE ACT CHANGES</span><h3 className="voice-editorial">{item.form} <span aria-hidden="true">↗</span></h3><p className="voice-system">Use {item.form} instead when {item.when}.</p></Link>)}</div> : null}
      </section>
      <div className="form-definition"><Answer id={`what-is-the-${form.slug}-form`} question={`What is the ${form.name} form in HAUSE, and when do you use it?`} answer={formAnswer(form)} cite={form.origin ? `origin — ${form.origin}${form.date ? ` · ${form.date}` : ""}` : undefined} /></div>
      <section className="form-source-room" aria-labelledby="source-heading">
        <div><p className="voice-evidence form-eyebrow">THE LIBRARY’S OWN ACCOUNT</p><h2 id="source-heading" className="voice-editorial">Behind the form.</h2><p className="voice-evidence form-source-file">{form.file}</p></div>
        <div>{formBody(form).map((paragraph, i) => <p className="voice-system" key={i}>{paragraph}</p>)}<details><summary className="voice-evidence">THE {form.mode.toUpperCase()}’S DISCIPLINE</summary><p className="voice-system">{MODE_DISCIPLINE[form.mode]}</p></details></div>
      </section>
      <section id="spec" className="form-build-room">
        <div className="form-room-label voice-evidence"><span>03 / MAKE SOMETHING</span><Link href="/use">INSTALL HAUSE ↗</Link></div>
        <h2 className="voice-editorial">Give it your subject.</h2>
        <p className="voice-system">{form.name === "Hero" ? "The Hero above is the real library component." : "The opening study is an authored demonstration, not an additional component API. Expand the library specimen above to inspect the reusable form."} Its props below come directly from the source.</p>
        <Snippet label={`REACT · ${form.name}`} code={`import { ${form.name} } from "@chrishayuk/hause/components/forms/${form.name}";\n\n${form.api}`} aside="The import and the complete props contract. For installation and composition, follow the Build guide." />
      </section>
      {(solves.length > 0 || form.origin || form.reusedBy?.length) && <section className="form-context-room"><p className="voice-evidence form-eyebrow">NOT INVENTED IN ISOLATION</p><h2 className="voice-editorial">A page needed this.</h2>{form.origin && <p className="voice-system">{form.date ? `${form.date} · ` : ""}Entered the library from {form.origin}.</p>}{form.reusedBy?.length ? <p className="voice-system">Used in {form.reusedBy.join(" and ")}. These exhibitions share an author; this is evidence of reuse, not independent adoption.</p> : null}{solves.map(problem => <Link className="form-problem-link" href={`/problems/${problem.slug}`} key={problem.slug}><span className="voice-evidence">{problem.number} / THE PROBLEM</span><span className="voice-editorial">{problem.title} ↗</span><span className="voice-system">{problem.dek}</span></Link>)}</section>}
      <nav className="form-next-room" aria-label="Continue through the forms"><p className="voice-evidence form-eyebrow">THE NEXT ENCOUNTER / {form.mode.toUpperCase()}</p><Link href={`/forms/${next.slug}`} className="form-next-name voice-editorial" style={{ "--name-characters": next.name.length } as CSSProperties}>{next.name} <span aria-hidden="true">↗</span></Link><p className="voice-system">{next.line}</p><div className="form-related voice-evidence">{neighbours.filter(name => name !== next.name).map(name => <Link key={name} href={`/forms/${formSlug(name)}`}>{name.toUpperCase()} ↗</Link>)}<Link href="/forms">ALL {FORMS.length} FORMS ↗</Link></div></nav>
      <Provenance record={record} citeHref="#cite" />
      <Citation record={record} note="The specimen, the source account and the props share one form record. Cite this page or follow its source identifier to inspect the implementation." />
    </main>
  );
}

import Link from "next/link";
import type { Metadata } from "next";
import { Answer } from "@chrishayuk/hause/components/forms/Answer";
import { Provenance } from "@chrishayuk/hause/components/forms/Provenance";
import { Citation } from "@chrishayuk/hause/components/forms/Citation";
import { JsonLd } from "@chrishayuk/hause/components/JsonLd";
import { citationLd } from "@chrishayuk/hause/seo";
import { citationMeta } from "@chrishayuk/hause/cite";
import { formCount } from "@chrishayuk/hause/manifest";
import { HAUSE_RECORD, HAUSE_HISTORY } from "@/data/citation";
import { HomepageHero } from "@/components/HomepageHero";
import { ActDemo } from "@/components/ActDemo";
import { HomepageProof } from "@/components/HomepageProof";
import "./home-edition.css";

export const metadata: Metadata = {
  title: "HAUSE — Semantic forms for AI interfaces",
  description: `HAUSE gives AI interfaces ${formCount()} forms for claims, evidence, comparisons, refusals and more.`,
  other: citationMeta(HAUSE_RECORD),
};

const collection = [
  { title: "Statements", href: "/statements", description: "Give a reader something to consider.", forms: [{ name: "Claim", slug: "claim" }, { name: "Evidence", slug: "evidence" }, { name: "Refusal", slug: "refusal" }] },
  { title: "Instruments", href: "/instruments", description: "Let a reader examine the alternatives.", forms: [{ name: "Comparison", slug: "comparison" }, { name: "Lens", slug: "lens" }, { name: "Variants", slug: "variants" }] },
  { title: "Performances", href: "/performances", description: "Show how something unfolds.", forms: [{ name: "Film", slug: "film" }, { name: "Unfolding", slug: "unfolding" }, { name: "Transformation", slug: "transformation" }] },
];

export default function Home() {
  return <main className="system-story hause-home">
    <HomepageHero/>
    <ActDemo/>
    <section id="collection" className="hause-home-collection" aria-labelledby="collection-title">
      <div className="hause-home-heading"><h2 id="collection-title">The collection</h2><Link href="/forms">All {formCount()} forms</Link></div>
      <div className="hause-home-families">{collection.map(family => <article key={family.title}>
        <h3><Link href={family.href}>{family.title}</Link></h3><p>{family.description}</p>
        <ul>{family.forms.map(form => <li key={form.slug}><Link href={`/forms/${form.slug}`}>{form.name}</Link></li>)}</ul>
      </article>)}</div>
    </section>
    <section id="difference" className="hause-home-note" aria-labelledby="difference-title">
      <h2 id="difference-title">The choice before the component.</h2>
      <div><p>A claim needs a status. Evidence needs a source. A refusal needs a reason.</p><p>HAUSE names those acts and gives each one a structure. Use the forms alongside your existing UI library.</p><Link href="/problems">Why the distinction matters</Link></div>
    </section>
    <HomepageProof/>
    <section className="hause-home-practice" aria-labelledby="practice-title">
      <div className="hause-home-heading"><h2 id="practice-title">In practice</h2><Link href="/in-practice">View the examples</Link></div>
      <div className="hause-home-practice-pair">
        <article><p className="hause-home-caption">Research & film</p><h3><Link href="/in-practice#chrishayuk">Chris Hay</Link></h3><p>Film, transcripts and experimental records in one publication.</p><Link href="/publication">The publication tools</Link></article>
        <article><p className="hause-home-caption">Technical explanation</p><h3><Link href="/in-practice#vindex3">VINDEX3</Link></h3><p>Comparisons and instruments for inspecting model representation and execution.</p><Link href="/in-practice#vindex3">The VINDEX3 study</Link></article>
      </div>
      <p className="hause-home-caption">Both sites are by Chris Hay. They document use within the practice; independent adoption is still to be established.</p>
    </section>
    <section id="origin" className="hause-home-closing" aria-labelledby="origin-title"><div><h2 id="origin-title">From an exhibition to a design system.</h2><Link href="/how-hause-grew#origin">Read the origin story</Link></div><Link href="/use">Start building</Link></section>
    <div className="hause-home-record">
      <Answer id="what-is-hause" question="What is HAUSE?" answer={`HAUSE is a semantic design system for AI-generated interfaces. Its ${formCount()} forms name communicative acts such as claims, evidence, comparisons and refusals. It works above your existing UI library, with interaction, provenance and machine-readable records carried by the forms.`}/>
      <JsonLd data={citationLd(HAUSE_RECORD)}/><Provenance record={HAUSE_RECORD} history={HAUSE_HISTORY} citeHref="#cite"/><Citation record={HAUSE_RECORD}/>
    </div>
  </main>;
}

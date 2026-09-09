import Link from "next/link";
import type {Metadata} from "next";
import {Answer} from "@chrishayuk/hause/components/forms/Answer";
import {Provenance} from "@chrishayuk/hause/components/forms/Provenance";
import {Citation} from "@chrishayuk/hause/components/forms/Citation";
import {JsonLd} from "@chrishayuk/hause/components/JsonLd";
import {citationLd} from "@chrishayuk/hause/seo";
import {citationMeta} from "@chrishayuk/hause/cite";
import {formCount} from "@chrishayuk/hause/manifest";
import {HAUSE_RECORD,HAUSE_HISTORY} from "@/data/citation";
import {HomepageHero} from "@/components/HomepageHero";
import {ActDemo} from "@/components/ActDemo";
import {HomepageProof} from "@/components/HomepageProof";
import {OriginScene} from "@/components/OriginScene";
import {PRACTICES} from "@/data/practice";
export const metadata:Metadata={
 title:"HAUSE — Semantic forms for AI interfaces",
 description:`AI should not make every meaning look the same. HAUSE gives models ${formCount()} forms for claims, evidence, comparisons, refusals and more.`,
 other:citationMeta(HAUSE_RECORD),
};
export default function Home(){return <main className="system-story">
 <HomepageHero/>
 <OriginScene includeArchive={false}/>
 <section id="difference" className="home-thesis" aria-labelledby="thesis-title">
  <p className="voice-evidence">THE CHOICE BEFORE THE COMPONENT</p>
  <h2 id="thesis-title" className="voice-editorial">Start with the act.</h2>
  <div className="home-thesis-pair"><div><p className="voice-system">Most design systems start with a container.</p><p className="voice-editorial">Card. Panel.<br/>Accordion. Modal.</p></div><div><p className="voice-system">HAUSE starts with what you mean.</p><p className="voice-editorial">Claim. Evidence.<br/>Refusal. Comparison.</p></div></div>
  <Link href="/problems/everything-becomes-a-card" className="story-link">WHY THE VOCABULARY MATTERS ↗</Link>
 </section>
 <HomepageProof/>
 <ActDemo/>
 <section className="story-practice hause-grid"><div className="col-span-12 md:col-start-2 md:col-span-10"><p className="voice-evidence">REAL PAGES SHAPED THE LIBRARY</p><h2 className="voice-editorial">Built in use.<br/><em>Still young.</em></h2><p className="voice-system practice-intro">Two authored sites have put HAUSE under different kinds of pressure. That is evidence of use, not independent adoption. The next meaningful proof is a team and subject that are not Chris Hay’s.</p>{PRACTICES.map(p=><Link href={`/in-practice#${p.id}`} className="practice-row" key={p.id}><span className="voice-evidence">{p.name}</span><div><h3 className="voice-editorial">{p.title}</h3><p className="voice-system">{p.summary}</p></div><span aria-hidden="true">↗</span></Link>)}</div></section>
 <section className="story-next hause-grid"><div className="col-span-12 md:col-start-2 md:col-span-10"><p className="voice-evidence">PICK YOUR WAY IN</p><h2 className="voice-editorial">Something to say?</h2><div className="story-next-links"><Link href="/choosing">FIND THE FORM ↗</Link><Link href="/forms">EXPLORE THE COLLECTION ↗</Link><Link href="/use">BUILD YOUR FIRST ANSWER ↗</Link><Link href="/ask">ASK HAUSE ↗</Link></div><nav className="home-deep-routes voice-evidence" aria-label="The deeper story"><Link href="/how-hause-grew#origin">THE EXHIBITION ORIGIN</Link><Link href="/publication">FILM, AEO & PROVENANCE</Link><Link href="/knowledge">THE CONNECTED RECORD</Link><Link href="/ai-native-design-systems">THE CATEGORY</Link></nav></div></section>
 <Answer id="what-is-hause" question="What is HAUSE?" answer={`HAUSE is a semantic design system for AI-generated interfaces. Its ${formCount()} forms name communicative acts such as claims, evidence, comparisons and refusals. It works above your existing UI library, with interaction, provenance and machine-readable records carried by the forms.`}/>
 <JsonLd data={citationLd(HAUSE_RECORD)}/><Provenance record={HAUSE_RECORD} history={HAUSE_HISTORY} citeHref="#cite"/><Citation record={HAUSE_RECORD}/>
 </main>;}

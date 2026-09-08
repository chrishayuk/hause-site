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
import {HomepageAsk} from "@/components/HomepageAsk";
import {ContainerVersusAct} from "@/components/ContainerVersusAct";
import {TheLoop} from "@/components/TheLoop";
import {WhatYouGet} from "@/components/WhatYouGet";
import {StartHere} from "@/components/StartHere";
import {OriginScene} from "@/components/OriginScene";
import {PRACTICES} from "@/data/practice";
export const metadata:Metadata={
 title:"HAUSE — Semantic forms for AI interfaces",
 description:`AI should not make every meaning look the same. HAUSE gives models ${formCount()} forms for claims, evidence, comparisons, refusals and more.`,
 other:citationMeta(HAUSE_RECORD),
};
export default function Home(){return <main className="system-story">
 <HomepageHero/>
 <OriginScene/>
 <ContainerVersusAct/>
 <HomepageAsk/>
 <Answer id="what-is-hause" question="What is HAUSE?" answer={`HAUSE is the semantic layer above an existing UI system. It provides ${formCount()} forms for acts such as claims, evidence, comparisons and refusals. A product keeps its own content, components and art direction; HAUSE supplies forms, interaction behaviour, citation exports and machine-readable metadata so a person and a machine can read the same meaning.`}/>
 <TheLoop/>
 <StartHere/>
 <section className="story-practice hause-grid"><div className="col-span-12 md:col-start-2 md:col-span-10"><p className="voice-evidence">REAL PAGES SHAPED THE LIBRARY</p><h2 className="voice-editorial">Built in use.<br/><em>Still young.</em></h2><p className="voice-system practice-intro">Two authored sites have put HAUSE under different kinds of pressure. That is evidence of use, not independent adoption. The next meaningful proof is a team and subject that are not Chris Hay’s.</p>{PRACTICES.map(p=><Link href={`/in-practice#${p.id}`} className="practice-row" key={p.id}><span className="voice-evidence">{p.name}</span><div><h3 className="voice-editorial">{p.title}</h3><p className="voice-system">{p.summary}</p></div><span aria-hidden="true">↗</span></Link>)}</div></section>
 <section className="story-record hause-grid"><div className="col-span-12 md:col-start-2 md:col-span-10"><p className="voice-evidence">KEEP THE SOURCE</p><h2 className="voice-editorial">The surface changes.<br/>The facts stay connected.</h2><p className="voice-system">The same record can supply the visible explanation, its citation, its structured data and the source an answer returns to. SEO, AEO and provenance travel with the forms.</p><div className="record-sequence voice-evidence"><span>RECORD</span><span>PAGE</span><span>CITATION</span><span>MACHINE DATA</span></div><Link className="story-link" href="/publication#metadata">FOLLOW THE RECORD ↗</Link></div></section>
 <WhatYouGet/>
 <section className="story-next hause-grid"><div className="col-span-12 md:col-start-2 md:col-span-10"><p className="voice-evidence">GO DEEPER</p><h2 className="voice-editorial">The useful bit first.<br/>The whole argument remains.</h2><div className="story-next-links"><Link href="/choosing">SELECTION GRAMMAR ↗</Link><Link href="/evidence">EVIDENCE & LIMITATIONS ↗</Link><Link href="/ai-native-design-systems">THE CATEGORY ↗</Link><Link href="/publication">FILM & PUBLICATION ↗</Link><Link href="/knowledge">CONNECTED RECORD ↗</Link></div></div></section>
 <JsonLd data={citationLd(HAUSE_RECORD)}/><Provenance record={HAUSE_RECORD} history={HAUSE_HISTORY} citeHref="#cite"/><Citation record={HAUSE_RECORD}/>
 </main>;}

import Link from "next/link";
import {Hero} from "@chrishayuk/hause/components/forms/Hero";
import {Answer} from "@chrishayuk/hause/components/forms/Answer";
import {Provenance} from "@chrishayuk/hause/components/forms/Provenance";
import {Citation} from "@chrishayuk/hause/components/forms/Citation";
import {JsonLd} from "@chrishayuk/hause/components/JsonLd";
import {citationLd} from "@chrishayuk/hause/seo";
import {citationMeta} from "@chrishayuk/hause/cite";
import {formCount} from "@chrishayuk/hause/manifest";
import {HAUSE_RECORD,HAUSE_HISTORY} from "@/data/citation";
import {ContainerVersusAct} from "@/components/ContainerVersusAct";
import {ActDemo} from "@/components/ActDemo";
import {TheLoop} from "@/components/TheLoop";
import {WhatYouGet} from "@/components/WhatYouGet";
import {PRACTICES} from "@/data/practice";
import film from "@/data/publication-film.json";
export const metadata={other:citationMeta(HAUSE_RECORD)};
export default function Home(){return <main className="system-story">
 <Hero kicker="HAUSE · A DESIGN SYSTEM FOR AI" title="GIVE MEANING A FORM." dek="A component vocabulary for AI-generated interfaces. Let the model choose what it is doing: making a claim, presenting evidence, comparing alternatives or refusing to assert something."/>
 <div className="story-actions hause-grid"><div className="col-span-12 md:col-start-2 md:col-span-10"><Link href="#try">TRY THE IDEA ↓</Link><Link href="/use">INSTALL HAUSE ↗</Link><Link href="/evidence">INSPECT THE EVIDENCE ↗</Link></div></div>
 <ActDemo/>
 <section className="audience-paths hause-grid" aria-label="Choose your starting point"><div className="col-span-12 md:col-start-2 md:col-span-10"><Link href="/choosing"><span className="voice-evidence">SEE THE IDEA</span><strong>Try the form chooser ↗</strong><span className="voice-system">Find the right form for what your interface needs to say.</span></Link><Link href="/use"><span className="voice-evidence">USE THE LIBRARY</span><strong>Install HAUSE ↗</strong><span className="voice-system">Add the React source, tokens and your first composition.</span></Link><Link href="/evidence"><span className="voice-evidence">TEST THE PREMISE</span><strong>Read the evaluations ↗</strong><span className="voice-system">Inspect the methods, results and unresolved questions.</span></Link></div></section>
 <Answer id="what-is-hause" question="What is HAUSE?" answer={`HAUSE is a semantic design system for AI interfaces. It provides ${formCount()} forms for acts such as claims, evidence, comparisons and refusals, alongside shared film and publication capabilities. A site supplies its content and art direction; HAUSE supplies forms, interaction behaviour, citation exports and machine-readable metadata.`}/>
 <section className="story-intro hause-grid"><div className="col-span-12 md:col-start-2 md:col-span-10"><p className="voice-evidence">01 / SAY WHAT YOU MEAN</p><h2 className="voice-editorial">Start with the act.</h2><p className="voice-system">A claim needs a different treatment from evidence. An unresolved question needs a different treatment from a refusal. Choose what the interface is doing before choosing how it looks.</p><Link href="/choosing" className="story-link">CHOOSE A FORM ↗</Link></div></section>
 <ContainerVersusAct/>
 <section className="story-film hause-grid"><div className="col-span-12 md:col-start-2 md:col-span-10"><p className="voice-evidence">02 / LET PEOPLE EXPERIENCE IT</p><h2 className="voice-editorial">Read. Operate.<br/>Watch.</h2><p className="voice-system">An explanation can be a sentence, an instrument or a performance. And when the material is a real film, its player, chapters and transcript belong to the same publication.</p><Link href="/publication" className="story-film-frame"><img src={film.poster} alt={`Film specimen: ${film.title}`} loading="lazy"/><span className="voice-evidence">ENTER THE FILM & PUBLICATION SPECIMEN ↗</span></Link><p className="voice-evidence story-caption">CHRIS HAY / REAL FILM · SHARED PLAYBACK · SOURCE CITATION</p></div></section>
 <section className="story-record hause-grid"><div className="col-span-12 md:col-start-2 md:col-span-10"><p className="voice-evidence">03 / KEEP THE SOURCE</p><h2 className="voice-editorial">The surface changes.<br/>The facts stay connected.</h2><p className="voice-system">The same record can supply the visible explanation, its citation, its structured data and the source an answer returns to. SEO, AEO and provenance travel with the forms.</p><div className="record-sequence voice-evidence"><span>RECORD</span><span>PAGE</span><span>CITATION</span><span>MACHINE DATA</span></div><Link className="story-link" href="/publication#metadata">FOLLOW THE RECORD ↗</Link></div></section>
 <section className="story-practice hause-grid"><div className="col-span-12 md:col-start-2 md:col-span-10"><p className="voice-evidence">REAL PAGES SHAPED THE LIBRARY</p>{PRACTICES.map(p=><Link href={`/in-practice#${p.id}`} className="practice-row" key={p.id}><span className="voice-evidence">{p.name}</span><div><h2 className="voice-editorial">{p.title}</h2><p className="voice-system">{p.summary}</p></div><span aria-hidden="true">↗</span></Link>)}</div></section>
 <TheLoop/>
 <WhatYouGet/>
 <section className="story-next hause-grid"><div className="col-span-12 md:col-start-2 md:col-span-10"><p className="voice-evidence">YOUR WAY IN</p><h2 className="voice-editorial">Bring an idea.<br/>Follow a connection.</h2><div className="story-next-links"><Link href="/choosing">I HAVE SOMETHING TO EXPLAIN ↗</Link><Link href="/publication">I’M BUILDING A PUBLICATION ↗</Link><Link href="/ask?q=How%20do%20film%20and%20citations%20connect%3F">SHOW ME HOW IT CONNECTS ↗</Link><Link href="/use">I’M READY TO BUILD ↗</Link></div></div></section>
 <JsonLd data={citationLd(HAUSE_RECORD)}/><Provenance record={HAUSE_RECORD} history={HAUSE_HISTORY} citeHref="#cite"/><Citation record={HAUSE_RECORD}/>
 </main>;}

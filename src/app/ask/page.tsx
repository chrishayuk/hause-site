import Link from "next/link";
import {Hero} from "@chrishayuk/hause/components/forms/Hero";
import {AskHause} from "@/components/AskHause";
import {knowledgeGraph} from "@/data/knowledge";
export const metadata={title:"Ask the connected system",alternates:{canonical:"/ask"},description:"Ask about HAUSE’s forms, film capabilities, source citations and recorded contributions. Follow each answer back to the system record."};
export default async function AskPage({searchParams}:{searchParams:Promise<{q?:string}>}){const{q=""}=await searchParams;const g=knowledgeGraph();return <main><Hero kicker="ASK HAUSE / FOLLOW THE RECORD" title="WHAT WOULD YOU LIKE TO BUILD?" dek="Choose a form. Understand a capability. Follow a contribution back to the page that needed it. Answers connect the system’s own records."/><div className="ask-map hause-grid"><div className="col-span-12 md:col-start-2 md:col-span-10"><p className="voice-evidence">{g.coverage.forms} FORMS · {g.coverage.capabilities} CAPABILITIES · {g.coverage.problems} PROBLEMS · {g.coverage.practices} PUBLICATIONS</p><Link href="/knowledge">EXPLORE THE KNOWLEDGE BASE ↗</Link></div></div><AskHause initialQuery={q.slice(0,300)}/></main>;}

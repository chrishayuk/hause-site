import Link from "next/link";
import {Hero} from "@chrishayuk/hause/components/forms/Hero";
import {publicationMetadata} from "@chrishayuk/hause/seo";
import {knowledgeGraph,searchKnowledge,relatedKnowledge} from "@/data/knowledge";
import { firstParam } from "@/data/selection";
import { GraphNeighbourhood } from "@/vendor/hause/components/exhibition/GraphNeighbourhood";
export const metadata=publicationMetadata({title:"The connected system",description:"Explore HAUSE’s forms, capabilities, problems and real-world contributions through the same records Ask uses.",url:"https://hause.design/knowledge",siteName:"HAUSE",indexable:true});
export default async function Knowledge({searchParams}:{searchParams:Promise<{q?:string|string[];kind?:string|string[];node?:string|string[]}>}){
 const params=await searchParams;const query=firstParam(params.q).slice(0,300);const types=["all","form","capability","problem","practice","page"];const requestedKind=firstParam(params.kind);const kind=types.includes(requestedKind)?requestedKind:"all";const nodes=searchKnowledge(query,kind);const g=knowledgeGraph();
 const requestedFocus=firstParam(params.node);const focus=g.nodes.find(node=>node.id===requestedFocus)??g.nodes.find(node=>node.id==="capability:film")!;
 function focusHref(id:string){const q=new URLSearchParams({node:id});if(query)q.set("q",query);if(kind!=="all")q.set("kind",kind);return `/knowledge?${q.toString()}#connections`;}
 return <main className="system-story journey-page"><Hero kicker="THE SYSTEM / ONE CONNECTED RECORD" title="NOTHING HERE STANDS ALONE." dek="A film needs playback. Playback came from a publication. The publication needed a source. Follow one thread and watch the system open around it."/>
 <section className="journey-room graph-room" id="connections" aria-label="Explore the connected records">
 <div className="graph-introduction"><p className="voice-evidence">{g.nodes.length} RECORDS / {g.edges.length} DIRECTED RELATIONSHIPS</p><p className="voice-system">Choose a starting point. Follow any neighbouring record to put it at the centre. Every relationship below is an edge in the same graph Ask reads, with its recorded basis attached.</p></div>
 <nav className="graph-starts" aria-label="Start a connection journey">{["capability:film","form:Claim","practice:vindex3","practice:chrishayuk","page:/choosing"].map(id=><Link href={focusHref(id)} key={id} aria-current={focus.id===id?"true":undefined}>{g.nodes.find(node=>node.id===id)!.title} ↗</Link>)}</nav>
 {!!requestedFocus&&requestedFocus!==focus.id&&<p role="status">That record was not found. Showing the film neighbourhood instead.</p>}
 <GraphNeighbourhood focusId={focus.id} nodes={g.nodes.map(node=>({id:node.id,title:node.title,kind:node.kind,text:node.text,href:node.url,sourceHref:node.sourceUrl,focusHref:focusHref(node.id)}))} edges={g.edges.map(edge=>({from:edge.from,to:edge.to,relation:edge.kind.replaceAll("-"," "),basis:edge.basis}))}/>
 <div className="journey-links"><a href="#record-index">SEARCH ALL RECORDS ↓</a><a href="/api/knowledge">THE SAME GRAPH AS JSON ↗</a></div>
 </section>
 <section className="knowledge-world hause-grid" id="record-index"><div className="col-span-12 md:col-start-2 md:col-span-10"><p className="voice-evidence knowledge-count">{g.coverage.forms} FORMS · {g.coverage.capabilities} CAPABILITIES · {g.coverage.problems} PROBLEMS · {g.coverage.practices} PUBLICATIONS</p>
 <form action="/knowledge#record-index" className="knowledge-search"><input type="hidden" name="node" value={focus.id}/><label htmlFor="knowledge-query">FIND SOMETHING IN THE SYSTEM</label><div><input id="knowledge-query" name="q" type="search" defaultValue={query} placeholder="Film, citations, evidence…" maxLength={300}/><select name="kind" defaultValue={kind} aria-label="Record type">{types.map(k=><option key={k} value={k}>{k==="all"?"All records":k==="practice"?"In practice":k}</option>)}</select><button>EXPLORE ↗</button></div></form>
 <p className="voice-system">This is the record behind Ask: named objects, source links and explicit relationships. The semantic form count remains separate from the supporting capabilities.</p>
 <details className="knowledge-reference" open={!!query||kind!=="all"}><summary className="voice-editorial">{nodes.length} records <span className="voice-evidence">/ OPEN THE SEARCHABLE REFERENCE</span></summary>
 <div className="knowledge-list">{nodes.map(({node:n})=><article key={n.id} id={n.id}><p className="voice-evidence">{n.kind.toUpperCase()}</p><h2 className="voice-editorial"><Link href={focusHref(n.id)}>{n.title} ↗</Link></h2><p className="voice-system">{n.text}</p><p className="voice-evidence">{relatedKnowledge(n.id).length} recorded relationships</p><div className="knowledge-actions"><Link href={focusHref(n.id)}>EXPLORE CONNECTIONS ↗</Link><Link href={n.url}>OPEN THE WORK ↗</Link><Link href={`/ask?q=${encodeURIComponent(`Tell me about ${n.title}`)}`}>ASK ABOUT THIS ↗</Link><a href={n.sourceUrl}>SOURCE RECORD ↗</a></div></article>)}</div>
 </details>
 {!nodes.length&&<p>No matching record. Try a component name or a shorter phrase.</p>}<a href="/api/knowledge" className="story-link">READ THE MACHINE-READABLE GRAPH ↗</a>
 </div></section></main>;
}

import {FORMS,formSlug} from "./forms";
import {PROBLEMS} from "./problems";
import {PUBLICATION_CAPABILITIES} from "./publication";
import {PRACTICES} from "./practice";
import {SITE_NAV} from "./navigation";
export type KnowledgeNode={id:string;kind:"form"|"problem"|"capability"|"practice"|"page";title:string;text:string;url:string;sourceUrl:string;terms?:string[]};
export type KnowledgeEdge={from:string;to:string;kind:"addresses"|"uses"|"contributed"|"originated-in"|"depends-on"|"documents"|"pairs-with";basis:string};
const ids=["motion","film","transcript","citation","metadata","environments"];
const vocabulary=[
 ["stop two videos playing at once", "autoplay","videos","playback","pause","motion","simultaneous","competing","moving","reduced motion"],
 ["video","film","youtube","poster","cinematic","screening","embed","player"],
 ["transcript","captions","chapters","timestamps","spoken","words","seek"],
 ["cite","citation","citations","bibtex","apa","csl","reference","references","provenance","sources"],
 ["seo","aeo","search","engine","engines","structured data","json ld","canonical","metadata","machine readable"],
 ["theme","dark","light","colour","color","mode","environment"],
];
export const KNOWLEDGE_NODES:KnowledgeNode[]=[
 ...FORMS.map(f=>({id:`form:${f.name}`,kind:"form" as const,title:f.name,text:`${f.line} ${f.because||""}`,url:`/forms/${f.slug}`,sourceUrl:`https://github.com/chrishayuk/hause/blob/main/manifest.ts`,terms:[f.mode]})),
 ...PROBLEMS.map(p=>({id:`problem:${p.slug}`,kind:"problem" as const,title:p.title,text:p.answer,url:`/problems/${p.slug}`,sourceUrl:`/problems/${p.slug}`})),
 ...PUBLICATION_CAPABILITIES.map((c,i)=>({id:`capability:${ids[i]}`,kind:"capability" as const,title:c.name,text:c.text,url:`/publication#${ids[i]}`,sourceUrl:"https://github.com/chrishayuk/hause/blob/main/PUBLICATION.md",terms:[...c.aliases,...vocabulary[i]]})),
 ...PRACTICES.map(p=>({id:`practice:${p.id}`,kind:"practice" as const,title:p.name,text:`${p.summary} ${p.contribution}`,url:`/in-practice#${p.id}`,sourceUrl:p.recordUrl})),
 ...SITE_NAV.map(p=>({id:`page:${p.href}`,kind:"page" as const,title:p.label,text:`Explore ${p.label} in HAUSE.`,url:p.href,sourceUrl:p.href})),
];
export const KNOWLEDGE_EDGES:KnowledgeEdge[]=[
 ...PROBLEMS.flatMap(p=>p.answers.map(f=>({from:`form:${f}`,to:`problem:${p.slug}`,kind:"addresses" as const,basis:"problem record"}))),
 ...FORMS.filter(f=>f.origin?.startsWith("vindex3")).map(f=>({from:`form:${f.name}`,to:"practice:vindex3",kind:"originated-in" as const,basis:"library manifest"})),
 ...PRACTICES.flatMap(p=>p.capabilities.map(c=>({from:`practice:${p.id}`,to:`capability:${c}`,kind:"contributed" as const,basis:"publication contribution record · 2026-09-05"}))),
 ...ids.map(id=>({from:"page:/publication",to:`capability:${id}`,kind:"documents" as const,basis:"publication record"})),
 {from:"capability:film",to:"capability:citation",kind:"pairs-with",basis:"publication specimen joins screening and its source citation"},
 {from:"capability:film",to:"capability:motion",kind:"depends-on",basis:"YouTubeFilm component contract"},
 {from:"capability:transcript",to:"capability:film",kind:"uses",basis:"chapter and transcript seeking contract"},
 {from:"capability:metadata",to:"capability:citation",kind:"uses",basis:"publicationMetadata / videoObjectLd citation input"},
 {from:"capability:citation",to:"form:Citation",kind:"uses",basis:"shared cite.ts formatters"},
];
export function knowledgeGraph(){return {version:"1.0",nodes:KNOWLEDGE_NODES,edges:KNOWLEDGE_EDGES,coverage:{forms:FORMS.length,problems:PROBLEMS.length,capabilities:ids.length,practices:PRACTICES.length}};}
export const relatedKnowledge=(id:string)=>KNOWLEDGE_EDGES.filter(e=>e.from===id||e.to===id).map(e=>({edge:e,node:KNOWLEDGE_NODES.find(n=>n.id===(e.from===id?e.to:e.from))!}));
const stop=new Set("a an the is are do does can could should would how what why which i we my our me to of in on and or for with hause use using have has want need make work works site website system support supports it its than about from does get all not without they their tell explain please connect connects connected relate related".split(" "));
const words=(s:string)=>s.toLowerCase().replace(/[^a-z0-9]+/g," ").split(/\s+/).map(t=>t.length>4&&t.endsWith("s")?t.slice(0,-1):t).filter(t=>t&&!stop.has(t));
export function searchKnowledge(query:string,kind?:string){
 const q=[...new Set(words(query))];
 return KNOWLEDGE_NODES.filter(n=>!kind||kind==="all"||n.kind===kind).map(node=>{
  const title=words(node.title),terms=words((node.terms||[]).join(" ")),body=words(node.text);
  const matched=q.filter(t=>title.includes(t)||terms.includes(t)||body.includes(t));
  const score=matched.reduce((v,t)=>v+(title.includes(t)?5:terms.includes(t)?3:1),0);
  return {node,score,matched:matched.length,total:q.length};
 }).filter(r=>!q.length||r.matched>0).sort((a,b)=>b.score-a.score||a.node.title.localeCompare(b.node.title));
}
/** Keep form selection and historical questions in their established resolvers.
 * This lookup handles implemented capabilities and the relationships between them. */
export function knowledgeAnswerNodes(question:string){
 const q=question.toLowerCase();
 if(/which form|what form|form should|form do i/.test(q))return [];
 const contribution=/chrishayuk/.test(q)&&/contribut|component|publication|brought|added/.test(q);
 if(contribution)return KNOWLEDGE_NODES.filter(n=>n.kind==="capability");
 const explicit=PUBLICATION_CAPABILITIES.map((c,i)=>({c,i})).filter(({c})=>c.aliases.some(a=>!a.includes(" ")&&q.includes(a.toLowerCase()))).map(({i})=>KNOWLEDGE_NODES.find(n=>n.id===`capability:${ids[i]}`)!);
 if(explicit.length)return explicit;
 const hits=searchKnowledge(question,"capability");
 const direct=hits.filter(h=>h.matched>=Math.min(2,h.total)&&h.score>=3).slice(0,3).map(h=>h.node);
 const neighbours=new Set(direct.flatMap(n=>relatedKnowledge(n.id).map(r=>r.node.id)));
 return [...direct,...hits.filter(h=>h.score>=3&&neighbours.has(h.node.id)&&!direct.some(n=>n.id===h.node.id)).map(h=>h.node)].slice(0,3);
}

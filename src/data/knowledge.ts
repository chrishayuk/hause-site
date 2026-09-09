import {EVALUATIONS} from "./evaluations";
import {FORMS,formSlug} from "./forms";
import {PROBLEMS,PROBLEM_ENCOUNTERS} from "./problems";
import {PUBLICATION_CAPABILITIES} from "./publication";
import {PRACTICES} from "./practice";
import {SITE_NAV} from "./navigation";
import {ROOM_PROGRAMMES,ROOM_DESCRIPTIONS} from "../rooms/programmes";
export type KnowledgeNode={id:string;kind:"form"|"problem"|"capability"|"practice"|"page";title:string;text:string;url:string;sourceUrl:string;terms?:string[]};
export type KnowledgeEdge={from:string;to:string;kind:"addresses"|"uses"|"contributed"|"originated-in"|"depends-on"|"documents"|"pairs-with";basis:string};
const ids=PUBLICATION_CAPABILITIES.map(c=>c.id);
const vocabulary=[
 ["stop two videos playing at once", "autoplay","videos","playback","pause","motion","simultaneous","competing","moving","reduced motion"],
 ["video","film","youtube","poster","cinematic","screening","embed","player"],
 ["transcript","captions","chapters","timestamps","spoken","words","seek"],
 ["cite","citation","citations","bibtex","apa","csl","reference","references","provenance","sources"],
 ["seo","aeo","search","engine","engines","structured data","json ld","canonical","metadata","machine readable"],
 ["theme","dark","light","colour","color","mode","environment"],
];
const PAGE_SUMMARIES:Record<string,string>={
 "/choosing":"Compact intent and act disclosures sit beside an actual authored form preview. Alternative acts remain one click away. The complete 35-form grammar stays server-rendered in a native reference disclosure. Choices are explicit grammar navigation, not an AI judgement about unsupplied evidence.",
 "/knowledge":"A navigable one-hop graph centres a record between incoming and outgoing relationships grouped by relation and record kind. Larger branches begin collapsed, with all edges retained in the HTML and every direction and basis intact. The same graph serves Ask, the API and searchable reference; no relationships are inferred.",
 "/in-practice":"Two source-led publication chapters pair an original VINDEX3 repository film and Chris Hay's original YouTube screening with the publishing need and recorded library contributions. The archive asset is unchanged. Both publications have one author; this is real use, not independent adoption.",
 "/statements":ROOM_DESCRIPTIONS.statement,
 "/instruments":ROOM_DESCRIPTIONS.instrument,
 "/performances":ROOM_DESCRIPTIONS.performance,
 "/forms":"A labelled conceptual workbench introduces the collection. Native choices let readers encounter Statement, operate Comparison and watch Transformation before browsing every form's authored study, reusable specimen and recorded origin. Film remains a labelled storyboard with its specimen asset absent.",
 "/problems":"An original labelled visual study shows what identical containers conceal. A native before/after restores Claim, Evidence and Refusal to the same fictional record. Eight interface failures remain linked to their chapters and answering forms.",
 "/evidence":"A source-backed exhibition of all 124 CHOOSING-1 outcomes in three conditions, the catalogue condition's two misses, and the preregistration. All five evaluation records remain linked. Scores are frozen author-led tests, not evidence of independent production adoption.",
 "/how-hause-grew":"HAUSE began as HOUSE, a cinematic visual language for ideas, systems and explanations. Real exhibitions grew it into Statements, Instruments and Performances before those forms became a selectable semantic vocabulary for AI.",
};
export const KNOWLEDGE_NODES:KnowledgeNode[]=[
 {id:"page:/",kind:"page",title:"Give meaning a form",text:"A semantic design system for AI-generated interfaces, born from exhibitions. Three labelled AI-generated visual studies explore attention, structure and passage; they are not archival photographs or real installations. Follow the shift from containers to acts, inspect the CHOOSING-1 selection result and try four forms. The complete origin archive lives on the origins page.",url:"/",sourceUrl:"/"},
 ...FORMS.map(f=>({id:`form:${f.name}`,kind:"form" as const,title:f.name,text:`${f.line} ${f.because||""}`,url:`/forms/${f.slug}`,sourceUrl:`https://github.com/chrishayuk/hause/blob/main/manifest.ts`,terms:[f.mode]})),
 ...PROBLEMS.map(p=>({id:`problem:${p.slug}`,kind:"problem" as const,title:p.title,text:`${p.answer} ${PROBLEM_ENCOUNTERS[p.slug]}`,url:`/problems/${p.slug}`,sourceUrl:`/problems/${p.slug}`})),
 ...PUBLICATION_CAPABILITIES.map((c,i)=>({id:`capability:${ids[i]}`,kind:"capability" as const,title:c.name,text:c.text,url:`/publication#${ids[i]}`,sourceUrl:"https://github.com/chrishayuk/hause/blob/main/PUBLICATION.md",terms:[...c.aliases,...(vocabulary[i]??[])]})),
 ...PRACTICES.map(p=>({id:`practice:${p.id}`,kind:"practice" as const,title:p.name,text:`${p.summary} ${p.contribution}`,url:`/in-practice#${p.id}`,sourceUrl:p.recordUrl})),
 ...SITE_NAV.map(p=>({id:`page:${p.href}`,kind:"page" as const,title:p.label,text:EVALUATIONS.find(e=>p.href===`/evals/${e.id}`)?.text||PAGE_SUMMARIES[p.href]||`Explore ${p.label} in HAUSE.`,url:p.href,sourceUrl:p.href})),
];
export const KNOWLEDGE_EDGES:KnowledgeEdge[]=[
 {from:"problem:motion-that-means-nothing",to:"capability:sequence-player",kind:"contributed",basis:"The paper study needed finite reader-started frame playback, static controls and a full text score; donated to the library, EXHIBITION-MEDIA.md"},
 {from:"problem:motion-that-means-nothing",to:"capability:sequence-player",kind:"uses",basis:"Five authored CSS states with explicit exit, empty hold and entry; reduced motion and no-JS start at rest"},
 {from:"problem:the-book-drifts-from-the-code",to:"capability:record-difference",kind:"contributed",basis:"The drift experiment needed an identity comparison that detects missing and extra records, including equal-count substitutions"},
 {from:"problem:the-book-drifts-from-the-code",to:"capability:record-difference",kind:"uses",basis:"Pinned manifest names versus the ingested documentation snapshot; one copy is deliberately damaged without changing source files"},
 ...["everything-becomes-a-card","interfaces-that-cannot-refuse","pages-machines-cannot-read","nothing-to-cite","the-book-drifts-from-the-code","everything-sounds-equally-certain"].map(slug=>({from:`problem:${slug}`,to:"capability:exhibition-choices",kind:"uses" as const,basis:PROBLEM_ENCOUNTERS[slug]})),
 ...Object.entries({"everything-becomes-a-card":["Claim","Evidence","Refusal"],"interfaces-that-cannot-refuse":["Refusal"],"pages-machines-cannot-read":["Answer"],"everything-sounds-equally-certain":["Claim","Evidence"],"tutorial-or-reference-never-both":["Lens","Observation","Snippet"]}).flatMap(([slug,names])=>names.map(name=>({from:`problem:${slug}`,to:`form:${name}`,kind:"uses" as const,basis:PROBLEM_ENCOUNTERS[slug]}))),
 {from:"page:/choosing",to:"capability:decision-trail",kind:"contributed",basis:"hause.design's guided grammar navigation became the portable DecisionTrail; EXHIBITION-MEDIA.md records the source donation"},
 {from:"page:/knowledge",to:"capability:graph-neighbourhood",kind:"contributed",basis:"hause.design's connected records view became GraphNeighbourhood and the validated one-hop graph helper"},
 {from:"page:/choosing",to:"capability:decision-trail",kind:"uses",basis:"The selected intent and act are URL-owned; the result renders a real authored form study"},
 {from:"page:/knowledge",to:"capability:graph-neighbourhood",kind:"uses",basis:"The view renders this graph's real nodes, directions and recorded bases through a checked library-source snapshot"},
 ...FORMS.map(form=>({from:"page:/choosing",to:`form:${form.name}`,kind:"documents" as const,basis:"Published selection grammar, deciding test, alternative acts and authored preview; Hero has a labelled typographic preview and Film retains its held storyboard"})),
 ...PRACTICES.map(practice=>({from:"page:/in-practice",to:`practice:${practice.id}`,kind:"documents" as const,basis:"Source-led exhibition chapter: original media, publishing need, and manifest or publication contribution record; not independent adoption"})),
 ...["film","motion","visual-plate"].map(id=>({from:"page:/in-practice",to:`capability:${id}`,kind:"uses" as const,basis:"Original VINDEX3 archive video and original Chris Hay YouTube screening, explicitly activated and coordinated through MotionProvider in attributed VisualPlates"})),
 {from:"page:/",to:"capability:visual-plate",kind:"contributed",basis:"hause.design's material imagery became the portable VisualPlate; EXHIBITION-MEDIA.md records the donation"},
 {from:"page:/forms",to:"capability:exhibition-choices",kind:"contributed",basis:"hause.design's native mode and treatment choices became ExhibitionChoices and BeforeAfter"},
 {from:"page:/evidence",to:"capability:outcome-matrix",kind:"contributed",basis:"The source-backed CHOOSING-1 record display became the reusable OutcomeMatrix"},
 ...["/","/how-hause-grew","/statements","/instruments","/performances","/problems","/forms"].map(path=>({from:`page:${path}`,to:"capability:visual-plate",kind:"uses" as const,basis:"Site media plates consume the donated VisualPlate through an exact checked library-source snapshot"})),
 ...["/problems","/forms"].map(path=>({from:`page:${path}`,to:"capability:exhibition-choices",kind:"uses" as const,basis:"Native authored-treatment choices from the donated ExhibitionChoices capability"})),
 {from:"page:/evidence",to:"capability:outcome-matrix",kind:"uses",basis:"Three matrices render the frozen CHOOSING-1 outcomes with complete native text records"},
 ...["Claim","Evidence","Refusal"].map(name=>({from:"page:/problems",to:`form:${name}`,kind:"uses" as const,basis:"The before/after restores three actual semantic forms to an unchanged fictional gallery record"})),
 ...["Statement","Comparison","Transformation"].map(name=>({from:"page:/forms",to:`form:${name}`,kind:"uses" as const,basis:"The collection's Read, Operate and Watch encounters precede the catalogue"})),
 ...["film","transcript"].map(id=>({from:"page:/performances",to:`capability:${id}`,kind:"uses" as const,basis:"The Performances room embeds the real publication screening, chapter seeking and transcript, separately from its generated silk visual study and held Film specimen"})),
 ...Object.entries(ROOM_PROGRAMMES).flatMap(([mode,chapters])=>chapters.flatMap(chapter=>chapter.forms.map(name=>({from:`page:/${mode}s`,to:`form:${name}`,kind:"documents" as const,basis:`Curated mode-room programme: ${chapter.title}`})))),
 ...FORMS.map(form=>({from:"page:/forms",to:`form:${form.name}`,kind:"documents" as const,basis:"Forms collection links to each authored study, reusable specimen and source contract"})),
 ...["Claim","Evidence","Refusal","Comparison"].map(name=>({from:"page:/",to:`form:${name}`,kind:"uses" as const,basis:"homepage act demonstration renders four actual HAUSE forms"})),
 {from:"page:/",to:"page:/evals/choosing-1",kind:"documents",basis:"homepage proof reads exact selections from the frozen CHOOSING-1 outcomes"},
 {from:"page:/",to:"page:/how-hause-grew",kind:"documents",basis:"homepage links to the full exhibition origin sequence"},
 ...EVALUATIONS.map(e=>({from:"page:/evidence",to:`page:/evals/${e.id}`,kind:"documents" as const,basis:"published evaluation record"})),
 ...PROBLEMS.flatMap(p=>p.answers.map(f=>({from:`form:${f}`,to:`problem:${p.slug}`,kind:"addresses" as const,basis:"problem record"}))),
 ...FORMS.filter(f=>f.origin?.startsWith("vindex3")).map(f=>({from:`form:${f.name}`,to:"practice:vindex3",kind:"originated-in" as const,basis:"library manifest"})),
 ...PRACTICES.flatMap(p=>p.capabilities.map(c=>({from:`practice:${p.id}`,to:`capability:${c}`,kind:"contributed" as const,basis:"publication contribution record · September 2026"}))),
 ...ids.map(id=>({from:"page:/publication",to:`capability:${id}`,kind:"documents" as const,basis:"publication record"})),
 {from:"capability:film",to:"capability:citation",kind:"pairs-with",basis:"publication specimen joins screening and its source citation"},
 {from:"capability:measurement-trace",to:"capability:motion",kind:"depends-on",basis:"MeasurementTrace playback contract"},
 {from:"capability:film",to:"capability:motion",kind:"depends-on",basis:"YouTubeFilm component contract"},
 {from:"capability:transcript",to:"capability:film",kind:"uses",basis:"chapter and transcript seeking contract"},
 {from:"capability:metadata",to:"capability:citation",kind:"uses",basis:"publicationMetadata / videoObjectLd citation input"},
 {from:"capability:citation",to:"form:Citation",kind:"uses",basis:"shared cite.ts formatters"},
 {from:"page:/how-hause-grew",to:"practice:vindex3",kind:"documents",basis:"recorded form origins in the VINDEX3 exhibition"},
 {from:"page:/how-hause-grew",to:"practice:chrishayuk",kind:"documents",basis:"first HOUSE repository extraction from CHRISHAYUK"},
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
 if(contribution){const contributed=new Set(KNOWLEDGE_EDGES.filter(e=>e.from==="practice:chrishayuk"&&e.kind==="contributed").map(e=>e.to));return KNOWLEDGE_NODES.filter(n=>contributed.has(n.id));}
 const explicit=PUBLICATION_CAPABILITIES.map((c,i)=>({c,i})).filter(({c})=>c.aliases.some(a=>!a.includes(" ")&&q.includes(a.toLowerCase()))).map(({i})=>KNOWLEDGE_NODES.find(n=>n.id===`capability:${ids[i]}`)!);
 if(explicit.length)return explicit;
 const hits=searchKnowledge(question,"capability");
 const direct=hits.filter(h=>h.matched>=Math.min(2,h.total)&&h.score>=3).slice(0,3).map(h=>h.node);
 const neighbours=new Set(direct.flatMap(n=>relatedKnowledge(n.id).map(r=>r.node.id)));
 return [...direct,...hits.filter(h=>h.score>=3&&neighbours.has(h.node.id)&&!direct.some(n=>n.id===h.node.id)).map(h=>h.node)].slice(0,3);
}

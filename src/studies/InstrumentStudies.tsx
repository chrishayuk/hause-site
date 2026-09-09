import { Provenance } from "@chrishayuk/hause/components/forms/Provenance";
import { Citation } from "@chrishayuk/hause/components/forms/Citation";
import { FollowReveal } from "@chrishayuk/hause/components/forms/FollowReveal";
import { HAUSE_RECORD, HAUSE_HISTORY } from "@/data/citation";
import { KNOWLEDGE_EDGES, KNOWLEDGE_NODES } from "@/data/knowledge";
import { TerminalSpecimen } from "@/components/TerminalSpecimen";
import { InstrumentInteraction } from "./InstrumentInteraction";
import type { StudyName } from "./catalog";

export function InstrumentStudy({ name }: { name: StudyName }) {
  if (name === "Anatomy") return <div className="study-cutaway">{[{ label: "Kicker", role: "Where are we?", note: "The smallest voice names the room." }, { label: "Headline", role: "What matters?", note: "The editorial voice carries the principal idea." }, { label: "Body", role: "What does it mean?", note: "The system voice walks through the explanation." }, { label: "Figure", role: "How does it work?", note: "A mechanism gives the explanation a visible structure." }, { label: "Fallback", role: "What survives?", note: "A plain reading remains when interaction is removed." }].map((layer, i) => <div key={layer.label}><span className="voice-evidence">0{i + 1} / {layer.label.toUpperCase()}</span><strong className="voice-editorial">{layer.role}</strong><p className="voice-system">{layer.note}</p></div>)}</div>;
  if (name === "Terminal") return <div className="study-terminal"><TerminalSpecimen /></div>;
  if (name === "Provenance") return <div className="study-record"><p className="voice-editorial">Who said it?<br />When?<br />Which version?</p><Provenance id="study-provenance" record={HAUSE_RECORD} history={HAUSE_HISTORY} citeHref="#study-record-citation" /><Citation id="study-record-citation" record={HAUSE_RECORD} /></div>;
  if (name === "Citation") return <div className="study-citation"><p className="voice-editorial">The facts stay.<br />The format changes.</p><Citation id="study-citation" record={HAUSE_RECORD} note="The site's actual publication record, exported by the library's own formatters." /></div>;
  if (name === "FollowReveal") {
    const edge = KNOWLEDGE_EDGES.find(item => item.from === "form:Claim" && item.kind === "addresses");
    if (!edge) throw new Error("The Claim study needs a recorded addresses relationship.");
    const source = KNOWLEDGE_NODES.find(item => item.id === edge.from)!;
    const target = KNOWLEDGE_NODES.find(item => item.id === edge.to)!;
    return <div className="study-graph"><p className="voice-editorial">An assertion.<br />A reason for its form.</p><FollowReveal text="Follow Claim to the interface failure it is recorded as addressing." path={[{ href: source.url, label: source.title, relation: "start" }, { href: target.url, label: target.title, relation: edge.kind }]} /><p className="voice-evidence">EDGE SOURCE / {edge.basis}</p></div>;
  }
  return <InstrumentInteraction key={name} name={name} />;
}

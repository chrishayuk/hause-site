import Link from "next/link";
import { Hero } from "@chrishayuk/hause/components/forms/Hero";
import { Statement } from "@chrishayuk/hause/components/forms/Statement";
import { Observation } from "@chrishayuk/hause/components/forms/Observation";
import { Evidence } from "@chrishayuk/hause/components/forms/Evidence";
import { Question } from "@chrishayuk/hause/components/forms/Question";
import { Timeline } from "@chrishayuk/hause/components/forms/Timeline";
import { Excerpt } from "@chrishayuk/hause/components/forms/Excerpt";
import { Answer } from "@chrishayuk/hause/components/forms/Answer";
import { Snippet } from "@chrishayuk/hause/components/forms/Snippet";
import { HAUSE_HISTORY } from "@/data/citation";
import { formBySlug } from "@/data/forms";
import { StatementInteraction } from "./StatementInteraction";
import type { StudyName } from "./catalog";

export function StatementStudy({ name }: { name: StudyName }) {
  switch (name) {
    case "Hero": return <div className="study-hero-room"><div className="study-aperture" aria-hidden="true" /><Hero kicker="ROOM I / THE EXHIBITION" title="Give one idea the room." dek="A page can do more than hold information. It can direct attention." /></div>;
    case "Statement": case "Claim": case "Refusal": return <StatementInteraction key={name} name={name} />;
    case "Observation": return <div className="study-observation"><div className="observation-field" aria-label="Twelve marks: nine arranged together, three separated">{Array.from({ length: 12 }, (_, i) => <i key={i} />)}</div><Observation label="ON THE ARRANGEMENT" text="Nine marks sit together. Three are separated from the group. The arrangement alone does not tell us why." /><p className="voice-evidence study-margin-note">SEEN ≠ EXPLAINED</p></div>;
    case "Evidence": return <div className="study-receipts"><div className="receipt-total"><span className="voice-evidence">ILLUSTRATIVE TEST RECORD</span><strong className="voice-evidence">03</strong><span className="voice-system">findings, not one verdict</span></div><Evidence items={[{ label: "Room A was quieter", status: "SUPPORTED", detail: "Illustrative meter readings: A 32 dB; B 41 dB. Same position and interval." }, { label: "Every listener preferred A", status: "REFUTED", detail: "Illustrative responses: 8 chose A; 2 chose B. “Every” is contradicted by two responses." }, { label: "The preference persists over time", status: "OPEN", detail: "No repeat session is supplied. The available record cannot settle persistence." }]} /></div>;
    case "Question": return <div className="study-question-room"><span className="study-question-mark voice-editorial" aria-hidden="true">?</span><Question status="OPEN" text="When does silence explain more than another sentence?" detail="Working direction: when the reader already has the evidence and needs time to make the connection. The boundary remains a design judgement, not a measured law." /></div>;
    case "Timeline": return <div className="study-history"><p className="voice-editorial study-history-range">From extraction<br />to exhibition.</p><Timeline entries={[...HAUSE_HISTORY].reverse().map(event => ({ date: event.date, text: event.text }))} /></div>;
    case "Connection": return <div className="study-doorway"><p className="voice-editorial">The next question<br />is yours.</p><div className="study-doors">{[{ href: "/forms/claim", number: "01", label: "What do you believe?", sub: "Enter Claim" }, { href: "/forms/evidence", number: "02", label: "What supports it?", sub: "Enter Evidence" }, { href: "/forms/refusal", number: "03", label: "Where does it stop?", sub: "Enter Refusal" }].map(door => <Link key={door.href} href={door.href}><span className="voice-evidence">{door.number}</span><strong className="voice-editorial">{door.label}</strong><span className="voice-evidence">{door.sub} ↗</span></Link>)}</div></div>;
    case "Excerpt": return <div className="study-excerpt"><span className="study-quote voice-editorial" aria-hidden="true">“</span><Excerpt source="HAUSE / components/forms/Hero.tsx" heading="The room's first wall" text={formBySlug("hero")!.doc[1]} href="https://github.com/chrishayuk/hause/blob/main/components/forms/Hero.tsx" /></div>;
    case "Answer": return <div className="study-answer"><p className="voice-evidence">THE DIRECT ROUTE</p><Answer id="study-what-is-a-semantic-form" question="What is a semantic form?" answer="A semantic form names what a piece of communication does, rather than the container it occupies. Claim makes an assertion and carries its status. Evidence presents the support. Refusal states what cannot responsibly be asserted. The reader can recognise the act from its treatment, while a model has a vocabulary for selecting that treatment." /><a className="study-address voice-evidence" href="#study-what-is-a-semantic-form">THIS ANSWER HAS AN ADDRESS ↗</a></div>;
    case "Snippet": return <div className="study-code-pair"><div><p className="voice-evidence">01 / THE INPUT</p><Snippet label="REACT" code={'<Statement text="Give meaning a form." />'} /></div><div><p className="voice-evidence">02 / THE OUTPUT</p><Statement text="Give meaning a form." /></div></div>;
    default: throw new Error(`No statement study for ${name}`);
  }
}

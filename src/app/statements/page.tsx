import Link from "next/link";
import { ExhibitionPlate } from "@/components/ExhibitionPlate";
import { Hero } from "@chrishayuk/hause/components/forms/Hero";
import { Statement } from "@chrishayuk/hause/components/forms/Statement";
import { Observation } from "@chrishayuk/hause/components/forms/Observation";
import { Claim } from "@chrishayuk/hause/components/forms/Claim";
import { Question } from "@chrishayuk/hause/components/forms/Question";
import { Refusal } from "@chrishayuk/hause/components/forms/Refusal";
import { Answer } from "@chrishayuk/hause/components/forms/Answer";
import { StatementStudy } from "@/studies/StatementStudies";
import { RoomLabel, RoomProgramme, RoomChapter, RoomDoors, RoomPause, RoomClose, RoomRecord, roomMetadata } from "@/rooms/RoomParts";

export const metadata = roomMetadata("statement");

export default function StatementsPage() {
  return <main className="mode-room mode-room--statement system-story" data-room="statement">
    <RoomRecord mode="statement" />
    <header id="hero" className="room-opening room-opening--editorial"><RoomLabel mode="statement" /><Hero kicker="THE READER READS" title="A sentence becomes an argument." dek="An observation is not a claim. A claim is not its evidence. Follow one fictional listening-room study as the words change their job." /><Link className="room-inspect voice-evidence" href="/forms/hero">THE ARRIVAL / HERO ↗</Link></header>
    <section id="arrival" className="room-statement-arrival"><div id="statement"><p className="voice-evidence">THE TURN / STATEMENT</p><Statement text="The same words do not always do the same work." /><Link className="room-inspect voice-evidence" href="/forms/statement">ENTER STATEMENT ↗</Link></div></section>
    <RoomProgramme mode="statement" />
    <ExhibitionPlate study="attention" />
    <RoomChapter mode="statement" chapterId="notice">
      <p className="room-fixture-label voice-evidence">A FICTIONAL LISTENING-ROOM STUDY / ILLUSTRATIVE VALUES, NOT RESEARCH EVIDENCE</p>
      <section id="observation" className="room-observation" aria-label="Observation">
        <div className="room-readings"><div><span className="voice-evidence">ROOM A</span><strong className="voice-evidence">32 <small>dB</small></strong></div><div><span className="voice-evidence">ROOM B</span><strong className="voice-evidence">41 <small>dB</small></strong></div></div>
        <Observation label="FIRST / WHAT IS THERE" text="In this illustrative record, the meter reads 32 dB in Room A and 41 dB in Room B, at the same position and interval. This says which room measured quieter. It says nothing yet about preference." />
        <Link className="room-inspect voice-evidence" href="/forms/observation">ENTER OBSERVATION ↗</Link>
      </section>
      <section id="claim" className="room-assertion" aria-label="Claim"><p className="voice-evidence">THEN / WHAT WE CAN ASSERT</p><Claim text="Listeners preferred the quieter room in this session." status="SUPPORTED" detail="Illustrative responses: 8 of 10 listeners chose Room A. The assertion is scoped to these listeners and this session—not every listener, everywhere." /><Link className="room-inspect voice-evidence" href="/forms/claim">ENTER CLAIM ↗</Link></section>
    </RoomChapter>
    <RoomChapter mode="statement" chapterId="support">
      <section id="evidence" className="room-receipts act-study" aria-label="Evidence"><StatementStudy name="Evidence" /><Link className="room-inspect voice-evidence" href="/forms/evidence">ENTER EVIDENCE ↗</Link></section>
      <RoomPause note="THE RECEIPTS DO NOT CLOSE EVERY QUESTION" first="A result is present." second="Its limits are present, too." />
      <section id="question" className="room-open-question" aria-label="Question"><Question status="OPEN" text="Does that preference last?" detail="There is no repeat session in the illustrative record. Persistence remains a question, not an implied benefit." /><Link className="room-inspect voice-evidence" href="/forms/question">ENTER QUESTION ↗</Link></section>
      <section id="refusal" className="room-boundary" aria-label="Refusal"><Refusal kicker="THE BOUNDARY / NOT AN ERROR" title="We cannot call it universal." lines={["requested    every listener prefers the quieter room", "record       8 chose A; 2 chose B", "decision     the universal assertion is contradicted"]} principle="A designed answer includes what the record will not let it say." /><Link className="room-inspect voice-evidence" href="/forms/refusal">ENTER REFUSAL ↗</Link></section>
    </RoomChapter>
    <RoomChapter mode="statement" chapterId="resolve">
      <section id="answer" className="room-plain-answer" aria-label="Answer"><Answer id="what-did-the-listening-study-show" question="What did the listening-room study show?" answer="In this fictional example, Room A measured quieter and eight of ten listeners preferred it during one session. Two listeners preferred Room B, so the record contradicts a claim that everyone preferred A. No repeat session is supplied. The result supports a limited preference statement, while leaving its persistence unresolved." /><Link className="room-inspect voice-evidence" href="/forms/answer">ENTER ANSWER ↗</Link></section>
      <RoomDoors names={["Excerpt", "Timeline", "Snippet"]} />
      <section id="connection" className="room-last-sentence"><p className="voice-evidence">THE BRIDGE / CONNECTION</p><p className="voice-editorial">You have read the argument.<br />What changes when you can operate it?</p><div><Link className="room-inspect voice-evidence" href="/instruments">ENTER THE INSTRUMENTS ↗</Link><Link className="room-inspect voice-evidence" href="/forms/connection">INSPECT CONNECTION ↗</Link></div></section>
    </RoomChapter>
    <aside className="room-discipline"><p className="voice-evidence">THE STATEMENT’S DISCIPLINE</p><p className="voice-system">The argument on this page uses the actual HAUSE prose forms. Its fictional measurements are teaching material, not additions to HAUSE’s evaluation record. All of the words remain readable without interaction; the individual studies offer deeper inspection.</p></aside>
    <RoomClose mode="statement" next="instrument" />
  </main>;
}

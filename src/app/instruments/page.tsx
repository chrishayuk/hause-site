import { RoomLabel, RoomProgramme, RoomChapter, RoomStudy, RoomDoors, RoomPause, RoomClose, RoomRecord, roomMetadata } from "@/rooms/RoomParts";
import { InstrumentInteraction } from "@/studies/InstrumentInteraction";
import Link from "next/link";
import { ExhibitionPlate } from "@/components/ExhibitionPlate";

export const metadata = roomMetadata("instrument");

export default function InstrumentsPage() {
  return <main className="mode-room mode-room--instrument system-story" data-room="instrument">
    <RoomRecord mode="instrument" />
    <header className="room-opening">
      <RoomLabel mode="instrument" />
      <div className="room-opening-copy"><p className="voice-evidence">THE READER OPERATES</p><h1 className="voice-editorial">Understanding,<br /><em>by hand.</em></h1><p className="voice-system">Move something. Change one condition. Inspect what follows. The explanation becomes an instrument when its pace belongs to you.</p></div>
      <section id="comparison" className="room-first-screen" aria-label="Comparison opening instrument"><p className="voice-evidence">ON THE BENCH / COMPARISON</p><InstrumentInteraction name="Comparison" /><Link className="room-inspect voice-evidence" href="/forms/comparison">INSPECT THE FORM ↗</Link></section>
    </header>
    <RoomProgramme mode="instrument" />
    <section id="rearrange" className="room-reading"><p className="voice-evidence">01 / MOVE THE PIECES</p><p className="voice-editorial">You changed the arrangement.<br />Not the objects.</p><p className="voice-system">Comparison preserves identity while you move between interpretations. When the same change should happen at an authored pace, its sibling is Transformation.</p><Link className="room-inspect voice-evidence" href="/forms/transformation">SEE THE PERFORMED COUNTERPART ↗</Link></section>
    <ExhibitionPlate study="structure" />
    <RoomChapter mode="instrument" chapterId="open"><RoomStudy name="Decomposition" /><RoomDoors names={["Anatomy", "Lens"]} /></RoomChapter>
    <RoomChapter mode="instrument" chapterId="select"><RoomStudy name="ExpertField" /><RoomDoors names={["Variants", "Gating"]} /></RoomChapter>
    <RoomPause note="THE CONTROL HAS TO EARN ITS PLACE" first="A different setting." second="A different understanding." />
    <RoomChapter mode="instrument" chapterId="verify"><RoomStudy name="Agreement" /><RoomDoors names={["Derivation", "Ladder", "ByteMap"]} /></RoomChapter>
    <RoomChapter mode="instrument" chapterId="trace"><RoomStudy name="Terminal" /><RoomDoors names={["FollowReveal", "Provenance", "Citation"]} /></RoomChapter>
    <aside className="room-discipline"><p className="voice-evidence">THE INSTRUMENT’S DISCIPLINE</p><p className="voice-system">The field and arithmetic studies are explicitly illustrative. The terminal reads the actual library manifest. Every featured encounter carries a plain reading, and each door leads to the full study, reusable specimen and source contract.</p></aside>
    <RoomClose mode="instrument" next="performance" />
  </main>;
}

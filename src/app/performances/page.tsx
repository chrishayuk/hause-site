import { RoomLabel, RoomProgramme, RoomChapter, RoomStudy, RoomDoors, RoomPause, RoomClose, RoomRecord, roomMetadata } from "@/rooms/RoomParts";
import { PerformanceStudy } from "@/studies/PerformanceStudies";
import Link from "next/link";
import { ExhibitionPlate } from "@/components/ExhibitionPlate";
import { PublicationScreening } from "@/components/PublicationScreening";
import { MotionProvider } from "@chrishayuk/hause/components/Motion";
import { JsonLd } from "@chrishayuk/hause/components/JsonLd";
import { videoObjectLd } from "@chrishayuk/hause/seo";
import { PUBLICATION_FILM_RECORD } from "@/data/publication";
import film from "@/data/publication-film.json";

export const metadata = roomMetadata("performance");

export default function PerformancesPage() {
  return <main className="mode-room mode-room--performance system-story" data-room="performance">
    <RoomRecord mode="performance" />
    <JsonLd data={videoObjectLd({ citation: PUBLICATION_FILM_RECORD, pageUrl: "https://hause.design/performances", thumbnailUrl: film.poster, embedUrl: `https://www.youtube-nocookie.com/embed/${film.youtubeId}`, durationSeconds: film.duration })} />
    <header className="room-opening">
      <RoomLabel mode="performance" />
      <div className="room-opening-copy"><p className="voice-evidence">THE READER WATCHES</p><h1 className="voice-editorial">Watch an<br /><em>idea change.</em></h1><p className="voice-system">Some explanations are easier to understand when they happen. First, watch the same four pieces become a different reading.</p></div>
      <section id="transformation" className="room-first-screen" aria-label="Transformation opening performance">
        <p className="voice-evidence">NOW SHOWING / TRANSFORMATION</p>
        <PerformanceStudy name="Transformation" />
        <Link className="room-inspect voice-evidence" href="/forms/transformation">INSPECT THE FORM ↗</Link>
      </section>
    </header>
    <RoomProgramme mode="performance" />
    <RoomChapter mode="performance" chapterId="rearrange">
      <RoomStudy name="Unfolding" />
      <RoomDoors names={["Compilation"]} />
    </RoomChapter>
    <RoomPause note="A CHANGE OF PACE" first="Not motion around the explanation." second="Motion as the explanation." />
    <ExhibitionPlate study="passage" />
    <RoomChapter mode="performance" chapterId="passage">
      <RoomStudy name="Procession" />
      <RoomDoors names={["Channel"]} />
    </RoomChapter>
    <RoomChapter mode="performance" chapterId="scale">
      <RoomStudy name="Magnitude" />
      <RoomDoors names={["Quantisation"]} />
    </RoomChapter>
    <RoomChapter mode="performance" chapterId="screening">
      <div className="room-film-threshold publication-room"><span className="voice-evidence">FROM VISUAL STUDY TO REAL PUBLICATION</span><p className="voice-editorial">The subject<br />comes first.</p><p className="voice-system">The silk passage above is an imagined space. This is an actual film: Chris Hay explaining a technical idea, with chapters and a transcript you can operate. It demonstrates the separate publication player; the original Film form remains a labelled storyboard, not this video.</p><MotionProvider storageKey="hause-performance-film-motion"><PublicationScreening /></MotionProvider><Link href="/publication#film-citation" className="room-inspect voice-evidence">INSPECT THE PUBLICATION RECORD ↗</Link></div>
      <RoomDoors names={["Film"]} />
    </RoomChapter>
    <aside className="room-discipline"><p className="voice-evidence">THE SCREENING DISCIPLINE</p><p className="voice-system">These authored sequences play finitely, stop when out of view, and have pause and replay controls. Reduced motion starts with the complete resting composition. The text record remains available without playback. The individual form pages separate these studies from the reusable library components.</p></aside>
    <RoomClose mode="performance" next="statement" />
  </main>;
}

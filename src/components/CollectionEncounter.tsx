import Link from "next/link";
import { ExhibitionChoices } from "@/vendor/hause/components/exhibition/ExhibitionChoices";
import { Statement } from "@chrishayuk/hause/components/forms/Statement";
import { InstrumentInteraction } from "@/studies/InstrumentInteraction";
import { PerformanceStudy } from "@/studies/PerformanceStudies";

export function CollectionEncounter() {
  return <section className="collection-encounter section-exhibition" aria-labelledby="collection-encounter-title">
    <header><p className="voice-evidence">BEFORE THE CATALOGUE / MEET THE THREE MODES</p><h2 className="voice-editorial" id="collection-encounter-title">Read it.<br />Operate it.<br /><em>Watch it.</em></h2><p className="voice-system">A form changes the relationship between reader and idea. Choose a mode; then enter its collection below.</p></header>
    <ExhibitionChoices id="collection-mode" legend="Choose an encounter" choices={[
      { label: "I / Read", content: <div className="collection-encounter-stage collection-encounter--read"><p className="voice-evidence">STATEMENT / THE IDEA HOLDS STILL</p><Statement text="Not everything should arrive at once." /><p className="voice-system">No setting. No playback. A sentence given enough space to land.</p><a className="story-link" href="#statements">EXPLORE STATEMENTS ↓</a></div> },
      { label: "II / Operate", content: <div className="collection-encounter-stage act-study"><p className="voice-evidence">COMPARISON / THE READER SETS THE PACE</p><InstrumentInteraction name="Comparison" /><a className="story-link" href="#instruments">EXPLORE INSTRUMENTS ↓</a></div> },
      { label: "III / Watch", content: <div className="collection-encounter-stage act-study"><p className="voice-evidence">TRANSFORMATION / THE PAGE STAGES THE CHANGE</p><PerformanceStudy name="Transformation" /><a className="story-link" href="#performances">EXPLORE PERFORMANCES ↓</a></div> },
    ]} />
    <p className="section-exhibition-note voice-evidence">AUTHORED ENCOUNTERS · THE INSTRUMENT AND PERFORMANCE SHARE AN ILLUSTRATIVE ARRANGEMENT</p>
    <Link className="story-link" href="/choosing">WHICH FORM DOES YOUR IDEA NEED? ↗</Link>
  </section>;
}

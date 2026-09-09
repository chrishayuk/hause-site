import Link from "next/link";
import { Claim } from "@chrishayuk/hause/components/forms/Claim";
import { Evidence } from "@chrishayuk/hause/components/forms/Evidence";
import { Refusal } from "@chrishayuk/hause/components/forms/Refusal";
import { Answer } from "@chrishayuk/hause/components/forms/Answer";
import { citationFormats } from "@chrishayuk/hause/cite";
import { qaLd } from "@chrishayuk/hause/seo";
import { ExhibitionChoices, BeforeAfter } from "@/vendor/hause/components/exhibition/ExhibitionChoices";
import { SequencePlayer } from "@/vendor/hause/components/exhibition/SequencePlayer";
import { problemBySlug, problemRecord } from "@/data/problems";
import { documentCheck, damagedCheck, damagedNames, documentedNames, documentationDate, manifestNames, LISTENING_RECORD as listening, GALLERY_RECORD as gallery } from "./records";

export function ContainerEncounter() {
  const lines = ["requested    a confirmed opening date", "available    a plan and a scheduled inspection"];
  return <div className="problem-experiment" data-problem-experiment="containers"><p className="experiment-note voice-evidence">FICTIONAL GALLERY / SAME WORDS, DIFFERENT TREATMENT</p>
    <BeforeAfter id="problem-container-treatment" legend="Restore the distinctions" beforeLabel="Flatten into containers" afterLabel="Give each act its form"
      before={<div className="experiment-card-wall">{[{ title: gallery.assertion, detail: gallery.detail, extra: "OPEN" }, { title: "Safety inspection", detail: gallery.evidence, extra: "OPEN" }, { title: gallery.refusal, detail: gallery.boundary, extra: lines.join(" · ") }].map((item, index) => <article key={item.title}><span className="voice-evidence">INFO / 0{index + 1}</span><h3 className="voice-system">{item.title}</h3><p>{item.detail}</p><small>{item.extra}</small></article>)}</div>}
      after={<div className="experiment-restored"><Claim text={gallery.assertion} status="OPEN" detail={gallery.detail} /><Evidence items={[{ label: "Safety inspection", detail: gallery.evidence, status: "OPEN" }]} /><Refusal kicker="THE BOUNDARY" title={gallery.refusal} lines={lines} principle={gallery.boundary} /></div>} />
    <p className="experiment-reading voice-system">The facts did not improve. Their different jobs became visible.</p>
  </div>;
}

export function RefusalEncounter() {
  return <div className="problem-experiment" data-problem-experiment="refusal"><p className="experiment-note voice-evidence">ILLUSTRATIVE ARCHIVE / TWO FILES PRESENT, ONE ABSENT</p>
    <div className="archive-shelf" aria-label="Inventory: photograph and floor plan available; inspection report absent"><div><i aria-hidden="true" />PHOTOGRAPH<span>AVAILABLE</span></div><div><i aria-hidden="true" />FLOOR PLAN<span>AVAILABLE</span></div><div data-absent="true"><i aria-hidden="true" />INSPECTION<span>NOT FILED</span></div></div>
    <ExhibitionChoices id="problem-request" legend="Request an item from this archive" choices={[
      { label: "Open the floor plan", content: <div className="archive-delivery"><div className="archive-plan" aria-hidden="true"><i /><i /><i /></div><div><p className="voice-evidence">AVAILABLE / ILLUSTRATIVE FLOOR PLAN</p><h3 className="voice-editorial">Three rooms.<br />One entrance.</h3><p className="voice-system">The requested plan is present. It shows the layout; it does not establish that the gallery passed an inspection.</p></div></div> },
      { label: "Request the inspection report", content: <div className="archive-refusal"><Refusal kicker="REQUEST RESOLVED / NOTHING INVENTED" title="NO REPORT FILED" lines={["requested    the inspection report", "available    a photograph and a floor plan"]} principle="A plan is not an inspection. No substitute is returned." /><p className="voice-system">Next step: obtain the missing report. Retrying this unchanged archive cannot produce it.</p></div> },
    ]} />
  </div>;
}

function ListeningMarks({ revealed = true }: { revealed?: boolean }) {
  return <div className="listening-marks" aria-label={revealed ? "Ten illustrative responses: eight A, two B" : "Ten responses not yet revealed"}>{listening.choices.map((choice, index) => <span key={index} data-choice={revealed ? choice : "unknown"}><small>{String(index + 1).padStart(2, "0")}</small><strong>{revealed ? choice : "?"}</strong></span>)}</div>;
}

export function MachineEncounter() {
  const data = qaLd({ question: listening.question, answer: listening.answer, url: "https://hause.design/problems/pages-machines-cannot-read#reader-record" });
  return <div className="problem-experiment" data-problem-experiment="machine"><p className="experiment-note voice-evidence">ONE FICTIONAL RECORD / THREE PROJECTIONS</p>
    <ExhibitionChoices id="problem-reader" legend="Remove a layer. Check what survives." choices={[
      { label: "Designed surface", content: <div className="machine-designed"><ListeningMarks /><Answer id="reader-record" question={listening.question} answer={listening.answer} /></div> },
      { label: "Text only", content: <div className="machine-plain"><p>QUESTION</p><h3>{listening.question}</h3><p>{listening.answer}</p><p>Responses: {listening.choices.join(", ")}</p><p>This is a text projection of the supplied record, not a live crawler or an extraction audit.</p></div> },
      { label: "Structured record", content: <div className="machine-json"><pre>{JSON.stringify(data, null, 2)}</pre><p className="voice-system">Generated by HAUSE’s qaLd helper from the same question and answer. This illustrative payload is displayed, not added as another claim to the page’s head.</p></div> },
    ]} />
    <p className="experiment-reading voice-system">The presentation changes. The question, the answer and its limits do not. This demonstrates consistency—not guaranteed indexing.</p>
  </div>;
}

export function CitationEncounter() {
  const record = problemRecord(problemBySlug("nothing-to-cite")!);
  const formats = citationFormats(record);
  return <div className="problem-experiment" data-problem-experiment="citation"><p className="experiment-note voice-evidence">THE ACTUAL CHAPTER RECORD / NOT A FICTIONAL PUBLICATION</p>
    <BeforeAfter id="problem-citation-record" legend="Give the fragment its record back" beforeLabel="An anonymous fragment" afterLabel="A published object"
      before={<div className="citation-fragment"><span className="voice-evidence">ATTRIBUTION REMOVED FOR THIS DEMONSTRATION</span><blockquote className="voice-editorial">“{record.abstract}”</blockquote><p className="voice-evidence">AUTHOR — / DATE — / VERSION — / SOURCE —</p></div>}
      after={<div className="citation-restored"><blockquote className="voice-editorial">“{record.abstract}”</blockquote><dl>{[["AUTHOR", record.authors.join(", ")], ["FIRST PUBLISHED", record.published], ["REVISED", record.revised ?? "No revision recorded"], ["VERSION", record.version], ["ADDRESS", record.url]].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><ExhibitionChoices id="problem-citation-format" legend="Take the real reference with you" choices={formats.map(format => ({ label: format.label, content: <div className="citation-download"><pre>{format.text}</pre><a download={`hause-nothing-to-cite.${format.id === "bibtex" ? "bib" : format.id.includes("csl") ? "json" : "txt"}`} href={`data:text/plain;charset=utf-8,${encodeURIComponent(format.text)}`}>DOWNLOAD {format.label} ↗</a></div> }))} /></div>} />
    <p className="experiment-reading voice-system">The page, its head metadata and these exports use the same record. A revision never replaces the first-publication date.</p>
  </div>;
}

function Inventory({ damaged }: { damaged: boolean }) {
  const actual = damaged ? damagedNames : documentedNames;
  const check = damaged ? damagedCheck : documentCheck;
  return <div className="inventory-check" data-inventory-match={check.matches}>
    <div className="inventory-counts"><div><span className="voice-evidence">PINNED MANIFEST</span><strong>{manifestNames.length}</strong></div><span aria-hidden="true">{check.matches ? "=" : "≠"}</span><div><span className="voice-evidence">{damaged ? "ALTERED COPY" : "INGESTED DOCUMENTATION"}</span><strong>{actual.length}</strong></div></div>
    <div className="inventory-ribbons" aria-label="Document coverage by form">{manifestNames.map(name => <span key={name} data-missing={!actual.includes(name)}>{name}{!actual.includes(name) && " / MISSING"}</span>)}</div>
    <p className="inventory-verdict voice-editorial">{check.matches ? "The identities agree." : `${check.missing.join(", ")} has disappeared.`}</p>
    <p className="voice-system">{check.matches ? "Names match in both directions. This checks the documentation snapshot against the pinned manifest; it is not three independent measurements." : "One entry was deliberately removed from a copy. The identity check exposes the gap. The real files have not changed."}</p>
    {!!check.extra.length && <p>Unexpected entries: {check.extra.join(", ")}</p>}
  </div>;
}

export function DriftEncounter() {
  return <div className="problem-experiment" data-problem-experiment="drift"><p className="experiment-note voice-evidence">REAL MANIFEST + DOCUMENTATION SNAPSHOT / INGESTED {documentationDate}</p>
    <ExhibitionChoices id="problem-drift" legend="Break the copy, then restore the source" choices={[
      { label: "01 / Check the real records", content: <Inventory damaged={false} /> },
      { label: "02 / Remove one entry from a copy", content: <Inventory damaged /> },
      { label: "03 / Restore the real record", content: <Inventory damaged={false} /> },
    ]} />
    <p className="experiment-reading voice-system">Matching totals alone are not enough: the check compares identities and detects missing or unexpected names. This site remains on its pinned 35-form release; it does not claim to mirror the newer library HEAD.</p>
    <div className="journey-links"><a href="https://github.com/chrishayuk/hause/blob/b785b0508b251b5a57eaf163b19c44164cd0feec/manifest.ts">PINNED MANIFEST ↗</a><Link href="/forms">THE DOCUMENTED COLLECTION ↗</Link></div>
  </div>;
}

export function CertaintyEncounter() {
  return <div className="problem-experiment" data-problem-experiment="certainty"><p className="experiment-note voice-evidence">FICTIONAL LISTENING STUDY / TEN RECORDED CHOICES</p>
    <ExhibitionChoices id="problem-certainty" legend="Let the record change what can be asserted" choices={[
      { label: "01 / Before the responses", content: <div><ListeningMarks revealed={false} /><Claim status="OPEN" text={listening.assertion} detail="The assertion is testable. No responses have been revealed in this view." /></div> },
      { label: "02 / Reveal all ten", content: <div><ListeningMarks /><Claim status="REFUTED" text={listening.assertion} detail="Two listeners chose B. One counterexample would already defeat “every”." /><Evidence items={[{ label: "Eight chose A; two chose B", status: "SUPPORTED", detail: "All ten fictional responses are shown above. No population-level conclusion is claimed." }]} /></div> },
      { label: "03 / Narrow the claim", content: <div><ListeningMarks /><Claim status="SUPPORTED" text="Most listeners in this ten-person study preferred room A." detail="8 of 10 chose A. A narrower claim matches this record; preference beyond this sample remains unknown." /></div> },
    ]} />
    <p className="experiment-reading voice-system">The type did not become more confident. The evidence changed what the sentence could responsibly say.</p>
  </div>;
}

export function MotionEncounter() {
  const room = (phase: string) => <div className="paper-theatre" data-paper-phase={phase} aria-hidden="true"><div className="paper-floor" /><div className="paper-object"><i /><i /></div><div className="paper-position">{phase === "hold" ? "THE ROOM IS EMPTY" : phase === "flat" || phase === "exit" ? "FLAT SHEET" : "FOLDED SHEET"}</div></div>;
  return <div className="problem-experiment" data-problem-experiment="motion"><p className="experiment-note voice-evidence">ORIGINAL CSS STUDY / A STAGED SUBSTITUTION, NOT A PHYSICS SIMULATION</p>
    <SequencePlayer label="ONE SHEET / TWO PHYSICAL STATES" frames={[
      { id: "flat", label: "01 / Establish", reading: "A flat sheet occupies the room. Establish the first state before replacing it.", content: room("flat"), durationMs: 1700 },
      { id: "exit", label: "02 / Exit", reading: "The flat state leaves. It does not dissolve through the folded state.", content: room("exit"), durationMs: 700 },
      { id: "hold", label: "03 / Hold", reading: "The room stays empty for a beat. Absence separates the two states.", content: room("hold"), durationMs: 1000 },
      { id: "enter", label: "04 / Enter", reading: "The folded state enters after the flat state has gone.", content: room("enter"), durationMs: 900 },
      { id: "rest", label: "05 / Rest", reading: "One folded sheet remains. The text score preserves the full sequence even when motion is unavailable.", content: room("rest"), durationMs: 1800 },
    ]} />
    <p className="experiment-reading voice-system">The hold is part of the explanation. Play once, pause, or inspect any frame. Reduced motion starts at rest and keeps the static frame controls.</p>
  </div>;
}

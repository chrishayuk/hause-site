"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { StudyChoices } from "./StudyChoices";
import { ArgumentArrangement, ArgumentParts } from "./InstrumentInteraction";
import { channelCount } from "./mechanisms";

const SCORES = {
  Transformation: ["A pile: the same pieces overlap.", "Reorganisation: identities travel, nothing is replaced.", "A sequence: the connections can be read."],
  Unfolding: ["A whole argument, still closed.", "LOOK, ASK, TEST and SAY become individually visible.", "The parts resolve into a conclusion you can retrace."],
  Compilation: ["Inputs: arrival, attention and meaning.", "Assemble the relationships: arrival directs attention; attention gives meaning a place.", "Artifact: a short statement that carries those relationships without its working notes."],
  Procession: ["Receive: one request enters.", "Interpret: the request acquires a selected act.", "Compose: the selected act is given a form.", "Deliver: the same request reaches its reader."],
  Magnitude: ["Magnitude 1 fills its reference square.", "Magnitude 100: the first square is one hundredth of the area.", "Magnitude 10,000: the first square is one ten-thousandth of the area."],
  Channel: ["Payload 6: two messages fit the 12-unit channel.", "Payload 3: four messages fit the same channel.", "Payload 1: twelve messages fit without expanding the channel."],
  Film: ["Poster: establish the subject before playback.", "Screening: a real film would carry the sequence.", "Rest: return to a designed, legible end state."],
};
type PerformanceName = keyof typeof SCORES;

export function PerformanceStudy({ name }: { name: PerformanceName }) {
  const score = SCORES[name];
  const [phase, setPhase] = useState(score.length - 1);
  const [playing, setPlaying] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const stopForPreference = () => { if (preference.matches) { setPlaying(false); setPhase(score.length - 1); } };
    let started = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started && !preference.matches && name !== "Film") { started = true; setPhase(0); setPlaying(true); }
      else if (!entry.isIntersecting) setPlaying(false);
    }, { threshold: 0.35 });
    if (stage.current) observer.observe(stage.current);
    preference.addEventListener("change", stopForPreference);
    return () => { observer.disconnect(); preference.removeEventListener("change", stopForPreference); };
  }, [name, score.length]);
  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(() => { if (phase === score.length - 1) setPlaying(false); else setPhase(phase + 1); }, 2200);
    return () => clearTimeout(timer);
  }, [phase, playing, score.length]);

  return <div className="study-performance" ref={stage} data-playing={playing}>
    <div className="study-performance-scene" data-phase={phase}>
      {name === "Transformation" && <ArgumentArrangement progress={phase / 2} />}
      {name === "Unfolding" && <ArgumentParts phase={phase} />}
      {name === "Compilation" && <div className="study-compilation" data-complete={phase === 2}><div className="study-inputs">{["Arrival", "Attention", "Meaning"].map((label, i) => <div key={label}><span className="voice-evidence">INPUT 0{i + 1}</span><p className="voice-editorial">{label}</p></div>)}</div><span className="study-compile-arrow voice-evidence">↓ {phase === 0 ? "COLLECT" : phase === 1 ? "ASSEMBLE" : "ARTIFACT"}</span><p className="study-compiled voice-editorial">{phase === 2 ? "Arrival directs attention. Attention gives meaning a place." : phase === 1 ? "Arrival → attention → meaning." : "Three notes. Not yet a statement."}</p></div>}
      {name === "Procession" && <div className="study-procession">{["Receive", "Interpret", "Compose", "Deliver"].map((label, i) => <div key={label} data-passed={i <= phase} data-current={i === phase}><span className="voice-evidence">0{i + 1}</span><strong className="voice-editorial">{label}</strong><span className="study-request voice-evidence">{i === phase ? "REQUEST 07" : i < phase ? "PASSED" : "AWAITING"}</span></div>)}</div>}
      {name === "Magnitude" && <div className="study-magnitudes">{[1, 100, 10000].map((magnitude, i) => <div className="study-magnitude-item" key={magnitude} data-future={i > phase}><div className="study-magnitude-world"><div style={{ width: (i <= phase ? Math.sqrt(magnitude / [1, 100, 10000][phase]) * 100 : 0) + "%" }} /></div><strong className="voice-evidence">{i <= phase ? magnitude.toLocaleString("en-GB") : "—"}</strong><span className="voice-evidence">{i <= phase ? "AREA UNITS" : "NOT YET IN VIEW"}</span></div>)}</div>}
      {name === "Channel" && <div className="study-channel" key={phase}><div className="study-channel-ends voice-evidence"><span>SOURCE →</span><span>→ READER</span></div><div className="study-conduit" aria-label={channelCount([6, 3, 1][phase]) + " payloads fit the channel"}>{Array.from({ length: channelCount([6, 3, 1][phase]) }, (_, i) => <div key={i} style={{ width: [6, 3, 1][phase] / 12 * 100 + "%" }}><span className="voice-evidence">{[6, 3, 1][phase]}</span></div>)}</div><p className="study-channel-capacity voice-evidence">12 UNITS / FIXED CAPACITY</p><div className="study-channel-reading"><strong className="voice-evidence">{channelCount([6, 3, 1][phase])}</strong><p className="voice-system">messages fit<br />at this payload size</p></div></div>}
      {name === "Film" && <div className="study-film-score"><p className="voice-evidence">STORYBOARD / NOT A VIDEO</p><p className="voice-editorial">{["Before the first frame.", "Give the subject time.", "Leave something legible."][phase]}</p><div className="study-film-perforations" aria-hidden="true">{Array.from({ length: 12 }, (_, i) => <i key={i} />)}</div><Link href="/publication" className="voice-evidence">VISIT THE REAL PUBLICATION SCREENING ↗</Link></div>}
    </div>
    <div className="study-playback"><StudyChoices labels={name === "Procession" ? ["Receive", "Interpret", "Compose", "Deliver"] : name === "Magnitude" ? ["1", "100", "10,000"] : name === "Channel" ? ["6-unit payload", "3-unit payload", "1-unit payload"] : name === "Film" ? ["Poster", "Screening", "Rest"] : ["Before", "During", "After"]} selected={phase} onSelect={value => { setPlaying(false); setPhase(value); }} label={name + " sequence position"} /><button className="voice-evidence" type="button" onClick={() => { if (playing) setPlaying(false); else { setPhase(0); setPlaying(true); } }}>{playing ? "PAUSE ■" : name === "Film" ? "PLAY THE STORYBOARD ↗" : "REPLAY THE SEQUENCE ↗"}</button></div>
    <p className="study-verdict voice-system" role="status">{score[phase]}</p>
    <details className="study-transcript"><summary className="voice-evidence">THE COMPLETE SEQUENCE / TEXT RECORD</summary><ol className="voice-system">{score.map(line => <li key={line}>{line}</li>)}</ol></details>
  </div>;
}

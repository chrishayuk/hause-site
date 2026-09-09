"use client";

import { useEffect, useState } from "react";

const VALUES = [0.14, 0.29, 0.47, 0.63, 0.79, 0.88, 0.73, 0.52, 0.35, 0.19, 0.11, 0.24, 0.41, 0.68, 0.83, 0.91, 0.71, 0.56];
const PHASES = [
  { levels: 0, label: "Original", title: "Every value, as given.", caption: "No snapping. The original values remain in place." },
  { levels: 33, label: "Fine", title: "A small move. Almost invisible.", caption: "33 available levels. Each value moves to its nearest one." },
  { levels: 9, label: "Coarse", title: "The grid begins to decide.", caption: "9 available levels. The hollow marks remember where the values were." },
  { levels: 3, label: "Extreme", title: "Different values. The same destination.", caption: "3 available levels. Distinctions disappear; the displacement becomes visible." },
];

/** An authored study, separate from the library's reusable specimen. */
export function QuantisationStudy() {
  const [phase, setPhase] = useState(2);
  const [playing, setPlaying] = useState(false);
  const current = PHASES[phase];
  const shown = VALUES.map(value => current.levels ? Math.round(value * (current.levels - 1)) / (current.levels - 1) : value);
  const error = shown.reduce((sum, value, i) => sum + Math.abs(value - VALUES[i]), 0) / VALUES.length;
  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(() => {
      if (phase === PHASES.length - 1) setPlaying(false);
      else setPhase(phase + 1);
    }, 2400);
    return () => clearTimeout(timer);
  }, [phase, playing]);

  return (
    <div className="quant-study">
      <header>
        <p className="voice-evidence">AN INTERACTIVE STUDY · SYNTHETIC VALUES</p>
        <h2 className="voice-editorial">Less precision.<br />A different shape.</h2>
        <p className="voice-system">The values haven’t changed. What we can represent has.<br />Reduce the available levels and watch where each value has to go.</p>
      </header>
      <div className="quant-study-field">
        <div className="quant-study-axis voice-evidence"><span>1.0</span><span>0.0</span></div>
        <svg viewBox="0 0 900 330" role="img" aria-label={`${current.levels || "Original"} levels. Mean absolute error ${error.toFixed(4)} on a zero-to-one scale.`}>
          {current.levels > 0 && Array.from({ length: current.levels }, (_, i) => (
            <line key={i} x1="12" x2="888" y1={15 + i / (current.levels - 1) * 300} y2={15 + i / (current.levels - 1) * 300} className="quant-study-grid" vectorEffect="non-scaling-stroke" />
          ))}
          {VALUES.map((value, i) => {
            const x = 30 + i / (VALUES.length - 1) * 840;
            const originalY = 315 - value * 300;
            const shownY = 315 - shown[i] * 300;
            return <g key={i}>
              <line x1={x} x2={x} y1={originalY} y2={shownY} className="quant-study-displacement" vectorEffect="non-scaling-stroke" />
              <circle cx={x} cy={originalY} r="5" className="quant-study-original" vectorEffect="non-scaling-stroke" />
              <circle cx={x} cy={shownY} r="6" className="quant-study-value" />
            </g>;
          })}
        </svg>
      </div>
      <div className="quant-study-controls">
        <div className="quant-study-phases" role="group" aria-label="Available precision">
          {PHASES.map((item, i) => <button key={item.label} type="button" aria-pressed={phase === i} onClick={() => { setPlaying(false); setPhase(i); }}>
            <span className="voice-evidence">0{i + 1} / {item.levels || "—"}</span><span className="voice-editorial">{item.label}</span>
          </button>)}
        </div>
        <button className="quant-study-play voice-evidence" type="button" onClick={() => { if (playing) setPlaying(false); else { setPhase(0); setPlaying(true); } }}>{playing ? "PAUSE ■" : "PLAY THE SEQUENCE ↗"}</button>
      </div>
      <div className="quant-study-reading" aria-live="polite" aria-atomic="true">
        <div><h3 className="voice-editorial">{current.title}</h3><p className="voice-system">{current.caption}</p></div>
        <p className="voice-evidence quant-study-error"><strong>{error.toFixed(4)}</strong><span>MEAN ABSOLUTE ERROR<br />NORMALISED 0–1 SCALE</span></p>
      </div>
      <p className="quant-study-note voice-evidence">18 fixed, illustrative values. Filled dots show the stored value; hollow dots show the original. Error is the mean distance between them—not a model benchmark.</p>
      <noscript><p className="voice-system">This study rests at nine levels without JavaScript. Fewer levels move each value further from its original position.</p></noscript>
    </div>
  );
}

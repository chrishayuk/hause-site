"use client";

import { useState } from "react";

// A compact presentation of the library's Comparison interaction. The artboard
// uses a viewBox so the complete arrangement fits the homepage's narrow column.
const perspectives = [
  { label: "For travel", properties: ["Battery life first", "Comfort over long journeys"] },
  { label: "For long-term ownership", properties: ["Repairability first", "Replaceable parts"] },
];

export function HomepageComparison() {
  const [value, setValue] = useState(0);
  const t = value / 100;
  const current = perspectives[value >= 50 ? 1 : 0];
  return <div className="homepage-comparison">
    <p className="edition-comparison-label">The same headphones</p>
    <svg viewBox="0 0 480 140" aria-hidden="true" focusable="false">
      <path d="M80 70H400" stroke="currentColor" opacity={t * .35}/>
      {[80, 240, 400].map((destination, index) => {
        const start = 230 + index * 10;
        return <rect key={destination} x={start + (destination - start) * t - 32} y={38 - index * 5 * (1 - t)} width="64" height="64" fill="currentColor" stroke="var(--bg)" strokeWidth="2"/>;
      })}
    </svg>
    <p className="comparison-parts">Battery · Comfort · Repair</p>
    <label htmlFor="headphone-perspective">Choose a priority</label>
    <input id="headphone-perspective" type="range" min={0} max={100} value={value} onChange={event => setValue(Number(event.target.value))} aria-valuetext={current.label} aria-describedby="headphone-perspectives"/>
    <div className="comparison-endpoints"><span>{perspectives[0].label}</span><span>{perspectives[1].label}</span></div>
    <p className="comparison-current">{current.label}</p>
    <ul>{current.properties.map(property => <li key={property}>{property}</li>)}</ul>
    <details id="headphone-perspectives"><summary>Read both perspectives</summary>{perspectives.map(perspective => <p key={perspective.label}><strong>{perspective.label}:</strong> {perspective.properties.join(". ")}.</p>)}</details>
  </div>;
}

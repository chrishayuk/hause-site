"use client";

import { useState } from "react";
import { Claim } from "@chrishayuk/hause/components/forms/Claim";
import { Refusal } from "@chrishayuk/hause/components/forms/Refusal";
import { Statement } from "@chrishayuk/hause/components/forms/Statement";
import { StudyChoices } from "./StudyChoices";

export function StatementInteraction({ name }: { name: "Statement" | "Claim" | "Refusal" }) {
  const [selected, setSelected] = useState(name === "Statement" ? 1 : 0);
  if (name === "Statement") return <>
    <div className="statement-room" data-isolated={selected === 1}>
      <p className="statement-noise voice-system">Project overview · latest updates · resources · more information</p>
      <Statement text="Some ideas deserve a room." />
      <p className="statement-noise voice-system">Related content · getting started · explore the collection · further reading</p>
    </div>
    <StudyChoices labels={["Surrounded", "Given space"]} selected={selected} onSelect={setSelected} />
  </>;
  if (name === "Claim") {
    const states = [
      { status: "OPEN" as const, detail: "No listening test has been supplied. This remains an assertion to investigate." },
      { status: "SUPPORTED" as const, detail: "In this fictional test, 8 of 10 listeners chose the quieter room. Support is limited to that sample." },
      { status: "REFUTED" as const, detail: "In this alternative fictional result, 8 of 10 listeners chose the other room. The stated preference claim is not supported." },
    ];
    return <><div className="statement-claim" aria-live="polite"><Claim text="Listeners prefer the quieter room." status={states[selected].status} detail={states[selected].detail} /></div><StudyChoices labels={["Not tested", "Supporting result", "Contrary result"]} selected={selected} onSelect={setSelected} label="Illustrative evidence condition" /></>;
  }
  return <><div className="statement-refusal" aria-live="polite">{selected === 0 ? <Refusal kicker="ARCHIVE / FORMAT REQUEST" title="Audio is not held." lines={["requested    audio edition", "available    text, diagram", "action       no substitute generated"]} principle="An absent source is a boundary, not permission to invent one." /> : <div className="study-edition"><p className="voice-evidence">AVAILABLE / TEXT EDITION</p><p className="voice-editorial">Some ideas deserve a room.</p><p className="voice-system">The requested edition is present in this illustrative archive.</p></div>}</div><StudyChoices labels={["Request audio", "Request text"]} selected={selected} onSelect={setSelected} label="Requested archive format" /></>;
}

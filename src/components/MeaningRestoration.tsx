import { BeforeAfter } from "@/vendor/hause/components/exhibition/ExhibitionChoices";
import { Claim } from "@chrishayuk/hause/components/forms/Claim";
import { Evidence } from "@chrishayuk/hause/components/forms/Evidence";
import { Refusal } from "@chrishayuk/hause/components/forms/Refusal";

const claim = "The gallery will open on Friday.";
const claimDetail = "Planned opening; inspection not completed.";
const evidence = "Inspection scheduled for Thursday; no result filed.";
const refusal = "Opening is not confirmed.";
const boundary = "No completed inspection is on record.";
const lines = ["requested    a confirmed opening date", "available    a plan and a scheduled inspection"];

export function MeaningRestoration() {
  return <section className="meaning-restoration section-exhibition" aria-labelledby="restore-title">
    <header><p className="voice-evidence">THE SAME RECORD / TWO READINGS</p><h2 className="voice-editorial" id="restore-title">Give the differences<br /><em>back their meaning.</em></h2><p className="voice-system">A plan. A piece of evidence. A boundary. No facts change when you switch treatments—only how clearly the interface distinguishes their jobs.</p></header>
    <BeforeAfter id="why-treatment" legend="Choose how the record is presented" beforeLabel="01 / Containers" afterLabel="02 / Semantic forms"
      before={<div className="flattened-record">{[{ title: claim, detail: claimDetail, extra: "OPEN" }, { title: "Safety inspection", detail: evidence, extra: "OPEN" }, { title: refusal, detail: boundary, extra: lines.join(" · ") }].map((item, index) => <article key={item.title}><span className="voice-evidence">0{index + 1} / INFO</span><h3 className="voice-system">{item.title}</h3><p className="voice-system">{item.detail}</p><small className="voice-evidence">{item.extra}</small></article>)}</div>}
      after={<div className="restored-record"><div className="restored-assertion"><span className="voice-evidence">01 / AN ASSERTION, NOT A FACT</span><Claim text={claim} status="OPEN" detail={claimDetail} /></div><div className="restored-support"><span className="voice-evidence">02 / WHAT THE RECORD CONTAINS</span><Evidence items={[{ label: "Safety inspection", status: "OPEN", detail: evidence }]} /></div><div className="restored-boundary"><span className="voice-evidence">03 / WHAT IT CANNOT SAY</span><Refusal kicker="REFUSAL" title={refusal} lines={lines} principle={boundary} /></div></div>} />
    <p className="section-exhibition-note voice-evidence">FICTIONAL GALLERY RECORD · A PRESENTATION STUDY, NOT AN EVALUATION</p>
  </section>;
}

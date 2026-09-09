import Link from "next/link";
import { Answer } from "@chrishayuk/hause/components/forms/Answer";
import { Provenance } from "@chrishayuk/hause/components/forms/Provenance";
import { Citation } from "@chrishayuk/hause/components/forms/Citation";
import { JsonLd } from "@chrishayuk/hause/components/JsonLd";
import { publicationMetadata, citationLd } from "@chrishayuk/hause/seo";
import { EVALUATIONS } from "@/data/evaluations";
import { EVIDENCE_RECORD as record, EVIDENCE_SOURCE, SELECTION_CONDITIONS } from "@/data/evidence-archive";
import { OutcomeMatrix } from "@/vendor/hause/components/exhibition/OutcomeMatrix";
import { CASES } from "../../../evals/choosing-1/cases";

export const metadata = publicationMetadata({ title: record.title, description: record.abstract!, url: record.url, siteName: "HAUSE", indexable: true, citation: record });

export default function EvidenceIndex() {
  const misses = SELECTION_CONDITIONS[0].result.outcomes.filter(outcome => !outcome.exact);
  return <main className="evidence-exhibition system-story">
    <JsonLd data={citationLd(record)} />
    <header className="evidence-arrival section-exhibition">
      <p className="voice-evidence">THE EVIDENCE ROOM / RECORDS, NOT RENDERINGS</p>
      <h1 className="voice-editorial">The result.<br /><em>The doubt.</em><br />The record.</h1>
      <div><p className="voice-system">A useful premise should survive inspection. Here, every mark is a scored case—and a missed case stays visible.</p><a href="#selection-record" className="story-link">OPEN THE FIRST RECORD ↓</a><a href="#all-evaluations" className="story-link">ALL FIVE EVALUATIONS ↓</a></div>
    </header>
    <section id="selection-record" className="evidence-ledger section-exhibition" aria-labelledby="selection-record-title">
      <header><p className="voice-evidence">EXHIBIT 01 / CHOOSING-1 · 31 AUGUST 2026 · FROZEN</p><h2 id="selection-record-title" className="voice-editorial">Same cases.<br /><em>Different selectors.</em></h2><p className="voice-system">124 descriptions of unfamiliar content. Three conditions. Each panel below contains every recorded outcome—not a decorative approximation of the score.</p></header>
      <p className="evidence-scope voice-system">One author’s cases, one model family, one run per model condition. That family also co-authored the grammar. This tests whether the written vocabulary carries distinctions; it does not measure interface quality or independent production value.</p>
      <div className="evidence-condition-grid">{SELECTION_CONDITIONS.map(condition => <OutcomeMatrix key={condition.id} label={condition.label} outcomes={condition.result.outcomes} scope={condition.scope} sourceHref={`${EVIDENCE_SOURCE}/result-${condition.id}.json`} />)}</div>
      <Link href="/evals/choosing-1" className="story-link">READ THE COMPLETE METHOD AND ANALYSIS ↗</Link>
    </section>
    <section className="evidence-misses section-exhibition" aria-labelledby="misses-title">
      <header><p className="voice-evidence">TURN THE RECORD OVER / CONDITION A</p><h2 id="misses-title" className="voice-editorial">The {misses.length} that<br /><em>didn’t land.</em></h2><p className="voice-system">A headline rounds these away. A useful record opens them up. Missing output and a refusal on an ambiguous case are different failures.</p></header>
      <div className="evidence-miss-pair">{misses.map(outcome => {
        const stimulus = CASES.find(item => item.id === outcome.id)!;
        return <article key={outcome.id} data-recorded-miss={outcome.id}>
          <p className="voice-evidence">{outcome.id.toUpperCase()} / {outcome.kind.toUpperCase()} / {outcome.domain.toUpperCase()}</p>
          <blockquote className="voice-editorial">“{stimulus.content}”</blockquote>
          <dl><div><dt>Expected</dt><dd>{outcome.expected}{stimulus.alsoAcceptable ? ` (also accepted: ${stimulus.alsoAcceptable.join(", ")})` : ""}</dd></div><div><dt>Recorded selection</dt><dd>{outcome.selected}</dd></div></dl>
          <p className="voice-system">{outcome.why || "No valid answer was recorded for this case. The missing output is counted as a miss, not silently discarded."}</p>
          <p className="voice-system"><strong>The deciding test:</strong> {stimulus.decidingTest}</p>
          <a href={`${EVIDENCE_SOURCE}/cases.ts`} className="story-link">READ THE FROZEN CASE ↗</a>
        </article>;
      })}</div>
    </section>
    <section className="evidence-archive section-exhibition" aria-labelledby="archive-title">
      <header><p className="voice-evidence">THE ARTEFACT / BEFORE THE SCORE</p><h2 id="archive-title" className="voice-editorial">The rule was<br /><em>written first.</em></h2><p className="voice-system">The following is a verbatim excerpt from the preregistration—not a reconstructed document or an image of one.</p></header>
      <figure><figcaption className="voice-evidence">PREREGISTRATION.md / 2026-08-31</figcaption><blockquote className="voice-editorial">“CHOOSING-1 runs once, is published, and is frozen.”</blockquote><p className="voice-system">The preregistration commits to publishing failures and testing later changes on fresh material. It also records the central weakness: the cases and grammar share an author.</p><a href={`${EVIDENCE_SOURCE}/PREREGISTRATION.md`} className="story-link">INSPECT THE ORIGINAL ARTEFACT ↗</a></figure>
    </section>
    <Answer id="what-evidence-exists" question="What evidence exists for HAUSE?" answer="HAUSE publishes evaluations of form selection, question routing and what models learn from its website. These are scoped tests by the author, not proof of broad adoption. VINDEX3 and CHRISHAYUK demonstrate use in two publications by the same author; independent production reuse has not yet been established." />
    <section id="all-evaluations" className="evidence-routes section-exhibition" aria-labelledby="evaluations-title"><header><p className="voice-evidence">FIVE RECORDS / DIFFERENT QUESTIONS</p><h2 id="evaluations-title" className="voice-editorial">Follow the question<br /><em>you came with.</em></h2></header>{EVALUATIONS.map((evaluation, index) => <article key={evaluation.id}><span className="voice-editorial">0{index + 1}</span><div><p className="voice-evidence">{evaluation.id.toUpperCase()}</p><h3 className="voice-editorial"><Link href={`/evals/${evaluation.id}`}>{evaluation.title} ↗</Link></h3><p className="voice-system">{evaluation.text}</p></div></article>)}</section>
    <section className="evidence-boundary section-exhibition"><p className="voice-evidence">THE NEXT RECORD IS NOT HERE YET</p><h2 className="voice-editorial">Chosen correctly<br />is not the same as<br /><em>valuable in practice.</em></h2><p className="voice-system">Independent production reuse is the next adoption proof point. It remains an open task, not an empty case study dressed as evidence.</p><div><Link className="story-link" href="/in-practice">SEE THE CURRENT EXAMPLES ↗</Link><Link className="story-link" href="/ai-native-design-systems">WHERE THE CATEGORY CLAIM ENDS ↗</Link></div></section>
    <Provenance record={record} citeHref="#cite" /><Citation record={record} />
  </main>;
}

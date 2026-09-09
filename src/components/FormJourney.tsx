import Link from "next/link";
import { GRAMMAR } from "@/data/grammar";
import { formBySlug, formSlug } from "@/data/forms";
import { INTENT_DOORS, selectionHref, selectionState, type SelectionQuery } from "@/data/selection";
import { FormStudy } from "@/studies";
import { DecisionTrail } from "@/vendor/hause/components/exhibition/DecisionTrail";

export function FormJourney({ query }: { query: SelectionQuery }) {
  const { intent, act } = selectionState(query);
  const form = formBySlug(formSlug(act.form))!;
  return <section className="journey-room" id="selector" aria-label="Guided form selection">
    <p className="voice-evidence journey-kicker">TRY THE GRAMMAR / {GRAMMAR.length} WAYS IN</p>
    <DecisionTrail layout="beside" steps={[
      { id: "intent", title: "What needs to happen?", selected: intent.id, options: GRAMMAR.map(item => ({ id: item.id, ...INTENT_DOORS[item.id], href: selectionHref(item.acts[0].form, "selector") })) },
      { id: "act", title: "Which act is yours?", selected: act.form, options: intent.acts.map(item => ({ id: item.form, label: item.doing, detail: item.test, href: selectionHref(item.form) })) },
    ]}>
      <div className="selection-result" id="selection-result" data-selected-form={act.form}>
        <div className="selection-verdict"><p className="voice-evidence">03 / YOUR SELECTED ACT</p><h2 className="voice-editorial">Use {act.form}<span>.</span></h2><p className="voice-system">{form.line}</p></div>
        <div className="selection-check"><p className="voice-evidence">CHECK BEFORE YOU COMPOSE</p><p className="voice-editorial">{act.test}</p><p className="voice-system">This follows your choices through the published grammar. It is not an AI judgement about evidence you have not supplied.</p>
          <div className="journey-links"><Link href={`/forms/${form.slug}`}>FULL SPECIMEN ↗</Link><Link href={`/forms/${form.slug}#spec`}>REACT CONTRACT ↗</Link></div>
        </div>
      </div>
      <div className="selection-preview">
        {form.name === "Hero" ? <div className="selection-hero-study" data-study="Hero"><p className="voice-evidence">HERO / AN OPENING AT DISPLAY SCALE</p><p className="voice-editorial">Give one idea<br />the room.</p><p className="voice-system">A typographic preview. The complete Hero specimen lives on its own page, where it can be the first heading.</p></div> : <FormStudy key={form.name} form={form} />}
      </div>
      {!!act.insteadOf?.length && <aside className="selection-neighbours"><h3 className="voice-evidence">NEARLY RIGHT IS A DIFFERENT ACT</h3>{act.insteadOf.map(item => <Link key={item.form} href={selectionHref(item.form)}><strong className="voice-editorial">{item.form} instead?</strong><span className="voice-system">When {item.when}.</span><span aria-hidden="true">↗</span></Link>)}</aside>}
    </DecisionTrail>
    <a href="#complete-grammar" className="story-link">READ THE COMPLETE GRAMMAR ↓</a>
  </section>;
}

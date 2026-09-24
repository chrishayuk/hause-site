import Link from "next/link";
import { Claim } from "@chrishayuk/hause/components/forms/Claim";
import { Evidence } from "@chrishayuk/hause/components/forms/Evidence";
import { Refusal } from "@chrishayuk/hause/components/forms/Refusal";
import catalogue from "@/data/choosing1-a.json";
import grammar from "@/data/choosing1-b.json";
import resolver from "@/data/choosing1-c.json";

const exact = (result: { outcomes: { exact: boolean }[] }) => result.outcomes.filter(outcome => outcome.exact).length;
const choices = [{ id: "claim", label: "Claim" }, { id: "evidence", label: "Evidence" }, { id: "refusal", label: "Refusal" }];

// One recorded evaluation, presented through three actual HAUSE forms.
// Native radios preserve the complete reading without client JavaScript.
export function ActDemo() {
  return <section id="try" className="act-demo hause-grid" aria-labelledby="act-demo-title"><div className="col-span-12">
    <h2 id="act-demo-title">From the CHOOSING-1 evaluation</h2>
    <div className="act-demo-layout">
      <fieldset><legend>Read as</legend>{choices.map((choice, index) => <label className="act-choice" key={choice.id}><input type="radio" name="homepage-act" id={`choose-${choice.id}`} defaultChecked={index === 0}/><span>{choice.label}</span></label>)}</fieldset>
      <div className="act-results">
        <div className="act-result act-claim" role="region" aria-label="Claim from the evaluation"><Claim text={`${exact(catalogue)} of ${catalogue.outcomes.length} form selections matched the expected answer.`} status="SUPPORTED" detail="CHOOSING-1: unfamiliar cases, supplied with form names and one-line descriptions. A result about form selection within this evaluation."/><Link className="story-link" href="/forms/claim">About the Claim form</Link></div>
        <div className="act-result act-evidence" role="region" aria-label="Evidence from the evaluation"><Evidence items={[
          { label: `Names and descriptions: ${exact(catalogue)}/${catalogue.outcomes.length}`, status: "SUPPORTED", detail: "Exact selections against the preregistered expected answers." },
          { label: `Full grammar: ${exact(grammar)}/${grammar.outcomes.length}`, status: "SUPPORTED", detail: "The same score. This evaluation cannot establish the grammar’s added value." },
          { label: `Keyword resolver: ${exact(resolver)}/${resolver.outcomes.length}`, status: "SUPPORTED", detail: "The frozen keyword baseline, evaluated on the same cases." },
        ]}/><Link className="story-link" href="/forms/evidence">About the Evidence form</Link></div>
        <div className="act-result act-refusal" role="region" aria-label="Limit of the evaluation"><Refusal title="Interface quality was not tested." lines={["measured     form selection", "not measured interface quality or independent production value"]} principle="This result does not establish that the selected forms produce better interfaces."/><Link className="story-link" href="/forms/refusal">About the Refusal form</Link></div>
      </div>
    </div>
    <p className="act-takeaway">One author’s preregistered evaluation. <Link href="/evals/choosing-1">Read the method, results and limitations</Link>.</p>
  </div></section>;
}

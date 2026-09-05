import Link from "next/link";
import {Claim} from "@chrishayuk/hause/components/forms/Claim";
import {Evidence} from "@chrishayuk/hause/components/forms/Evidence";
import {Refusal} from "@chrishayuk/hause/components/forms/Refusal";
import {Comparison} from "@chrishayuk/hause/components/forms/Comparison";

// Native radio controls keep the four choices usable before hydration and with
// JavaScript disabled. Each result uses the library's actual semantic form.
const choices=[
 {id:"claim",act:"Assert something",form:"Claim",rule:"State a belief and make its current status visible."},
 {id:"evidence",act:"Show what supports it",form:"Evidence",rule:"Show the measurement, its method and its limits."},
 {id:"refusal",act:"Say it cannot be supported",form:"Refusal",rule:"Name what is missing and decline to invent the answer."},
 {id:"comparison",act:"Compare two interpretations",form:"Comparison",rule:"Keep the same object visible while changing how it is understood."},
];
export function ActDemo(){return <section id="try" className="act-demo hause-grid" aria-labelledby="act-demo-title"><div className="col-span-12 md:col-start-2 md:col-span-10">
 <p className="voice-evidence">TRY THE IDEA / FOUR CHOICES</p><h2 id="act-demo-title" className="voice-editorial">What should the interface do?</h2>
 <div className="act-demo-layout"><fieldset><legend className="voice-system">Choose an action. See its form.</legend>{choices.map((c,i)=><label className="act-choice" key={c.id}><input type="radio" name="homepage-act" id={`choose-${c.id}`} defaultChecked={i===0}/><span>{c.act}<small className="voice-evidence">{c.form} ↗</small></span></label>)}</fieldset>
 <div className="act-results">{choices.map(c=><div key={c.id} className={`act-result act-${c.id}`} role="region" aria-label={`${c.form} example`}><p className="voice-evidence act-result-label">{c.form.toUpperCase()} / ILLUSTRATIVE EXAMPLE</p><p className="voice-system act-rule">{c.rule}</p>
 {c.id==="claim"&&<Claim text="These headphones last around forty hours on a charge." status="ONGOING" detail="A fictional product claim. The status tells a reader it still needs support."/>}
 {c.id==="evidence"&&<Evidence items={[{label:"Battery test",status:"SUPPORTED",detail:"Example data: 38.5 hours across two units under lab conditions. A measurement with a scope, not a promise for every listener."}]}/>}
 {c.id==="refusal"&&<Refusal kicker="THE LIMIT" title="NOT SUBSTANTIATED" lines={["requested    recyclable materials","available    an unverified supplier statement"]} principle="There is not enough evidence to make this claim."/>}
 {c.id==="comparison"&&<Comparison kicker="ONE PRODUCT / TWO PRIORITIES" objectLabel="THE SAME HEADPHONES" blockLabels={["BATTERY","COMFORT","REPAIR"]} left={{label:"For travel",properties:["Battery life first","Comfort over long journeys"]}} right={{label:"For long-term ownership",properties:["Repairability first","Replaceable parts"]}}/>}
 <Link className="story-link" href={`/forms/${c.id}`}>USE {c.form.toUpperCase()} ↗</Link></div>)}</div></div>
 <p className="voice-system act-takeaway">AI already chooses what to say. HAUSE gives it a vocabulary for choosing how that meaning should appear.</p>
 </div></section>;}

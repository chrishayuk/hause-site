import { MeasurementTrace } from "@chrishayuk/hause/components/MeasurementTrace";
import { EvidenceTable } from "@chrishayuk/hause/components/EvidenceTable";
import measurements from "@/data/publication-evidence.json";
const components = ["relation", "entity", "binding"] as const;
const source = { label: "ADDRESS-BUILD-1 · original reader data", href: measurements.source };
const series = components.map(id => ({ id, label: id, domain: [0, 1] as const, precision: 2, unit: "accuracy", values: measurements.layers.map(layer => measurements.sameLayer[id][`L${layer}` as keyof typeof measurements.sameLayer[typeof id]]) }));
export function PublicationEvidence() {
 return <div>
  <h2 className="text-3xl mb-6">The measurement stays visible.</h2>
  <p className="mb-8 max-w-2xl">One record, two readings. These are the actual held-out reader measurements from ADDRESS-BUILD-1, not generated animation data. Playback changes the selected stage. The table retains every observation.</p>
  <MeasurementTrace label="Relation first. Entity binding later." kicker="RECORDED EVIDENCE / ADDRESS-BUILD-1" stageLabel="Layer" stages={measurements.layers.map(layer => ({id: String(layer), label: `L${layer}`, caution: layer >= 28 ? "Answer-token availability contaminates interpretation at this endpoint." : undefined}))} series={series} annotations={[{from:"8",to:"12",label:"Reader coordinates change"},{from:"20",to:"24",label:"Reader coordinates change"}]} bands={[{from:"28",to:"30",label:"Endpoint caution",caution:true}]} summary="Gemma 3 4B IT · capital versus language · final-position residual. Stages are ordered, equally spaced observations. L28–30 is not clean evidence of address geometry." source={source}/>
  <EvidenceTable caption="The same record, available for inspection" rowLabel="Layer" columns={components.map(id => ({id,label:id,precision:2,unit:"accuracy"}))} rows={measurements.layers.map((layer,i) => ({id:String(layer),label:`L${layer}`,values:Object.fromEntries(series.map(track => [track.id,track.values[i]])),note:layer>=28?"Endpoint: answer-token availability":undefined}))} source={source} note="Mean held-out accuracy across three folds. Display rounding does not change the stored measurements."/>
  <p className="mt-6 text-sm"><a className="underline" href={measurements.record}>Read the complete experiment and scope ↗</a> · <a className="underline" href="https://github.com/chrishayuk/hause/blob/main/EVIDENCE.md">Component contracts ↗</a></p>
 </div>;
}

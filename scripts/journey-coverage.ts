import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { FORMS } from "../src/data/forms";
import { GRAMMAR, grammarCoverage } from "../src/data/grammar";
import { INTENT_DOORS, selectionHref, selectionState } from "../src/data/selection";
import { KNOWLEDGE_EDGES, KNOWLEDGE_NODES, knowledgeAnswerNodes } from "../src/data/knowledge";
import { graphNeighbourhood } from "../src/vendor/hause/exhibition-graph";

assert.equal(FORMS.length, 35, "The frozen package has not been silently upgraded");
assert(readFileSync("src/app/journeys.css", "utf8").includes(".journey-page .reveal { opacity:1; transform:none; }"), "Form previews have a visible no-JS fallback");
assert.deepEqual(grammarCoverage().missing, []);
assert.deepEqual(grammarCoverage().duplicated, []);
assert.deepEqual(Object.keys(INTENT_DOORS).sort(), GRAMMAR.map(intent => intent.id).sort());
for (const form of FORMS) {
  const url = new URL(selectionHref(form.name), "https://hause.design");
  const result = selectionState(Object.fromEntries(url.searchParams));
  assert.equal(result.act.form, form.name);
  assert(result.intent.acts.includes(result.act));
}
assert.equal(selectionState({ intent: ["declining", "asserting"], form: ["Refusal", "Claim"] }).act.form, "Refusal");
assert.equal(selectionState({ intent: "not-real", form: "not-real" }).act.form, "Statement");
assert.equal(selectionState({ intent: "asserting", form: "Quantisation" }).intent.id, "over-time", "The chosen form resolves conflicting family parameters");
const graphNodes = KNOWLEDGE_NODES.map(node => ({ ...node, href: node.url, focusHref: `/knowledge?node=${encodeURIComponent(node.id)}`, sourceHref: node.sourceUrl }));
const graphEdges = KNOWLEDGE_EDGES.map(edge => ({ ...edge, relation: edge.kind }));
for (const node of KNOWLEDGE_NODES) {
  const graph = graphNeighbourhood(graphNodes, graphEdges, node.id);
  assert.equal(graph.incoming.length, KNOWLEDGE_EDGES.filter(edge => edge.to === node.id).length);
  assert.equal(graph.outgoing.length, KNOWLEDGE_EDGES.filter(edge => edge.from === node.id).length);
}
assert(!knowledgeAnswerNodes("What did chrishayuk contribute?").some(node => ["capability:decision-trail", "capability:graph-neighbourhood"].includes(node.id)));
for (const [file, expected] of Object.entries({ "selection-not-conversion.mp4": "e3223d755e1f18aa0a7f47c1a6a599eaa06cedca19590ee3e87237ef59f9fac0", "selection-not-conversion-poster.jpg": "449202b80109203abc39ce26dcf19385846959957de515c32f1ce9467329c1b7" })) {
  assert.equal(createHash("sha256").update(readFileSync(`public/media/practice/${file}`)).digest("hex"), expected, "Original VINDEX3 archive remains unchanged");
}

function checkHtml(raw: string, route: string) {
  const html = raw.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, `${route}: unique IDs`);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `${route}: one h1`);
  assert([...html.matchAll(/href="#([^"]+)"/g)].every(match => ids.includes(match[1])), `${route}: local anchors exist`);
  assert(!html.includes("<iframe"), `${route}: no unrequested YouTube player`);
  return html;
}
if (process.argv.includes("--built")) {
  const html = checkHtml(readFileSync(".next/server/app/in-practice.html", "utf8"), "in-practice");
  assert(html.includes('id="vindex3"') && html.includes('id="chrishayuk"'));
  assert(html.includes("/media/practice/selection-not-conversion.mp4"));
  const video = html.match(/<video\b[^>]*>/)?.[0] ?? "";
  assert(video.includes("controls") && video.includes('preload="none"') && !video.includes("autoPlay"));
  assert(html.includes("Not independent adoption.") && html.includes("TEXT ALTERNATIVE"));
}
async function main() {
const base = process.argv.find(arg => arg.startsWith("--url="))?.slice(6);
if (base) {
  async function get(route: string) {
    const response = await fetch(`${base}${route}`);
    assert.equal(response.status, 200, route);
    return checkHtml(await response.text(), route);
  }
  // Actual HTTP responses, not a browser interaction or visual/layout test.
  for (const form of FORMS) {
    const html = await get(selectionHref(form.name));
    assert(html.includes(`data-selected-form="${form.name}"`) && html.includes(`data-study="${form.name}"`), `${form.name}: selected study rendered`);
    assert(html.includes('id="complete-grammar"'));
    assert(FORMS.every(item => html.includes(`href="/forms/${item.slug}"`)), "Full reference stays server-rendered");
  }
  for (const node of KNOWLEDGE_NODES) {
    const html = await get(`/knowledge?node=${encodeURIComponent(node.id)}`);
    assert(html.includes(`data-graph-focus="${node.id}"`));
    const count = KNOWLEDGE_EDGES.filter(edge => edge.from === node.id).length + KNOWLEDGE_EDGES.filter(edge => edge.to === node.id).length;
    assert.equal((html.match(/data-graph-edge=/g) ?? []).length, count, `${node.id}: all directed edges rendered`);
  }
  await get("/choosing?form=Hero&form=Claim&intent=nope");
  await get("/knowledge?q=film&q=citation&kind=capability&kind=page&node=missing");
  const empty = await get("/knowledge?q=zzzzzzzzzzzzzz");
  assert(empty.includes("No matching record"));
  const record = await fetch(`${base}/api/knowledge`).then(response => response.json()) as { nodes: unknown[]; edges: unknown[] };
  assert.equal(record.nodes.length, KNOWLEDGE_NODES.length);
  assert.equal(record.edges.length, KNOWLEDGE_EDGES.length);
  await get("/in-practice");
}
console.log(`3 journeys: ${FORMS.length} selections, ${KNOWLEDGE_NODES.length} connected records and original media verified${base ? " against served HTML" : ""}`);
}
main().catch(error => { console.error(error); process.exitCode = 1; });

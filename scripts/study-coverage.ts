import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { FORMS } from "../src/data/forms";
import { STUDIES, type StudyName } from "../src/studies/catalog";
import { BYTE_FIELDS, fieldOffset, activeUnits, arrangement, cappedGrade, channelCount } from "../src/studies/mechanisms";
import { KNOWLEDGE_EDGES, KNOWLEDGE_NODES } from "../src/data/knowledge";

assert.deepEqual(Object.keys(STUDIES).sort(), FORMS.map(form => form.name).sort(), "Every held form needs an authored study.");
assert.equal(new Set(Object.values(STUDIES).map(study => study.title)).size, FORMS.length, "Each encounter needs its own editorial title.");
for (const study of Object.values(STUDIES)) {
  assert(study.introduction.length > 40);
  assert(study.reading.length > 40);
}
assert.equal(BYTE_FIELDS.reduce((sum, field) => sum + field.bytes, 0), 32);
assert.deepEqual(BYTE_FIELDS.map((_, i) => fieldOffset(i)), [0, 4, 8, 16]);
const routes = [0, 1, 2].map(activeUnits);
for (const selected of routes) {
  assert.equal(new Set(selected).size, 6);
  assert(selected.every(index => index >= 0 && index < 36));
}
assert.equal(new Set(routes.map(route => route.join(","))).size, 3);
for (const progress of [0, .25, .5, .75, 1]) {
  for (let i = 0; i < 4; i++) {
    const position = arrangement(i, progress);
    assert(position.left >= 10 && position.left <= 90);
    assert(position.top >= 40 && position.top <= 60);
  }
}
assert.equal(cappedGrade([]), 0);
assert.equal(cappedGrade([1]), 1);
assert.equal(cappedGrade([1, 2]), 2);
assert.deepEqual([6, 3, 1].map(channelCount), [2, 4, 12]);
assert.equal(KNOWLEDGE_EDGES.filter(edge => edge.from === "page:/forms" && edge.kind === "documents").length, FORMS.length);
const trace = KNOWLEDGE_EDGES.find(edge => edge.from === "form:Claim" && edge.kind === "addresses");
assert(trace && KNOWLEDGE_NODES.some(node => node.id === trace.to), "The graph study must use an existing relationship.");
console.log(`${FORMS.length}/${FORMS.length} authored study records · mechanism and graph invariants pass`);

if (process.argv.includes("--built")) {
  for (const form of FORMS) {
    const html = readFileSync(`.next/server/app/forms/${form.slug}.html`, "utf8").replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
    const anchors = [...html.matchAll(/href="#([^"]+)"/g)].map(match => match[1]);
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `${form.name}: exactly one h1`);
    assert.equal(new Set(ids).size, ids.length, `${form.name}: unique IDs`);
    assert(anchors.every(anchor => ids.includes(anchor)), `${form.name}: every local fragment resolves`);
    assert(html.includes(`data-study="${form.name}"`), `${form.name}: authored encounter is rendered`);
    const encounter = html.indexOf(`data-study="${form.name}"`);
    assert(encounter < html.indexOf(`id="what-is-the-${form.slug}-form"`), `${form.name}: study before definition`);
    assert.equal(html.includes("HELD · NOT YET EXHIBITED"), form.name === "Film", `${form.name}: truthful specimen availability`);
    const title = STUDIES[form.name as StudyName].title.replaceAll("&", "&amp;").replaceAll("'", "&#x27;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
    if (form.name !== "Quantisation") assert(html.includes(title), `${form.name}: its own title is present`);
    if (form.name === "Film") assert(html.includes("STORYBOARD / NOT A VIDEO"));
  }
  console.log(`${FORMS.length}/${FORMS.length} built pages pass study, heading, anchor and availability checks`);
}

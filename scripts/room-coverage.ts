import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { FORMS, formSlug } from "../src/data/forms";
import { ROOM_PROGRAMMES } from "../src/rooms/programmes";
import { KNOWLEDGE_EDGES } from "../src/data/knowledge";

for (const [mode, chapters] of Object.entries(ROOM_PROGRAMMES)) {
  const names = chapters.flatMap(chapter => chapter.forms);
  const expected = FORMS.filter(form => form.mode === mode).map(form => form.name);
  assert.deepEqual([...names].sort(), expected.sort(), `${mode}: complete programme with no duplicate forms`);
  assert.equal(new Set(chapters.map(chapter => chapter.id)).size, chapters.length);
  const documented = KNOWLEDGE_EDGES.filter(edge => edge.from === `page:/${mode}s` && edge.kind === "documents");
  assert.equal(documented.length, names.length);
  if (process.argv.includes("--built")) {
    const html = readFileSync(`.next/server/app/${mode}s.html`, "utf8").replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
    const anchors = [...html.matchAll(/href="#([^"]+)"/g)].map(match => match[1]);
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `${mode}: one h1`);
    assert.equal(ids.length, new Set(ids).size, `${mode}: unique IDs`);
    assert(anchors.every(anchor => ids.includes(anchor)), `${mode}: working local fragments`);
    assert(names.every(name => ids.includes(formSlug(name))), `${mode}: legacy specimen anchors preserved`);
    assert(names.every(name => html.includes(`href="/forms/${formSlug(name)}"`)), `${mode}: full studies reachable`);
    assert(chapters.every(chapter => ids.includes(chapter.id)));
    assert(html.includes(`data-room="${mode}"`));
    const first = mode === "performance" ? "transformation" : mode === "instrument" ? "comparison" : "statement";
    assert(html.indexOf(`id="${first}"`) < html.indexOf('id="programme"'), `${mode}: encounter precedes programme`);
    assert(html.includes('id="cite"'), `${mode}: citable room record`);
    if (mode === "statement") assert(html.includes("ILLUSTRATIVE VALUES, NOT RESEARCH EVIDENCE"));
    if (mode === "performance") assert(html.includes("STORYBOARD / FILM ASSET HELD"));
  }
}
console.log("3/3 mode-room programmes cover all 35 forms and sourced relationships" + (process.argv.includes("--built") ? " · built routes, anchors and opening encounters pass" : ""));

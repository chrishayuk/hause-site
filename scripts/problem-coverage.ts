import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { PROBLEMS, PROBLEM_ENCOUNTERS, problemRecord } from "../src/data/problems";
import { documentedNames, manifestNames, documentCheck, damagedCheck, LISTENING_RECORD, GALLERY_RECORD } from "../src/problems/records";
import { knowledgeAnswerNodes, KNOWLEDGE_EDGES } from "../src/data/knowledge";
import { citationFormats } from "@chrishayuk/hause/cite";

assert.equal(PROBLEMS.length, 8);
assert(PROBLEMS.every(problem => !!PROBLEM_ENCOUNTERS[problem.slug]));
assert(documentCheck.matches);
assert(!damagedCheck.matches && damagedCheck.missing.length === 1);
assert.equal(documentedNames.length, 35);
assert.equal(manifestNames.length, 35);
assert.equal(LISTENING_RECORD.choices.filter(choice => choice === "A").length, 8);
assert.equal(LISTENING_RECORD.choices.filter(choice => choice === "B").length, 2);
const css = readFileSync("src/app/problem-experiments.css", "utf8");
assert(css.includes(".problem-chapter .reveal { opacity:1; transform:none; }"));
assert(css.includes("--color-status-open:var(--fg)") && css.includes("--color-status-refuted:var(--fg)"));
assert(css.includes('data-playing="true"') && css.includes("prefers-reduced-motion:reduce"));
assert(!knowledgeAnswerNodes("What did chrishayuk contribute?").some(node => ["capability:record-difference", "capability:sequence-player"].includes(node.id)));
for (const id of ["sequence-player", "record-difference"]) assert(KNOWLEDGE_EDGES.some(edge => edge.kind === "contributed" && edge.to === `capability:${id}` && edge.from.startsWith("problem:")));

const controls: Record<string, [string, number]> = {
  "everything-becomes-a-card": ["problem-container-treatment", 2],
  "interfaces-that-cannot-refuse": ["problem-request", 2],
  "pages-machines-cannot-read": ["problem-reader", 3],
  "nothing-to-cite": ["problem-citation-record", 2],
  "the-book-drifts-from-the-code": ["problem-drift", 3],
  "everything-sounds-equally-certain": ["problem-certainty", 3],
};
function check(raw: string, slug: string) {
  const html = raw.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, `${slug}: unique IDs`);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `${slug}: one h1`);
  assert([...html.matchAll(/href="#([^"]+)"/g)].every(match => ids.includes(match[1])), `${slug}: local anchors`);
  assert(html.indexOf('id="demonstration"') < html.indexOf('id="encounter-title"'), "Experiment before the longer explanation");
  assert(html.includes('id="the-answer"') && html.includes('id="cite"'));
  const control = controls[slug];
  if (control) assert.equal(html.split(`name="${control[0]}"`).length - 1, control[1], `${slug}: native no-JS choices`);
  if (slug === "everything-becomes-a-card") for (const text of Object.values(GALLERY_RECORD)) assert(html.split(text).length >= 3, `Both treatments retain: ${text}`);
  if (slug === "nothing-to-cite") {
    const record = problemRecord(PROBLEMS.find(problem => problem.slug === slug)!);
    const dataDownloads = [...html.matchAll(/href="data:text\/plain;charset=utf-8,([^"]+)"/g)].map(match => decodeURIComponent(match[1]));
    for (const format of citationFormats(record)) assert(dataDownloads.includes(format.text), `${format.id}: exact record export`);
  }
  if (slug === "the-book-drifts-from-the-code") {
    assert.equal((html.match(/data-inventory-match="true"/g) ?? []).length, 2);
    assert.equal((html.match(/data-inventory-match="false"/g) ?? []).length, 1);
    assert(!html.includes("THREE COUNTS"));
  }
  if (slug === "motion-that-means-nothing") {
    for (const id of ["flat", "exit", "hold", "enter", "rest"]) assert(html.includes(`data-sequence-frame="${id}"`));
    assert.equal((html.match(/hidden="" data-sequence-frame=/g) ?? []).length, 4, "Only the final frame is visible in SSR");
    assert(html.includes("READ THE COMPLETE SEQUENCE") && html.includes("PLAY FROM START"));
  }
  if (slug === "tutorial-or-reference-never-both") assert(html.includes("LEARN") && html.includes("INSPECT") && html.includes("SPEC"));
}
async function main() {
  if (process.argv.includes("--built")) for (const problem of PROBLEMS) check(readFileSync(`.next/server/app/problems/${problem.slug}.html`, "utf8"), problem.slug);
  const base = process.argv.find(arg => arg.startsWith("--url="))?.slice(6);
  if (base) for (const problem of PROBLEMS) {
    const response: Response = await fetch(`${base}/problems/${problem.slug}`);
    assert.equal(response.status, 200);
    check(await response.text(), problem.slug);
  }
  console.log(`8 problem chapters: scoped records, actual citation exports, native choices and resting-state contracts pass${base ? " against served HTML" : ""}`);
}
main().catch(error => { console.error(error); process.exitCode = 1; });

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { SELECTION_CONDITIONS } from "../src/data/evidence-archive";
import { EVALUATIONS } from "../src/data/evaluations";
import { FORMS } from "../src/data/forms";
import { PROBLEMS } from "../src/data/problems";
import { CASES } from "../evals/choosing-1/cases";
import { outcomeSummary } from "../src/vendor/hause/exhibition-outcomes";
import { knowledgeAnswerNodes, KNOWLEDGE_EDGES } from "../src/data/knowledge";

for (const condition of SELECTION_CONDITIONS) {
  assert.deepEqual(condition.result, JSON.parse(readFileSync(`evals/choosing-1/result-${condition.id}.json`, "utf8")), "Published data is the original frozen artefact");
  assert.equal(condition.result.outcomes.length, CASES.length);
  assert(condition.result.outcomes.every(outcome => CASES.some(item => item.id === outcome.id)));
  assert.equal(outcomeSummary(condition.result.outcomes).exact, condition.result.summary.exact);
}
assert.deepEqual(SELECTION_CONDITIONS.map(condition => outcomeSummary(condition.result.outcomes).exact), [122,122,8]);
assert(!knowledgeAnswerNodes("What did chrishayuk contribute?").some(node => ["capability:visual-plate", "capability:exhibition-choices", "capability:outcome-matrix"].includes(node.id)), "Do not misattribute the hause.design donation to CHRISHAYUK");
assert.equal(KNOWLEDGE_EDGES.filter(edge => edge.kind === "contributed" && edge.from.startsWith("page:")).length, 5);
if (process.argv.includes("--built")) {
  for (const route of ["problems", "forms", "evidence"]) {
    const html = readFileSync(`.next/server/app/${route}.html`, "utf8").replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
    assert.equal(new Set(ids).size, ids.length, `${route}: unique IDs`);
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `${route}: one h1`);
    assert([...html.matchAll(/href="#([^"]+)"/g)].every(match => ids.includes(match[1])), `${route}: valid local links`);
    if (route === "forms") {
      assert(FORMS.every(form => html.includes(`href="/forms/${form.slug}"`)), "All form doors preserved");
      assert.equal((html.match(/name="collection-mode"/g) ?? []).length, 3);
      assert(html.indexOf("collection-encounter") < html.indexOf('id="statements"'));
    }
    if (route === "problems") {
      assert(PROBLEMS.every(problem => html.includes(`href="/problems/${problem.slug}"`)));
      assert.equal((html.match(/name="why-treatment"/g) ?? []).length, 2);
      for (const text of ["The gallery will open on Friday.", "Planned opening; inspection not completed.", "Inspection scheduled for Thursday; no result filed.", "Opening is not confirmed.", "No completed inspection is on record."]) {
        assert(html.split(text).length >= 3, `Both treatments contain the same record: ${text}`);
      }
      assert(html.includes("FICTIONAL GALLERY RECORD"));
    }
    if (route === "evidence") {
      assert(EVALUATIONS.every(evaluation => html.includes(`href="/evals/${evaluation.id}"`)));
      assert.equal((html.match(/data-exact=/g) ?? []).length, CASES.length * 3, "One mark per outcome");
      assert.equal((html.match(/data-exact="true"/g) ?? []).length, 252);
      assert.equal((html.match(/<tbody>/g) ?? []).length, 3, "All three full text records present");
      assert.equal((html.match(/data-recorded-miss=/g) ?? []).length, 2);
      assert(html.includes('data-recorded-miss="c008"') && html.includes('data-recorded-miss="a007"'));
      assert(!html.includes("data-visual-study"), "Evidence does not use invented exhibition imagery");
      assert(html.includes("not a measurement of today") && html.includes("independent production"));
    }
  }
}
console.log("3 section narratives · frozen source equality and 122/122/8 results pass" + (process.argv.includes("--built") ? " · native controls, complete records, headings and links pass" : ""));

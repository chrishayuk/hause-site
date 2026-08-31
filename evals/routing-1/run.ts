/**
 * ROUTING-1 — run once, publish, freeze. A regression gate for the
 * defect CHOOSING-1 found, not evidence that the router is good.
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { askHause, classify } from "../../src/data/askHause";
import { ROUTING_CASES, type Kind } from "./cases";

/** The answer-id family each kind should resolve inside. */
const family = (id: string): Kind | "refusal" | "other" =>
	id.startsWith("recommend-") ? "select"
	: id.startsWith("form-") ? "form"
	: id.startsWith("problem-") ? "problem"
	: id === "genealogy" ? "history"
	: id === "no-form" ? "refusal"
	: "system";

const outcomes = ROUTING_CASES.map((c) => {
	const kind = classify(c.q);
	const answer = askHause(c.q);
	const fam = family(answer.id);
	return {
		id: c.id,
		topic: c.topic,
		q: c.q,
		expected: c.kind,
		routedTo: kind,
		answered: answer.id,
		family: fam,
		kindCorrect: kind === c.kind,
		// A system question answered by an interrogation is "system"; a
		// select answered by a recommendation is "select". The family is
		// what the reader actually gets.
		familyCorrect: fam === c.kind || (c.kind === "system" && fam === "system"),
	};
});

const n = outcomes.length;
const summary = {
	eval: "ROUTING-1",
	run: new Date().toISOString().slice(0, 10),
	cases: n,
	kindCorrect: outcomes.filter((o) => o.kindCorrect).length,
	answerFamilyCorrect: outcomes.filter((o) => o.familyCorrect).length,
	byKind: Object.fromEntries(
		(["select", "form", "problem", "history", "system"] as const).map((k) => {
			const set = outcomes.filter((o) => o.expected === k);
			return [k, `${set.filter((o) => o.familyCorrect).length} / ${set.length}`];
		})
	),
	// The CHOOSING-1 defect, measured directly: selection questions that
	// were answered with a problem chapter.
	selectionStolenByProblems: outcomes.filter((o) => o.expected === "select" && o.family === "problem").length,
};

writeFileSync(join(process.cwd(), "evals/routing-1/result.json"), `${JSON.stringify({ summary, outcomes }, null, 1)}\n`);
console.log(JSON.stringify(summary, null, 1));
console.log("\nMISROUTED\n");
for (const o of outcomes.filter((x) => !x.familyCorrect)) {
	console.log(`${o.id}: wanted ${o.expected}, routed ${o.routedTo}, answered ${o.answered}`);
	console.log(`      "${o.q}"`);
}

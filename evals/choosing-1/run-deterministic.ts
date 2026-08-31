/**
 * CHOOSING-1 · condition C — the deployed deterministic resolver.
 *
 * No model call. Each case's content goes to askHause() exactly as a
 * reader would type it, and whatever comes back is scored against the
 * frozen authority. Writes result-c.json; prints the summary that gets
 * published, failures included.
 *
 *   npx tsx evals/choosing-1/run-deterministic.ts
 */

import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { askHause } from "../../src/data/askHause";
import { intentFor } from "../../src/data/grammar";
import { FORM_MANIFEST } from "@chrishayuk/hause/manifest";
import { CASES, type Case } from "./cases";

const modeOf = (form: string) => FORM_MANIFEST.find((f) => f.name === form)?.mode ?? null;

type Outcome = {
	id: string;
	kind: Case["kind"];
	domain: Case["domain"];
	expected: string;
	selected: string;
	exact: boolean;
	sameAct: boolean;
	sameMode: boolean;
	neighbour: boolean;
	abstained: boolean;
	falseConfidence: boolean;
};

const outcomes: Outcome[] = CASES.map((c) => {
	const answer = askHause(c.content);
	const selected = answer.id.startsWith("recommend-")
		? answer.id.slice("recommend-".length)
		: answer.id === "no-form"
			? "REFUSED"
			: `OTHER:${answer.id}`;

	const acceptable = [c.expected, ...(c.alsoAcceptable ?? [])];
	const exact = acceptable.includes(selected);
	const isForm = selected !== "REFUSED" && !selected.startsWith("OTHER:");

	return {
		id: c.id,
		kind: c.kind,
		domain: c.domain,
		expected: c.expected,
		selected,
		exact,
		// The act and the mode are only meaningful when both sides are forms.
		sameAct: isForm && c.expected !== "NONE" ? intentFor(selected)?.id === intentFor(c.expected)?.id : exact,
		sameMode: isForm && c.expected !== "NONE" ? modeOf(selected) === modeOf(c.expected) : exact,
		neighbour: isForm && selected === c.nearestAlternative,
		abstained: c.expected === "NONE" && selected === "REFUSED",
		falseConfidence: c.expected === "NONE" && isForm,
	};
});

const n = outcomes.length;
const count = (f: (o: Outcome) => boolean) => outcomes.filter(f).length;
const noForm = outcomes.filter((o) => o.expected === "NONE");

const summary = {
	eval: "CHOOSING-1",
	condition: "C · deterministic resolver, no model call",
	run: new Date().toISOString().slice(0, 10),
	cases: n,
	exact: count((o) => o.exact),
	correctAct: count((o) => o.sameAct),
	correctMode: count((o) => o.sameMode),
	neighbourErrors: count((o) => o.neighbour),
	answeredSomethingElse: count((o) => o.selected.startsWith("OTHER:")),
	refusedWhenAFormWasWanted: count((o) => o.expected !== "NONE" && o.selected === "REFUSED"),
	validAbstention: `${count((o) => o.abstained)} / ${noForm.length}`,
	falseConfidence: count((o) => o.falseConfidence),
	byKind: Object.fromEntries(
		(["clear", "trap", "ambiguous", "no-form"] as const).map((k) => {
			const set = outcomes.filter((o) => o.kind === k);
			return [k, `${set.filter((o) => o.exact).length} / ${set.length}`];
		})
	),
	byDomain: Object.fromEntries(
		[...new Set(outcomes.map((o) => o.domain))].map((d) => {
			const set = outcomes.filter((o) => o.domain === d);
			return [d, `${set.filter((o) => o.exact).length} / ${set.length}`];
		})
	),
};

writeFileSync(join(process.cwd(), "evals/choosing-1/result-c.json"), `${JSON.stringify({ summary, outcomes }, null, 1)}\n`);

console.log(JSON.stringify(summary, null, 1));
console.log("\nWHERE IT BROKE — first 15 misses\n");
for (const o of outcomes.filter((x) => !x.exact).slice(0, 15)) {
	const c = CASES.find((x) => x.id === o.id) as Case;
	console.log(`${o.id} [${o.kind}] expected ${o.expected}, got ${o.selected}`);
	console.log(`      ${c.content.slice(0, 96)}`);
}

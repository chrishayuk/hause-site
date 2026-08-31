/**
 * CHOOSING-1 · conditions A and B — scoring.
 *
 * Reads evals/choosing-1/answers-{A,B}.jsonl, one {"id","pick","why"}
 * per line, and scores against the frozen authority on every measure the
 * preregistration named. The reason string is carried through untouched
 * for the separate decision-test fidelity pass, because a right label
 * for a wrong reason is a different result from a right answer.
 *
 *   npx tsx evals/choosing-1/score-ab.ts A
 */

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { FORM_MANIFEST } from "@chrishayuk/hause/manifest";
import { intentFor } from "../../src/data/grammar";
import { CASES } from "./cases";

const condition = (process.argv[2] ?? "A").toUpperCase();
const raw = readFileSync(join(process.cwd(), `evals/choosing-1/answers-${condition}.jsonl`), "utf8");

type Answer = { id: string; pick: string; why: string };
const answers = new Map<string, Answer>();
let malformed = 0;
for (const line of raw.split("\n")) {
	const t = line.trim();
	if (!t.startsWith("{")) continue;
	try {
		const a = JSON.parse(t) as Answer;
		answers.set(a.id, a);
	} catch {
		// A malformed line is a malformed answer, recorded as one rather
		// than quietly dropped: the case scores as MISSING.
		malformed += 1;
	}
}

const modeOf = (form: string) => FORM_MANIFEST.find((f) => f.name === form)?.mode ?? null;
const known = new Set(FORM_MANIFEST.map((f) => f.name));

const outcomes = CASES.map((c) => {
	const a = answers.get(c.id);
	const pick = a?.pick ?? "MISSING";
	const acceptable = [c.expected, ...(c.alsoAcceptable ?? [])];
	const isForm = known.has(pick);
	const exact = acceptable.includes(pick);
	return {
		id: c.id,
		kind: c.kind,
		domain: c.domain,
		expected: c.expected,
		selected: pick,
		why: a?.why ?? "",
		valid: isForm || pick === "NONE",
		exact,
		sameAct: isForm && c.expected !== "NONE" ? intentFor(pick)?.id === intentFor(c.expected)?.id : exact,
		sameMode: isForm && c.expected !== "NONE" ? modeOf(pick) === modeOf(c.expected) : exact,
		neighbour: isForm && pick === c.nearestAlternative,
		abstained: c.expected === "NONE" && pick === "NONE",
		falseConfidence: c.expected === "NONE" && isForm,
		missedRefusal: c.expected !== "NONE" && pick === "NONE",
	};
});

const count = (f: (o: (typeof outcomes)[number]) => boolean) => outcomes.filter(f).length;
const noForm = outcomes.filter((o) => o.expected === "NONE").length;

const summary = {
	eval: "CHOOSING-1",
	condition: condition === "A" ? "A · catalogue only" : "B · the choosing grammar",
	run: new Date().toISOString().slice(0, 10),
	cases: outcomes.length,
	answered: count((o) => o.selected !== "MISSING"),
	malformedLines: malformed,
	invalidNames: count((o) => !o.valid && o.selected !== "MISSING"),
	exact: count((o) => o.exact),
	correctAct: count((o) => o.sameAct),
	correctMode: count((o) => o.sameMode),
	neighbourErrors: count((o) => o.neighbour),
	validAbstention: `${count((o) => o.abstained)} / ${noForm}`,
	falseConfidence: count((o) => o.falseConfidence),
	refusedWhenAFormWasWanted: count((o) => o.missedRefusal),
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

writeFileSync(join(process.cwd(), `evals/choosing-1/result-${condition.toLowerCase()}.json`), `${JSON.stringify({ summary, outcomes }, null, 1)}\n`);
console.log(JSON.stringify(summary, null, 1));
console.log(`\nMISSES (${outcomes.filter((o) => !o.exact).length})\n`);
for (const o of outcomes.filter((x) => !x.exact)) {
	console.log(`${o.id} [${o.kind}] expected ${o.expected} · chose ${o.selected}${o.neighbour ? " (the recorded neighbour)" : ""}`);
	console.log(`      because: ${o.why.slice(0, 120)}`);
}

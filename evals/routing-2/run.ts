/** ROUTING-2 — run once, publish, freeze. */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { askHause, classify, selectionPaths } from "../../src/data/askHause";
import { ROUTING_CASES, type Kind } from "./cases";

const family = (id: string): Kind | "refusal" | "other" =>
	id.startsWith("recommend-") ? "select"
	: id.startsWith("form-") ? "form"
	: id.startsWith("problem-") ? "problem"
	: id === "genealogy" ? "history"
	: id === "no-form" ? "refusal"
	: "system";

type Verdict = "act correct" | "act misses · scaffold rescues" | "act wrong · scaffold correct" | "act correct · scaffold wrong" | "both refuse" | "both wrong" | "act wrong · scaffold wrong or absent";

const outcomes = ROUTING_CASES.map((c) => {
	const kind = classify(c.q);
	const answer = askHause(c.q);
	const fam = family(answer.id);
	const paths = c.kind === "select" ? selectionPaths(c.q) : null;
	let verdict: Verdict | null = null;
	if (paths && c.wants) {
		const actOk = paths.act === c.wants;
		const scaffoldOk = paths.scaffold === c.wants;
		verdict = actOk && scaffoldOk ? "act correct"
			: actOk && paths.scaffold && !scaffoldOk ? "act correct · scaffold wrong"
			: actOk ? "act correct"
			: !paths.act && scaffoldOk ? "act misses · scaffold rescues"
			: paths.act && scaffoldOk ? "act wrong · scaffold correct"
			: !paths.act && !paths.scaffold ? "both refuse"
			: paths.act && paths.scaffold && paths.act === paths.scaffold ? "both wrong"
			: "act wrong · scaffold wrong or absent";
	}
	return { id: c.id, topic: c.topic, q: c.q, expected: c.kind, wants: c.wants ?? null, routedTo: kind, answered: answer.id, family: fam,
		kindCorrect: kind === c.kind, familyCorrect: fam === c.kind,
		actPick: paths?.act ?? null, scaffoldPick: paths?.scaffold ?? null, verdict };
});

const n = outcomes.length;
const sel = outcomes.filter((o) => o.expected === "select");
const tally = (v: string) => sel.filter((o) => o.verdict === v).length;
const actOnlyCorrect = sel.filter((o) => o.actPick === o.wants).length;
const liveCorrect = sel.filter((o) => o.answered === `recommend-${o.wants}`).length;

const summary = {
	eval: "ROUTING-2",
	run: new Date().toISOString().slice(0, 10),
	cases: n,
	kindCorrect: outcomes.filter((o) => o.kindCorrect).length,
	answerFamilyCorrect: outcomes.filter((o) => o.familyCorrect).length,
	byKind: Object.fromEntries((["select", "form", "problem", "history", "system"] as const).map((k) => {
		const set = outcomes.filter((o) => o.expected === k);
		return [k, `${set.filter((o) => o.familyCorrect).length} / ${set.length}`];
	})),
	selection: {
		cases: sel.length,
		liveCorrectForm: liveCorrect,
		actOnlyCorrect,
		scaffoldOnlyCorrect: sel.filter((o) => o.scaffoldPick === o.wants).length,
		"act correct": tally("act correct"),
		"act correct · scaffold wrong": tally("act correct · scaffold wrong"),
		"act misses · scaffold rescues": tally("act misses · scaffold rescues"),
		"act wrong · scaffold correct": tally("act wrong · scaffold correct"),
		"both refuse": tally("both refuse"),
		"both wrong": tally("both wrong"),
		"act wrong · scaffold wrong or absent": tally("act wrong · scaffold wrong or absent"),
	},
	retirementRule: {
		stated: "removable when act-only >= act+scaffold correct AND 'act wrong · scaffold correct' is zero",
		actOnlyAtLeastLive: actOnlyCorrect >= liveCorrect,
		actWrongScaffoldCorrect: tally("act wrong · scaffold correct"),
		verdict: actOnlyCorrect >= liveCorrect && tally("act wrong · scaffold correct") === 0 ? "SCAFFOLD REMOVABLE" : "SCAFFOLD STAYS",
	},
};

writeFileSync(join(process.cwd(), "evals/routing-2/result.json"), `${JSON.stringify({ summary, outcomes }, null, 1)}\n`);
console.log(JSON.stringify(summary, null, 1));
console.log("\nSELECTION, CASE BY CASE\n");
for (const o of sel) console.log(`${o.topic.padEnd(14)} wants ${String(o.wants).padEnd(14)} act:${String(o.actPick).padEnd(14)} scaffold:${String(o.scaffoldPick).padEnd(12)} ${o.verdict}`);
console.log("\nOTHER MISROUTES\n");
for (const o of outcomes.filter((x) => x.expected !== "select" && !x.familyCorrect)) console.log(`${o.id}: wanted ${o.expected}, answered ${o.answered}`);

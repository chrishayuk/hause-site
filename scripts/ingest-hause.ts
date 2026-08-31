/**
 * INGEST THE DOCTRINE — the corpus behind Ask HAUSE's synthesis tier.
 *
 * Four sources, all canonical: the library README (chunked by
 * heading), the manifest itself (one passage per form — name, mode,
 * line, recorded origin), and each form's own doc comment, which
 * carries the why the manifest line has no room for. Run when any of
 * them changes (after scripts/ingest-forms.ts, which produces the
 * third):
 *
 *   npx tsx scripts/ingest-hause.ts [path-to-hause]
 *
 * Server-side only; the client bundle never carries it.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { FORM_MANIFEST } from "@chrishayuk/hause/manifest";
import { PROBLEMS } from "../src/data/problems";
import { GRAMMAR } from "../src/data/grammar";

const HAUSE = process.argv[2] ?? process.env.HAUSE_DIR ?? "../hause";

type Passage = { id: string; source: string; heading: string; text: string };
const passages: Passage[] = [];

// ── README, by heading ──
const readme = readFileSync(join(HAUSE, "README.md"), "utf8");
let heading = "(preamble)";
let body: string[] = [];
let n = 0;
const flush = () => {
	const text = body.join("\n").trim();
	body = [];
	if (text.length < 60) return;
	n += 1;
	passages.push({ id: `readme#${n}`, source: "the library README", heading, text: text.slice(0, 1400) });
};
for (const line of readme.split("\n")) {
	const h = line.match(/^#{1,3}\s+(.*)$/);
	if (h) {
		flush();
		heading = h[1].trim();
	} else body.push(line);
}
flush();

// ── The selection grammar: the act, the form, and the test that decides ──
for (const intent of GRAMMAR) {
	for (const act of intent.acts) {
		passages.push({
			id: `act#${act.form}`,
			source: "the selection grammar",
			heading: `Which form for: ${act.doing.toLowerCase()}?`,
			text: `${act.doing} → ${act.form}. The test that decides it: ${act.test}${act.insteadOf?.length ? ` Use ${act.insteadOf.map((n) => `${n.form} instead ${n.when}`).join("; ")}.` : ""} This is the ${intent.label.toLowerCase()} group: ${intent.line} Read the whole grammar at hause.design/choosing.`,
		});
	}
}

// ── The problems: the failure, and the forms that answer it ──
for (const p of PROBLEMS) {
	passages.push({
		id: `problem#${p.slug}`,
		source: "the problems",
		heading: p.question,
		text: `${p.answer} How you meet it: ${p.symptom} Why it happens: ${p.cause} The forms that answer it: ${p.answers.join(", ")}. Read it at hause.design/problems/${p.slug}.`.slice(0, 1400),
	});
}

// ── Each form's own account of itself, and where to read it ──
type FormDoc = { name: string; slug: string; doc: string[] };
const formDocs = (JSON.parse(readFileSync(join(process.cwd(), "src/data/formDocs.json"), "utf8")) as { forms: FormDoc[] }).forms;
for (const f of formDocs) {
	passages.push({
		id: `form#${f.slug}`,
		source: `the ${f.name} form`,
		heading: `${f.name} — the form's own account`,
		text: `${f.doc.join(" ")} Read it in full at hause.design/forms/${f.slug}.`.slice(0, 1400),
	});
}

// ── The manifest, one passage per form ──
for (const f of FORM_MANIFEST) {
	passages.push({
		id: `manifest#${f.name}`,
		source: "the manifest",
		heading: `${f.name} — ${f.mode}`,
		text: `${f.name} is a ${f.mode}. ${f.line}${f.origin ? ` Originated in ${f.origin}${f.date ? ` (${f.date})` : ""}.` : " No origin is recorded for it."}${f.because ? ` It exists because: ${f.because}` : ""}${f.exhibited ? "" : " Held, not yet exhibited."}`,
	});
}

writeFileSync(
	"src/data/hauseCorpus.json",
	JSON.stringify({ generated: new Date().toISOString().slice(0, 10), passages }, null, 1)
);
console.log(`corpus: ${passages.length} passages → src/data/hauseCorpus.json`);

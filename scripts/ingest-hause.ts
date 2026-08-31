/**
 * INGEST THE DOCTRINE — the corpus behind Ask HAUSE's synthesis tier.
 *
 * Three sources, all canonical: the library README (chunked by
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
		text: `${f.name} is a ${f.mode}. ${f.line}${f.origin ? ` Originated in ${f.origin}${f.date ? ` (${f.date})` : ""}.` : ""}${f.exhibited ? "" : " Held, not yet exhibited."}`,
	});
}

writeFileSync(
	"src/data/hauseCorpus.json",
	JSON.stringify({ generated: new Date().toISOString().slice(0, 10), passages }, null, 1)
);
console.log(`corpus: ${passages.length} passages → src/data/hauseCorpus.json`);

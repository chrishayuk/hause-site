/**
 * INGEST THE FORMS — each form's own doc comment, as a record.
 *
 * Every file under components/forms/ opens with a doc comment saying
 * what the form is and why it exists. That prose is the library's own
 * account of itself, already written and, until now, invisible to
 * anyone who did not read the source. This script projects it — with
 * the props signature that is the form's API — into
 * src/data/formDocs.json, which the form pages and the Ask corpus both
 * read.
 *
 *   npx tsx scripts/ingest-forms.ts [path-to-hause]
 *
 * Nothing here is authored. If a form's page says something, the form's
 * source said it first.
 */

import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { FORM_MANIFEST } from "@chrishayuk/hause/manifest";

const HAUSE = process.argv[2] ?? process.env.HAUSE_DIR ?? "../hause";
const DIR = join(HAUSE, "components/forms");

export type FormDoc = {
	name: string;
	slug: string;
	file: string;
	/** The doc comment, paragraph by paragraph, in the author's words. */
	doc: string[];
	/** The props type or destructured signature — verbatim source. */
	api: string;
	/** Other forms this one's doc comment names — a relation the source states. */
	mentions: string[];
};

/** Balanced-brace slice starting at `from` (which must sit on an opening brace). */
function braced(src: string, from: number): string {
	let depth = 0;
	for (let i = from; i < src.length; i += 1) {
		if (src[i] === "{") depth += 1;
		else if (src[i] === "}") {
			depth -= 1;
			if (depth === 0) return src.slice(from, i + 1);
		}
	}
	return "";
}

/** Balanced-paren slice starting at `from` (which must sit on an opening paren). */
function parened(src: string, from: number): string {
	let depth = 0;
	for (let i = from; i < src.length; i += 1) {
		if (src[i] === "(") depth += 1;
		else if (src[i] === ")") {
			depth -= 1;
			if (depth === 0) return src.slice(from, i + 1);
		}
	}
	return "";
}

const NAMES = new Set(FORM_MANIFEST.map((f) => f.name));
const slugOf = (name: string) => name.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

const docs: FormDoc[] = [];

for (const f of FORM_MANIFEST) {
	const file = `${f.name}.tsx`;
	if (!readdirSync(DIR).includes(file)) {
		throw new Error(`The manifest holds ${f.name}, but ${DIR}/${file} does not exist.`);
	}
	const src = readFileSync(join(DIR, file), "utf8");

	// The doc comment immediately above the exported component.
	const fnAt = src.indexOf(`export function ${f.name}(`);
	if (fnAt < 0) throw new Error(`${file} does not export a component named ${f.name}.`);
	// The library's convention is a block opening "NAME — one line."; take
	// that one wherever it sits, and fall back to whichever block sits
	// immediately above the component. Picking the nearest block blindly
	// finds a note about a prop and calls it the form's account of itself.
	const before = src.slice(0, fnAt);
	const blocks = [...before.matchAll(/\/\*\*([\s\S]*?)\*\//g)];
	if (blocks.length === 0) throw new Error(`${f.name} has no doc comment — the page would have nothing to say.`);
	const named = blocks.find((b) => new RegExp(`^\\s*\\*?\\s*${f.name.toUpperCase()}\\s+—`, "i").test(b[1].split("\n").slice(0, 2).join("\n")));
	const chosen = named ?? blocks[blocks.length - 1];
	const raw = chosen[1]
		.split("\n")
		.map((l) => l.replace(/^\s*\*ise?\s?/, "").replace(/^\s*\*\s?/, "").trimEnd())
		.join("\n")
		.trim();
	const doc = raw
		.split(/\n\s*\n/)
		.map((p) => p.split("\n").map((l) => l.trim()).join(" ").trim())
		.filter(Boolean);

	// The API, verbatim: an exported props type where there is one, and
	// the component's own parameter list either way.
	const typeAt = src.indexOf(`export type ${f.name}Props = {`);
	const propsType = typeAt >= 0 ? `export type ${f.name}Props = ${braced(src, src.indexOf("{", typeAt))};` : "";
	const params = parened(src, src.indexOf("(", fnAt));
	// A props type that names another type in the same file is incomplete
	// without it — Rung, LensDepth, ProvenanceEvent are part of the contract.
	const surface = `${propsType}\n${params}`;
	const supporting: string[] = [];
	for (const m of src.matchAll(/(export )?type (\w+) = \{/g)) {
		const name = m[2];
		if (name === `${f.name}Props` || !new RegExp(`\\b${name}\\b`).test(surface)) continue;
		supporting.push(`${m[1] ?? ""}type ${name} = ${braced(src, src.indexOf("{", m.index))};`);
	}
	const api = [...supporting, propsType, `export function ${f.name}${params}`].filter(Boolean).join("\n\n");

	// Relations the doc comment states itself — a form naming another form.
	const mentions = [...NAMES].filter((n) => n !== f.name && new RegExp(`\\b${n}\\b`).test(raw)).sort();

	docs.push({ name: f.name, slug: slugOf(f.name), file: `components/forms/${file}`, doc, api, mentions });
}

writeFileSync(
	join(process.cwd(), "src/data/formDocs.json"),
	`${JSON.stringify({ generated: new Date().toISOString().slice(0, 10), forms: docs }, null, 1)}\n`
);
console.log(`forms: ${docs.length} documented → src/data/formDocs.json`);

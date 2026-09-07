import {PUBLICATION_CAPABILITIES} from "../src/data/publication";
import {knowledgeGraph,knowledgeAnswerNodes,relatedKnowledge} from "../src/data/knowledge";
import {SITE_NAV,SITE_PATHS} from "../src/data/navigation";
/**
 * ASK COVERAGE — the questions as tests.
 *
 * Ask HAUSE claims that publishing a problem teaches it the question
 * that problem answers. That claim is only true while it is checked, so
 * every problem's own question is a case here, and a question that
 * stops resolving fails the deploy rather than quietly returning NO FORM
 * ESTABLISHED to a reader.
 *
 *   npm test
 */

import { readFileSync } from "node:fs";
import { askHause } from "../src/data/askHause";
import { PROBLEMS, PROBLEMS_IN_ORDER } from "../src/data/problems";
import { FORM_MANIFEST, formsByMode, type FormMode } from "@chrishayuk/hause/manifest";
import { FORMS } from "../src/data/forms";
import { grammarCoverage } from "../src/data/grammar";

type Case = { q: string; expect: string };

const cases: Case[] = [
 {q:"What is EvidenceTable?",expect:"publication"},
 {q:"What is MeasurementTrace?",expect:"publication"},
 {q:"How do I show missing measurements?",expect:"publication"},
 {q:"How do I stop two videos playing at once?",expect:"publication"},
 {q:"How do films and citations connect?",expect:"publication"},
 {q:"Tell me about MotionProvider",expect:"publication"},
 {q:"How can I build a cinematic publication?",expect:"publication"},
 {q:"What is YouTubeFilm?",expect:"publication"},
 {q:"How does MotionProvider stop competing videos?",expect:"publication"},
 {q:"Can I use TimedTranscript?",expect:"publication"},
 {q:"How do film citations handle a corporate author?",expect:"publication"},
 {q:"Which components were contributed from CHRISHAYUK?",expect:"publication"},
 {q:"What does publicationMetadata generate?",expect:"publication"},
	// Every problem answers its own question — the record, teaching the resolver.
	...PROBLEMS.map((p) => ({ q: p.question, expect: `problem-${p.slug}` })),

	// Natural phrasings, in the words people actually use.
	{ q: "why do all AI interfaces look the same", expect: "problem-everything-becomes-a-card" },
	{ q: "how should my app say it cannot answer", expect: "problem-interfaces-that-cannot-refuse" },
	{ q: "answer engines cannot read my page", expect: "problem-pages-machines-cannot-read" },
	{ q: "my documentation keeps going stale", expect: "problem-the-book-drifts-from-the-code" },
	{ q: "should I write a tutorial or a reference", expect: "problem-tutorial-or-reference-never-both" },
	{ q: "everything my model says sounds equally confident", expect: "problem-everything-sounds-equally-certain" },
	{ q: "when should I animate something", expect: "problem-motion-that-means-nothing" },

	// The genealogy layer answers from the manifest, including its gaps.
	{ q: "why does HAUSE have a Lens?", expect: "genealogy" },
	{ q: "why does Hero exist?", expect: "genealogy" },
	{ q: "which forms came from vindex3?", expect: "genealogy" },
	{ q: "which forms have no recorded provenance?", expect: "genealogy" },
	{ q: "what was the most recent form?", expect: "genealogy" },

	{ q: "how does a form enter the library?", expect: "promotion" },
	{ q: "which form should I use?", expect: "choosing" },

	// The interrogation layer still wins where it should.
	{ q: "why doesn't HAUSE have cards", expect: "no-cards" },
	{ q: "what are you, HAUSE?", expect: "what-is-hause" },
	{ q: "what is the difference between an instrument and a performance", expect: "instrument-vs-performance" },

	// And the recommendation layer still routes an idea to a form.
	{ q: "I need to compare three strategies", expect: "recommend-Comparison" },
	{ q: "I have six irreversible stages", expect: "recommend-Ladder" },
	{ q: "how do I show a claim is proven", expect: "recommend-Evidence" },
];

let failed = 0;
for (const c of cases) {
	const got = askHause(c.q).id;
	if (got !== c.expect) {
		failed += 1;
		console.error(`FAIL  ${c.q}\n      expected ${c.expect}, got ${got}`);
	}
}

// The library and its projections must agree — the same check the site
// makes at build time, made again before anything ships.
if (FORMS.length !== FORM_MANIFEST.length) {
	failed += 1;
	console.error(`FAIL  ${FORM_MANIFEST.length} forms in the manifest, ${FORMS.length} documented — re-run scripts/ingest-forms.ts`);
}

// The numbering is a sequence, not a decoration: unique, gapless, and
// matching the order the site actually renders. The six-versus-eight bug
// this file exists to prevent was a hand-written count beside a
// hand-ordered array.
const numbers = PROBLEMS_IN_ORDER.map((p) => p.number);
for (let i = 0; i < numbers.length; i += 1) {
	const expected = String(i + 1).padStart(2, "0");
	if (numbers[i] !== expected) {
		failed += 1;
		console.error(`FAIL  problem ${i + 1} is numbered ${numbers[i]}, expected ${expected} — numbers must be unique and gapless`);
	}
}

// A form nobody can arrive at by describing what they are doing is a
// form nobody will use: the grammar must name every one, exactly once.
const grammar = grammarCoverage();
if (grammar.missing.length > 0) {
	failed += 1;
	console.error(`FAIL  the selection grammar does not name: ${grammar.missing.join(", ")}`);
}
if (grammar.duplicated.length > 0) {
	failed += 1;
	console.error(`FAIL  the selection grammar names twice: ${grammar.duplicated.join(", ")}`);
}

// Every form a problem names must exist in the library.
for (const p of PROBLEMS) {
	for (const name of p.answers) {
		if (!FORM_MANIFEST.some((f) => f.name === name)) {
			failed += 1;
			console.error(`FAIL  ${p.slug} names ${name}, which the library does not hold`);
		}
	}
}

// The README the installed library ships lists its forms between markers
// that scripts/readme.ts writes from the manifest. For two days the
// statement list named ten forms while the manifest held twelve, and a
// reader found it — so the agreement is a gate now, on the copy of the
// library this build actually compiles.
const readme = readFileSync("node_modules/@chrishayuk/hause/README.md", "utf8");
const lists = [...readme.matchAll(/<!-- generated:forms:(\w+) -->\n([\s\S]*?)<!-- \/generated -->/g)];
if (lists.length === 0) {
	failed += 1;
	console.error("FAIL  the library README carries no generated form lists — run scripts/readme.ts in hause");
}
for (const [, mode, block] of lists) {
	for (const f of formsByMode(mode as FormMode)) {
		if (!new RegExp(`\\b${f.name}\\b`).test(block)) {
			failed += 1;
			console.error(`FAIL  the library README's ${mode} list does not name ${f.name} — run scripts/readme.ts in hause`);
		}
	}
}

const graph=knowledgeGraph();
const nodeIds=new Set(graph.nodes.map(n=>n.id));
if(nodeIds.size!==graph.nodes.length)throw Error("Duplicate graph record IDs");
for(const edge of graph.edges){if(!nodeIds.has(edge.from)||!nodeIds.has(edge.to))throw Error(`Unresolved edge ${edge.from} → ${edge.to}`);if(!edge.basis)throw Error("An edge needs its source basis");}
for(const node of graph.nodes){if(!node.url||!node.sourceUrl)throw Error(`Unsourced record ${node.id}`);}
if(graph.coverage.capabilities!==PUBLICATION_CAPABILITIES.length||graph.coverage.forms!==FORMS.length)throw Error("Graph coverage drift");
const connected=knowledgeAnswerNodes("How do films and citations connect?").map(n=>n.id);
if(!connected.includes("capability:film")||!connected.includes("capability:citation"))throw Error("Cross-capability retrieval missed the film/citation relationship");
if(knowledgeAnswerNodes("Unicorn teleportation reactor").length)throw Error("Unsupported capability must not resolve");
if(SITE_NAV.filter(n=>!n.panelOnly).length>5)throw Error("Primary navigation exceeds its five-destination budget");
if(new Set(SITE_PATHS).size!==SITE_PATHS.length)throw Error("Duplicate site destinations");
console.log(`${graph.nodes.length} knowledge records · ${graph.edges.length} sourced relationships`);

if (failed > 0) {
	console.error(`\n${failed} failed of ${cases.length} cases`);
	process.exit(1);
}
console.log(`${cases.length}/${cases.length} ask coverage cases pass · ${PROBLEMS.length} problems · ${FORMS.length} forms`);

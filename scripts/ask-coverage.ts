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

import { askHause } from "../src/data/askHause";
import { PROBLEMS } from "../src/data/problems";
import { FORM_MANIFEST } from "@chrishayuk/hause/manifest";
import { FORMS } from "../src/data/forms";

type Case = { q: string; expect: string };

const cases: Case[] = [
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

// Every form a problem names must exist in the library.
for (const p of PROBLEMS) {
	for (const name of p.answers) {
		if (!FORM_MANIFEST.some((f) => f.name === name)) {
			failed += 1;
			console.error(`FAIL  ${p.slug} names ${name}, which the library does not hold`);
		}
	}
}

if (failed > 0) {
	console.error(`\n${failed} failed of ${cases.length} cases`);
	process.exit(1);
}
console.log(`${cases.length}/${cases.length} ask coverage cases pass · ${PROBLEMS.length} problems · ${FORMS.length} forms`);

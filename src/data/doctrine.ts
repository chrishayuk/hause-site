import corpusJson from "./hauseCorpus.json";

type Passage = { id: string; source: string; heading: string; text: string };
const CORPUS = (corpusJson as { passages: Passage[] }).passages;

/**
 * One section of the library's own doctrine, verbatim — for a page that
 * quotes the README rather than paraphrasing it. Keyed on the heading,
 * and throwing when it is gone: doctrine that has been rewritten should
 * fail the build, not quietly keep its old wording on the site.
 */
export function doctrine(heading: string): Passage {
	const hit = CORPUS.find((p) => p.source === "the library README" && p.heading.startsWith(heading));
	if (!hit) throw new Error(`The README no longer has a "${heading}" section — the page quoting it must be updated.`);
	return hit;
}

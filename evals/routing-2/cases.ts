/**
 * ROUTING-2 — fresh material, same shape.
 *
 * Twelve topics, none of them ROUTING-1's, five request kinds each. The
 * selection phrasings were written in the language somebody would
 * actually use, without consulting the act records — the point is to
 * find where a record fails to state its own meaning, not to check
 * whether it contains a phrase.
 */

export type Kind = "select" | "form" | "problem" | "history" | "system";
export type RoutingCase = { id: string; topic: string; q: string; kind: Kind; wants?: string };

const T = (topic: string, qs: Record<Kind, string>, wants?: string): RoutingCase[] =>
	(Object.keys(qs) as Kind[]).map((k) => ({ id: `${topic}-${k}`, topic, q: qs[k], kind: k, wants: k === "select" ? wants : undefined }));

export const ROUTING_CASES: RoutingCase[] = [
	...T("cutaway", {
		select: "I want a labelled cross-section of our machine with every part visible at once",
		form: "What does Anatomy do?",
		problem: "Why do product explanations hide everything behind clicks?",
		history: "Where did Anatomy come from?",
		system: "What is the twelve-column grid for?",
	}, "Anatomy"),
	...T("alternatives", {
		select: "We keep three encodings of each recording and want to show which exist and refuse the one that does not",
		form: "What is Variants?",
		problem: "Why do systems show empty slots instead of saying something is missing?",
		history: "Why does HAUSE have Variants?",
		system: "How many forms does HAUSE hold?",
	}, "Variants"),
	...T("scale", {
		select: "I need to take the reader from one seed to a whole harvest, ten times at a time",
		form: "What does Magnitude do?",
		problem: "Why do big numbers stop meaning anything on a page?",
		history: "Where did Magnitude come from?",
		system: "What are HAUSE's three speeds?",
	}, "Magnitude"),
	...T("capacity", {
		select: "I want to show that adding more trucks stops helping once the depot doors are full",
		form: "What is Channel?",
		problem: "Why do dashboards imply throughput is unlimited?",
		history: "Why does Channel exist?",
		system: "Is HAUSE dark by default?",
	}, "Channel"),
	...T("filtering", {
		select: "We generate every possible headline, score them all, drop most, and keep the few that survive",
		form: "What does Gating do?",
		problem: "Why is editing invisible in the finished piece?",
		history: "Where did Gating come from?",
		system: "What is the hause stagger?",
	}, "Gating"),
	...T("parts", {
		select: "I want the reader to pull a finished report apart into the four teams that wrote it, at their own pace",
		form: "What is Decomposition?",
		problem: "Why does explaining a whole thing at once lose people?",
		history: "Why does HAUSE have Decomposition?",
		system: "What does the manifest do?",
	}, "Decomposition"),
	...T("journey", {
		select: "Show one passport moving through application, checks, printing and posting, still the same passport",
		form: "What does Procession do?",
		problem: "Why do process diagrams look like org charts?",
		history: "Where did Procession come from?",
		system: "What is a specimen book?",
	}, "Procession"),
	...T("rounding", {
		select: "I want to demonstrate what snapping every timestamp to the nearest hour actually destroys",
		form: "What is Quantisation?",
		problem: "Why do people trust a rounded number more than a raw one?",
		history: "Why does Quantisation exist?",
		system: "What does HAUSE mean by a performance?",
	}, "Quantisation"),
	...T("layout", {
		select: "Draw our 48-byte record so each field takes up the room it really takes up",
		form: "What does ByteMap do?",
		problem: "Why do binary format docs make you count offsets by hand?",
		history: "Where did ByteMap come from?",
		system: "Which forms are held but not exhibited?",
	}, "ByteMap"),
	...T("sparsity", {
		select: "We have four hundred rules and each transaction wakes about six of them",
		form: "What is ExpertField?",
		problem: "Why is it hard to show that most of a system stays idle?",
		history: "Why does HAUSE have ExpertField?",
		system: "What is HAUSE's accent colour?",
	}, "ExpertField"),
	...T("verbatim", {
		select: "Show the exact curl command and the response body, unedited",
		form: "What does Snippet do?",
		problem: "Why do paraphrased examples waste everybody's time?",
		history: "Where did Snippet come from?",
		system: "Who consumes HAUSE?",
	}, "Snippet"),
	...T("onward", {
		select: "At the end of the section I want one line about why the next part follows, and the links to it",
		form: "What is Connection?",
		problem: "Why do long documents leave readers stranded at the bottom?",
		history: "Why does Connection exist?",
		system: "What is the always-present text fallback?",
	}, "Connection"),
];

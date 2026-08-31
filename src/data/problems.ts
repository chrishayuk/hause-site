import { citationMeta, type CitationRecord } from "@chrishayuk/hause/cite";
import { buildIdentifiers } from "./build";

/**
 * THE PROBLEMS — what HAUSE is a consequence of.
 *
 * The library is easier to explain backwards. Every form here exists
 * because something in the way interfaces are built was failing, and a
 * real page could not be made without a new way of saying something.
 * These records state the failure first — concretely, the way it is
 * actually met — and only then name the forms that answer it.
 *
 * One record per problem, projected onto the page, the index, the head,
 * the graph, the sitemap and the Ask corpus. The forms named in
 * `answers` are manifest names: a problem cannot cite a form the library
 * does not hold, because the page resolves them through the manifest.
 */

export type Problem = {
	slug: string;
	/** Position in the sequence — the number is editorial, not a ranking. */
	number: string;
	/** The failure, as a title. */
	title: string;
	/** The failure, in a sentence or two. */
	dek: string;
	/** The question a reader would actually type. */
	question: string;
	/** The lift-able answer — 40–100 words, first. */
	answer: string;
	/** The sharpest line, given the whole width. */
	statement: string;
	/** What the failure looks like when you meet it. */
	symptom: string;
	/** Why it happens — and why the obvious fixes do not fix it. */
	cause: string;
	/** The forms that answer it, by manifest name. */
	answers: string[];
	/**
	 * The words people actually use for this failure. Not SEO keywords —
	 * the phrases Ask HAUSE should recognise, shipped with the record so a
	 * new problem arrives already answerable rather than waiting for
	 * someone to remember to teach the resolver about it.
	 */
	keywords: string[];
	published: string;
	revised?: string;
};

export const PROBLEMS: Problem[] = [
	{
		slug: "everything-becomes-a-card",
		number: "01",
		title: "EVERYTHING BECOMES A CARD",
		dek: "Ask a model for an interface and the same eight containers come back: cards, badges, accordions, tabs, chat bubbles. A comparison, a refusal, an answer and a measurement are four different acts. They arrive as the same rectangle.",
		question: "Why do AI-generated interfaces all look the same?",
		answer:
			"Because the vocabulary they are given describes containers, not meaning. A component library offers Card, Modal, Accordion and Tabs; a model choosing among those names is choosing a shape, so every semantic act — a comparison, a refusal, an answer, a measurement — ends up inside the same rectangle. HAUSE names the act instead: Statement, Evidence, Refusal, Comparison, Answer. The model chooses what it is trying to say, and the shape follows from the saying.",
		statement: "A card is a container pretending to be a meaning.",
		symptom:
			"Hand a model a dataset, an API response and an explanation, and the three come back looking alike: a heading, a rectangle, a badge, a chevron. Nothing in the output separates a measured result from an opinion, or a refusal from an empty state — because nothing in the vocabulary separated them at the moment of choosing. The interface is fluent and says nothing about what kind of thing it is showing you.",
		cause:
			"Component libraries were built for people who already know what they mean and need somewhere to put it. The name Card carries no claim about its contents, which is exactly why it composes so freely, and why an author with intent uses it well. A model brings no intent to the choice; it brings name-matching. Give it containers and it will produce containers — consistently, fluently, forever.",
		answers: ["Statement", "Claim", "Evidence", "Refusal", "Comparison", "Answer"],
		keywords: ["card", "cards", "look the same", "all look alike", "generic component", "chat bubble", "generated ui", "converge"],
		published: "2026-08-31",
	},
	{
		slug: "interfaces-that-cannot-refuse",
		number: "02",
		title: "INTERFACES THAT CANNOT REFUSE",
		dek: "Refusal arrives as a red toast, an apology and a retry — the vocabulary of a fault. So products are built to avoid producing one, and the reliable way to avoid refusing is to guess.",
		question: "How should an AI interface say that it cannot answer?",
		answer:
			"As a designed statement, in the same typography as any other result — not as an error. A refusal dressed in red reads as a fault in the product, so teams build to avoid it, and the dependable way to avoid refusing is to invent. HAUSE gives refusal its own form: what was requested, what was actually available, and the principle that closed it. A system that can refuse well has no reason to guess.",
		statement: "A system that cannot say no will guess.",
		symptom:
			"An empty state and a refusal look identical. A confident invention and a real result look identical. The interface has one voice for here is your answer and one voice for something went wrong, and declining on principle fits neither — so it is filed under the nearest available thing, which is red, and users learn that a refusal means the product is broken.",
		cause:
			"Error states were designed for failures: the network dropped, the field was invalid, the server fell over. A refusal is not a failure. It is the system working exactly as intended, declining to produce something it cannot stand behind. Nothing in the ordinary vocabulary carries that distinction, and a distinction with no form to hold it does not survive the handoff to implementation.",
		answers: ["Refusal", "Variants", "Question", "Claim"],
		keywords: ["refuse", "refusal", "say no", "cannot answer", "can't answer", "hallucinat", "guess", "error state", "empty state"],
		published: "2026-08-31",
	},
	{
		slug: "pages-machines-cannot-read",
		number: "03",
		title: "PAGES MACHINES CANNOT READ",
		dek: "Strip a page to its text. If the answer disappears, the page never had one — it had a rendering of one.",
		question: "Why can't answer engines read my beautifully designed page?",
		answer:
			"Because the meaning lives in the interaction. Canvas coordinates, animation states and content revealed only on click are invisible to a crawler, an answer engine or an agent browser: they get the chrome and none of the argument. HAUSE treats legibility as part of the grammar — an answer-first block with a stable anchor, structured data projected from the same records the page renders, ARIA state on every instrument, and a text fallback that survives the interaction being removed.",
		statement: "Strip the page to text, and it should still answer the question it was designed to answer.",
		symptom:
			"The page ranks for nothing it is actually about, and an answer engine quotes someone's thin paragraph over your interactive explanation. The paragraph was legible. The explanation was a canvas. Both were about the same thing; only one of them said so in a way a machine could carry away.",
		cause:
			"Design systems stop at the visual layer, so legibility is delegated to something bolted on afterwards that can only describe the page from outside — a meta description guessing at what the page argues. Meanwhile the best version of the page is the one a person operates, which is precisely the version a machine cannot follow. Nothing forces the two to be the same page, so they drift apart in the direction of whichever audience the team can see.",
		answers: ["Answer", "Excerpt", "Snippet", "Lens"],
		keywords: ["crawler", "answer engine", "seo", "aeo", "indexed", "machine readable", "machine-readable", "scraped", "extract answers"],
		published: "2026-08-31",
	},
	{
		slug: "nothing-to-cite",
		number: "04",
		title: "NOTHING TO CITE",
		dek: "The idea was published. Months later there is a page that has quietly changed, an updated timestamp where a publication date should be, and no version anyone can point at.",
		question: "How do I make a web page citable?",
		answer:
			"Give it what a citation needs and then never move it: an author, a first-publication date that does not drift, a version, a canonical URL, and a reference a reader can copy. HAUSE carries that as one record projected onto four surfaces — the provenance line on the page, the reference in the formats people paste, citation tags in the head that reference managers read, and JSON-LD in the graph. A registered identifier can join later; it is infrastructure, not a prerequisite.",
		statement: "A claim that cannot be dated is a claim that cannot be defended.",
		symptom:
			"You published first and cannot show it. The commits are real, but nobody cites a commit. The post is real, but its date now reads updated, because the template only had one date and something small was fixed in March. The idea turns up elsewhere, better dressed, and the trail back to yours is a screenshot and a memory.",
		cause:
			"The web's default publishing object is a mutable page with a single timestamp, and every content system encourages editing in place. Nothing in the ordinary stack distinguishes first publication from last touch, or a correction from a new version — so the one fact a priority claim rests on is the fact the system is least careful with.",
		answers: ["Citation", "Provenance", "Timeline", "Answer"],
		keywords: ["cite", "citable", "citation", "doi", "referenceable", "provenance", "priority", "publication date", "attribution", "nobody can cite"],
		published: "2026-08-31",
	},
	{
		slug: "the-book-drifts-from-the-code",
		number: "05",
		title: "THE BOOK DRIFTS FROM THE CODE",
		dek: "Documentation is a copy of the system, and copies rot. Every count in it was true on the day it was typed.",
		question: "How do you stop documentation drifting from the code?",
		answer:
			"Stop writing the parts a machine can derive. Counts, origins, contracts and specimens should be read out of the library at build time, so a page cannot state something the code no longer supports. In HAUSE the manifest is the one index everything derives from, the form pages are projected from the doc comments in the source, and a form the manifest names but the ingest cannot find fails the build rather than rendering an empty page.",
		statement: "A specimen book cannot drift from its library when it is the library.",
		symptom:
			"This site had it. A specimen page read twenty-eight of twenty-eight while the library held thirty-five forms, and all seven performances while there were eight. Both sentences were true the day they were typed, both were quietly false a fortnight later — on a site whose entire argument is that the book cannot drift from the library.",
		cause:
			"Prose is faster to write than a projection, and a number inside a sentence has no owner. Nothing fails when it goes stale: the page still builds, still renders, still reads well. Drift is the only kind of bug that gets more convincing with age, because the sentence around it keeps sounding authoritative long after the number stopped being true.",
		answers: ["Agreement", "Evidence", "Claim", "Derivation"],
		keywords: ["drift", "stale", "out of date", "outdated", "docs rot", "keeps changing", "hand-written count", "single source of truth"],
		published: "2026-08-31",
	},
	{
		slug: "everything-sounds-equally-certain",
		number: "07",
		title: "EVERYTHING SOUNDS EQUALLY CERTAIN",
		dek: "A generated paragraph, a measured result and an open question arrive in the same voice, at the same size, with the same confidence. The interface has no way to say which is which, so the reader supplies the difference — usually wrongly.",
		question: "How should an interface show what it actually knows?",
		answer:
			"By giving certainty a form rather than an adjective. HAUSE separates the states structurally: a Claim is a belief and carries a status mark; Evidence is a finding with its receipt, its date and its machine; a Question is what remains open, at the same size as an answer; a Refusal is what the system will not assert at all. Strip the styling away and a reader — or a machine — can still tell known from believed from unresolved.",
		statement: "Confidence is a property of the sentence, not of the system that produced it.",
		symptom:
			"The summary reads exactly like the measurement. The inference reads exactly like the retrieved fact. Nothing in the layout separates a number someone measured on a named machine on a named date from a number that merely sounded right — and by the time a reader learns which was which, they have already quoted one of them.",
		cause:
			"Interfaces inherited their vocabulary from documents, where confidence was carried by prose and by knowing who was writing. Generated content breaks both halves: there is no author to know, and the prose is uniformly fluent. Ordinary design systems have states for loading, error and empty, and none for believed, measured or open — so the distinction has nowhere to live, and quietly disappears somewhere between the design review and the implementation.",
		answers: ["Claim", "Evidence", "Question", "Refusal", "Agreement"],
		keywords: ["certain", "certainty", "confidence", "confident", "hedge", "uncertain", "epistemic", "status", "believed", "unresolved"],
		published: "2026-08-31",
	},
	{
		slug: "motion-that-means-nothing",
		number: "08",
		title: "MOTION THAT MEANS NOTHING",
		dek: "Things fade, slide and bounce because a library made it easy. None of it says anything, all of it costs time, and the reader who turned motion off gets a page that no longer explains itself.",
		question: "When should an interface animate something?",
		answer:
			"When the movement is the explanation rather than the polish. HAUSE has one easing curve, three speeds and three motion idioms: a one-shot reveal, a staged swap where two states of one object exchange places, and an in-view loop a scrolling reader must never find already finished. Every performance rests on a designed final state, and that resting state is exactly what reduced motion and no-JS receive — so the point survives the motion being taken away.",
		statement: "If the idea lives only in the animation, it does not survive the reader's settings.",
		symptom:
			"Every card fades up on scroll, and the fade says nothing about the card. Meanwhile the one thing on the page that genuinely happens over time — a process, a transformation, a quantity collapsing — is a static diagram with an arrow through it, because animating that properly would have been work.",
		cause:
			"Motion is the easiest thing in a design system to add and the hardest to justify, so it accumulates as polish. And because it is usually decorative, prefers-reduced-motion gets implemented as animation: none — which is harmless for decoration and catastrophic for the one animation that was carrying the meaning.",
		answers: ["Transformation", "Procession", "Unfolding", "Quantisation", "Magnitude"],
		keywords: ["motion", "animate", "animation", "transition", "fade", "reduced motion", "scroll animation", "prefers-reduced-motion"],
		published: "2026-08-31",
	},
	{
		slug: "tutorial-or-reference-never-both",
		number: "06",
		title: "TUTORIAL OR REFERENCE, NEVER BOTH",
		dek: "The explanation lives on one page and the clause that governs it on another, and every reader has to guess which half holds the answer they came for.",
		question: "Should documentation explain or specify?",
		answer:
			"Both, at one address. Splitting a subject into a tutorial and a reference asks the reader to guess which half holds their answer, and guarantees the two will drift apart. HAUSE's Lens keeps them as depths of one thing — the explanation, the object itself, and the normative clause — on a single URL, with the chosen depth remembered across pages and written into the fragment. A reader who thinks in clauses stays in clauses.",
		statement: "Depth is a design problem, not a navigation problem.",
		symptom:
			"The introduction is charming and imprecise. The reference is precise and unreadable. They disagree in one detail, and the reader who noticed is the one who needed that detail most — so they open both in adjacent tabs and reconcile the documentation by hand, which is the job the documentation was for.",
		cause:
			"The two audiences are real, so splitting them feels obvious — and it is a split of pages where the actual difference is depth. Once they are two pages they have two authors, two review cycles and two rates of decay, and the precise one wins the arguments while the readable one gets the traffic.",
		answers: ["Lens", "Excerpt", "Snippet", "Anatomy"],
		keywords: ["tutorial", "reference doc", "reference page", "or a reference", "beginner", "advanced", "two audiences", "getting started", "api docs"],
		published: "2026-08-31",
	},
];

/**
 * The relation, read the other way: which failures a form was built to
 * close. Stated once, in `answers`, and projected in both directions —
 * a form page can name its problems and a problem page its forms
 * without either list being maintained twice.
 */
/** In number order, always — the array literal is not the sequence. */
export const PROBLEMS_IN_ORDER: Problem[] = [...PROBLEMS].sort((a, b) => a.number.localeCompare(b.number));

/** "eight" — so a page can say the count in prose without anyone typing it. */
export function spell(n: number): string {
	return ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"][n] ?? String(n);
}

export function problemsForForm(name: string): Problem[] {
	return PROBLEMS.filter((p) => p.answers.includes(name));
}

export function problemBySlug(slug: string): Problem | null {
	return PROBLEMS.find((p) => p.slug === slug) ?? null;
}

/** A problem is an argument, published — and therefore a citable object like any other. */
export function problemRecord(p: Problem): CitationRecord {
	return {
		title: `${p.title.charAt(0)}${p.title.slice(1).toLowerCase()}`,
		authors: ["Chris Hay"],
		published: p.published,
		...(p.revised ? { revised: p.revised } : {}),
		version: "1.0",
		url: `https://hause.design/problems/${p.slug}`,
		publisher: "hause.design",
		kind: "article",
		abstract: p.dek,
		independence: "Published independently by Chris Hay.",
		about: ["design system", "AI interfaces", "interface semantics"],
		partOf: { title: "HAUSE — the problems", url: "https://hause.design/problems" },
		identifiers: buildIdentifiers(),
	};
}

export function problemCiteMeta(p: Problem): Record<string, string | string[]> {
	return citationMeta(problemRecord(p));
}

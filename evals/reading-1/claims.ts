/**
 * READING-1 — the claims three fresh readers made about HAUSE from the
 * public site, classified against what the site actually says.
 *
 * Filled in after the run, from the readers' own words. "supported"
 * requires a sentence on the site that can be pointed at; everything
 * softer than that is an inference at best.
 */

export type Class = "supported" | "reasonable inference" | "overgeneralisation" | "unsupported invention";

export type Claim = {
	reader: 1 | 2 | 3;
	/** Which of the eight questions it came from. */
	q: number;
	claim: string;
	verdict: Class;
	/** For supported: where on the site. For the rest: why it is not. */
	note: string;
	/** True where the reader itself flagged the answer as inference. */
	self_flagged?: boolean;
};

export const CLAIMS: Claim[] = [
	{ reader: 1, q: 1, claim: "HAUSE is a design system for AI \u2014 typed visual forms an AI composes answers from, not interface chrome", verdict: "supported", note: "home page, verbatim" },
	{ reader: 2, q: 1, claim: "35 forms in three modes: 12 statements, 15 instruments, 8 performances", verdict: "supported", note: "/forms, derived from the manifest" },
	{ reader: 3, q: 1, claim: "The specimen book is the library \u2014 every form shown is the real form running", verdict: "supported", note: "home page" },
	{ reader: 1, q: 2, claim: "For letting a system explain itself: asserting, supporting, declining, decomposing, performing", verdict: "supported", note: "/choosing, the six acts" },
	{ reader: 2, q: 2, claim: "Machine legibility runs both ways \u2014 models compose from the forms, machines must read them", verdict: "supported", note: "home page, /use" },
	{ reader: 3, q: 2, claim: "Citability: one record, four surfaces, so they cannot disagree", verdict: "supported", note: "/problems/nothing-to-cite" },
	{ reader: 1, q: 7, claim: "A conventional kit names shapes; HAUSE names the act, and the shape follows", verdict: "supported", note: "/problems/everything-becomes-a-card" },
	{ reader: 2, q: 7, claim: "Admission is evidential: 21 of 35 record the exhibition that forced them, 0 admitted to fill a gap", verdict: "supported", note: "/how-hause-grew" },
	{ reader: 3, q: 7, claim: "Refusal is a designed form rather than an error state", verdict: "supported", note: "/problems/interfaces-that-cannot-refuse" },
	{ reader: 1, q: 8, claim: "CHOOSING-1: 122/124 from names, 122/124 from the grammar, 8/124 for the resolver, and the A/B comparison reported as void", verdict: "supported", note: "/evals/choosing-1" },
	{ reader: 2, q: 8, claim: "ROUTING-1 states it was not preregistered and that the router's author wrote the cases", verdict: "supported", note: "/evals/routing-1" },
	{ reader: 3, q: 8, claim: "ROUTING-2 refuted its own intervention: 3/12 against the list's 0/12", verdict: "supported", note: "/evals/routing-2" },
	{ reader: 1, q: 8, claim: "18 of 35 forms come from a single consumer, named on the site as its own weakness", verdict: "supported", note: "/how-hause-grew" },
	{ reader: 2, q: 8, claim: "14 of 35 forms predate origin recording and are not reconstructed", verdict: "supported", note: "/how-hause-grew" },
	{ reader: 1, q: 3, claim: "The site never states a domain or product category HAUSE is not for", verdict: "supported", note: "true \u2014 and it is an absence, not a statement" },
	{ reader: 2, q: 3, claim: "There is no non-goals section anywhere", verdict: "supported", note: "true of the whole site" },
	{ reader: 3, q: 3, claim: "Beyond refusing a card kit, the site does not say what it is unsuitable for", verdict: "supported", note: "true of the whole site" },
	{ reader: 1, q: 3, claim: "The boundary is drawn around method, not around use cases", verdict: "reasonable inference", note: "the reader's own words for the absence; the site never frames it" },
	{ reader: 1, q: 5, claim: "The site does not address long-form essays", verdict: "supported", note: "true \u2014 no page mentions them" },
	{ reader: 2, q: 5, claim: "HAUSE would frame and punctuate an essay's claims rather than carry continuous narration", verdict: "reasonable inference", note: "self-flagged; follows from the statement forms being typed acts" },
	{ reader: 3, q: 5, claim: "Yes for an essay that argues and is accountable", verdict: "reasonable inference", note: "self-flagged as reading the catalogue, not the site" },
	{ reader: 1, q: 6, claim: "No: nothing on the site mentions commerce and no form serves a transactional act", verdict: "reasonable inference", note: "self-flagged; the premise is checkable and true" },
	{ reader: 2, q: 6, claim: "A shop needs exactly the card grid and form controls HAUSE refuses to supply", verdict: "overgeneralisation", note: "self-flagged as inference; the site never says a commerce page's explanatory acts are out of scope, and Comparison, Variants, Evidence and Answer would carry several of them" },
	{ reader: 3, q: 6, claim: "No \u2014 the selection grammar is organised around saying, supporting, declining, decomposing, performing", verdict: "reasonable inference", note: "self-flagged; correctly reasoned from the catalogue" },
	{ reader: 1, q: 4, claim: "Mechanically a React package; the framing as 'not a UI framework' is my characterisation", verdict: "reasonable inference", note: "self-flagged, and correct \u2014 the site never uses the phrase" },
	{ reader: 2, q: 4, claim: "No \u2014 the primitives are forms of explanation, not interface chrome", verdict: "supported", note: "home page, verbatim" },
	{ reader: 3, q: 4, claim: "It installs like one but holds no buttons, inputs, modals, tabs or navigation", verdict: "supported", note: "checkable against /forms" },
];

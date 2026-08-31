/**
 * ASK HAUSE — the resolver.
 *
 * Deterministic, like the system it serves: a question resolves
 * against the manifest and a small decision graph, and the answer is
 * not prose — it is a composition of HAUSE forms, because HAUSE is
 * both the subject of the answer and the medium of it. When nothing
 * is established, the answer is a Refusal — the form the system
 * already uses for exactly that.
 *
 * Three layers, in order: an interrogation (the system asked about
 * itself), a problem (the failure a reader is describing, answered by
 * the record that owns it), and a recommendation (which form an idea
 * needs). The middle layer is not hand-maintained — it resolves against
 * the problem records the site publishes, so a new problem page teaches
 * Ask the question it answers on the day it ships. No model call. A form
 * the system does not have is never invented.
 */

import { FORM_MANIFEST, formCount, formsByMode } from "@chrishayuk/hause/manifest";
import { formSlug } from "./forms";
import { PROBLEMS, problemsForForm, type Problem } from "./problems";

export type Block =
	| { kind: "statement"; text: string }
	| { kind: "observation"; label?: string; text: string }
	| { kind: "refusal"; title: string; lines: string[]; principle: string }
	| { kind: "evidence"; items: { label: string; status: "SUPPORTED" | "REFUTED"; detail: string }[] }
	| {
			kind: "decomposition";
			kicker: string;
			source: { label: string; detail: string };
			parts: { label: string; detail: string }[];
			result: { label: string; detail: string };
	  }
	| { kind: "timeline"; entries: { date: string; text: string }[] }
	| { kind: "excerpt"; source: string; heading?: string; text: string; trimmed?: boolean }
	| {
			kind: "comparison";
			kicker: string;
			objectLabel: string;
			blockLabels: string[];
			left: { label: string; properties: string[] };
			right: { label: string; properties: string[] };
	  }
	| { kind: "connection"; text: string; links: { href: string; label: string }[] }
	| {
			kind: "recommend";
			idea: string;
			form: string;
			because: string[];
			not: { form: string; reason: string }[];
			usedBy?: string;
			snippet: string;
	  };

export type AskAnswer = { id: string; blocks: Block[] };

const rec = (name: string) => {
	const f = FORM_MANIFEST.find((x) => x.name === name);
	return f ? { mode: f.mode, line: f.line } : { mode: "form", line: "" };
};

export function formMeta(name: string) {
	return rec(name);
}

/* ── Interrogations — ask the system about itself ── */

const INTERROGATIONS: { id: string; patterns: string[]; blocks: Block[] }[] = [
	{
		id: "instrument-vs-performance",
		patterns: ["difference between an instrument and a performance", "instrument or a performance", "instrument vs performance", "instrument and a performance", "instrument rather than a performance"],
		blocks: [
			{ kind: "statement", text: "The difference is agency: who is doing the work of understanding." },
			{
				kind: "comparison",
				kicker: "ONE ARGUMENT — TWO AGENCIES",
				objectLabel: "the same semantic move, either way",
				blockLabels: ["THE ARGUMENT", "THE PACE", "THE FALLBACK", "THE REST STATE"],
				left: {
					label: "AN INSTRUMENT",
					properties: ["The reader operates it", "Pace belongs to the hand", "A text fallback always present", "Rests wherever the reader leaves it"],
				},
				right: {
					label: "A PERFORMANCE",
					properties: ["The form performs itself", "Pace is authored — the hause stagger", "The resting state carries the point", "Never found finished by a scrolling reader"],
				},
			},
			{ kind: "observation", label: "THE PAIRINGS", text: "Some forms are siblings across the line: Comparison and Transformation express the same argument, as do Decomposition and Unfolding — identical props, different agency. Underneath the catalogue sits a smaller grammar of semantic operations; the mode is how the reader meets them." },
			{ kind: "connection", text: "See both sides exhibited.", links: [
				{ href: "/instruments", label: "INSTRUMENTS →" },
				{ href: "/performances", label: "PERFORMANCES →" },
			] },
		],
	},
	{
		id: "for-ai",
		patterns: ["design system for ai", "for ai", "why ai", "ai design system", "intelligent systems"],
		blocks: [
			{ kind: "statement", text: "HAUSE is a design system for AI: a visual language for intelligent systems to explain themselves." },
			{
				kind: "decomposition",
				kicker: "WHAT AI NEEDS TO SAY",
				source: { label: "an intelligent system with something to say", detail: "Not chat bubbles — explanations, evidence, comparisons, refusals, processes unfolding over time." },
				parts: [
					{ label: "STATEMENTS", detail: "How AI makes assertions legible — Claim, Evidence, Refusal, Question." },
					{ label: "INSTRUMENTS", detail: "How a person interrogates what the system did — Terminal, Comparison, Anatomy, Derivation." },
					{ label: "PERFORMANCES", detail: "How AI shows process, transformation and scale — Procession, Transformation, Quantisation, Magnitude." },
				],
				result: { label: "explanation, not chrome", detail: "The primitives are forms of argument — things a reader reads, operates, or watches." },
			},
			{ kind: "connection", text: "The consumers are the proof.", links: [
				{ href: "https://vindex3.org", label: "VINDEX3.ORG — A FORMAT, EXHIBITED →" },
				{ href: "/forms", label: "THE HOLDINGS →" },
			] },
		],
	},
	{
		id: "what-is-hause",
		patterns: ["what is hause", "what are you", "what's hause", "whats hause", "explain hause"],
		blocks: [
			{ kind: "statement", text: "HAUSE is a small set of semantic forms for ideas, systems and explanations — a specimen book that cannot drift from its library, because it is the library." },
			{
				kind: "decomposition",
				kicker: "ONE LANGUAGE — THREE MODES",
				source: { label: "an idea worth explaining", detail: "Before it is designed, it is something a reader must read, operate, or watch." },
				parts: [
					{ label: "STATEMENTS", detail: "Prose in the three voices. The reader reads." },
					{ label: "INSTRUMENTS", detail: "Interactive, always with a text fallback. The reader operates." },
					{ label: "PERFORMANCES", detail: "Cinematic, resting on a designed final state. The forms play themselves." },
				],
				result: { label: `${formCount()} forms`, detail: "Each exists because a real page needed it — never because a taxonomy had a gap." },
			},
			{ kind: "connection", text: "The book, by mode — every specimen is the real form.", links: [
				{ href: "/statements", label: "STATEMENTS →" },
				{ href: "/instruments", label: "INSTRUMENTS →" },
				{ href: "/performances", label: "PERFORMANCES →" },
				{ href: "/forms", label: "THE HOLDINGS →" },
			] },
		],
	},
	{
		id: "three-modes",
		patterns: ["why does hause have statements", "why three modes", "statements instruments and performances", "why the three modes", "why modes"],
		blocks: [
			{ kind: "statement", text: "The split was earned, not designed: the three modes are the three things a reader can be doing." },
			{
				kind: "decomposition",
				kicker: "THE DERIVATION",
				source: { label: "what is the reader doing?", detail: "Every form answers this before it answers anything else." },
				parts: [
					{ label: "READING", detail: "→ a Statement. The claim carries the room; the reader carries the claim." },
					{ label: "OPERATING", detail: "→ an Instrument. Understanding through manipulation, with the point surviving when the interaction is removed." },
					{ label: "WATCHING", detail: "→ a Performance. It plays itself, and a scrolling reader must never find it finished." },
				],
				result: { label: "the mode is derived", detail: "Named after the forms existed, not before — structure follows real chapters." },
			},
			{ kind: "evidence", items: [
				{ label: "Forms added to fill a taxonomy gap", status: "REFUTED", detail: "Zero. The three modes were named after the forms existed." },
			] },
			{ kind: "connection", text: "See each mode exhibited.", links: [
				{ href: "/statements", label: "MODE ONE →" },
				{ href: "/instruments", label: "MODE TWO →" },
				{ href: "/performances", label: "MODE THREE →" },
			] },
		],
	},
	{
		id: "no-cards",
		patterns: ["card", "cards"],
		blocks: [
			{
				kind: "refusal",
				title: "NO GENERIC CARD KIT",
				lines: ["requested    Card", `available    ${formCount()} semantic forms, each with a name and a job`],
				principle: "If you're about to add a Card, stop.",
			},
			{ kind: "statement", text: "A card is a container pretending to be a meaning. Say what the content is — a claim, an observation, evidence, a refusal — and the form already exists." },
			{ kind: "connection", text: "The failure this refusal answers, at length.", links: [
				{ href: "/problems/everything-becomes-a-card", label: "EVERYTHING BECOMES A CARD →" },
				{ href: "/forms", label: "THE HOLDINGS →" },
			] },
		],
	},
	{
		id: "what-is-performance",
		patterns: ["what is a performance", "what's a performance", "performances do", "what is performance"],
		blocks: [
			{ kind: "statement", text: "A performance plays itself: in-view start, a designed resting state, and never a crossfade between two physical forms of one thing — staged swaps only." },
			{ kind: "observation", label: "THE DISCIPLINE", text: "Reduced motion and no-JS get the resting state, which must carry the whole point. REPLAY where the piece runs once; a gentle in-view loop where a scrolling reader must never find it finished. Loops are silent." },
			{ kind: "connection", text: `${formsByMode("performance").length} of them, performing.`, links: [{ href: "/performances", label: "PERFORMANCES →" }] },
		],
	},
	{
		id: "what-is-instrument",
		patterns: ["what is an instrument", "what's an instrument", "instruments do"],
		blocks: [
			{ kind: "statement", text: "An instrument is operated: understanding through manipulation, and every one carries an always-present text fallback so the point survives with the interaction removed." },
			{ kind: "connection", text: `${formsByMode("instrument").length} of them, operable.`, links: [{ href: "/instruments", label: "INSTRUMENTS →" }] },
		],
	},
	{
		id: "terminal-provenance",
		patterns: ["where did terminal come from", "terminal come from", "terminal provenance", "who made terminal", "history of terminal"],
		blocks: [
			{ kind: "timeline", entries: [
				{ date: "vindex3.org", text: "The Explorer needed a query surface — psql, for a model. The terminal was built there, doing real work against a live public endpoint." },
				{ date: "the ladder", text: "Needed → built → generic (its props stopped knowing whose content they carry) → fallback → promoted. No rung skipped." },
				{ date: "2026-08-29", text: "The Terminal entered HAUSE as the eleventh instrument, and the specimen book showed it the same day." },
			] },
			{ kind: "evidence", items: [
				{ label: "Forms enter only through real need", status: "SUPPORTED", detail: "The Terminal's chrome is the form; its meaning stayed in the consumer's executor — which is why it generalised." },
			] },
			{ kind: "connection", text: "Operate the specimen, or see where it lives in the wild.", links: [
				{ href: "/instruments", label: "THE SPECIMEN →" },
				{ href: "https://vindex3.org/explorer", label: "VINDEX3 — THE EXPLORER →" },
			] },
		],
	},
	{
		id: "sound",
		patterns: ["what is sound for", "why sound", "sound do", "sounds for", "audio"],
		blocks: [
			{ kind: "statement", text: "Sound is semantic, synthesized, and off by default: a tick for a considered action, a swap for a staged exchange, a settle for arrival, a refuse for the fail-closed moment." },
			{ kind: "observation", label: "THE RESTRAINT", text: "No asset files, no ambience, and loops are silent — sound marks meaning, never atmosphere. The toggle in the header is the whole contract: nothing plays until a reader opts in." },
		],
	},
	{
		id: "numbers-editorial",
		patterns: ["numbers in a statement", "numbers in editorial", "number in a headline", "put numbers in"],
		blocks: [
			{
				kind: "refusal",
				title: "NUMBERS NEVER APPEAR IN EDITORIAL VOICE",
				lines: ["requested    a measurement, carrying the room", "available    evidence voice — where numbers live and are believed"],
				principle: "Editorial claims. System explains. Evidence measures.",
			},
			{ kind: "statement", text: "A number in a headline is a claim wearing a costume. Let the editorial voice make the claim, and let the evidence voice — mono, dated, attributed — carry the number beneath it." },
		],
	},
	{
		id: "dark-default",
		patterns: ["dark mode", "light mode", "light/dark", "dark default", "themes", "theme"],
		blocks: [
			{ kind: "statement", text: "Dark is the default environment — an editorial choice, not the OS preference. A viewer opts into light, and the choice persists." },
			{ kind: "observation", label: "TWO ENVIRONMENTS, ONE IDENTITY", text: "Same voices, grid, motion and hierarchy; different atmosphere. There is deliberately no prefers-color-scheme switch: the default is authored, and the toggle is the reader's." },
		],
	},
	{
		id: "problems",
		patterns: ["what problem", "problems does hause", "why does hause exist", "why hause exists", "what is wrong with", "what's wrong with", "why not just use"],
		blocks: [
			{ kind: "statement", text: "HAUSE is not a taxonomy that happened to need filling. Every form in it is a consequence of something that was failing." },
			{
				kind: "decomposition",
				kicker: "THE FAILURES, AND WHAT ANSWERED THEM",
				source: { label: "interfaces built for people who already know what they mean", detail: "A vocabulary of containers, an error state for every refusal, and a page whose meaning lives in the interaction." },
				parts: [
					{ label: "EVERYTHING BECOMES A CARD", detail: "Container names carry no claim about content, so a model matching names produces containers. → Statement, Claim, Evidence, Refusal, Comparison, Answer." },
					{ label: "INTERFACES THAT CANNOT REFUSE", detail: "Refusal dressed as an error is refusal designed out — and a system that cannot say no will guess. → Refusal, Variants." },
					{ label: "PAGES MACHINES CANNOT READ", detail: "Meaning inside a canvas or a click is invisible to the machines now doing the reading. → Answer, and every instrument's text fallback." },
					{ label: "NOTHING TO CITE", detail: "A mutable page with one timestamp cannot carry a priority claim. → Citation, Provenance." },
					{ label: "THE BOOK DRIFTS FROM THE CODE", detail: "Counts written as prose go stale silently — this site's own did. → the manifest, Agreement." },
					{ label: "TUTORIAL OR REFERENCE, NEVER BOTH", detail: "One subject split across two pages that quietly disagree. → Lens." },
				],
				result: { label: "the library, read backwards", detail: "Failure first, form second — which is the order they were actually built in." },
			},
			{ kind: "connection", text: "Each one at length, with the forms that answer it demonstrated on the page.", links: [
				{ href: "/problems", label: "THE PROBLEMS →" },
				{ href: "/forms", label: "THE HOLDINGS →" },
			] },
		],
	},
	{
		id: "citation",
		// Mechanism questions land here; the failure-shaped ones ("how do I
		// make a page citable?") belong to the problem record that owns them.
		patterns: ["bibtex", "csl", "reference manager", "zotero", "cite this", "citation tags", "four surfaces", "citationrecord"],
		blocks: [
			{ kind: "statement", text: "Publishing is a design-system concern here: one record, projected onto four surfaces that cannot disagree." },
			{
				kind: "decomposition",
				kicker: "ONE RECORD — FOUR SURFACES",
				source: { label: "a CitationRecord", detail: "Title, authors, first publication date, version, canonical URL — and only the identifiers that actually exist." },
				parts: [
					{ label: "THE PAGE", detail: "Provenance: one quiet evidence line, expanding to the commit, the artifact hash, the archive record and the dated history." },
					{ label: "THE EXPORT", detail: "Citation: the reference in the formats people paste. Plain, BibTeX, APA, CSL-JSON — three, because CSL-JSON becomes the rest." },
					{ label: "THE HEAD", detail: "citationMeta(): the citation_* tags Zotero, Scholar and every add-to-library button read." },
					{ label: "THE GRAPH", detail: "citationLd(): the same record said in schema.org, identifiers as PropertyValues." },
				],
				result: { label: "citable by default", detail: "No registration, no cost. A work worth defending can additionally become a registered publication — an immutable version plus a registered identifier." },
			},
			{ kind: "observation", label: "THE RULES ARE ONE RULE", text: "Published means first published: a revision sets revised, and never quietly moves the date, because the date is what a priority claim rests on. A substantive change is a new version, not a silent edit. And an identifier that has not been registered is absent — no placeholder DOI, no registration pending — exactly the discipline the manifest applies to an unrecorded origin." },
			{ kind: "connection", text: "Both forms, operable — and the record they are printing is this site's own.", links: [
				{ href: "/problems/nothing-to-cite", label: "NOTHING TO CITE — THE FAILURE →" },
				{ href: "/instruments", label: "THE SPECIMENS →" },
				{ href: "/use", label: "THE FOUR SURFACES, IN CODE →" },
			] },
		],
	},
	{
		id: "install",
		patterns: ["install", "npm", "how do i use hause", "get started", "setup"],
		blocks: [
			{ kind: "statement", text: "The on-ramp is deliberately next door to the exhibition: install, tokens, one minimal chapter." },
			{ kind: "connection", text: "The plumbing, in evidence voice.", links: [{ href: "/use", label: "USE HAUSE →" }] },
		],
	},
];

/* ── Recommendations — which form does this idea need ── */

const RECOMMENDATIONS: {
	keywords: string[];
	form: string;
	because: string[];
	not: { form: string; reason: string }[];
	usedBy?: string;
	snippet: string;
}[] = [
	{
		keywords: ["compare", "comparison", "versus", "vs", "side by side", "difference between"],
		form: "Comparison",
		because: ["The comparison is the argument, not an illustration of it", "The reader needs to operate the distinction — drag between interpretations", "Two states of one object, held to the same blocks"],
		not: [
			{ form: "Variants", reason: "alternatives of one identity aren't the subject here" },
			{ form: "Transformation", reason: "no temporal change — unless you want it performed, its cinematic sibling takes identical props" },
			{ form: "Statement", reason: "prose would flatten the comparison into an assertion" },
		],
		usedBy: "the codex · vindex3.org (as Transformation)",
		snippet: '<Comparison kicker="…" objectLabel="…" blockLabels={[…]} left={{…}} right={{…}} />',
	},
	{
		keywords: ["proof", "proven", "evidence", "measured", "experiment", "supported", "receipts"],
		form: "Evidence",
		because: ["Findings with status marks — receipts, not decoration", "Each row carries its own detail, date, and attribution", "SUPPORTED and REFUTED sit side by side, which is what makes either believable"],
		not: [
			{ form: "Claim", reason: "a single assertion — use it for the belief, Evidence for the receipts" },
			{ form: "Statement", reason: "editorial voice asserts; it does not measure" },
		],
		usedBy: "vindex3.org · the Record",
		snippet: '<Evidence items={[{ label, status: "SUPPORTED", detail }]} />',
	},
	{
		keywords: ["stages", "gated", "irreversible", "rungs", "milestones", "progression", "checklist"],
		form: "Ladder",
		because: ["A gated progression: rungs climbed in order, each closed only by its own criterion", "Status per rung — PASSED, BUILDING, OPEN — with detail where it is earned", "Irreversibility is the form's premise: no rung is skipped"],
		not: [
			{ form: "Timeline", reason: "history records what happened; a ladder governs what may happen next" },
			{ form: "Procession", reason: "a procession performs flow; it does not gate it" },
		],
		usedBy: "vindex3.org · the Record's G-ladder and migration rungs",
		snippet: '<Ladder rungs={[{ id, question, gate, status }]} caption="…" />',
	},
	{
		keywords: ["sequence", "pipeline", "flow", "passes through", "step by step", "process"],
		form: "Procession",
		because: ["One thing passing through every stage, in order — performed, not listed", "The reader watches the flow; the resting state carries it for everyone else"],
		not: [{ form: "Ladder", reason: "unless the stages gate each other — then the ladder" }],
		usedBy: "vindex3.org · the Physics",
		snippet: '<Procession stages={["…"]} caption="…" />',
	},
	{
		keywords: ["history", "timeline", "dates", "chronology", "when"],
		form: "Timeline",
		because: ["Dated entries in order — history as prose, not a widget"],
		not: [{ form: "Ladder", reason: "a ladder is for futures with criteria, not pasts with dates" }],
		snippet: "<Timeline entries={[{ date, text }]} />",
	},
	{
		keywords: ["mechanism", "cutaway", "layers of", "inside", "anatomy", "annotated"],
		form: "Anatomy",
		because: ["An annotated cutaway, fully disclosed — nothing behind a click", "One artifact drawn as its layers, each with note and detail"],
		not: [{ form: "Decomposition", reason: "use it when the parts assemble into something — Anatomy discloses, Decomposition builds" }],
		usedBy: "vindex3.org · the Container, the Execution surfaces",
		snippet: '<Anatomy kicker="…" objectLabel="…" layers={[{ label, note, detail }]} />',
	},
	{
		keywords: ["parts", "decompose", "breakdown", "assembles", "components of"],
		form: "Decomposition",
		because: ["One object, its parts, the thing that assembles them — stepped by hand", "Its cinematic sibling, Unfolding, takes identical props when you want it performed"],
		not: [{ form: "Anatomy", reason: "for a cutaway of one artifact rather than an assembly" }],
		snippet: "<Decomposition source={{…}} parts={[…]} result={{…}} />",
	},
	{
		keywords: ["change over", "becomes", "transformation", "before and after", "morph"],
		form: "Transformation",
		because: ["One object, two interpretations — performed as a staged swap, never a crossfade", "Comparison's cinematic sibling: identical props, the reader watches instead of drags"],
		not: [{ form: "Comparison", reason: "when the reader should operate the distinction instead" }],
		usedBy: "vindex3.org · the home overture",
		snippet: "<Transformation from={{…}} to={{…}} blockLabels={[…]} />",
	},
	{
		keywords: ["refuse", "refusal", "reject", "not allowed", "forbidden", "error state", "fail"],
		form: "Refusal",
		because: ["Fail-closed as design language: the refusal gets more design attention than the success path", "It names what was requested, what is available, and the principle"],
		not: [{ form: "Statement", reason: "a rule asserted is weaker than a refusal performed" }],
		usedBy: "vindex3.org · selection fails closed",
		snippet: '<Refusal title="…" lines={["requested …", "available …"]} principle="…" />',
	},
	{
		keywords: ["scale", "magnitude", "how big", "zoom", "orders of magnitude"],
		form: "Magnitude",
		because: ["A powers-of-ten zoom-out — each arrival rescales the world", "Scale is felt, not stated"],
		not: [{ form: "Evidence", reason: "for the measured numbers themselves" }],
		usedBy: "vindex3.org · the Physics",
		snippet: "<Magnitude items={[{ label, sub, magnitude }]} note=\"…\" />",
	},
	{
		keywords: ["bytes", "binary", "layout", "header", "offsets", "file format"],
		form: "ByteMap",
		because: ["A physical layout drawn to scale — each field's width is its width in bytes", "The one place a page should feel like an engineering drawing"],
		not: [{ form: "Anatomy", reason: "for semantic layers rather than physical bytes" }],
		snippet: "<ByteMap fields={[{ name, type, bytes, meaning }]} totalLabel=\"…\" />",
	},
	{
		keywords: ["variants", "alternatives", "editions", "versions of", "absent"],
		form: "Variants",
		because: ["One identity, physically present variants, a staged swap", "And a designed refusal for the absent one — a catalogue never lies about its holdings"],
		not: [{ form: "Comparison", reason: "when two interpretations argue, rather than variants of one identity" }],
		usedBy: "vindex3.org · selection, not conversion",
		snippet: "<Variants variants={[…]} baseline=\"…\" refusalTitle=\"…\" />",
	},
	{
		keywords: ["expand", "gate", "judge", "compress", "widen", "filter then"],
		form: "Gating",
		because: ["Expand, judge, compress — performed by widths; judged channels visibly fade", "It plays itself once on arrival, then rests under the reader's chips"],
		not: [{ form: "Procession", reason: "when the stages are places rather than judgements" }],
		usedBy: "vindex3.org · the Anatomy's feed-forward",
		snippet: "<Gating stages={[…]} keep={[…]} channels={24} />",
	},
	{
		keywords: ["terminal", "query", "command", "shell", "repl", "console"],
		form: "Terminal",
		because: ["A query surface whose chrome is the form and whose meaning is one executor function", "Tab completion, seeds, designed result panels — and the discipline stays in the executor"],
		not: [{ form: "Film", reason: "a recording of a terminal is a demo; the Terminal is the real surface" }],
		usedBy: "vindex3.org · the Explorer, live",
		snippet: "<Terminal banner={[…]} execute={(line) => …} seeds={[…]} />",
	},
	{
		keywords: ["explore rather than watch", "interactive", "operate", "hands on", "play with"],
		form: "ExpertField",
		because: ["Understanding through manipulation — the reader lights the subset that answers", "If the reader should operate it, it is an instrument; every instrument keeps a text fallback"],
		not: [{ form: "Film", reason: "watching is a performance's job" }],
		snippet: "<ExpertField totalUnits={36} scenarios={[…]} />",
	},
	{
		keywords: ["depth", "tutorial", "reference", "beginner", "advanced", "progressive disclosure", "learn and spec", "two audiences"],
		form: "Lens",
		because: ["One concept, one URL, several depths — the explanation, the object, and the clause that governs it", "The reader's chosen depth is remembered across pages and written into the fragment, so it can be linked", "Every panel stays in the DOM: depth is disclosure, never content gating"],
		not: [
			{ form: "Comparison", reason: "two interpretations argue; depths are the same subject held at different resolutions" },
			{ form: "Anatomy", reason: "a cutaway discloses parts of one object, not registers of one explanation" },
		],
		usedBy: "vindex3.org · representation",
		snippet: "<Lens concept=\"…\" depths={[{ id: \"learn\" }, { id: \"inspect\" }, { id: \"spec\" }]} />",
	},
	{
		keywords: ["cite", "citation", "bibtex", "bibliography", "reference", "apa", "csl"],
		form: "Citation",
		because: ["The reference itself, in the formats people paste — plain, BibTeX, APA, CSL-JSON", "Plain is selected by default, so the citation is in the served HTML before any JavaScript runs", "Every string is produced from one record, so the page cannot disagree with the head or the graph"],
		not: [
			{ form: "Provenance", reason: "for the record behind the work — dates, identifiers, history — rather than the reference to it" },
			{ form: "Snippet", reason: "a citation is not a code block; it is a published object with a shape" },
		],
		usedBy: "hause.design · vindex3.org",
		snippet: "<Citation record={RECORD} note=\"…\" />",
	},
	{
		keywords: ["provenance", "authorship", "priority", "attribution", "published", "versioned", "timestamp", "audit"],
		form: "Provenance",
		because: ["One quiet line at rest — published, revised, version, DOI where one exists — expanding to the full record", "Identifiers pin the work to actual objects: a commit, an artifact hash, an archive record", "A claim that cannot be dated is a claim that cannot be defended"],
		not: [
			{ form: "Timeline", reason: "history as prose belongs in the chapter; provenance is the record beneath it" },
			{ form: "Evidence", reason: "evidence measures the claim; provenance dates and identifies the work" },
		],
		usedBy: "vindex3.org · the specification's chapters",
		snippet: "<Provenance record={RECORD} history={[…]} citeHref=\"#cite\" />",
	},
	{
		keywords: ["video", "film", "movie", "recording"],
		form: "Film",
		because: ["A short film in the flow of a chapter — poster until it earns the play"],
		not: [{ form: "Transformation", reason: "if the change can be performed by the forms themselves, no pixels need shipping" }],
		snippet: '<Film title="…" src="…" poster="…" />',
	},
];

const STOP = new Set(["the", "a", "an", "i", "to", "of", "and", "or", "for", "in", "on", "my", "me", "is", "it", "that", "this", "with", "how", "do", "need", "want", "should", "use", "show", "have"]);

/**
 * The problem layer: retrieval over the published records, not over a
 * hand-written FAQ. A question scores against the failure's own title,
 * question, symptom and cause; the threshold is deliberately high so a
 * request for a form ("I need to compare three strategies") still
 * reaches the recommendation layer rather than being answered with an
 * essay about why interfaces converge.
 */
function problemMatch(question: string): Problem | null {
	const ql = question.toLowerCase();
	const toks = ql.split(/[^a-z0-9]+/).filter((t) => t.length > 3 && !STOP.has(t));
	if (toks.length === 0) return null;
	let best: { p: Problem; score: number } | null = null;
	for (const p of PROBLEMS) {
		const strong = `${p.title} ${p.question}`.toLowerCase();
		const weak = `${p.dek} ${p.symptom} ${p.cause} ${p.statement}`.toLowerCase();
		// The record's own words for the failure, scored rather than
		// returned: two problems can both recognise a word, and the one
		// that recognises more of the question should win it.
		let score = p.keywords.filter((k) => ql.includes(k)).length * 8;
		let hits = score > 0 ? 2 : 0;
		for (const t of toks) {
			if (strong.includes(t)) {
				score += 4;
				hits += 1;
			} else if (weak.includes(t)) {
				score += 1;
				hits += 1;
			}
		}
		if (hits >= 2 && score >= 8 && (!best || score > best.score)) best = { p, score };
	}
	return best?.p ?? null;
}

function problemBlocks(p: Problem): Block[] {
	return [
		{ kind: "statement", text: p.statement },
		{ kind: "observation", label: "HOW YOU MEET IT", text: p.symptom },
		{ kind: "observation", label: "WHY IT HAPPENS", text: p.cause },
		{
			kind: "connection",
			text: `${p.answers.join(" · ")} — the forms that answer it, and the failure at length.`,
			links: [
				{ href: `/problems/${p.slug}`, label: `${p.title} →` },
				...p.answers.slice(0, 3).map((name) => ({ href: `/forms/${formSlug(name)}`, label: `${name.toUpperCase()} →` })),
			],
		},
	];
}

export function askHause(question: string): AskAnswer {
	const ql = question.toLowerCase();
	for (const entry of INTERROGATIONS) {
		if (entry.patterns.some((p) => ql.includes(p))) return { id: entry.id, blocks: entry.blocks };
	}
	const problem = problemMatch(question);
	if (problem) return { id: `problem-${problem.slug}`, blocks: problemBlocks(problem) };

	const toks = ql.split(/[^a-z0-9/]+/).filter((t) => t.length > 1 && !STOP.has(t));
	let best: { r: (typeof RECOMMENDATIONS)[number]; score: number } | null = null;
	for (const r of RECOMMENDATIONS) {
		let score = 0;
		for (const kw of r.keywords) {
			if (kw.includes(" ") ? ql.includes(kw) : toks.includes(kw)) score += kw.includes(" ") ? 3 : 2;
		}
		if (score > 0 && (!best || score > best.score)) best = { r, score };
	}
	if (best) {
		const meta = rec(best.r.form);
		return {
			id: `recommend-${best.r.form}`,
			blocks: [
				{
					kind: "recommend",
					idea: question,
					form: best.r.form,
					because: best.r.because,
					not: best.r.not,
					usedBy: best.r.usedBy,
					snippet: best.r.snippet,
				},
				{
					kind: "connection",
					text: `${best.r.form} — ${meta.line}`,
					links: [
						{ href: `/forms/${formSlug(best.r.form)}`, label: `${best.r.form.toUpperCase()} — THE FORM'S PAGE →` },
						...problemsForForm(best.r.form).map((p) => ({ href: `/problems/${p.slug}`, label: `SOLVES — ${p.title} →` })),
						{ href: `/${meta.mode}s`, label: `THE ${meta.mode.toUpperCase()} SPECIMENS →` },
					],
				},
			],
		};
	}
	return {
		id: "no-form",
		blocks: [
			{
				kind: "refusal",
				title: "NO FORM ESTABLISHED",
				lines: [`requested    ${question.slice(0, 60)}`, `available    ${formCount()} semantic forms, each with a name and a job`],
				principle: "A form enters HAUSE when a real page needs it — never because a question had a gap.",
			},
			{ kind: "statement", text: "If the idea is real, it may yet earn a form: build the chapter that cannot exist without it, and the ladder is waiting." },
			{ kind: "connection", text: "What exists, one line each.", links: [{ href: "/forms", label: "THE HOLDINGS →" }] },
		],
	};
}

export const ASK_SUGGESTIONS = [
	"I need to compare three strategies",
	"Why doesn't HAUSE have cards?",
	"How do I show a claim is proven?",
	"I have six irreversible stages",
	"Where did Terminal come from?",
	"How do I make a page citable?",
	"What are you, HAUSE?",
];

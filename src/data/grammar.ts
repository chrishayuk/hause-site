import { FORM_MANIFEST } from "@chrishayuk/hause/manifest";

/**
 * THE SELECTION GRAMMAR.
 *
 * The catalogue answers "what exists". This answers the question a
 * writer — or a model — actually has, which is "what am I doing?".
 * Thirty-five forms is enough that choosing between them is itself a
 * design problem, and a vocabulary nobody can select from is a
 * vocabulary that will be ignored in favour of a rectangle.
 *
 * Each act names the move, the form it selects, and the test that
 * decides it — the question you ask yourself to know this is the act
 * and not its neighbour. `insteadOf` names the neighbour, because most
 * of the difficulty in a semantic vocabulary is not finding the right
 * form; it is telling two nearly-right forms apart.
 *
 * The grammar must name every form the library holds. A form nobody can
 * arrive at by describing what they are doing is a form nobody will
 * use, so the coverage suite fails when one is missing.
 */

export type Act = {
	/** What you are doing, in your own words. */
	doing: string;
	/** The form that move selects. */
	form: string;
	/** The question that decides it. */
	test: string;
	/** The neighbouring form, and when it is the one you want instead. */
	insteadOf?: { form: string; when: string }[];
};

export type Intent = { id: string; label: string; line: string; acts: Act[] };

export const GRAMMAR: Intent[] = [
	{
		id: "asserting",
		label: "YOU ARE SAYING SOMETHING",
		line: "The move is an assertion. What separates them is not tone — it is what the sentence owes.",
		acts: [
			{
				doing: "Making the point the room is about",
				form: "Statement",
				test: "Would a reader quote this line if they quoted one line?",
				insteadOf: [
					{ form: "Claim", when: "the assertion owes evidence, and should carry a status mark" },
					{ form: "Observation", when: "you are describing what is there rather than what it means" },
				],
			},
			{
				doing: "Asserting something you believe and must defend",
				form: "Claim",
				test: "Could this be shown false? Does it need a status — open, supported, refuted?",
				insteadOf: [{ form: "Statement", when: "the line is a turn in the argument rather than a testable belief" }],
			},
			{
				doing: "Reporting what is actually there, before what it means",
				form: "Observation",
				test: "Can you name the thing being observed in three words? That label is the form.",
				insteadOf: [{ form: "Claim", when: "you have moved from noticing to arguing" }],
			},
			{
				doing: "Answering the question a reader would type",
				form: "Answer",
				test: "Is there a forty-to-a-hundred-word paragraph a stranger could lift whole and still be right?",
				insteadOf: [{ form: "Statement", when: "you want the claim at display size rather than the plain answer beneath it" }],
			},
			{
				doing: "Opening the room and saying which room it is",
				form: "Hero",
				test: "Is this the first thing on the page? A second Hero is a second chapter, and probably a second URL.",
			},
			{
				doing: "Quoting someone else, verbatim",
				form: "Excerpt",
				test: "Are these words yours? If they are not, they keep their own markdown, their source and their trims.",
				insteadOf: [{ form: "Snippet", when: "the quoted thing is code or terminal output rather than prose" }],
			},
		],
	},
	{
		id: "showing-support",
		label: "YOU ARE SHOWING WHAT HOLDS IT UP",
		line: "Evidence is not decoration and not a table of wins. These forms all exist to make a claim checkable by someone who does not trust you.",
		acts: [
			{
				doing: "Showing the findings behind a claim",
				form: "Evidence",
				test: "Does at least one row refute something? A list with no failures is advertising.",
				insteadOf: [{ form: "Claim", when: "you are stating the belief rather than the receipts" }],
			},
			{
				doing: "Showing that independent authorities agree",
				form: "Agreement",
				test: "Are there N values derived separately that must be identical — and would a mismatch be a named failure?",
				insteadOf: [{ form: "Evidence", when: "the findings are different facts rather than the same fact checked twice" }],
			},
			{
				doing: "Showing how a value was arrived at",
				form: "Derivation",
				test: "Does the value fold down a graded scale by caps, so nobody had to assert the result?",
				insteadOf: [{ form: "Evidence", when: "the number was measured rather than derived" }],
			},
			{
				doing: "Showing the code or output itself",
				form: "Snippet",
				test: "Is this verbatim, and would paraphrasing it be a lie?",
			},
			{
				doing: "Saying when this was published, and what it was built from",
				form: "Provenance",
				test: "Does this page make a claim someone might need to date?",
			},
			{
				doing: "Letting someone cite you",
				form: "Citation",
				test: "Is this a published object — something a reader could reference in their own work?",
				insteadOf: [{ form: "Provenance", when: "you are showing the record behind the work rather than the reference to it" }],
			},
		],
	},
	{
		id: "declining",
		label: "YOU ARE DECLINING, OR LEAVING IT OPEN",
		line: "The moves most systems have no vocabulary for — which is why systems without them guess.",
		acts: [
			{
				doing: "Declining to assert something",
				form: "Refusal",
				test: "Is this the system working correctly by not answering? Then it is not an error state.",
				insteadOf: [{ form: "Question", when: "nobody is refusing anything — the matter is simply unresolved" }],
			},
			{
				doing: "Leaving something unresolved, at full size",
				form: "Question",
				test: "Would burying this in a roadmap be more comfortable than printing it? Print it.",
			},
			{
				doing: "Showing which alternatives exist, and refusing the absent one",
				form: "Variants",
				test: "Are these physically present forms of one identity — and does asking for a missing one deserve a designed refusal?",
				insteadOf: [{ form: "Comparison", when: "the two things are interpretations rather than alternatives of one identity" }],
			},
			{
				doing: "Showing what has to be true before the next step",
				form: "Ladder",
				test: "Is each rung closed by its own criterion, in order, with no rung skippable?",
				insteadOf: [{ form: "Timeline", when: "you are recording what happened rather than governing what may happen next" }],
			},
		],
	},
	{
		id: "showing-a-thing",
		label: "YOU ARE SHOWING WHAT SOMETHING IS MADE OF",
		line: "The reader operates these. Each one takes an object apart in a different direction.",
		acts: [
			{
				doing: "Cutting one object open and labelling its layers",
				form: "Anatomy",
				test: "Is everything disclosed at once, with nothing behind a click?",
				insteadOf: [{ form: "Decomposition", when: "the reader should take it apart step by step rather than see it opened" }],
			},
			{
				doing: "Taking one thing apart, step by step",
				form: "Decomposition",
				test: "Does the reader control the pace? If the explanation should carry them, it is Unfolding.",
				insteadOf: [{ form: "Unfolding", when: "the parts should arrive on their own — identical props, performed" }],
			},
			{
				doing: "Showing a physical layout to scale",
				form: "ByteMap",
				test: "Does the width of each field on screen mean its width in the artifact?",
			},
			{
				doing: "Showing one subject at several depths, on one URL",
				form: "Lens",
				test: "Are the explanation, the object and the clause the same subject rather than three subjects?",
				insteadOf: [{ form: "Anatomy", when: "the depths are parts of one object rather than registers of one explanation" }],
			},
			{
				doing: "Showing a field where only a subset ever activates",
				form: "ExpertField",
				test: "Is the point that most of it stays dormant, and which part lights depends on the input?",
			},
			{
				doing: "Showing a stream widened, judged, and brought back",
				form: "Gating",
				test: "Does the argument live in the widths — expand, judge channel by channel, compress?",
			},
			{
				doing: "Letting the reader query something real",
				form: "Terminal",
				test: "Is there an executor behind this, answering for real? A recording of a terminal is a Film.",
			},
			{
				doing: "Showing the path between connected ideas",
				form: "FollowReveal",
				test: "Does each step carry the relation that brought it there?",
				insteadOf: [{ form: "Connection", when: "you only need the doors out of the chapter, not the shape of the path" }],
			},
		],
	},
	{
		id: "over-time",
		label: "YOU ARE SHOWING SOMETHING HAPPENING",
		line: "These play themselves, and rest on a designed final state — which is what a reader with reduced motion, or no JavaScript, actually receives.",
		acts: [
			{
				doing: "Showing one object read two ways",
				form: "Comparison",
				test: "Should the reader drag between the interpretations themselves?",
				insteadOf: [{ form: "Transformation", when: "the change should perform itself — identical props, its cinematic sibling" }],
			},
			{
				doing: "Performing a change between two states of one thing",
				form: "Transformation",
				test: "Is it a staged swap rather than a crossfade? Two physical forms of one object never dissolve into each other.",
				insteadOf: [{ form: "Comparison", when: "the pace belongs to the reader" }],
			},
			{
				doing: "Letting the parts of a thing arrive on their own",
				form: "Unfolding",
				test: "Same props as Decomposition — is the reader watching rather than operating?",
			},
			{
				doing: "Showing many inputs compiled down to one output",
				form: "Compilation",
				test: "Do the inputs lose their separateness by the end?",
				insteadOf: [{ form: "Procession", when: "one thing passes through stages and stays itself" }],
			},
			{
				doing: "Showing one thing pass through every stage in order",
				form: "Procession",
				test: "Is it the same object at the end, having been somewhere?",
			},
			{
				doing: "Showing a scale nobody can hold in their head",
				form: "Magnitude",
				test: "Does each arrival rescale the world — powers of ten rather than a bar chart?",
			},
			{
				doing: "Showing throughput against a fixed capacity",
				form: "Channel",
				test: "Is the constraint the conduit rather than the quantity?",
			},
			{
				doing: "Showing values snapped onto a lattice",
				form: "Quantisation",
				test: "Is the loss the subject — what rounding actually does, rather than a claim about it?",
			},
			{
				doing: "Playing an actual film",
				form: "Film",
				test: "Does a real film exist? If not, the library holds the form and shows nothing.",
			},
		],
	},
	{
		id: "moving-the-reader",
		label: "YOU ARE MOVING THE READER ON",
		line: "Where a chapter ends, and how a history is told.",
		acts: [
			{
				doing: "Ending the chapter and opening the next",
				form: "Connection",
				test: "Does the sentence raise the next chapter's question rather than summarise this one?",
			},
			{
				doing: "Telling what happened, in order",
				form: "Timeline",
				test: "Does every line carry a date? If they do not, this is prose, not a history.",
				insteadOf: [{ form: "Provenance", when: "the history belongs to one published object rather than to the subject" }],
			},
		],
	},
];

export const ACTS: Act[] = GRAMMAR.flatMap((i) => i.acts);

/** Forms the grammar names — and the ones it has forgotten. */
export function grammarCoverage(): { named: string[]; missing: string[]; duplicated: string[] } {
	const named = ACTS.map((a) => a.form);
	const seen = new Set<string>();
	const duplicated = named.filter((n) => (seen.has(n) ? true : (seen.add(n), false)));
	const missing = FORM_MANIFEST.map((f) => f.name).filter((n) => !seen.has(n));
	return { named, missing, duplicated };
}

export function actFor(form: string): Act | null {
	return ACTS.find((a) => a.form === form) ?? null;
}

export function intentFor(form: string): Intent | null {
	return GRAMMAR.find((i) => i.acts.some((a) => a.form === form)) ?? null;
}

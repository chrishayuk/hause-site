/**
 * ROUTING-1 — the same vocabulary, five different requests.
 *
 * CHOOSING-1 found that twenty-six form-selection questions were
 * answered with a problem chapter, because both spaces use the same
 * words. This set isolates that: twelve topics, each asked five ways,
 * so the only thing separating a case from its neighbours is the kind
 * of answer being requested.
 *
 * Stated weakness, first: the author of the router also wrote these
 * cases. ROUTING-1 is therefore a regression gate, not evidence of
 * generality — it can show the defect is closed and cannot show the
 * router is good.
 */

export type Kind = "select" | "form" | "problem" | "history" | "system";
export type RoutingCase = { id: string; topic: string; q: string; kind: Kind };

const T = (topic: string, qs: Record<Kind, string>): RoutingCase[] =>
	(Object.keys(qs) as Kind[]).map((k) => ({ id: `${topic}-${k}`, topic, q: qs[k], kind: k }));

export const ROUTING_CASES: RoutingCase[] = [
	...T("citation", {
		select: "I want people to be able to reference this page in their own work — which form should I use?",
		form: "What does Citation do?",
		problem: "Why is web content so hard to cite properly?",
		history: "Why does HAUSE have Citation?",
		system: "Is HAUSE published to a registry?",
	}),
	...T("provenance", {
		select: "We need to show when this was first published and what built it — what should we use?",
		form: "What is Provenance?",
		problem: "Why does published work end up with nothing anyone can point at?",
		history: "Where did Provenance come from?",
		system: "What are the three voices?",
	}),
	...T("certainty", {
		select: "I have a belief that might be wrong and I want the page to show it is not settled — which form?",
		form: "What does Claim do?",
		problem: "Why does everything an AI writes sound equally confident?",
		history: "Why does Claim exist?",
		system: "What is a statement, in HAUSE?",
	}),
	...T("refusal", {
		select: "The system needs to decline this request on the page — how should I present that?",
		form: "What is Refusal?",
		problem: "Why do interfaces guess instead of saying no?",
		history: "Where did Refusal come from?",
		system: "Does HAUSE have a card component?",
	}),
	...T("drift", {
		select: "I need to show three separately-derived numbers that must match — what should I use?",
		form: "What does Agreement do?",
		problem: "Why does documentation keep going stale?",
		history: "Why does HAUSE have Agreement?",
		system: "How does HAUSE keep its counts honest?",
	}),
	...T("depth", {
		select: "How should I present an explanation, the working tool and the legal text on one page?",
		form: "What is Lens?",
		problem: "Why do tutorials and references always end up disagreeing?",
		history: "Why does Lens exist?",
		system: "What are the three modes?",
	}),
	...T("evidence", {
		select: "I have four findings, two of which failed — which form carries that?",
		form: "What does Evidence do?",
		problem: "Why do product pages only ever show their wins?",
		history: "Where did Evidence come from?",
		system: "What does evidence voice mean?",
	}),
	...T("comparison", {
		select: "I want the reader to move between two readings of one object — what should I use?",
		form: "What is Comparison?",
		problem: "Why do AI interfaces collapse everything into the same rectangle?",
		history: "Why does HAUSE have Comparison?",
		system: "What is the difference between an instrument and a performance?",
	}),
	...T("motion", {
		select: "How should I show a before and after that plays itself?",
		form: "What does Transformation do?",
		problem: "Why is most interface animation pointless?",
		history: "Why does Transformation exist?",
		system: "What is HAUSE's easing curve?",
	}),
	...T("legibility", {
		select: "I want a short paragraph a machine can lift whole — which form?",
		form: "What is Answer?",
		problem: "Why can't answer engines read a beautifully designed page?",
		history: "Where did Answer come from?",
		system: "What does HAUSE mean by machine legibility?",
	}),
	...T("terminal", {
		select: "I need a box where readers query our live index — what should that be?",
		form: "What does Terminal do?",
		problem: "Why do docs demo a shell with a screenshot?",
		history: "Why does HAUSE have Terminal?",
		system: "How do I install HAUSE?",
	}),
	...T("history", {
		select: "I want to show what happened, dated, in order — which form?",
		form: "What is Timeline?",
		problem: "Why do changelogs lose the reason a thing changed?",
		history: "Which forms came from vindex3?",
		system: "How does a form enter the library?",
	}),
];

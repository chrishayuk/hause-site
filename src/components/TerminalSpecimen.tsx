"use client";

import { Terminal, type TerminalLine, type TerminalResult } from "@chrishayuk/hause/components/forms/Terminal";

/**
 * The Terminal's specimen executor: a tiny shell over the library
 * itself. The form supplies the chrome; this file supplies the meaning
 * — which is the specimen invariant again: the book browsing the book.
 */

const FORMS: Record<string, { mode: string; line: string }> = {
	Hero: { mode: "statement", line: "The room's first wall: kicker, headline, dek." },
	Statement: { mode: "statement", line: "One sentence, given the whole width." },
	Ladder: { mode: "instrument", line: "A gated progression — no rung skipped." },
	Variants: { mode: "instrument", line: "Physically present variants, and a designed refusal for the absent one." },
	ByteMap: { mode: "instrument", line: "A layout drawn to scale — width is bytes." },
	Transformation: { mode: "performance", line: "Comparison's cinematic sibling; identical props." },
	Terminal: { mode: "instrument", line: "This one. A query surface whose meaning lives in its executor." },
};

const BANNER: TerminalLine[] = [
	{ text: "Connected — the HAUSE library · specimen shell", tone: "ok" },
	{ text: "The executor is fifty lines in this page; the chrome is the form itself", tone: "dim" },
	{ text: "Type HELP, or start with SHOW FORMS;", tone: "dim" },
];

const HELP: TerminalLine[] = [
	{ text: "the specimen grammar:", tone: "dim" },
	{ text: "  SHOW FORMS            the library's holdings" },
	{ text: "  DESCRIBE <Form>       one form, in a line" },
	{ text: "  HELP · CLEAR", tone: "dim" },
	{ text: "mutation verbs are not represented — try one and watch the refusal", tone: "dim" },
];

function execute(raw: string): TerminalResult {
	const s = raw.trim().replace(/;+$/, "");
	const up = s.toUpperCase();
	if (!s) return { lines: [] };
	if (up === "CLEAR") return { lines: [], clear: true };
	if (up === "HELP" || up === "?") return { lines: HELP };
	if (/^(delete|drop|rm|remove|update|insert|sudo)\b/i.test(s))
		return {
			refused: true,
			lines: [
				{ text: `${s.split(/\s+/)[0].toUpperCase()}: no such operation in this universe`, tone: "err" },
				{ text: "a refusal is a capability statement, not an apology — the library is read-only", tone: "dim" },
			],
		};
	if (/^SHOW\s+FORMS$/i.test(s))
		return {
			lines: [
				{ text: "FORM             MODE          ", tone: "dim" },
				...Object.entries(FORMS).map(([name, f]) => ({
					text: `${name.padEnd(17)}${f.mode.padEnd(14)}${f.line}`,
					tone: name === "Terminal" ? ("accent" as const) : undefined,
				})),
			],
		};
	const m = s.match(/^DESCRIBE\s+(\w+)$/i);
	if (m) {
		const hit = Object.entries(FORMS).find(([name]) => name.toLowerCase() === m[1].toLowerCase());
		if (!hit) return { refused: true, lines: [{ text: `${m[1]}: not in the library — SHOW FORMS lists the holdings`, tone: "err" }] };
		return {
			lines: [
				{ text: `FORM     ${hit[0]}` },
				{ text: `MODE     ${hit[1].mode}` },
				{ text: `IMPORT   @chrishayuk/hause/components/forms/${hit[0]}`, tone: "dim" },
				{ text: hit[1].line, tone: "accent" },
			],
		};
	}
	return { refused: true, lines: [{ text: `parse error: ${s}`, tone: "err" }, { text: "HELP lists the grammar", tone: "dim" }] };
}

export function TerminalSpecimen() {
	return (
		<Terminal
			kicker="THE LIBRARY — A SPECIMEN SHELL"
			headline="A terminal is chrome plus an executor. The executor is the argument."
			banner={BANNER}
			prompt="hause>"
			seeds={["SHOW FORMS", "DESCRIBE Terminal", "DESCRIBE Variants", "DELETE Terminal"]}
			execute={execute}
			fallback="The form owns the banner, scrollback, prompt, seed chips, CLEAR, and the sounds. The meaning — what a line does — is one function passed in by the page, so the language's discipline lives in exactly one place. On vindex3.org the same form fronts a live public query endpoint; here it browses this library."
			footnote="Promoted from vindex3.org's Explorer. The refusal seed is deliberate: try DELETE."
		/>
	);
}

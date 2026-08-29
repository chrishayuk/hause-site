"use client";

import { Terminal, type TerminalLine, type TerminalResult } from "@chrishayuk/hause/components/forms/Terminal";
import { FORM_MANIFEST, importPath } from "@chrishayuk/hause/manifest";

/**
 * The Terminal's specimen executor: a tiny shell over the library
 * itself. The form supplies the chrome; this file supplies the meaning
 * — which is the specimen invariant again: the book browsing the book.
 */


const BANNER: TerminalLine[] = [
	{ text: `Connected — the HAUSE library · ${FORM_MANIFEST.length} forms · read from the manifest`, tone: "ok" },
	{ text: "The executor derives from manifest.ts — the same index the holdings page reads", tone: "dim" },
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
				...FORM_MANIFEST.map((f) => ({
					text: `${f.name.padEnd(17)}${f.mode.padEnd(14)}${f.line}${f.exhibited ? "" : "  · HELD, NOT YET EXHIBITED"}`,
					tone: f.name === "Terminal" ? ("accent" as const) : undefined,
				})),
			],
		};
	const m = s.match(/^DESCRIBE\s+(\w+)$/i);
	if (m) {
		const hit = FORM_MANIFEST.find((f) => f.name.toLowerCase() === m[1].toLowerCase());
		if (!hit) return { refused: true, lines: [{ text: `${m[1]}: not in the library — SHOW FORMS lists the holdings`, tone: "err" }] };
		return {
			lines: [
				{ text: `FORM     ${hit.name}` },
				{ text: `MODE     ${hit.mode}` },
				{ text: `IMPORT   ${importPath(hit.name)}`, tone: "dim" },
				...(hit.origin ? [{ text: `ORIGIN   ${hit.origin}${hit.date ? ` · ${hit.date}` : ""}`, tone: "dim" as const }] : []),
				{ text: hit.line, tone: "accent" },
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

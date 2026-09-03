import Link from "next/link";
import { MODES, formsByMode, formCount } from "@chrishayuk/hause/manifest";
import { STATUSES } from "@chrishayuk/hause/types";
import { Observation } from "@chrishayuk/hause/components/forms/Observation";
import pkg from "@chrishayuk/hause/package.json";

/**
 * WHAT YOU GET — the software, stated after the idea.
 *
 * By this point the reader knows why acts and not containers. This is
 * the first place the page says HAUSE is also a thing you install, and
 * every count here is read from the library rather than typed, because
 * a count typed beside a manifest is the drift the manifest exists to
 * end. The boundary follows immediately, so nobody installs it
 * expecting a button.
 */

const peers = (pkg as { peerDependencies: Record<string, string> }).peerDependencies;
const byMode = MODES.map((m) => `${formsByMode(m).length} ${m}s`).join(" · ");

const ROWS: { what: string; line: string }[] = [
	{ what: `${formCount()} semantic forms`, line: `${byMode} — each with a name, a job, and the test that tells it from its neighbour.` },
	{ what: `${MODES.length} modes`, line: "Statement, instrument, performance — the same idea read, operated, or watched." },
	{ what: "3 voices", line: "Editorial for claims, system for explanation, evidence for measurement. Numbers never appear in editorial voice." },
	{ what: `${STATUSES.length} statuses`, line: `${STATUSES.join(" · ")} — the epistemic state carried on every claim, finding and question.` },
	{ what: "tokens.css", line: "One palette, one easing curve at three speeds, twelve columns, two authored environments." },
	{ what: "seo.ts · cite.ts · JsonLd · Answer", line: "Structured data, citation on four surfaces and the lift-able answer — projected from records the site already holds." },
	{ what: `React ${peers.react} · Next ${peers.next}`, line: "TSX source with no build step; the consuming app compiles it." },
];

const rule = { borderColor: "var(--color-mist)" };

export function WhatYouGet() {
	return (
		<>
			<section className="hause-grid py-16 sm:py-24" aria-label="What you get">
				<div className="col-span-12 md:col-start-2 md:col-span-10">
					<p className="voice-evidence text-xs tracking-[0.14em] uppercase mb-8 opacity-50">WHAT YOU GET — READ FROM THE LIBRARY, NOT TYPED</p>
					<div className="flex flex-col">
						{ROWS.map((r) => (
							<div
								key={r.what}
								className="grid grid-cols-1 sm:grid-cols-[minmax(0,16rem)_1fr] gap-1 sm:gap-8 items-baseline py-3 border-t"
								style={rule}
							>
								<span className="voice-evidence text-sm" style={{ color: "var(--color-accent)" }}>
									{r.what}
								</span>
								<span className="voice-system text-base opacity-75">{r.line}</span>
							</div>
						))}
						<div className="border-t" style={rule} />
					</div>
					<p className="voice-evidence text-sm mt-8 m-0">npm install github:chrishayuk/hause</p>
					<p className="voice-system text-sm opacity-60 max-w-2xl mt-3">
						<Link href="/use" className="border-b pb-0.5" style={{ borderColor: "var(--color-accent)" }}>
							Use HAUSE — install, tokens, one minimal chapter →
						</Link>
					</p>
				</div>
			</section>

			<Observation
				label="THE BOUNDARY — WHAT THIS IS, AND WHAT IT LEAVES ALONE"
				text="HAUSE is the semantic layer for what an intelligent interface needs to communicate. It does not replace transactional primitives such as buttons, inputs, tables, navigation or commerce mechanics, and does not try to. And an explanation is not only a dashboard or an instrument: it can be an answer, an argument, a comparison, a refusal, a piece of evidence, or a performance."
			/>
		</>
	);
}

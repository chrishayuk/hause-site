import Link from "next/link";
import { MODES, formsByMode, formCount } from "@chrishayuk/hause/manifest";
import { STATUSES } from "@chrishayuk/hause/types";
import { Observation } from "@chrishayuk/hause/components/forms/Observation";

/**
 * WHAT YOU GET — the software, stated after the idea.
 *
 * By this point the reader knows why acts and not containers. This is
 * the first place the page says HAUSE is also a thing you install, and
 * every count here is read from the library rather than typed, because
 * a count typed beside a manifest is the drift the manifest exists to
 * end. The boundary is a separate act in the homepage sequence.
 */

const byMode = MODES.map((m) => `${formsByMode(m).length} ${m}s`).join(" · ");

const ROWS: { what: string; line: string }[] = [
	{ what: `${formCount()} semantic forms`, line: `${byMode} — each with a name, a job, and the test that tells it from its neighbour.` },
	{ what: `${MODES.length} modes`, line: "Statement, instrument, performance — the same idea read, operated, or watched." },
	{ what: "3 voices", line: "Editorial for claims, system for explanation, evidence for measurement. Numbers never appear in editorial voice." },
	{ what: `${STATUSES.length} statuses`, line: `${STATUSES.join(" · ")} — the epistemic state carried on every claim, finding and question.` },
	{ what: "Citations & machine data", line: "Structured data, citation on four surfaces and a lift-able answer — projected from records the site already holds." },
	{ what: "Film & recorded evidence", line: "Poster-first film, chapters, transcripts, evidence tables and measurement playback. Art direction stays with the publication." },
];

const rule = { borderColor: "var(--color-mist)" };

export function WhatYouGet() {
	return (
		<>
			<section className="hause-grid py-16 sm:py-24 home-build" aria-label="What you get">
				<div className="col-span-12 md:col-start-2 md:col-span-10">
					<p className="voice-evidence text-xs tracking-[0.14em] uppercase mb-3 opacity-50">THE COMPLETE SYSTEM / WHEN YOU NEED IT</p>
					<h2 className="voice-editorial">A small on-ramp.<br/>The whole system behind it.</h2>
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
					<div className="home-build-example">
						<div>
							<p className="voice-evidence">INSTALL</p>
							<code>npm install github:chrishayuk/hause</code>
						</div>
						<pre aria-label="A minimal HAUSE Claim example"><code>{`import { Claim } from
  "@chrishayuk/hause/components/forms/Claim";

<Claim
  status="SUPPORTED"
  text="Battery life is around forty hours."
  detail="38.5 hours · 2 units · lab conditions"
/>`}</code></pre>
					</div>
					<p className="voice-system text-sm opacity-60 max-w-2xl mt-6">
						<Link href="/use" className="border-b pb-0.5" style={{ borderColor: "var(--color-accent)" }}>
							Build with HAUSE — install, tokens, one minimal chapter →
						</Link>
					</p>
				</div>
			</section>

		</>
	);
}

export function SystemBoundary() {
	return (
			<Observation
				label="THE BOUNDARY — WHAT THIS IS, AND WHAT IT LEAVES ALONE"
				text="HAUSE is the semantic layer for what an intelligent interface needs to communicate. It does not replace transactional primitives such as buttons, inputs, tables, navigation or commerce mechanics, and does not try to. And an explanation is not only a dashboard or an instrument: it can be an answer, an argument, a comparison, a refusal, a piece of evidence, or a performance."
			/>
	);
}

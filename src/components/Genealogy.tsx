"use client";

import { useState } from "react";
import Link from "next/link";
import { tick } from "@chrishayuk/hause/sound";
import type { Mark } from "@/data/genealogy";

const MONTH = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const column = (iso: string) => {
	const [, m, d] = iso.split("-");
	return `${parseInt(d, 10)} ${MONTH[parseInt(m, 10) - 1]}`;
};

/**
 * THE GENEALOGY — date is x, origin is y, a form is a mark.
 *
 * Built for this page rather than promoted into the library: its props
 * know what an origin lane is. If a second exhibition needs to show the
 * provenance of its own vocabulary, it can make the case for the climb.
 *
 * Everything in the geometry means something, and nothing is placed by
 * guesswork: a form with a recorded origin but no recorded date sits in
 * the undated column, and a form with no recorded origin is not on the
 * chart at all — it is counted beneath it, which is the second finding.
 */
export function Genealogy({
	lanes,
	dates,
	grid,
	unrecorded,
}: {
	lanes: string[];
	dates: string[];
	/** lane → column key ("undated" or an ISO date) → the marks there. */
	grid: Record<string, Record<string, Mark[]>>;
	unrecorded: Mark[];
}) {
	const [selected, setSelected] = useState<Mark | null>(null);
	const columns = ["undated", ...dates];

	return (
		<section className="hause-grid py-16 sm:py-24" aria-label="Where each form came from">
			<div className="col-span-12">
				<p className="voice-evidence text-xs tracking-[0.14em] uppercase mb-8 opacity-50">
					DATE IS ACROSS · ORIGIN IS DOWN · A FORM IS A MARK
				</p>

				<div className="overflow-x-auto">
					<div className="min-w-[46rem]">
						<div
							className="grid gap-x-6 pb-2 border-b"
							style={{ gridTemplateColumns: `9rem repeat(${columns.length}, minmax(0, 1fr))`, borderColor: "var(--color-mist)" }}
						>
							<span />
							{columns.map((c) => (
								<span key={c} className="voice-evidence text-[10px] tracking-[0.12em] uppercase opacity-40">
									{c === "undated" ? "BEFORE THE RECORD" : column(c)}
								</span>
							))}
						</div>

						{lanes.map((lane) => (
							<div
								key={lane}
								className="grid gap-x-6 py-4 border-b items-start"
								style={{ gridTemplateColumns: `9rem repeat(${columns.length}, minmax(0, 1fr))`, borderColor: "var(--color-mist)" }}
							>
								<span className="voice-evidence text-[11px] tracking-[0.08em] uppercase opacity-60 pt-0.5">{lane}</span>
								{columns.map((c) => (
									<div key={c} className="flex flex-col gap-1">
										{(grid[lane]?.[c] ?? []).map((m) => {
											const on = selected?.name === m.name;
											return (
												<button
													key={m.name}
													onClick={() => {
														setSelected(on ? null : m);
														tick();
													}}
													aria-pressed={on}
													className="voice-evidence text-[12px] text-left inline-flex items-baseline gap-2"
													style={{ color: on ? "var(--color-accent)" : "var(--fg)", opacity: on ? 1 : 0.75 }}
												>
													<span
														aria-hidden="true"
														className="inline-block w-[5px] h-[5px] rounded-full flex-none translate-y-[-2px]"
														style={{
															background: m.because ? "var(--color-accent)" : "var(--color-mist)",
															opacity: m.because ? 1 : 0.6,
														}}
													/>
													{m.name}
												</button>
											);
										})}
									</div>
								))}
							</div>
						))}
					</div>
				</div>

				<div className="mt-6 min-h-[7rem] max-w-3xl">
					{selected ? (
						<div className="graph-pulse">
							<Link
								href={`/forms/${selected.slug}`}
								className="voice-evidence text-sm border-b pb-0.5"
								style={{ color: "var(--color-accent)", borderColor: "var(--color-accent)" }}
							>
								{selected.name} — {selected.mode} →
							</Link>
							<p className="voice-evidence text-[11px] tracking-[0.08em] uppercase opacity-45 mt-3 mb-2">
								ORIGIN {selected.origin ?? "not recorded"}
								{selected.date ? `  ·  FIRST RECORDED ${column(selected.date)} ${selected.date.slice(0, 4)}` : "  ·  DATE NOT RECORDED"}
							</p>
							<p className="voice-system text-base opacity-85 leading-relaxed m-0">
								{selected.because ?? "What could not be built without it was never written down. The library states the origin it holds and stops there."}
							</p>
						</div>
					) : (
						<p className="voice-system text-sm opacity-50 m-0">
							Select a form to read what could not be built without it. A solid mark carries a recorded cause; a hollow one
							carries only its origin.
						</p>
					)}
				</div>

				{unrecorded.length > 0 && (
					<div className="mt-10 pt-6 border-t" style={{ borderColor: "var(--color-mist)" }}>
						<p className="voice-evidence text-[10px] tracking-[0.12em] uppercase opacity-40 mb-3">
							NOT ON THE CHART — {unrecorded.length} FORMS WITH NO RECORDED ORIGIN
						</p>
						<p className="voice-evidence text-[12px] opacity-45 leading-relaxed">
							{unrecorded.map((m) => m.name).join(" · ")}
						</p>
						<p className="voice-system text-sm opacity-60 leading-relaxed max-w-2xl mt-3">
							They entered the library before recording an origin became doctrine. Their provenance is left blank rather
							than reconstructed from memory — and if documentary evidence turns up, it arrives with its evidence rather
							than filling the hole quietly.
						</p>
					</div>
				)}

				{/* Always-present text fallback: the whole chart, written out. */}
				<div className="voice-evidence text-[11px] opacity-35 leading-relaxed mt-10 flex flex-col gap-1 max-w-3xl">
					{lanes.map((lane) => (
						<p key={lane} className="m-0">
							{lane} — {columns.flatMap((c) => (grid[lane]?.[c] ?? []).map((m) => `${m.name}${c === "undated" ? "" : ` (${c})`}`)).join(" · ")}
						</p>
					))}
				</div>
			</div>
		</section>
	);
}

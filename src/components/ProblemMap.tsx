"use client";

import { useState } from "react";
import Link from "next/link";
import { tick } from "@chrishayuk/hause/sound";
import type { FormMode } from "@chrishayuk/hause/manifest";

export type MapForm = { name: string; slug: string; mode: FormMode };
export type MapProblem = { slug: string; number: string; title: string; answers: string[] };

const MODE_LABEL: Record<FormMode, string> = {
	statement: "STATEMENTS",
	instrument: "INSTRUMENTS",
	performance: "PERFORMANCES",
};

/**
 * THE MAP — which failure caused which form.
 *
 * Built here, on the page that needed it, rather than promoted into the
 * library: a form enters HAUSE when its props no longer know whose
 * content they carry, and this one still knows about problems. If a
 * second exhibition needs to show a many-to-many relation between named
 * things, it will have earned the climb.
 *
 * Selecting a failure keeps the forms that answer it and lets the rest
 * recede — the catalogue seen as a consequence rather than as a list.
 * Every relation is also written out beneath, so the map survives with
 * the interaction removed.
 */
export function ProblemMap({ problems, forms }: { problems: MapProblem[]; forms: MapForm[] }) {
	const [active, setActive] = useState<string | null>(null);
	const selected = problems.find((p) => p.slug === active) ?? null;
	const lit = new Set(selected?.answers ?? []);
	const modes: FormMode[] = ["statement", "instrument", "performance"];

	return (
		<section className="hause-grid py-16 sm:py-24" aria-label="Which failure caused which form">
			<div className="col-span-12 md:col-start-2 md:col-span-10">
				<p className="voice-evidence text-xs tracking-[0.14em] uppercase mb-6 opacity-50">
					THE CATALOGUE, AS A CONSEQUENCE — SELECT A FAILURE
				</p>

				<div className="flex flex-wrap gap-x-6 gap-y-2 mb-10">
					<button
						onClick={() => {
							setActive(null);
							tick();
						}}
						aria-pressed={active === null}
						className="voice-evidence text-[11px] tracking-[0.12em] uppercase"
						style={{ color: active === null ? "var(--color-accent)" : "var(--fg)", opacity: active === null ? 1 : 0.4 }}
					>
						ALL {forms.length}
					</button>
					{problems.map((p) => (
						<button
							key={p.slug}
							onClick={() => {
								setActive(p.slug === active ? null : p.slug);
								tick();
							}}
							aria-pressed={p.slug === active}
							className="voice-evidence text-[11px] tracking-[0.12em] uppercase text-left"
							style={{ color: p.slug === active ? "var(--color-accent)" : "var(--fg)", opacity: p.slug === active ? 1 : 0.4 }}
						>
							{p.number} {p.title}
						</button>
					))}
				</div>

				<div className="flex flex-col gap-6">
					{modes.map((mode) => (
						<div key={mode} className="grid grid-cols-[6.5rem_1fr] sm:grid-cols-[9rem_1fr] gap-4 sm:gap-8 items-baseline">
							<span className="voice-evidence text-[10px] tracking-[0.12em] uppercase opacity-40">{MODE_LABEL[mode]}</span>
							<div className="flex flex-wrap gap-x-4 gap-y-2">
								{forms
									.filter((f) => f.mode === mode)
									.map((f) => {
										const on = selected === null || lit.has(f.name);
										return (
											<Link
												key={f.name}
												href={`/forms/${f.slug}`}
												className="voice-evidence text-[13px] transition-opacity motion-reduce:transition-none"
												style={{
													opacity: on ? 1 : 0.18,
													color: selected !== null && on ? "var(--color-accent)" : "var(--fg)",
													transitionDuration: "var(--motion-considered)",
													transitionTimingFunction: "var(--ease-hause)",
												}}
											>
												{f.name}
											</Link>
										);
									})}
							</div>
						</div>
					))}
				</div>

				<p className="voice-evidence text-sm mt-8" style={{ color: selected ? "var(--color-accent)" : undefined }}>
					{selected
						? `${lit.size} / ${forms.length} FORMS ANSWER — ${selected.title}`
						: `${forms.length} FORMS · ${problems.length} FAILURES · SELECT ONE TO SEE WHAT IT CAUSED`}
				</p>

				{selected && (
					<Link
						href={`/problems/${selected.slug}`}
						className="voice-system inline-flex items-center gap-2 text-sm tracking-[0.06em] w-fit border-b pb-0.5 mt-4"
						style={{ borderColor: "var(--color-accent)" }}
					>
						READ THE FAILURE — {selected.title} →
					</Link>
				)}

				{/* Always-present text fallback: the whole relation, written out. */}
				<div className="voice-evidence text-[11px] opacity-40 leading-relaxed max-w-3xl mt-10 flex flex-col gap-1">
					{problems.map((p) => (
						<p key={p.slug} className="m-0">
							{p.number} {p.title} — {p.answers.join(" · ")}
						</p>
					))}
				</div>
			</div>
		</section>
	);
}

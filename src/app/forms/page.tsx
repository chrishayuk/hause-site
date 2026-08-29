import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@chrishayuk/hause/components/forms/Hero";
import { Observation } from "@chrishayuk/hause/components/forms/Observation";
import { Connection } from "@chrishayuk/hause/components/forms/Connection";
import { formCount, formsByMode, MODES, type FormMode } from "@chrishayuk/hause/manifest";

export const metadata: Metadata = {
	title: "The Holdings",
	description: "Every form in the library, one line each, with mode and recorded origin — derived from the manifest, not written here.",
};

/**
 * The catalogue, derived. Nothing on this page is hand-counted: the
 * rows, the counts, and the origins all come from the library's own
 * manifest.ts, so the page cannot drift from the code — if the library
 * gains a form, this page gains a row in the same commit or the build
 * is lying somewhere visible.
 */

const MODE_META: Record<FormMode, { label: string; href: string }> = {
	statement: { label: "STATEMENTS — THE READER READS", href: "/statements" },
	instrument: { label: "INSTRUMENTS — THE READER OPERATES", href: "/instruments" },
	performance: { label: "PERFORMANCES — THE FORMS PLAY THEMSELVES", href: "/performances" },
};

export default function FormsPage() {
	const counts = MODES.map((m) => formsByMode(m).length);
	return (
		<main>
			<Hero
				kicker={`THE BOOK · THE HOLDINGS · ${formCount()} FORMS — READ FROM THE MANIFEST`}
				title="EVERY FORM, ONE LINE"
				dek={`${counts[0]} statements, ${counts[1]} instruments, ${counts[2]} performances — counted by the library's own manifest, not by this page. Origins are named only where the history records them; an unrecorded origin reads as a dash, never a guess.`}
			/>

			{MODES.map((mode) => (
				<section key={mode} className="hause-grid py-10 sm:py-14">
					<div className="col-span-12 md:col-start-2 md:col-span-10">
						<Link
							href={MODE_META[mode].href}
							className="voice-evidence text-xs tracking-[0.14em] uppercase opacity-50 hover:opacity-100"
						>
							{MODE_META[mode].label} →
						</Link>
						<div className="mt-6 flex flex-col">
							{formsByMode(mode).map((f) => (
								<div
									key={f.name}
									className="grid grid-cols-12 gap-3 py-3 border-t items-baseline"
									style={{ borderColor: "var(--color-mist)" }}
								>
									<p className="col-span-4 sm:col-span-3 voice-evidence text-sm" style={{ color: "var(--color-accent)" }}>
										{f.name}
										{!f.exhibited && (
											<span className="voice-evidence text-[10px] tracking-[0.1em] uppercase opacity-60 block mt-0.5" style={{ color: "var(--fg)" }}>
												HELD · NOT YET EXHIBITED
											</span>
										)}
									</p>
									<p className="col-span-8 sm:col-span-6 voice-system text-sm opacity-85">{f.line}</p>
									<p className="col-span-12 sm:col-span-3 voice-evidence text-[11px] opacity-40 sm:text-right">
										{f.origin ? `originated in ${f.origin}${f.date ? ` · ${f.date}` : ""}` : "—"}
									</p>
								</div>
							))}
						</div>
					</div>
				</section>
			))}

			<Observation
				label="THE AUDIT"
				text="Every row above is read from manifest.ts in the library itself — the same file the homepage's count, the Terminal specimen's SHOW FORMS, and the README answer to. A form marked held-not-yet-exhibited is in the library without a specimen, and the book says so rather than faking one: a Film specimen waits for a real film."
			/>

			<Connection
				text="The on-ramp is deliberately separate from the exhibition."
				links={[{ href: "/use", label: "USE HAUSE →" }]}
			/>
		</main>
	);
}

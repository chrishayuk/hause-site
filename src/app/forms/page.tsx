import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { Observation } from "@chrishayuk/hause/components/forms/Observation";
import { Connection } from "@chrishayuk/hause/components/forms/Connection";
import { formCount, formsByMode, MODES, type FormMode } from "@chrishayuk/hause/manifest";
import { formSlug } from "@/data/forms";

export const metadata: Metadata = {
	title: "35 Semantic Forms for AI Interfaces",
	alternates: { canonical: "/forms" },
	description: "Enter the HAUSE collection: 35 communicative forms arranged as Statements, Instruments and Performances, each derived from the library manifest.",
};

/**
 * The catalogue, derived. Nothing on this page is hand-counted: the
 * rows, the counts, and the origins all come from the library's own
 * manifest.ts, so the page cannot drift from the code — if the library
 * gains a form, this page gains a row in the same commit or the build
 * is lying somewhere visible.
 */

const MODE_META: Record<FormMode, { label: string; action: string; href: string; room: string; description: string }> = {
	statement: { label: "STATEMENTS", action: "THE READER READS", href: "/statements", room: "ROOM I", description: "Assertions, observations, evidence and questions. The idea holds still; language carries it." },
	instrument: { label: "INSTRUMENTS", action: "THE READER OPERATES", href: "/instruments", room: "ROOM II", description: "Comparisons, lenses and structures. Meaning appears through a choice the reader makes." },
	performance: { label: "PERFORMANCES", action: "THE FORMS PLAY THEMSELVES", href: "/performances", room: "ROOM III", description: "Transformation, procession and magnitude. Time and movement become part of the explanation." },
};

export default function FormsPage() {
	const counts = MODES.map((m) => formsByMode(m).length);
	return (
		<main className="forms-story system-story">
			<section className="forms-hero">
				<div className="forms-hero-meta voice-evidence">
					<span>THE HOLDINGS · READ FROM THE MANIFEST</span>
					<span>{formCount()} FORMS · THREE MODES</span>
				</div>
				<div className="forms-hero-copy">
					<p className="voice-evidence">A COLLECTION OF COMMUNICATIVE ACTS</p>
					<h1 className="voice-editorial"><span>{formCount()}</span> ways for an idea to <em>arrive.</em></h1>
				</div>
				<p className="forms-hero-dek voice-system">Not thirty-five containers. Thirty-five answers to the question that comes before shape: <strong>what is this interface doing?</strong></p>
				<div className="forms-hero-acts voice-editorial" aria-hidden="true">
					<span>CLAIM</span><span>EVIDENCE</span><span>REFUSAL</span><span>TRANSFORMATION</span>
				</div>
				<nav className="forms-hero-nav" aria-label="Enter a forms room">
					{MODES.map((mode, index) => (
						<a key={mode} href={`#${mode}s`} style={{ "--name-characters": MODE_META[mode].label.length } as CSSProperties}>
							<span className="voice-evidence">0{index + 1}</span>
							<strong className="voice-editorial">{MODE_META[mode].label}</strong>
							<small className="voice-evidence">{counts[index]} FORMS · {MODE_META[mode].action} ↓</small>
						</a>
					))}
				</nav>
			</section>

			{MODES.map((mode, modeIndex) => (
				<section key={mode} id={`${mode}s`} className={`forms-room forms-room--${mode}`} aria-labelledby={`${mode}-title`}>
					<header className="forms-room-header">
						<p className="voice-evidence">{MODE_META[mode].room} · {counts[modeIndex]} FORMS</p>
						<div>
							<h2 id={`${mode}-title`} className="voice-editorial" style={{ "--name-characters": MODE_META[mode].label.length } as CSSProperties}>{MODE_META[mode].label}</h2>
							<p className="voice-evidence">{MODE_META[mode].action}</p>
						</div>
						<p className="voice-system">{MODE_META[mode].description}</p>
						<Link href={MODE_META[mode].href} className="forms-room-exhibit voice-evidence">ENTER THE FULL EXHIBITION →</Link>
					</header>
					<div className="forms-collection">
						{formsByMode(mode).map((f, index) => (
							<Link key={f.name} href={`/forms/${formSlug(f.name)}`} className="forms-object">
								<span className="forms-object-number voice-evidence">{String(index + 1).padStart(2, "0")}</span>
								<h3 className="voice-editorial" style={{ "--name-characters": f.name.length } as CSSProperties}>{f.name}</h3>
								<p className="voice-system">{f.line}</p>
								<div className="forms-object-record voice-evidence">
									<span>{f.exhibited ? "ON VIEW" : "HELD · NOT YET EXHIBITED"}</span>
									<span>{f.origin ? `${f.origin}${f.date ? ` · ${f.date}` : ""}` : "ORIGIN UNRECORDED"}</span>
								</div>
								<span className="forms-object-open voice-evidence">ENTER STUDY →</span>
							</Link>
						))}
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

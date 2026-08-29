import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@chrishayuk/hause/components/forms/Hero";
import { Observation } from "@chrishayuk/hause/components/forms/Observation";
import { Connection } from "@chrishayuk/hause/components/forms/Connection";

export const metadata: Metadata = {
	title: "The Holdings",
	description: "Every form in the library — all 28, one line each, with mode and recorded origin.",
};

/**
 * The catalogue the book owed its visitors: every form, one line each.
 * Origins are stated only where the history is written down — an
 * unrecorded origin reads "—", never a guess. The counts here are the
 * counts the home page claims; if they drift, this page is the audit.
 */

type Mode = "statement" | "instrument" | "performance";

const HOLDINGS: { name: string; mode: Mode; line: string; origin?: string }[] = [
	// ── Statements — the reader reads ──
	{ name: "Hero", mode: "statement", line: "The room's first wall: kicker, headline, dek." },
	{ name: "Statement", mode: "statement", line: "One sentence, given the whole width." },
	{ name: "Observation", mode: "statement", line: "A labelled paragraph that watches rather than argues." },
	{ name: "Claim", mode: "statement", line: "An assertion that knows it must answer to evidence." },
	{ name: "Evidence", mode: "statement", line: "Rows of labelled findings with status marks — receipts, not decoration." },
	{ name: "Question", mode: "statement", line: "An open question given the same typographic dignity as an answer." },
	{ name: "Timeline", mode: "statement", line: "Dated entries, in order — history as prose, not a widget." },
	{ name: "Refusal", mode: "statement", line: "Fail-closed rendered as design language, not as an error state.", origin: "vindex3" },
	{ name: "Connection", mode: "statement", line: "A bridge out of the chapter: one sentence, then the doors." },
	// ── Instruments — the reader operates ──
	{ name: "Anatomy", mode: "instrument", line: "An annotated cutaway — one artifact drawn as its layers, fully disclosed." },
	{ name: "Decomposition", mode: "instrument", line: "One object, its parts, the thing that assembles them — stepped by hand." },
	{ name: "ExpertField", mode: "instrument", line: "A field of units, mostly dormant; each scenario lights the subset that answers.", origin: "the codex" },
	{ name: "Comparison", mode: "instrument", line: "One object, two interpretations, dragged between.", origin: "the codex" },
	{ name: "Variants", mode: "instrument", line: "Physically present variants of one identity — and a designed refusal for the absent one.", origin: "vindex3" },
	{ name: "Ladder", mode: "instrument", line: "A gated progression — rungs climbed in order, each closed only by its own criterion.", origin: "vindex3" },
	{ name: "Agreement", mode: "instrument", line: "N independently-derived values that must be identical — with a FAIL row." },
	{ name: "Derivation", mode: "instrument", line: "A value folded down a graded scale by caps — derived, never asserted." },
	{ name: "ByteMap", mode: "instrument", line: "A physical layout drawn to scale — each field's width is its width in bytes." },
	{ name: "FollowReveal", mode: "instrument", line: "A path through connected ideas, replayed at the hause stagger." },
	{ name: "Terminal", mode: "instrument", line: "A query surface whose chrome is the form and whose meaning is one executor.", origin: "vindex3 · the Explorer · 2026-08-29" },
	// ── Performances — the forms play themselves ──
	{ name: "Transformation", mode: "performance", line: "Comparison's cinematic sibling — identical props, performed.", origin: "vindex3" },
	{ name: "Unfolding", mode: "performance", line: "Decomposition's cinematic sibling — the parts arrive on their own.", origin: "vindex3" },
	{ name: "Compilation", mode: "performance", line: "A pile of inputs compiled down through named stages.", origin: "vindex3" },
	{ name: "Procession", mode: "performance", line: "One thing passing through every stage, in order.", origin: "vindex3" },
	{ name: "Magnitude", mode: "performance", line: "A powers-of-ten zoom-out — each arrival rescales the world.", origin: "vindex3" },
	{ name: "Channel", mode: "performance", line: "Throughput through a fixed-capacity conduit.", origin: "vindex3" },
	{ name: "Quantisation", mode: "performance", line: "What quantisation actually does, performed on a lattice.", origin: "vindex3" },
	{ name: "Film", mode: "performance", line: "A short film in the flow of a chapter — poster until it earns the play.", origin: "vindex3" },
];

const MODES: { mode: Mode; label: string; href: string }[] = [
	{ mode: "statement", label: "STATEMENTS — THE READER READS", href: "/statements" },
	{ mode: "instrument", label: "INSTRUMENTS — THE READER OPERATES", href: "/instruments" },
	{ mode: "performance", label: "PERFORMANCES — THE FORMS PLAY THEMSELVES", href: "/performances" },
];

export default function FormsPage() {
	const counts = MODES.map(({ mode }) => HOLDINGS.filter((f) => f.mode === mode).length);
	return (
		<main>
			<Hero
				kicker={`THE BOOK · THE HOLDINGS · ${HOLDINGS.length} FORMS`}
				title="EVERY FORM, ONE LINE"
				dek={`${counts[0]} statements, ${counts[1]} instruments, ${counts[2]} performances. Each exists because a real page needed it — and where that history is written down, the origin is named. An unrecorded origin reads as a dash, never a guess.`}
			/>

			{MODES.map(({ mode, label, href }) => (
				<section key={mode} className="hause-grid py-10 sm:py-14">
					<div className="col-span-12 md:col-start-2 md:col-span-10">
						<Link href={href} className="voice-evidence text-xs tracking-[0.14em] uppercase opacity-50 hover:opacity-100">
							{label} →
						</Link>
						<div className="mt-6 flex flex-col">
							{HOLDINGS.filter((f) => f.mode === mode).map((f) => (
								<div
									key={f.name}
									className="grid grid-cols-12 gap-3 py-3 border-t items-baseline"
									style={{ borderColor: "var(--color-mist)" }}
								>
									<p className="col-span-4 sm:col-span-3 voice-evidence text-sm" style={{ color: "var(--color-accent)" }}>
										{f.name}
									</p>
									<p className="col-span-8 sm:col-span-6 voice-system text-sm opacity-85">{f.line}</p>
									<p className="col-span-12 sm:col-span-3 voice-evidence text-[11px] opacity-40 sm:text-right">
										{f.origin ? `originated in ${f.origin}` : "—"}
									</p>
								</div>
							))}
						</div>
					</div>
				</section>
			))}

			<Observation
				label="THE AUDIT"
				text="This page is the count the home page claims. When a form enters the library, it enters here with its line and, if the history recorded one, its origin — the same commit, or the claim upstairs drifts and the Agreement form has something to say about it."
			/>

			<Connection
				text="The on-ramp is deliberately separate from the exhibition."
				links={[{ href: "/use", label: "USE HAUSE →" }]}
			/>
		</main>
	);
}

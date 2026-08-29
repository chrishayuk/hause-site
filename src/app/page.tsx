import { Hero } from "@chrishayuk/hause/components/forms/Hero";
import { Statement } from "@chrishayuk/hause/components/forms/Statement";
import { Observation } from "@chrishayuk/hause/components/forms/Observation";
import { Refusal } from "@chrishayuk/hause/components/forms/Refusal";
import { Connection } from "@chrishayuk/hause/components/forms/Connection";
import { PaceDemo } from "@chrishayuk/hause/components/PaceDemo";
import { formCount } from "@chrishayuk/hause/manifest";

/**
 * The specimen book's front door: HAUSE exhibited in HAUSE. Every
 * specimen on this site is the real form rendering real copy — the
 * book cannot drift from the library, because it is the library.
 */
export default function Home() {
	return (
		<main>
			<Hero
				kicker="HAUSE · A DESIGN SYSTEM FOR AI"
				title="STRUCTURE IS FIXED. ATMOSPHERE IS VARIABLE."
				dek="A visual language for intelligent systems to explain themselves. The primitives are forms of explanation — things a reader reads, operates, or watches — not interface chrome. This site is the specimen book: every form shown here is the real form, running."
			/>

			<Observation text={`HAUSE is what a design system looks like when it refuses to be generic. One palette of warm neutrals and a single burnt-amber accent. Three type voices — editorial for claims, system for explanation, evidence for measurement. One easing curve, three speeds. Twelve columns nobody sees. And ${formCount()} forms, each of which exists because a real page needed it — never because a taxonomy had a gap.`} />

			<section className="hause-grid py-16 sm:py-24">
				<div className="col-span-12 md:col-start-2 md:col-span-9">
					<p className="voice-evidence text-xs tracking-[0.14em] uppercase mb-10 opacity-50">THE THREE VOICES</p>
					<div className="flex flex-col gap-10">
						<div>
							<p className="voice-evidence text-[10px] tracking-[0.1em] uppercase opacity-40 mb-2">editorial — fraunces · claims, questions, turns</p>
							<p className="voice-editorial text-3xl sm:text-4xl">The claim carries the room.</p>
						</div>
						<div>
							<p className="voice-evidence text-[10px] tracking-[0.1em] uppercase opacity-40 mb-2">system — inter · explanation, controls, body</p>
							<p className="voice-system text-lg opacity-85">The explanation walks beside the reader, never ahead of them.</p>
						</div>
						<div>
							<p className="voice-evidence text-[10px] tracking-[0.1em] uppercase opacity-40 mb-2">evidence — geist mono · measurements, marks, receipts</p>
							<p className="voice-evidence text-base">EASE cubic-bezier(0.22, 1, 0.36, 1) · 150ms · 450ms · 1200ms</p>
						</div>
					</div>
					<p className="voice-system text-sm opacity-60 max-w-xl mt-10">
						Numbers never appear in editorial voice. Editorial never explains. Evidence never argues. The
						discipline is the identity.
					</p>
				</div>
			</section>

			<Statement text="A mode gets built for a real chapter, never manufactured as a demo." />

			<PaceDemo />

			<Refusal
				kicker="THE STANDING REFUSAL — RENDERED BY THE Refusal FORM ITSELF"
				title="NO GENERIC CARD KIT"
				lines={["requested    Card", `available    ${formCount()} semantic forms, each with a name and a job`]}
				principle="If you're about to add a Card, stop."
			/>

			<Observation
				label="THE GRAMMAR UNDERNEATH"
				text="Some forms are siblings across the modes: Comparison and Transformation make the same argument — one the reader drags, one the system performs; Decomposition and Unfolding likewise, with identical props. Underneath the catalogue sits a smaller grammar of semantic operations, and the mode is how the reader meets them: the same idea, read, operated, or watched."
			/>

			<Observation
				label="THE THREE MODES"
				text="Every form is one of three kinds, and the split was earned, not designed. Statements are prose in the three voices — the reader reads. Instruments are interactive — the reader operates them, and every one carries a plain-text fallback so the point survives with the interaction removed. Performances are cinematic — they play themselves, rest on a designed final state, and never crossfade between two physical forms of one thing."
			/>

			<Connection
				text="The book, by mode — every specimen is the real form."
				links={[
					{ href: "/statements", label: "STATEMENTS — THE READER READS" },
					{ href: "/instruments", label: "INSTRUMENTS — THE READER OPERATES" },
					{ href: "/performances", label: "PERFORMANCES — THE FORMS PLAY THEMSELVES" },
					{ href: "/forms", label: "THE HOLDINGS — EVERY FORM, ONE LINE" },
					{ href: "/use", label: "USE HAUSE — THE ON-RAMP" },
				]}
			/>

			<section className="hause-grid py-16 sm:py-24">
				<div className="col-span-12 md:col-start-2 md:col-span-9">
					<p className="voice-evidence text-xs tracking-[0.14em] uppercase mb-8 opacity-50">HAUSE IN THE WILD</p>
					<div className="flex flex-col gap-3">
						<a
							href="https://vindex3.org"
							className="voice-system inline-flex items-center gap-2 text-sm tracking-[0.06em] w-fit border-b pb-0.5"
							style={{ borderColor: "var(--color-accent)" }}
						>
							VINDEX3.ORG — a container format, exhibited →
						</a>
						<a
							href="https://chrishayuk.com"
							className="voice-system inline-flex items-center gap-2 text-sm tracking-[0.06em] w-fit border-b pb-0.5"
							style={{ borderColor: "var(--color-accent)" }}
						>
							CHRISHAYUK.COM — the codex where HAUSE was born →
						</a>
					</div>
					<p className="voice-system text-sm opacity-60 max-w-xl mt-8">
						Two consumers so far. Each grew HAUSE — the vindex3 build alone contributed fourteen forms — and
						nothing enters the library without a real page that needed it first.
					</p>
				</div>
			</section>
		</main>
	);
}

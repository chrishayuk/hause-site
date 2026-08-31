import Link from "next/link";
import { Hero } from "@chrishayuk/hause/components/forms/Hero";
import { Statement } from "@chrishayuk/hause/components/forms/Statement";
import { Observation } from "@chrishayuk/hause/components/forms/Observation";
import { Refusal } from "@chrishayuk/hause/components/forms/Refusal";
import { Answer } from "@chrishayuk/hause/components/forms/Answer";
import { Connection } from "@chrishayuk/hause/components/forms/Connection";
import { PaceDemo } from "@chrishayuk/hause/components/PaceDemo";
import { Provenance } from "@chrishayuk/hause/components/forms/Provenance";
import { Citation } from "@chrishayuk/hause/components/forms/Citation";
import { JsonLd } from "@chrishayuk/hause/components/JsonLd";
import { citationLd } from "@chrishayuk/hause/seo";
import { citationMeta } from "@chrishayuk/hause/cite";
import { FORM_MANIFEST, formCount } from "@chrishayuk/hause/manifest";
import { HAUSE_RECORD, HAUSE_HISTORY } from "@/data/citation";

/** The head surface of the book's own record — Zotero, Scholar and every "add to library" button read these. */
export const metadata = { other: citationMeta(HAUSE_RECORD) };

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

			<Observation text={`HAUSE is what a design system looks like when it refuses to be generic. One palette of warm neutrals and a single burnt-amber accent. Three type voices — editorial for claims, system for explanation, evidence for measurement. One easing curve, three speeds. Twelve columns nobody sees. And ${formCount()} forms, admitted under one rule: a real page has to need one first. ${FORM_MANIFEST.filter((f) => f.origin).length} of them name that page in the manifest; the rest are older than the record, and the record says so rather than filling itself in.`} />

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

			<Observation
				label="THE BOUNDARY — WHAT THIS IS, AND WHAT IT LEAVES ALONE"
				text="HAUSE is the semantic layer for what an intelligent interface needs to communicate. It does not replace transactional primitives such as buttons, inputs, tables, navigation or commerce mechanics, and does not try to. And an explanation is not only a dashboard or an instrument: it can be an answer, an argument, a comparison, a refusal, a piece of evidence, or a performance."
			/>

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

			<Statement text="A design system for AI reads in both directions: AIs compose answers from the forms — and machines must be able to read what the forms say." />

			<Answer
				id="machine-legibility"
				question="What is machine legibility in a design system?"
				answer="It is the rule that the same fact a form renders beautifully must survive stripped to text — for crawlers, answer engines, agent browsers, and anyone with the interaction removed. In HAUSE that is carried by the library itself: this very block is the Answer form, a question as a real heading with a lift-able answer and a citable anchor; the seo builders emit structured data from the records a site already holds; every instrument carries ARIA state; and nothing important lives only in an animation. The test: strip the page, and it still answers."
				cite="the form demonstrating itself — Answer, statement mode, origin vindex3 · the legibility layer"
			/>

			<Observation
				label="SEO AND AEO ARE PART OF THE GRAMMAR"
				text="Not a plugin, not an afterthought: the browser title says what the page answers in the words people search with while the designed heading stays exactly as designed; JSON-LD projects from the same records the forms render, so the crawlable answer can never drift from the visible one; and answer-first blocks give every page a boringly clear semantic skeleton beneath the editorial surface. A page a search engine can quote is a page an answer engine can cite."
			/>

			<section className="hause-grid py-16 sm:py-24">
				<div className="col-span-12 md:col-start-2 md:col-span-9">
					<p className="voice-evidence text-xs tracking-[0.14em] uppercase mb-3 opacity-50">THE PATH</p>
					<p className="voice-editorial text-2xl sm:text-3xl mb-10 max-w-2xl">
						One path through the whole of it — read, operate, watch. Then interrogate, then build.
					</p>
					<div className="flex flex-col">
						{[
							{ n: "01", href: "/statements", title: "STATEMENTS", hook: "The reader reads — prose in the three voices, and the rules that keep them honest." },
							{ n: "02", href: "/instruments", title: "INSTRUMENTS", hook: "The reader operates — every point surviving with the interaction removed." },
							{ n: "03", href: "/performances", title: "PERFORMANCES", hook: "The forms play themselves — and rest on a state that carries the whole idea." },
							{ n: "04", href: "/forms", title: "THE HOLDINGS", hook: "Every form, one line, with its recorded origin — the count is evidence, not copy." },
							{ n: "05", href: "/ask", title: "ASK HAUSE", hook: "Interrogate the system — it answers in its own forms, or refuses in one." },
							{ n: "06", href: "/use", title: "USE HAUSE", hook: "Install, tokens, one minimal chapter — the plumbing, next door to the exhibition." },
						].map((c, i) => (
							<Link
								key={c.href}
								href={c.href}
								className="graph-pulse group grid grid-cols-[2.5rem_minmax(0,11rem)_1fr] sm:grid-cols-[3rem_minmax(0,13rem)_1fr] gap-3 sm:gap-6 items-baseline py-4 border-t"
								style={{ borderColor: "var(--color-mist)", animationDelay: `${i * 90}ms` }}
							>
								<span className="voice-evidence text-xs opacity-40">{c.n}</span>
								<span className="voice-evidence text-xs sm:text-sm tracking-[0.08em]" style={{ color: "var(--color-accent)" }}>
									{c.title} →
								</span>
								<span className="voice-system text-sm opacity-70 group-hover:opacity-95 transition-opacity">{c.hook}</span>
							</Link>
						))}
					</div>
				</div>
			</section>

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
						Two consumers so far. Each grew HAUSE — {FORM_MANIFEST.filter((f) => f.origin?.startsWith("vindex3")).length} of
						the forms held here name a vindex3 chapter as their origin — and nothing enters the library without a real
						page that needed it first.
					</p>
				</div>
			</section>

			<JsonLd data={citationLd(HAUSE_RECORD)} />
			<Statement text="A page that states a claim should be referenceable as a published object, not as a URL someone hopes still resolves." />
			<Provenance record={HAUSE_RECORD} history={HAUSE_HISTORY} citeHref="#cite" />
			<Citation
				record={HAUSE_RECORD}
				note="The book cites itself with the two forms any consuming site gets. One record makes all four surfaces — this reference, the quiet line above it, the citation_* tags in the head, and the JSON-LD in the graph — so they cannot disagree about who wrote what, or when."
			/>
		</main>
	);
}

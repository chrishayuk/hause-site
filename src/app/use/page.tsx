import type { Metadata } from "next";
import { Hero } from "@chrishayuk/hause/components/forms/Hero";
import { Statement } from "@chrishayuk/hause/components/forms/Statement";
import { Observation } from "@chrishayuk/hause/components/forms/Observation";
import { Connection } from "@chrishayuk/hause/components/forms/Connection";
import { formCount } from "@chrishayuk/hause/manifest";

export const metadata: Metadata = {
	title: "Use HAUSE: Install & Compose the Design System",
	alternates: { canonical: "/use" },
	description: "The on-ramp: install, tokens, one form, one minimal chapter.",
};

/**
 * The practical route, kept deliberately apart from the exhibition —
 * the front page argues; this page installs. Evidence voice does the
 * work here, because an install line is a measurement, not a claim.
 */

function Snippet({ label, code }: { label: string; code: string }) {
	return (
		<section className="hause-grid py-8">
			<div className="col-span-12 md:col-start-2 md:col-span-9">
				<p className="voice-evidence text-xs tracking-[0.14em] uppercase mb-3 opacity-50">{label}</p>
				<pre
					className="voice-evidence text-[12px] sm:text-[13px] leading-relaxed border p-4 sm:p-5 overflow-x-auto"
					style={{ borderColor: "var(--color-mist)", background: "var(--color-ink)", color: "var(--color-white)" }}
				>
					{code}
				</pre>
			</div>
		</section>
	);
}

export default function UsePage() {
	return (
		<main>
			<Hero
				kicker="THE ON-RAMP"
				title="USE HAUSE"
				dek="Install, import the tokens, render a form. The exhibition stays next door — this page is the plumbing, in evidence voice."
			/>

			<Snippet label="INSTALL — REACT 19 · NEXT 16" code={`npm install github:chrishayuk/hause`} />

			<Snippet
				label="TOKENS — ONCE, IN YOUR GLOBAL CSS"
				code={`@import "tailwindcss";
@import "@chrishayuk/hause/tokens.css";

/* Tailwind v4 skips node_modules when scanning for class names —
   point it at the library so the forms' utilities are generated. */
@source "../../node_modules/@chrishayuk/hause";`}
			/>

			<Snippet
				label="A MINIMAL CHAPTER"
				code={`import { Hero } from "@chrishayuk/hause/components/forms/Hero";
import { Observation } from "@chrishayuk/hause/components/forms/Observation";
import { Connection } from "@chrishayuk/hause/components/forms/Connection";
import { formCount } from "@chrishayuk/hause/manifest";

export default function Chapter() {
  return (
    <main>
      <Hero kicker="THE ROOM" title="THE CLAIM" dek="The explanation walks beside the reader." />
      <Observation text="What is actually there, before what it means." />
      <Connection text="Where this leads." links={[{ href: "/next", label: "THE NEXT ROOM" }]} />
    </main>
  );
}`}
			/>

			<Snippet
				label="THE LEGIBILITY LAYER — SEO & AEO FROM THE SAME RECORDS"
				code={`import { Answer } from "@chrishayuk/hause/components/forms/Answer";
import { JsonLd } from "@chrishayuk/hause/components/JsonLd";
import { techArticleLd, definedTermLd } from "@chrishayuk/hause/seo";

// The question, asked the way people ask it — a real heading, a
// lift-able answer, a citable anchor. The designed heading above it
// stays exactly as designed.
<Answer
  id="what-is-the-claim"
  question="What is the claim, plainly?"
  answer="Forty to a hundred words a reader — or a machine — can lift whole."
/>

// Structured data projected from records the page already holds,
// so the crawlable answer can never drift from the rendered one.
<JsonLd data={techArticleLd({ headline, description, url, siteUrl, siteName })} />`}
			/>

			<Observation
				label="MACHINE LEGIBILITY IS PART OF THE GRAMMAR"
				text="Query-shaped titles with designed headings, answer-first blocks with stable anchors, JSON-LD from the same records the forms render, ARIA state on every instrument, and nothing that lives only in an animation. The test travels with the install: strip the page to text, and it should still answer the question it was designed to answer."
			/>

			<Observation
				label="THE ENVIRONMENTS"
				text="Dark is the default. A viewer opts into light through the ModeToggle, and the choice persists as hause-mode in localStorage — apply it before paint with a blocking script that sets data-mode on the root element when the stored value is light."
			/>

			<Statement text="The standing rule travels with the install: nothing enters the library without a real page that needed it first." />

			<Connection
				text="What you just installed, exhibited."
				links={[
					{ href: "/forms", label: `THE HOLDINGS — ALL ${formCount()}` },
					{ href: "/statements", label: "THE BOOK, BY MODE" },
				]}
			/>
		</main>
	);
}

import type { Metadata } from "next";
import { Hero } from "@chrishayuk/hause/components/forms/Hero";
import { Statement } from "@chrishayuk/hause/components/forms/Statement";
import { Observation } from "@chrishayuk/hause/components/forms/Observation";
import { Connection } from "@chrishayuk/hause/components/forms/Connection";
import { Snippet } from "@chrishayuk/hause/components/forms/Snippet";
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
import { Snippet } from "@chrishayuk/hause/components/forms/Snippet";
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

			<Snippet
				label="THE CITABLE SURFACE — ONE RECORD, FOUR SURFACES"
				code={`import { Provenance } from "@chrishayuk/hause/components/forms/Provenance";
import { Citation } from "@chrishayuk/hause/components/forms/Citation";
import { citationMeta, type CitationRecord } from "@chrishayuk/hause/cite";
import { citationLd } from "@chrishayuk/hause/seo";

// The site holds the record. The library holds the forms, the
// formatters and the machine surfaces.
const NOTE: CitationRecord = {
  title: "Precision maps",
  authors: ["Chris Hay"],
  published: "2026-08-31",   // FIRST published. A revision sets revised.
  version: "1.0",
  url: "https://example.org/research/precision-maps",
  publisher: "Example",
  kind: "research-note",
  // doi: absent until one is actually registered.
};

export const metadata = { other: citationMeta(NOTE) };   // the head

<JsonLd data={citationLd(NOTE)} />                        {/* the graph */}
<Provenance record={NOTE} citeHref="#cite" history={[    /* the page  */
  { date: "2026-08-31", text: "Published." },
]} />
<Citation record={NOTE} />                                {/* the export */}`}
				aside="Provenance rests as one line and expands to the record; Citation renders the reference plain-first, then BibTeX, APA and CSL-JSON."
			/>

			<Observation
				label="PUBLISHING IS A DESIGN-SYSTEM CONCERN"
				text="Everything substantive is citable by default — stable URL, title, author, first-publication date, version, and an export. A work worth defending can additionally become a registered publication: an immutable version plus a registered identifier. The rules are one rule. Published means first published; a revision sets revised and never quietly moves the date. A substantive change is a new version, not a silent edit. And an identifier that has not been registered is absent — no placeholder DOI, no registration pending."
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

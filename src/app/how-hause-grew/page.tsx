import type { Metadata } from "next";
import { Hero } from "@chrishayuk/hause/components/forms/Hero";
import { Statement } from "@chrishayuk/hause/components/forms/Statement";
import { Observation } from "@chrishayuk/hause/components/forms/Observation";
import { Answer } from "@chrishayuk/hause/components/forms/Answer";
import { Evidence } from "@chrishayuk/hause/components/forms/Evidence";
import { Timeline } from "@chrishayuk/hause/components/forms/Timeline";
import { Connection } from "@chrishayuk/hause/components/forms/Connection";
import { Provenance } from "@chrishayuk/hause/components/forms/Provenance";
import { Citation } from "@chrishayuk/hause/components/forms/Citation";
import { JsonLd } from "@chrishayuk/hause/components/JsonLd";
import { breadcrumbLd, citationLd } from "@chrishayuk/hause/seo";
import { citationMeta, type CitationRecord } from "@chrishayuk/hause/cite";
import { Genealogy } from "@/components/Genealogy";
import { COUNTS, DATES, LANES, UNRECORDED, historyEntries, laneOf, marksAt } from "@/data/genealogy";
import { buildIdentifiers } from "@/data/build";

const RECORD: CitationRecord = {
	title: "How HAUSE grew",
	authors: ["Chris Hay"],
	published: "2026-08-31",
	version: "1.0",
	url: "https://hause.design/how-hause-grew",
	publisher: "hause.design",
	kind: "article",
	abstract:
		"Was this library designed by completing a taxonomy, or discovered while building things? The recorded origins, dates and causes of every form in HAUSE — and the fourteen whose history was never written down.",
	independence: "Published independently by Chris Hay.",
	about: ["design system", "provenance", "library history"],
	partOf: { title: "HAUSE — a design system for AI", url: "https://hause.design", version: "0.1.0" },
	identifiers: buildIdentifiers(),
};

export const metadata: Metadata = {
	title: "How HAUSE Grew: The Recorded Origin of Every Form",
	alternates: { canonical: "/how-hause-grew" },
	description:
		"Designed by taxonomy, or discovered by building? Every form's recorded origin, date and cause — and the fourteen with no recorded history, left blank rather than reconstructed.",
	other: citationMeta(RECORD),
};

/**
 * THE CLAIM, MADE INSPECTABLE.
 *
 * The home page says no form enters the library without a real page that
 * needed it first. That is a sentence anyone can write. This page is the
 * record behind it — read from the manifest, including the parts of the
 * record that are missing.
 */
export default function HowHauseGrewPage() {
	const grid: Record<string, Record<string, ReturnType<typeof marksAt>>> = {};
	for (const lane of LANES) {
		grid[lane] = { undated: marksAt(lane, null) };
		for (const d of DATES) grid[lane][d] = marksAt(lane, d);
	}

	return (
		<main>
			<JsonLd data={citationLd(RECORD)} />
			<JsonLd
				data={breadcrumbLd([
					{ name: "HAUSE", url: "https://hause.design" },
					{ name: "How HAUSE grew", url: RECORD.url },
				])}
			/>

			<Hero
				kicker="THE RECORD OF THE LIBRARY"
				title="HOW HAUSE GREW"
				dek="Every design system claims its components were needed. Here is the evidence for this one — where each form came from, when it entered, what could not be built without it, and which parts of that history were never written down."
			/>

			<Answer
				id="was-hause-designed-or-discovered"
				question="Was HAUSE designed as a taxonomy, or discovered by building?"
				answer={`Discovered, and the record says so rather than the copy. Of ${COUNTS.total} forms, ${COUNTS.recorded} name the chapter they came from — ${LANES.length} origins across ${DATES.length} recorded days — and ${COUNTS.caused} carry the sentence describing what could not be built without them. The remaining ${COUNTS.unrecorded} entered before recording an origin became doctrine, and are left blank rather than reconstructed from memory. Absence is part of the evidence.`}
			/>

			<Statement text="Nothing enters the library without a real page that needed it first." />

			<Genealogy lanes={LANES} dates={DATES} grid={grid} unrecorded={UNRECORDED} />

			<Evidence
				items={[
					{
						label: "Forms naming the chapter they came from",
						status: "SUPPORTED",
						detail: `${COUNTS.recorded} of ${COUNTS.total}, in the manifest, with a date on ${COUNTS.dated} of them and a stated cause on ${COUNTS.caused}. Every lane on the chart above is a real exhibition — a consumer that needed something the library did not have.`,
					},
					{
						label: "Origins reconstructed to complete the record",
						status: "REFUTED",
						detail: `Zero. ${COUNTS.unrecorded} forms have no recorded origin and are shown as having none. The rule is the manifest's own: an unrecorded origin is absent, never guessed — which is why this page can be read as evidence rather than as a story about itself.`,
					},
					{
						label: "Forms added to fill a gap in the taxonomy",
						status: "REFUTED",
						detail: "Zero. The three modes were named after the forms existed, and the one form the library holds without exhibiting — Film — is shown as held rather than illustrated with a fake.",
					},
				]}
			/>

			<Timeline entries={historyEntries()} />

			<Observation
				label="WHAT THE SHAPE SAYS"
				text={`One consumer supplied most of the library: ${LANES.map((l) => `${l.toLowerCase()} (${Object.values(grid[l]).flat().length})`).join(", ")}. That is not a boast — it is the honest weakness of a young design system. A form generalises when its props stop knowing whose content they carry, and a form that has only ever served one exhibition has been tested against one kind of content. The second consumer is where a library finds out what it actually built.`}
			/>

			<Connection
				text="The catalogue this history produced, and the failures that produced it."
				links={[
					{ href: "/forms", label: "THE HOLDINGS — EVERY FORM" },
					{ href: "/problems", label: "THE PROBLEMS — WHY ANY OF THIS EXISTS" },
				]}
			/>

			<Provenance record={RECORD} citeHref="#cite" />
			<Citation
				record={RECORD}
				note="Read from the manifest at build time — including the gaps. A history that only shows what it knows is worth more than one that looks complete."
			/>
		</main>
	);
}

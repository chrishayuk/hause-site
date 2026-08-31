import { Metadata } from "next";
import { Hero } from "@chrishayuk/hause/components/forms/Hero";
import { Connection } from "@chrishayuk/hause/components/forms/Connection";
import { Specimen } from "@/components/Specimen";
import { AnatomySpecimen, DecompositionSpecimen, ExpertFieldSpecimen, ComparisonSpecimen, VariantsSpecimen, LadderSpecimen, AgreementSpecimen, DerivationSpecimen, ByteMapSpecimen, TerminalSpecimen, GatingSpecimen, LensSpecimen, ProvenanceSpecimen, CitationSpecimen, FollowRevealSpecimen } from "@/specimens/instruments";
import { doctrine } from "@/data/doctrine";

export const metadata: Metadata = {
	title: "Interactive Design Forms: The HAUSE Instruments",
	alternates: { canonical: "/instruments" },
	description: "The interactive forms — understanding through manipulation, always with a text fallback.",
};

/** The doctrine the SPEC depth quotes — verbatim from the library README, never retyped. */
const LEGIBILITY = doctrine("Machine legibility");

export default function InstrumentsPage() {
	return (
		<main>
			<Hero
				kicker="THE BOOK · MODE TWO"
				title="INSTRUMENTS"
				dek="Interactive forms — the reader operates them. Every one carries an always-present text fallback, so the point survives with the interaction removed."
			/>

			<Specimen name="Anatomy" mode="instrument" note="An annotated cutaway, fully disclosed — nothing behind a click. Here: the anatomy of a HAUSE chapter." />

			<AnatomySpecimen />

			<Specimen name="Decomposition" mode="instrument" note="One object, its parts, the thing that assembles them — stepped by hand. Its cinematic sibling, Unfolding, takes identical props." />

			<DecompositionSpecimen />

			<Specimen name="ExpertField" mode="instrument" note="A field of units, mostly dormant; each scenario lights the subset that answers it." />

			<ExpertFieldSpecimen />

			<Specimen name="Comparison" mode="instrument" note="One object, two interpretations, dragged between. Its cinematic sibling, Transformation, performs the same argument." />

			<ComparisonSpecimen />

			<Specimen name="Variants" mode="instrument" note="One identity, physically present variants, a staged swap — and a designed refusal for the absent one." />

			<VariantsSpecimen />

			<Specimen name="Ladder" mode="instrument" note="A gated progression — rungs climbed in order, each closed only by its own criterion." />

			<LadderSpecimen />

			<Specimen name="Agreement" mode="instrument" note="N independently-derived values that must be identical — with a FAIL row, because an invariant you never see fail is decoration." />

			<AgreementSpecimen />

			<Specimen name="Derivation" mode="instrument" note="A value folded down a graded scale by caps — derived, never asserted." />

			<DerivationSpecimen />

			<Specimen name="ByteMap" mode="instrument" note="A physical layout drawn to scale — each field's width is its width in bytes. The one place a page should feel like an engineering drawing." />

			<ByteMapSpecimen />

			<Specimen name="Terminal" mode="instrument" note="A query surface as an instrument: the form is the chrome, the meaning is one executor function passed in. Promoted from vindex3.org's Explorer, where it fronts a live query endpoint." />

			<TerminalSpecimen />

			<Specimen name="Gating" mode="instrument" note="Expand, judge, compress — performed by widths. Promoted from vindex3.org's Anatomy, where the stages are a model's gate/up/down tensors; here, an editor's day." />

			<GatingSpecimen />

			<Specimen name="Lens" mode="instrument" note="One concept, one URL, three depths — the explanation, the object, and the words that govern it. The chosen depth is remembered across pages and written into the fragment; every panel stays in the DOM, so the normative text is legible whether or not the tab was clicked. Built for vindex3.org's representation chapter, where LEARN, INSPECT and SPEC are prose, a live instrument, and the ABI clause itself." />

			<LensSpecimen />

			<Specimen name="Provenance" mode="instrument" note="The publication record beneath a page: one quiet evidence line at rest — published, revised, version, and a DOI only where one has been registered — expanding to the identifiers and the dated history. The specimen is this site's own record, and there is no DOI in it because none exists." />

			<ProvenanceSpecimen />

			<Specimen name="Citation" mode="instrument" note="The reference itself. Plain is selected by default, so the citation is in the served HTML before a line of JavaScript runs; BibTeX, APA and CSL-JSON sit behind tabs. Three formats, because CSL-JSON becomes the other three hundred." />

			<CitationSpecimen />

			<Specimen name="FollowReveal" mode="instrument" note="A path through connected ideas, replayed at the hause stagger." />

			<FollowRevealSpecimen />


			<Connection
				text="Two instruments have cinematic siblings that take identical props — see them perform."
				links={[{ href: "/performances", label: "PERFORMANCES →" }]}
			/>
</main>
	);
}

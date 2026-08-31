import { Metadata } from "next";
import { Hero } from "@chrishayuk/hause/components/forms/Hero";
import { Observation } from "@chrishayuk/hause/components/forms/Observation";
import { Connection } from "@chrishayuk/hause/components/forms/Connection";
import { Specimen } from "@/components/Specimen";
import { TransformationSpecimen, UnfoldingSpecimen, CompilationSpecimen, ProcessionSpecimen, MagnitudeSpecimen, ChannelSpecimen, QuantisationSpecimen } from "@/specimens/performances";

export const metadata: Metadata = {
	title: "HAUSE in Performance: Real Pages Built From the Forms",
	alternates: { canonical: "/performances" },
	description: "The cinematic forms — they play themselves, rest on a designed final state, and never crossfade.",
};

export default function PerformancesPage() {
	return (
		<main>
			<Hero
				kicker="THE BOOK · MODE THREE"
				title="PERFORMANCES"
				dek="Cinematic forms — they play themselves. In-view start, a designed resting state, REPLAY where a piece runs once, a gentle loop where a scrolling reader must never find it finished. Reduced motion always lands on the finished composition."
			/>

			<Observation text="One rule governs all of them: never a crossfade between two physical forms of one thing. A crossfade depicts a conversion. These forms stage a swap — exit, a held beat, enter — or they move the same pieces continuously. The distinction is the design language's deepest conviction, borrowed from the exhibition that forced it into existence." />

			<Specimen name="Transformation" mode="performance" note="Comparison's cinematic sibling — identical argument, performed instead of dragged." />

			<TransformationSpecimen />

			<Specimen name="Unfolding" mode="performance" note="Decomposition's cinematic sibling — same props, so the two are interchangeable per chapter." />

			<UnfoldingSpecimen />

			<Specimen name="Compilation" mode="performance" note="Inputs compiled through named stages into an artifact that no longer needs them — with the discard beat at the end." />

			<CompilationSpecimen />

			<Specimen name="Procession" mode="performance" note="One thing through every stage, in order — loops while in view, so a scrolling reader never finds it finished." />

			<ProcessionSpecimen />

			<Specimen name="Magnitude" mode="performance" note="A powers-of-ten zoom-out, area-true — each arrival rescales the world." />

			<MagnitudeSpecimen />

			<Specimen name="Channel" mode="performance" note="Throughput through a fixed conduit — when the payload narrows, the same channel delivers more often." />

			<ChannelSpecimen />

			<Specimen name="Quantisation" mode="performance" note="Values snapping to representable levels — on a fine grid the move is invisible; on a coarse one, every value steps, and the ghosts remember." />

			<QuantisationSpecimen />


			<Connection
				text="Back through the book."
				links={[
					{ href: "/statements", label: "STATEMENTS →" },
					{ href: "/instruments", label: "INSTRUMENTS →" },
				]}
			/>
</main>
	);
}

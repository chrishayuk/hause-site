import Link from "next/link";
import catalogue from "@/data/choosing1-a.json";
import grammar from "@/data/choosing1-b.json";
import resolver from "@/data/choosing1-c.json";

const exact = (result: typeof catalogue | typeof grammar | typeof resolver) =>
	result.outcomes.filter((outcome) => outcome.exact).length;

export function HomepageProof() {
	const total = catalogue.outcomes.length;
	const matched = exact(catalogue);
	return (
		<section id="selection-proof" className="home-proof" aria-labelledby="home-proof-title">
			<div>
				<p className="voice-evidence">CHOOSING-1 / THE RECORDED RESULT</p>
				<h2 id="home-proof-title" className="voice-editorial">Can a model read the room?</h2>
				<p className="home-proof-number voice-evidence">{matched}<span> / {total}</span></p>
				<p className="voice-system">{(matched / total * 100).toFixed(1)}% exact selections on unfamiliar cases, given the form names and one-line descriptions.</p>
			</div>
			<div className="home-proof-context">
				<p className="voice-evidence">THE LIMITS TRAVEL WITH THE NUMBER</p>
				<p className="voice-system">One author’s preregistered evaluation. The full grammar scored {exact(grammar)}/{grammar.outcomes.length} too, so this test cannot establish its added value. The frozen keyword resolver scored {exact(resolver)}/{resolver.outcomes.length}.</p>
				<p className="voice-system">This tests selection. It does not establish interface quality or independent production value.</p>
				<Link href="/evals/choosing-1" className="story-link">READ THE TEST, INCLUDING ITS FAILURES ↗</Link>
			</div>
		</section>
	);
}

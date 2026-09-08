import Link from "next/link";

const firstForms = [
	"Hero",
	"Statement",
	"Observation",
	"Claim",
	"Evidence",
	"Question",
	"Timeline",
	"Connection",
	"Film",
	"Comparison",
	"FollowReveal",
];

const lineage = ["EXHIBITION", "CINEMATIC COMPOSITION", "FORMS", "SEMANTIC FORMS", "AI COMPOSITION"];

export function OriginScene() {
	return (
		<section id="origin" className="home-origin" aria-labelledby="home-origin-title">
			<header className="home-origin-prologue">
				<p className="voice-evidence">02 / THE ORIGINAL INSTINCT</p>
				<h2 id="home-origin-title" className="voice-editorial">
					I wanted a website to behave like an <em>exhibition.</em>
				</h2>
				<p className="voice-system">Before the component. Before the ontology. Before the AI framing.</p>
				<span className="home-origin-orbit" aria-hidden="true">STAGE THE OBJECT · STAGE THE VIEWER ·</span>
			</header>

			<div className="home-origin-rooms" aria-label="Three exhibition principles behind HAUSE">
				<article className="home-origin-room home-origin-room--space">
					<p className="voice-evidence">ROOM I / SPACE</p>
					<h3 className="voice-editorial">The space around something changes how you read it.</h3>
					<div className="home-origin-object" aria-hidden="true" />
				</article>
				<article className="home-origin-room home-origin-room--time">
					<p className="voice-evidence">ROOM II / TIME</p>
					<h3 className="voice-editorial">Cinematic does not mean motion.</h3>
					<p className="voice-system">It means directing attention through time.</p>
					<div className="home-origin-beats voice-evidence" aria-hidden="true"><span>EXIT</span><i/><span>HOLD</span><i/><span>ENTER</span></div>
				</article>
				<article className="home-origin-room home-origin-room--scale">
					<p className="voice-evidence">ROOM III / SCALE</p>
					<h3 className="voice-editorial">Not every idea deserves a card.</h3>
					<p className="voice-editorial">Some deserve a room.</p>
				</article>
			</div>

			<figure className="home-origin-archive">
				<figcaption className="voice-evidence"><span>ARCHIVE / 28 AUGUST 2026</span><span>THE FIRST HOUSE README</span></figcaption>
				<blockquote className="voice-editorial">
					“A cinematic visual language for ideas, systems and explanations.”
				</blockquote>
				<div className="home-origin-forms voice-evidence" aria-label="Forms named in the first HOUSE README">
					{firstForms.map((form) => <span key={form}>{form}</span>)}
				</div>
				<p className="voice-editorial home-origin-rule">NO GENERIC CARD KIT.</p>
			</figure>

			<div className="home-origin-lineage voice-evidence" aria-label="The lineage from exhibition to AI composition">
				{lineage.map((step, index) => <span key={step}>{index > 0 && <i aria-hidden="true">→</i>}{step}</span>)}
			</div>

			<div className="home-origin-copy">
				<div className="home-origin-question">
					<p className="voice-evidence">THE QUESTION CHANGED</p>
					<p className="voice-editorial">How should I stage this idea?</p>
					<span aria-hidden="true">↓</span>
					<p className="voice-editorial">Can an AI learn to stage it?</p>
				</div>
				<div>
					<p className="voice-system">Read, Operate and Watch are not a wrapper around the semantic system. They are its ancestry. The artistic question became a systems question, and the vocabulary of an exhibition became a vocabulary a machine could choose from.</p>
				<Link href="/how-hause-grew" className="story-link">FOLLOW THE RECORDED ORIGIN ↗</Link>
				</div>
			</div>
		</section>
	);
}

import Link from "next/link";
import { Statement } from "@chrishayuk/hause/components/forms/Statement";
import { Question } from "@chrishayuk/hause/components/forms/Question";
import { Answer } from "@chrishayuk/hause/components/forms/Answer";
import { PerformanceStage } from "./PerformanceStage";

export function HomepagePerformance() {
	return (
		<section id="performance" className="home-performance" aria-labelledby="performance-title">
			<header>
				<p className="voice-evidence">A SHORT PERFORMANCE / THREE ACTS</p>
				<h2 id="performance-title" className="voice-editorial">Give an idea<br />the whole room.</h2>
			</header>
			<PerformanceStage>
				<article className="home-performance-scene home-performance-scene--statement">
					<p className="voice-evidence">01 / STATEMENT</p>
					<Statement text="The space around an idea changes how we read it." />
				</article>
				<article className="home-performance-scene home-performance-scene--question">
					<p className="voice-evidence">02 / QUESTION</p>
					<Question text="What deserves your attention?" status="OPEN" />
				</article>
				<article className="home-performance-scene home-performance-scene--answer">
					<p className="voice-evidence">03 / ANSWER</p>
					<Answer question="How do you stage an idea?" answer="Give it space. Let it arrive. Let it change." />
				</article>
			</PerformanceStage>
			<footer>
				<details><summary className="voice-evidence">READ THE COMPLETE SEQUENCE</summary><p className="voice-system">Statement: the space around an idea changes how we read it. Question: what deserves your attention? Answer: give it space, let it arrive, let it change. Three HAUSE forms compose one short argument; each exits before the next enters.</p></details>
				<Link href="/performances" className="story-link">ENTER THE PERFORMANCES ↗</Link>
			</footer>
		</section>
	);
}

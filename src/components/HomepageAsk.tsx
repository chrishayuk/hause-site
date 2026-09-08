import Link from "next/link";
import { actFor } from "@/data/grammar";
import { formSlug } from "@/data/forms";

const example = "I need to show that two independent tests agree";
const recommendation = "Agreement";

export function HomepageAsk() {
	const act = actFor(recommendation);

	return (
		<section id="try" className="home-ask" aria-labelledby="home-ask-title">
			<div className="home-ask-intro">
				<p className="voice-evidence">04 / THE TRANSLATION · TRY HAUSE / START WITH THE ACT</p>
				<h2 id="home-ask-title" className="voice-editorial">
					What does your interface need to communicate?
				</h2>
				<p className="voice-system">
					Describe the job in ordinary language. HAUSE follows the connected selection record to a form,
					or says when none is established.
				</p>
			</div>

			<form action="/ask" method="get" className="home-ask-form">
				<label htmlFor="home-ask-query" className="voice-evidence">DESCRIBE THE JOB</label>
				<div>
					<input id="home-ask-query" name="q" defaultValue={example} maxLength={300} />
					<button type="submit" className="voice-evidence">ASK HAUSE <span aria-hidden="true">→</span></button>
				</div>
			</form>

			<div className="home-ask-result">
				<div>
					<p className="voice-evidence">EXAMPLE RESULT / HAUSE RECOMMENDS / INSTRUMENT</p>
					<h3 className="voice-editorial">{recommendation}</h3>
				</div>
				<div>
					<p className="voice-evidence">WHY THIS FORM</p>
					<p className="voice-system">{act?.test ?? "Independently derived values are expected to match."}</p>
					<div className="home-ask-links voice-evidence">
						<Link href={`/forms/${formSlug(recommendation)}`}>SEE SPECIMEN ↗</Link>
						<Link href="/choosing">WHY NOT EVIDENCE? ↗</Link>
					</div>
				</div>
			</div>
		</section>
	);
}

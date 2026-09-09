import type { Problem } from "@/data/problems";

// Editorial staging only. The argument, answers and provenance remain in
// the problem record. These diagrams illustrate a failure, not new evidence.
const captions: Record<string, [string, string, string]> = {
	"everything-becomes-a-card": ["A different act.", "The same rectangle.", "Name the act before choosing the shape."],
	"interfaces-that-cannot-refuse": ["An honest limit.", "Dressed as a fault.", "A refusal can be the system working."],
	"pages-machines-cannot-read": ["A person sees the argument.", "A machine gets the shell.", "The meaning must survive the surface."],
	"nothing-to-cite": ["The idea was published.", "The trail disappeared.", "Give the argument a date and an address."],
	"the-book-drifts-from-the-code": ["The system changes.", "The sentence stays.", "Derive the facts the system already knows."],
	"tutorial-or-reference-never-both": ["One subject.", "Two doors.", "Change the depth. Keep the address."],
	"everything-sounds-equally-certain": ["Believed. Measured. Unknown.", "All spoken with confidence.", "Make the difference visible."],
	"motion-that-means-nothing": ["Everything moves.", "Nothing is explained.", "Make the transition carry the idea."],
};

export function problemSceneCopy(problem: Problem) {
	return captions[problem.slug];
}

export function ProblemScene({ problem }: { problem: Problem }) {
	const slug = problem.slug;
	return (
		<div className={`problem-art problem-art--${slug}`} aria-hidden="true">
			{slug === "everything-becomes-a-card" && <div className="art-cards">{["CLAIM", "EVIDENCE", "QUESTION", "REFUSAL"].map(label => <span key={label}>{label}<small>CARD</small></span>)}</div>}
			{slug === "interfaces-that-cannot-refuse" && <div className="art-refusal"><s>Something went wrong.</s><strong>No.</strong><span>THERE IS NOT ENOUGH EVIDENCE.</span></div>}
			{slug === "pages-machines-cannot-read" && <div className="art-readers"><span><b>Meaning.</b>HUMAN</span><span><b>&lt; / &gt;</b>MACHINE</span></div>}
			{slug === "nothing-to-cite" && <div className="art-citation"><span>AUTHOR ──────</span><span>PUBLISHED ────</span><strong>“An idea.”</strong><span>VERSION ─────</span><span>SOURCE ──────</span></div>}
			{slug === "the-book-drifts-from-the-code" && <div className="art-drift"><div><span>THE CODE</span><i /><i /><i /><i /></div><div><span>THE BOOK</span><i /><i /><i /></div><p>THEY WERE EQUAL. ONCE.</p></div>}
			{slug === "tutorial-or-reference-never-both" && <div className="art-doors"><span><b>01</b>TUTORIAL<small>Tell me why.</small></span><i>OR</i><span><b>02</b>REFERENCE<small>Tell me exactly.</small></span></div>}
			{slug === "everything-sounds-equally-certain" && <div className="art-certainty"><span>BELIEF<i>?</i></span><span>MEASUREMENT<i>✓</i></span><span>UNKNOWN<i>…</i></span></div>}
			{slug === "motion-that-means-nothing" && <div className="art-motion"><span>EXIT</span><i /><span>HOLD</span><i /><span>ENTER</span><p>THE EMPTY BEAT IS PART OF THE SENTENCE.</p></div>}
		</div>
	);
}

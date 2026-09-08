import Link from "next/link";
import { formCount } from "@chrishayuk/hause/manifest";
import { ACTS } from "@/data/grammar";
import { formSlug } from "@/data/forms";
import resultA from "@/data/choosing1-a.json";
import resultB from "@/data/choosing1-b.json";
import resultC from "@/data/choosing1-c.json";

/**
 * THE LOOP — where the act comes from.
 *
 * The demo above shows a container and an act on the same sentence.
 * This shows the step before it: a model deciding what it is doing
 * selects from a vocabulary of acts, and each act names the form that
 * renders it. Drawn with its counts, because the acts and the forms are
 * one-to-one today, and a diagram implying a selection engine the code
 * does not hold would be a container of the editorial kind.
 *
 * The numbers are read from CHOOSING-1's own output — the same files
 * the eval page reads — so this section cannot say something the eval
 * does not, and it carries the eval's caveat beside the eval's result.
 */

type Outcome = { kind: string; expected: string; selected: string; exact: boolean; abstained: boolean };
type Res = { outcomes: Outcome[] };

const A = resultA as Res;
const B = resultB as Res;
const C = resultC as Res;
const n = A.outcomes.length;
const exact = (r: Res) => r.outcomes.filter((o) => o.exact).length;
const abstained = (r: Res) => r.outcomes.filter((o) => o.expected === "NONE" && o.abstained).length;
const percentage = (r: Res) => (exact(r) / r.outcomes.length * 100).toFixed(1);
const noForm = A.outcomes.filter((o) => o.expected === "NONE").length;

const STAGES: { label: string; line: string; accent?: boolean }[] = [
	{ label: "USER NEED", line: "What must this interface help someone understand?" },
	{ label: `ACT · ${ACTS.length}`, line: "What is the system doing: asserting, supporting, declining, comparing?" },
	{ label: `FORM · ${formCount()}`, line: "The act selects its rendering — one form for each recorded act.", accent: true },
	{ label: "RECORD", line: "What does it know, where did that come from, and what is still missing?" },
	{ label: "HUMAN + MACHINE", line: "The same meaning remains legible across the page, citation and graph." },
];

const EXAMPLES: { doing: string; form: string | null }[] = [
	{ doing: "it believes something it must defend", form: "Claim" },
	{ doing: "it has a measurement to show", form: "Evidence" },
	{ doing: "it cannot substantiate the claim", form: "Refusal" },
	{ doing: "nothing here is the act it is making", form: null },
];

const MEASURED: { value: string; line: string }[] = [
	{ value: `${exact(A)} / ${n}`, line: "a model given only the form names and their one-line descriptions" },
	{ value: `${exact(B)} / ${n}`, line: "the same model given the full selection grammar" },
	{ value: `${exact(C)} / ${n}`, line: "this site's own keyword resolver, no model call" },
	{ value: `${abstained(A)} · ${abstained(B)} / ${noForm}`, line: "cases with no fitting form, where each model condition said so rather than guessing" },
];

const rule = { borderColor: "var(--color-mist)" };
const accent = { color: "var(--color-accent)" };

export function TheLoop() {
	return (
		<section className="hause-grid py-16 sm:py-24 home-system" aria-label="The loop — where the act comes from">
			<div className="col-span-12 md:col-start-2 md:col-span-10">
				<p className="voice-evidence text-xs tracking-[0.14em] uppercase mb-3 opacity-50">HOW IT WORKS / THE WHOLE MODEL</p>
				<p className="voice-editorial text-2xl sm:text-3xl leading-snug max-w-2xl mb-10">Decide the act before drawing the interface.</p>

				<div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-6">
					{STAGES.map((s, i) => (
						<div key={s.label} className="border-t pt-3" style={{ borderColor: s.accent ? "var(--color-accent)" : "var(--color-mist)" }}>
							<p className="voice-evidence text-[11px] tracking-[0.12em] uppercase m-0" style={s.accent ? accent : undefined}>
								{i > 0 ? "→ " : ""}
								{s.label}
							</p>
							<p className="voice-system text-xs opacity-60 leading-relaxed m-0 mt-2">{s.line}</p>
						</div>
					))}
				</div>

				<p className="voice-evidence text-[11px] tracking-[0.1em] uppercase opacity-40 mt-12 mb-4">
					THE THREE SENTENCES ABOVE, AS A MODEL WOULD CHOOSE THEM — AND THE CASE WITH NO FORM
				</p>
				<div className="flex flex-col">
					{EXAMPLES.map((e) => (
						<div
							key={e.doing}
							className="grid grid-cols-[1fr_minmax(0,10rem)] sm:grid-cols-[1fr_minmax(0,14rem)] gap-4 sm:gap-8 items-baseline py-3 border-t"
							style={rule}
						>
							<span className="voice-system text-base opacity-75">{e.doing}</span>
							{e.form ? (
								<Link href={`/forms/${formSlug(e.form)}`} className="voice-evidence text-sm" style={accent}>
									→ {e.form}
								</Link>
							) : (
								<span className="voice-evidence text-sm opacity-50">→ no form, and it says so</span>
							)}
						</div>
					))}
					<div className="border-t" style={rule} />
				</div>

				<p className="voice-evidence text-[11px] tracking-[0.1em] uppercase opacity-40 mt-12 mb-4">
					MEASURED — CHOOSING-1 · {n} UNFAMILIAR CASES · PREREGISTERED · FROZEN
				</p>
				<p className="voice-evidence text-5xl sm:text-7xl tracking-tight mb-3" style={accent}>{percentage(A)}% <span className="text-lg sm:text-2xl tracking-normal">· {exact(A)} / {n}</span></p>
				<p className="voice-system text-base max-w-2xl mb-8">In CHOOSING-1, a model given the form names and one-line descriptions selected the intended form in {exact(A)} of {n} unfamiliar cases. The full grammar reached the same result.</p>
				<div className="flex flex-col">
					{MEASURED.map((m) => (
						<div
							key={m.line}
							className="grid grid-cols-[minmax(0,7rem)_1fr] sm:grid-cols-[minmax(0,9rem)_1fr] gap-4 sm:gap-8 items-baseline py-3 border-t"
							style={rule}
						>
							<span className="voice-evidence text-sm" style={accent}>
								{m.value}
							</span>
							<span className="voice-system text-sm opacity-75">{m.line}</span>
						</div>
					))}
					<div className="border-t" style={rule} />
				</div>
				<p className="voice-system text-sm opacity-60 leading-relaxed max-w-2xl mt-6">
					The vocabulary transfers to a reader who has never seen it; a keyword projection of it does not. What the grammar
					adds over the one-line records is unmeasured — the two model conditions cannot be told apart on this set, and the
					eval says so.{" "}
					<Link href="/evals/choosing-1" className="border-b pb-0.5" style={rule}>
						CHOOSING-1, with its failures →
					</Link>
				</p>

				<p className="voice-system text-sm opacity-60 leading-relaxed max-w-2xl mt-8">
					The acts and the forms are one-to-one, which is why the counts match. Beneath them sits a smaller set of moves that
					two forms can share: Comparison and Transformation take identical props and make the same argument — the reader
					drags one, the system performs the other — and the mode chose between them.{" "}
					<Link href="/choosing" className="border-b pb-0.5" style={{ borderColor: "var(--color-accent)" }}>
						The selection grammar — name the act →
					</Link>
				</p>
			</div>
		</section>
	);
}

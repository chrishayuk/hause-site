import Link from "next/link";
import { formSlug } from "@/data/forms";

/**
 * THE ON-RAMP THAT IS NOT A SUBSET.
 *
 * Six forms that carry a surprising amount of explanatory work, offered
 * as a route rather than as a canon — nothing here is more official than
 * the other twenty-nine. The point is to reduce what a first-time reader
 * has to accept before using anything.
 */
const SIX: [string, string][] = [
	["Answer", "give a direct answer, in the words the question was asked in"],
	["Claim", "assert something that could be shown false"],
	["Evidence", "show what supports it — and what refuted it"],
	["Question", "leave something unresolved, at full size"],
	["Refusal", "decline to assert, as a decision rather than an error"],
	["Comparison", "put two readings of one thing against each other"],
];

export function StartHere() {
	return (
		<section className="hause-grid py-16 sm:py-24" aria-label="Start here">
			<div className="col-span-12 md:col-start-2 md:col-span-10">
				<p className="voice-evidence text-xs tracking-[0.14em] uppercase mb-8 opacity-50">START HERE — SIX FORMS</p>
				<div className="flex flex-col">
					{SIX.map(([name, use]) => (
						<Link
							key={name}
							href={`/forms/${formSlug(name)}`}
							className="group grid grid-cols-[7rem_1fr] sm:grid-cols-[10rem_1fr] gap-4 sm:gap-8 items-baseline py-3 border-t"
							style={{ borderColor: "var(--color-mist)" }}
						>
							<span className="voice-evidence text-sm" style={{ color: "var(--color-accent)" }}>
								{name} →
							</span>
							<span className="voice-system text-base opacity-75 group-hover:opacity-100 transition-opacity">{use}</span>
						</Link>
					))}
					<div className="border-t" style={{ borderColor: "var(--color-mist)" }} />
				</div>
				<p className="voice-system text-sm opacity-60 max-w-2xl mt-6">
					These six will carry a surprising amount of explanatory work, and none of them is more canonical than the
					rest of the library — they are a route in, not a core.{" "}
					<Link href="/choosing" className="border-b pb-0.5" style={{ borderColor: "var(--color-accent)" }}>
						When they do not fit, start from the act →
					</Link>
				</p>
			</div>
		</section>
	);
}

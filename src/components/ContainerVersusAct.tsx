import Link from "next/link";
import { Claim } from "@chrishayuk/hause/components/forms/Claim";
import { Evidence } from "@chrishayuk/hause/components/forms/Evidence";
import { Refusal } from "@chrishayuk/hause/components/forms/Refusal";

/**
 * THE FIRST SIXTY SECONDS.
 *
 * One answer, rendered twice. On the left, what a model reaches for when
 * its vocabulary is containers: a heading, a rectangle, a badge, a
 * chevron — the same shape whether the sentence inside is measured,
 * believed or declined. On the right, the same three sentences with
 * their acts named.
 *
 * The left-hand side is drawn here rather than imported, because the
 * library holds no card to draw it with — which is the argument.
 * Built for this page; it knows what a card looks like, and a form
 * never should.
 */

const CARD_ROWS = [
	{ title: "Battery life", body: "Lasts around 40 hours on a charge.", tag: "INFO" },
	{ title: "Independent testing", body: "38.5 h measured, 2 units, lab conditions, March.", tag: "INFO" },
	{ title: "Recyclable materials", body: "We cannot substantiate this claim yet.", tag: "INFO" },
];

export function ContainerVersusAct() {
	return (
		<section className="hause-grid py-16 sm:py-24" aria-label="A container vocabulary and an act vocabulary, on identical content">
			<div className="col-span-12 md:col-start-2 md:col-span-10">
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 mb-12">
					<div>
						<p className="voice-evidence text-xs tracking-[0.14em] uppercase opacity-50 mb-3">MOST DESIGN SYSTEMS START WITH A CONTAINER</p>
						<p className="voice-editorial text-2xl sm:text-3xl leading-snug m-0">Card. Panel. Accordion. Modal.</p>
						<p className="voice-system text-sm opacity-60 leading-relaxed mt-3 max-w-sm">
							A name that describes the shape, and promises nothing about what is inside it.
						</p>
					</div>
					<div>
						<p className="voice-evidence text-xs tracking-[0.14em] uppercase mb-3" style={{ color: "var(--color-accent)" }}>
							HAUSE STARTS WITH THE ACT
						</p>
						<p className="voice-editorial text-2xl sm:text-3xl leading-snug m-0">Claim. Evidence. Refusal. Comparison.</p>
						<p className="voice-system text-sm opacity-60 leading-relaxed mt-3 max-w-sm">
							A name that describes what is being done, and carries a rule about what belongs in it.
						</p>
					</div>
				</div>

				<p className="voice-evidence text-xs tracking-[0.14em] uppercase opacity-50 mb-6">
					THE SAME THREE SENTENCES ABOUT ONE PRODUCT, SAID BOTH WAYS
				</p>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
					<div>
						<p className="voice-evidence text-[11px] tracking-[0.1em] uppercase opacity-40 mb-4">AS CONTAINERS</p>
						<div className="flex flex-col gap-3">
							{CARD_ROWS.map((c) => (
								<div key={c.title} className="border p-4" style={{ borderColor: "var(--color-mist)" }}>
									<div className="flex items-baseline justify-between gap-4">
										<p className="voice-system text-base m-0">{c.title}</p>
										<span className="voice-evidence text-[10px] tracking-[0.08em] uppercase opacity-40 border px-2 py-0.5" style={{ borderColor: "var(--color-mist)" }}>
											{c.tag}
										</span>
									</div>
									<p className="voice-system text-sm opacity-70 m-0 mt-2">{c.body}</p>
								</div>
							))}
						</div>
						<p className="voice-system text-sm opacity-60 leading-relaxed mt-5 max-w-sm">
							Three identical rectangles. A measurement, a belief and a refusal to assert, and nothing in the
							interface distinguishes them — so the reader supplies the difference, usually wrongly.
						</p>
					</div>

					<div>
						<p className="voice-evidence text-[11px] tracking-[0.1em] uppercase mb-4" style={{ color: "var(--color-accent)" }}>
							AS ACTS
						</p>
						<div className="border-l pl-5" style={{ borderColor: "var(--color-mist)" }}>
							<Claim
								text="These headphones last around forty hours on a charge."
								status="ONGOING"
								detail="A belief the product page must answer for — stated as a claim so its status is visible rather than implied."
							/>
							<Evidence
								items={[
									{
										label: "Independent testing",
										status: "SUPPORTED",
										detail: "38.5 hours measured across two units under lab conditions, March 2026 — the receipt, with its own date and method.",
									},
								]}
							/>
							<Refusal
								kicker="A CLAIM THE PAGE WILL NOT MAKE"
								title="NOT SUBSTANTIATED"
								lines={["requested    recyclable materials", "available    supplier statement, unverified"]}
								principle="A page that cannot stand behind a claim says so, rather than phrasing it carefully."
							/>
						</div>
						<p className="voice-system text-sm opacity-60 leading-relaxed mt-5 max-w-sm">
							The same three sentences, with their acts named. Nothing here is prettier — it is{" "}
							<em>legible</em>: a reader, a crawler or a model can tell the measurement from the belief from the
							thing nobody will assert.
						</p>
					</div>
				</div>

				<p className="voice-system text-base opacity-75 leading-relaxed max-w-2xl mt-10">
					That is the whole idea.{" "}
					<Link href="/problems/everything-becomes-a-card" className="border-b pb-0.5" style={{ borderColor: "var(--color-accent)" }}>
						Why AI interfaces converge on containers →
					</Link>
				</p>
			</div>
		</section>
	);
}

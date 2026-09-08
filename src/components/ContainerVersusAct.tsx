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
		<section id="difference" className="meaning-demo" aria-labelledby="meaning-demo-title">
			<div className="meaning-demo-heading">
				<p className="voice-evidence">03 / THE CONSTRAINT · THE SAME ANSWER / TWO VOCABULARIES</p>
				<h2 id="meaning-demo-title" className="voice-editorial">We gave the machine rectangles.</h2>
				<p className="voice-system">Three facts about one fictional product. Nothing changes except the responsibility carried by the interface.</p>
			</div>

			<div className="meaning-demo-switch" role="group" aria-label="Choose how the answer is rendered">
				<label className="voice-evidence"><input type="radio" name="meaning-view" id="meaning-containers" defaultChecked/><span>CONTAINERS</span></label>
				<label className="voice-evidence"><input type="radio" name="meaning-view" id="meaning-forms"/><span>SEMANTIC FORMS</span></label>
			</div>

			<div className="meaning-demo-stage">
				<div className="meaning-containers">
					<p className="voice-evidence meaning-demo-label">WITHOUT HAUSE / EVERYTHING IS INFO</p>
						<div className="generic-card-wall">
							{CARD_ROWS.map((c, index) => (
								<div key={c.title} className="generic-card" data-card={String(index + 1).padStart(2, "0")}>
									<div className="flex items-baseline justify-between gap-4">
										<p className="voice-system text-base m-0">{c.title}</p>
										<span className="voice-evidence">
											{c.tag}
										</span>
									</div>
									<p className="voice-system text-sm opacity-70 m-0 mt-2">{c.body}</p>
								</div>
							))}
						</div>
						<p className="voice-system meaning-demo-note">
							Three identical rectangles. A measurement, a belief and a refusal to assert, and nothing in the
							interface distinguishes them — so the reader supplies the difference, usually wrongly.
						</p>
					</div>

					<div className="meaning-forms">
						<p className="voice-evidence meaning-demo-label">
							WITH HAUSE / THE ACT IS VISIBLE
						</p>
						<div className="meaning-form-stack">
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
						<p className="voice-system meaning-demo-note">
							The same three sentences, with their acts named. Nothing here is prettier — it is{" "}
							<em>legible</em>: a reader, a crawler or a model can tell the measurement from the belief from the
							thing nobody will assert.
						</p>
					</div>
			</div>

			<div className="meaning-demo-foot">
				<p className="voice-system">
					That is the whole idea.{" "}
					<Link href="/problems/everything-becomes-a-card" className="border-b pb-0.5" style={{ borderColor: "var(--color-accent)" }}>
						Why AI interfaces converge on containers →
					</Link>
				</p>
			</div>
		</section>
	);
}

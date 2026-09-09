import Link from "next/link";
import { formCount } from "@chrishayuk/hause/manifest";

export function HomepageHero() {
	return (
		<section className="home-hero" aria-labelledby="home-proposition">
			<div className="home-hero-installation" aria-hidden="true">
				<div className="home-hero-aperture" />
				<span className="home-hero-act home-hero-act--claim">CLAIM</span>
				<span className="home-hero-act home-hero-act--evidence">EVIDENCE</span>
				<span className="home-hero-act home-hero-act--refusal">REFUSAL</span>
				<span className="home-hero-coordinate">ACT / FORM / RECORD</span>
			</div>
			<div className="home-hero-overline voice-evidence">
				<span>HAUSE / AN EXHIBITION BECOMING A SYSTEM</span>
				<span>{formCount()} FORMS · READ / OPERATE / WATCH</span>
			</div>

			<div className="home-hero-copy">
				<p className="voice-evidence home-hero-chapter">01 / ARRIVAL</p>
				<h1 id="home-proposition" className="voice-editorial">
					GIVE <em>MEANING</em> A FORM.
				</h1>
				<p className="voice-system home-hero-dek">
					A semantic design system for AI-generated interfaces. The model chooses the act.
					HAUSE gives that act a form.
				</p>
				<p className="home-hero-examples voice-evidence">CLAIM · EVIDENCE · COMPARISON · REFUSAL</p>
				<div className="home-hero-actions voice-evidence">
					<Link href="#try">TRY THE IDEA <span aria-hidden="true">↓</span></Link>
					<Link href="/use">BUILD WITH IT <span aria-hidden="true">↗</span></Link>
				</div>
			</div>

			<div className="home-hero-boundary">
				<p className="voice-evidence">KEEP YOUR UI LIBRARY</p>
				<p className="voice-system">
					HAUSE does not replace your buttons, tables, navigation or brand system. It adds the semantic
					forms an intelligent interface uses to communicate.
				</p>
			</div>

			<a href="#origin" className="home-hero-scroll voice-evidence">
				ENTER THE EXHIBITION <span aria-hidden="true">↓</span>
			</a>
		</section>
	);
}

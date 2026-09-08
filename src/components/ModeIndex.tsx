import { specimenAnchor } from "@/components/Specimen";

export function ModeIndex({ mode, forms }: { mode: string; forms: string[] }) {
	return (
		<section className="mode-index hause-grid" aria-label={`${mode} specimens on this page`}>
			<div className="col-span-12 md:col-start-2 md:col-span-10">
				<p className="voice-evidence">ON THIS FLOOR / {forms.length} {mode.toUpperCase()}</p>
				<nav>
					{forms.map((form, index) => (
						<a key={form} href={`#${specimenAnchor(form)}`}>
							<span className="voice-evidence">{String(index + 1).padStart(2, "0")}</span>
							<strong className="voice-system">{form}</strong>
						</a>
					))}
				</nav>
			</div>
		</section>
	);
}

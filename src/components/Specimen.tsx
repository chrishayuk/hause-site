/**
 * The specimen label: names the form being shown, its mode, and the
 * exact import path — so the book doubles as the reference. The
 * specimen itself is always the real form rendering real copy; the
 * book cannot drift from the library because it IS the library.
 */
export function Specimen({ name, mode, note }: { name: string; mode: string; note?: string }) {
	return (
		<section className="hause-grid pt-16 sm:pt-24 pb-2">
			<div className="col-span-12 md:col-start-2 md:col-span-10 border-t pt-4" style={{ borderColor: "var(--fg)" }}>
				<div className="flex flex-wrap items-baseline justify-between gap-3">
					<p className="voice-evidence text-sm" style={{ color: "var(--color-accent)" }}>
						{name}
					</p>
					<p className="voice-evidence text-[10px] tracking-[0.12em] uppercase opacity-50">{mode}</p>
				</div>
				<p className="voice-evidence text-[11px] opacity-40 mt-1">@chrishayuk/hause/components/forms/{name}</p>
				{note && <p className="voice-system text-xs opacity-60 mt-2 max-w-2xl">{note}</p>}
			</div>
		</section>
	);
}

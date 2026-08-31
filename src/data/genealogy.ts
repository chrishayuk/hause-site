import { FORM_MANIFEST, type FormMode, type FormRecord } from "@chrishayuk/hause/manifest";
import { formSlug } from "./forms";

/**
 * THE LIBRARY'S OWN HISTORY, READ FROM THE LIBRARY.
 *
 * Nothing here is authored: the lanes are the recorded origins, the
 * columns are the recorded dates, and a form with neither sits outside
 * the chronology rather than being placed by guesswork. The absence is
 * the second finding — a record that only shows what it knows is worth
 * more than one that looks complete.
 */

export type Mark = {
	name: string;
	slug: string;
	mode: FormMode;
	origin?: string;
	because?: string;
	date?: string;
};

const mark = (f: FormRecord): Mark => ({
	name: f.name,
	slug: formSlug(f.name),
	mode: f.mode,
	origin: f.origin,
	because: f.because,
	date: f.date,
});

/** The lane a form sits in: the first segment of its recorded origin. */
export function laneOf(origin?: string): string | null {
	if (!origin) return null;
	const head = origin.split("·")[0].trim();
	return head.toLowerCase() === "the codex" ? "THE CODEX" : head.toUpperCase();
}

export const MARKS: Mark[] = FORM_MANIFEST.map(mark);
export const RECORDED: Mark[] = MARKS.filter((m) => m.origin);
export const UNRECORDED: Mark[] = MARKS.filter((m) => !m.origin);

/**
 * Lanes oldest first — and a lane with no dated form at all sorts before
 * the dated ones, because an origin the record never dated is an origin
 * that predates the record. The codex is the ancestor; it has no dates
 * for exactly that reason.
 */
export const LANES: string[] = [...new Set(RECORDED.map((m) => laneOf(m.origin) as string))].sort((a, b) => {
	const first = (lane: string) =>
		RECORDED.filter((m) => laneOf(m.origin) === lane)
			.map((m) => m.date ?? "0000")
			.sort()[0];
	return first(a).localeCompare(first(b));
});

/** The dated columns, plus one for a recorded origin whose date nobody wrote down. */
export const DATES: string[] = [...new Set(RECORDED.map((m) => m.date).filter(Boolean) as string[])].sort();

export function marksAt(lane: string, date: string | null): Mark[] {
	return RECORDED.filter((m) => laneOf(m.origin) === lane && (date === null ? !m.date : m.date === date));
}

/** The dated history as entries — the same facts, said as a Timeline. */
export function historyEntries(): { date: string; text: string }[] {
	return DATES.map((date) => {
		const forms = RECORDED.filter((m) => m.date === date);
		const parts = forms.map((f) => `${f.name} — ${f.origin}`);
		return { date, text: `${parts.join("; ")}.` };
	});
}

export const COUNTS = {
	total: MARKS.length,
	recorded: RECORDED.length,
	dated: RECORDED.filter((m) => m.date).length,
	caused: MARKS.filter((m) => m.because).length,
	unrecorded: UNRECORDED.length,
};

import * as statements from "./statements";
import * as instruments from "./instruments";
import * as performances from "./performances";

/**
 * THE SPECIMEN REGISTRY.
 *
 * Name → the real form rendering real copy. Both the mode rooms and the
 * individual form pages resolve through here, so a specimen has exactly
 * one definition and the book cannot say two different things about one
 * form.
 *
 * A form with no entry is a form the book holds without exhibiting —
 * Film, whose specimen waits for a real film. The pages say so rather
 * than drawing an empty frame.
 */
const ALL = { ...statements, ...instruments, ...performances } as Record<string, () => React.ReactNode>;

export function specimenFor(name: string): (() => React.ReactNode) | null {
	return ALL[`${name}Specimen`] ?? null;
}

export function isExhibited(name: string): boolean {
	return specimenFor(name) !== null;
}

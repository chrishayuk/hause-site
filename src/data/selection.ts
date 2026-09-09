import { GRAMMAR, intentFor } from "./grammar";

export const INTENT_DOORS: Record<string, { label: string; detail: string }> = {
  asserting: { label: "Make a point", detail: "Assert, observe, answer or quote." },
  "showing-support": { label: "Show the support", detail: "Findings, agreement, derivation and sources." },
  declining: { label: "Leave it open", detail: "Decline, question or show a boundary." },
  "showing-a-thing": { label: "Open it up", detail: "Let the reader inspect a thing or its structure." },
  "over-time": { label: "Show a change", detail: "Compare, perform, transform or play a film." },
  "moving-the-reader": { label: "Move the reader", detail: "Open the next chapter or trace a history." },
};
export type SelectionQuery = { intent?: string | string[]; form?: string | string[] };
export const firstParam = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value) ?? "";
export function selectionState(query: SelectionQuery) {
  const requested = firstParam(query.form);
  const intent = intentFor(requested) ?? GRAMMAR.find(item => item.id === firstParam(query.intent)) ?? GRAMMAR[0];
  const act = intent.acts.find(item => item.form === requested) ?? intent.acts[0];
  return { intent, act };
}
export function selectionHref(form: string, anchor = "selection-result") {
  const intent = intentFor(form);
  if (!intent) throw new Error(`Form absent from selection grammar: ${form}`);
  return `/choosing?intent=${intent.id}&form=${encodeURIComponent(form)}#${anchor}`;
}

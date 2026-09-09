import type { CitationRecord } from "@chrishayuk/hause/cite";
import catalogue from "./choosing1-a.json";
import grammar from "./choosing1-b.json";
import resolver from "./choosing1-c.json";

export const EVIDENCE_SOURCE = "https://github.com/chrishayuk/hause-site/blob/3ee533910e7e608179105773b36cf2c77a8be868/evals/choosing-1";
export const SELECTION_CONDITIONS = [
  { id: "a", label: "A / CATALOGUE", result: catalogue, scope: "One model, given form names and one-line descriptions. Fresh context per batch; unfamiliar cases written by the same author as the grammar." },
  { id: "b", label: "B / FULL GRAMMAR", result: grammar, scope: "The same model and cases, with the full choosing grammar. The equal score does not establish added value from the grammar." },
  { id: "c", label: "C / KEYWORD RESOLVER", result: resolver, scope: "The frozen deterministic resolver, no model call. This is the 31 August test, not a measurement of today's Ask implementation." },
] as const;
export const EVIDENCE_RECORD: CitationRecord = {
  title: "Evidence: evaluations, methods and limits", authors: ["Chris Hay"], published: "2026-09-06", revised: "2026-09-09", version: "1.0", kind: "page", publisher: "hause.design", url: "https://hause.design/evidence",
  abstract: "An exhibition of HAUSE's recorded evaluations: all 124 CHOOSING-1 outcomes in three conditions, the catalogue condition's two misses, the preregistration and routes to five complete evaluation records. These author-led tests do not establish independent production adoption.",
};

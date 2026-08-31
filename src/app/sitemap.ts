import type { MetadataRoute } from "next";
import { FORMS } from "@/data/forms";
import { PROBLEMS_IN_ORDER } from "@/data/problems";

const BASE = "https://hause.design";

/**
 * The rooms, and every form the library holds — one URL each, derived
 * from the manifest. A form entering the library enters the sitemap in
 * the same commit, because neither list is written by hand.
 */
export default function sitemap(): MetadataRoute.Sitemap {
	const pages = ["", "/problems", "/how-hause-grew", "/choosing", "/evals/choosing-1", "/evals/routing-1", "/evals/routing-2", "/evals/reading-1", "/evals/reading-2", "/forms", "/statements", "/instruments", "/performances", "/ask", "/use"].map((p) => ({
		url: `${BASE}${p}`,
		changeFrequency: "weekly" as const,
		priority: p === "" ? 1 : 0.8,
	}));
	const forms = FORMS.map((f) => ({
		url: `${BASE}/forms/${f.slug}`,
		changeFrequency: "monthly" as const,
		priority: 0.7,
	}));
	const problems = PROBLEMS_IN_ORDER.map((p) => ({
		url: `${BASE}/problems/${p.slug}`,
		changeFrequency: "monthly" as const,
		priority: 0.9,
	}));
	return [...pages, ...problems, ...forms];
}

import type { MetadataRoute } from "next";

const BASE = "https://hause.design";

export default function sitemap(): MetadataRoute.Sitemap {
	return ["", "/forms", "/statements", "/instruments", "/performances", "/ask", "/use"].map((p) => ({
		url: `${BASE}${p}`,
		changeFrequency: "weekly" as const,
		priority: p === "" ? 1 : 0.8,
	}));
}

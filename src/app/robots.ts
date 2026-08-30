import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{ userAgent: "OAI-SearchBot", allow: "/" },
			{ userAgent: "*", allow: "/", disallow: "/api/" },
		],
		sitemap: "https://hause.design/sitemap.xml",
	};
}

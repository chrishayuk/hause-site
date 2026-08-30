import type { Metadata } from "next";
import { Fraunces, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { SiteFooter } from "@chrishayuk/hause/components/SiteFooter";
import { JsonLd } from "@chrishayuk/hause/components/JsonLd";
import { webSiteLd } from "@chrishayuk/hause/seo";

const fraunces = Fraunces({
	variable: "--font-fraunces",
	subsets: ["latin"],
	weight: ["400", "500", "600"],
});

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	metadataBase: new URL("https://hause.design"),
	title: {
		default: "HAUSE — A Design System for AI",
		template: "%s — HAUSE",
	},
	description:
		"HAUSE is a design system for AI: typed visual forms an AI can compose answers from — statements, evidence, terminals, figures — a cinematic language for ideas, systems and explanations.",
	alternates: { canonical: "/" },
	icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${fraunces.variable} ${inter.variable} ${geistMono.variable}`} suppressHydrationWarning>
			<head>
				<JsonLd
					data={webSiteLd({
						name: "HAUSE",
						url: "https://hause.design",
						description:
							"HAUSE is a design system for AI: typed visual forms an AI can compose answers from — a cinematic language for ideas, systems and explanations.",
					})}
				/>
				{/* hause-mode must apply before paint — see HAUSE's DESIGN notes. */}
				<script
					// eslint-disable-next-line react/no-danger
					dangerouslySetInnerHTML={{
						__html: `try{var m=localStorage.getItem('hause-mode');if(m==='light')document.documentElement.dataset.mode='light';}catch(e){}`,
					}}
				/>
			</head>
			<body className="antialiased">
				<Nav />
				{children}
				<SiteFooter
					brand="HAUSE"
					tagline="A design system for AI — typed visual forms an AI can compose answers from."
					note="Nothing enters the library without a real page that needed it first."
					groups={[
						{
							label: "THE BOOK",
							links: [
								{ href: "/statements", label: "Statements" },
								{ href: "/instruments", label: "Instruments" },
								{ href: "/performances", label: "Performances" },
							],
						},
						{
							label: "THE INDEX",
							links: [
								{ href: "/forms", label: "The Holdings" },
								{ href: "/ask", label: "Ask HAUSE" },
							],
						},
						{
							label: "THE ON-RAMP",
							links: [
								{ href: "/use", label: "Use HAUSE" },
								{ href: "https://github.com/chrishayuk/hause", label: "The library source", external: true },
							],
						},
					]}
				/>
				<footer className="hause-grid py-16 mt-20 border-t" style={{ borderColor: "var(--color-mist)" }}>
					<div className="col-span-12 flex flex-wrap items-baseline justify-between gap-4">
						<p className="voice-evidence text-xs opacity-50">HAUSE · THE SPECIMEN BOOK / 2026</p>
						<p className="voice-evidence text-xs opacity-50 flex gap-6">
							<a href="https://github.com/chrishayuk/hause" className="hover:opacity-100">
								GITHUB →
							</a>
							<a href="https://vindex3.org" className="hover:opacity-100">
								VINDEX3.ORG →
							</a>
							<a href="https://chrishayuk.com" className="hover:opacity-100">
								CHRISHAYUK →
							</a>
						</p>
					</div>
				</footer>
			</body>
		</html>
	);
}

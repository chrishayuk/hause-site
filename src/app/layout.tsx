import type { Metadata } from "next";
import { Fraunces, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";

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
	title: {
		default: "HAUSE",
		template: "%s — HAUSE",
	},
	description: "A cinematic visual language for ideas, systems and explanations — the specimen book.",
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
				{/* hause-mode must apply before paint — see HAUSE's DESIGN notes. */}
				<script
					// eslint-disable-next-line react/no-danger
					dangerouslySetInnerHTML={{
						__html: `try{var m=localStorage.getItem('hause-mode');if(m==='dark')document.documentElement.dataset.mode='dark';}catch(e){}`,
					}}
				/>
			</head>
			<body className="antialiased">
				<Nav />
				{children}
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

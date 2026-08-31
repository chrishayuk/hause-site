import type { Metadata } from "next";
import { Hero } from "@chrishayuk/hause/components/forms/Hero";
import { AskHause } from "@/components/AskHause";

export const metadata: Metadata = {
	title: "Ask a Design System: Answers Composed From HAUSE Forms",
	alternates: { canonical: "/ask" },
	description: "Ask the system about itself — and it answers in its own forms. Which form does your idea need?",
};

/**
 * The interrogable design system: /ask is a chapter, not a chat
 * bubble. The page recomposes into a small composition of real HAUSE
 * forms answering the question — the system as both subject and
 * medium.
 */
export default function AskPage() {
	return (
		<main>
			<Hero
				kicker="ASK HAUSE · DETERMINISTIC · NO MODEL CALL"
				title="WHAT ARE YOU TRYING TO SAY?"
				dek="Ask the system about itself, describe a failure you are hitting, or bring an idea and be told which form it needs. HAUSE answers in its own forms — a refusal arrives as a Refusal — resolving against the manifest and the problem records this site publishes, so a new chapter teaches Ask the question it answers on the day it ships."
			/>
			<AskHause />
		</main>
	);
}

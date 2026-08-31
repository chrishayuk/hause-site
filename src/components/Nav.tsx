import { NavShell, type NavLink } from "@chrishayuk/hause/components/NavShell";
import { ModeToggle } from "@chrishayuk/hause/components/ModeToggle";
import { SoundToggle } from "@chrishayuk/hause/components/SoundToggle";

const LINKS: NavLink[] = [
	// The problems come first in the row and in the panel: a form is
	// easier to believe once you have met the failure behind it.
	{ href: "/problems", label: "Problems", group: "WHY ANY OF THIS EXISTS" },
	{ href: "/statements", label: "Statements", group: "THE BOOK" },
	{ href: "/instruments", label: "Instruments", group: "THE BOOK" },
	{ href: "/performances", label: "Performances", group: "THE BOOK" },
	{ href: "/choosing", label: "Choosing", group: "THE INDEX" },
	{ href: "/evals/choosing-1", label: "CHOOSING-1", panelOnly: true, group: "THE INDEX" },
	{ href: "/evals/routing-1", label: "ROUTING-1", panelOnly: true, group: "THE INDEX" },
	{ href: "/evals/routing-2", label: "ROUTING-2", panelOnly: true, group: "THE INDEX" },
	{ href: "/evals/reading-1", label: "READING-1", panelOnly: true, group: "THE INDEX" },
	{ href: "/evals/reading-2", label: "READING-2", panelOnly: true, group: "THE INDEX" },
	{ href: "/forms", label: "Holdings", group: "THE INDEX" },
	{ href: "/how-hause-grew", label: "How HAUSE grew", panelOnly: true, group: "THE INDEX" },
	{ href: "/ask", label: "Ask", accent: true, group: "ASK THE SYSTEM" },
	{ href: "/use", label: "Use HAUSE", boxed: true, group: "THE ON-RAMP" },
];

export function Nav() {
	return (
		<NavShell
			brand={{ href: "/", label: "HAUSE" }}
			links={LINKS}
			controls={
				<>
					<SoundToggle />
					<ModeToggle />
				</>
			}
		/>
	);
}

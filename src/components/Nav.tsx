import { NavShell, type NavLink } from "@chrishayuk/hause/components/NavShell";
import { ModeToggle } from "@chrishayuk/hause/components/ModeToggle";
import { SoundToggle } from "@chrishayuk/hause/components/SoundToggle";

const LINKS: NavLink[] = [
	{ href: "/statements", label: "Statements", group: "THE BOOK" },
	{ href: "/instruments", label: "Instruments", group: "THE BOOK" },
	{ href: "/performances", label: "Performances", group: "THE BOOK" },
	{ href: "/forms", label: "Holdings", group: "THE INDEX" },
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

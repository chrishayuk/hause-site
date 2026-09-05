import { NavShell, type NavLink } from "@chrishayuk/hause/components/NavShell";
import { ModeToggle } from "@chrishayuk/hause/components/ModeToggle";
import { SoundToggle } from "@chrishayuk/hause/components/SoundToggle";

import { SITE_NAV } from "@/data/navigation";

export function Nav() {
	return (
		<NavShell
			brand={{ href: "/", label: "HAUSE" }}
			links={SITE_NAV}
			controls={
				<>
					<SoundToggle />
					<ModeToggle />
				</>
			}
		/>
	);
}

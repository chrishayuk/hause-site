import Link from "next/link";
import { ModeToggle } from "@chrishayuk/hause/components/ModeToggle";

export function Nav() {
	return (
		<header className="hause-grid items-center py-6">
			<div className="col-span-6 md:col-span-3">
				<Link href="/" className="voice-system text-sm tracking-[0.12em]">
					HAUSE
				</Link>
			</div>
			<nav className="col-span-6 md:col-span-9 flex justify-end items-center gap-3 sm:gap-8 flex-nowrap">
				<Link href="/statements" className="voice-evidence text-xs tracking-[0.1em] uppercase opacity-70 hover:opacity-100 transition-opacity hidden sm:inline">
					Statements
				</Link>
				<Link href="/instruments" className="voice-evidence text-xs tracking-[0.1em] uppercase opacity-70 hover:opacity-100 transition-opacity hidden sm:inline">
					Instruments
				</Link>
				<Link href="/performances" className="voice-evidence text-xs tracking-[0.1em] uppercase opacity-70 hover:opacity-100 transition-opacity">
					Performances
				</Link>
				<ModeToggle />
			</nav>
		</header>
	);
}

"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** A finite screening. Server-rendered forms and the transcript survive
 * without playback; reduced motion always receives the resting composition. */
export function PerformanceStage({ children }: { children: ReactNode }) {
	const stage = useRef<HTMLDivElement>(null);
	const [playing, setPlaying] = useState(false);
	const [reduced, setReduced] = useState(true);

	useEffect(() => {
		const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
		const sync = () => {
			setReduced(preference.matches);
			if (preference.matches) setPlaying(false);
		};
		sync();
		preference.addEventListener("change", sync);
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				if (!preference.matches) setPlaying(true);
				observer.disconnect();
			}
		}, { threshold: 0.3 });
		if (stage.current) observer.observe(stage.current);
		return () => { observer.disconnect(); preference.removeEventListener("change", sync); };
	}, []);

	useEffect(() => {
		if (!playing) return;
		const timer = window.setTimeout(() => setPlaying(false), 9000);
		return () => window.clearTimeout(timer);
	}, [playing]);

	return (
		<div ref={stage} className="home-performance-stage" data-playing={playing}>
			<div className="home-performance-scenes">{children}</div>
			<div className="home-performance-controls voice-evidence">
				<span>{reduced ? "STILL COMPOSITION" : "STATEMENT → QUESTION → ANSWER"}</span>
				{!reduced && <button type="button" aria-pressed={playing} onClick={() => setPlaying(!playing)}>{playing ? "STOP · SHOW ANSWER" : "REPLAY THE SEQUENCE ↻"}</button>}
			</div>
		</div>
	);
}

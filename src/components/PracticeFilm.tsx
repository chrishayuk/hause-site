"use client";
import { useEffect, useId, useRef } from "react";
import { useMotion } from "@chrishayuk/hause/components/Motion";

/** Existing archive asset, native controls, explicit play; joins the shared media lifecycle. */
export function PracticeFilm({ src, poster, descriptionId }: { src: string; poster: string; descriptionId: string }) {
  const id = useId();
  const video = useRef<HTMLVideoElement>(null);
  const { register, request } = useMotion();
  useEffect(() => {
    const element = video.current;
    if (!element) return;
    return register({ id, element, manualOnly: true, start: () => { void element.play().catch(() => {}); }, stop: () => element.pause() });
  }, [id, register]);
  return <video ref={video} src={src} poster={poster} width={1920} height={1080} controls playsInline preload="none" aria-label="Selection, not conversion — VINDEX3 archive film" aria-describedby={descriptionId} onPlay={() => request(id)} />;
}

import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import type { FormMode } from "@chrishayuk/hause/manifest";
import type { CitationRecord } from "@chrishayuk/hause/cite";
import { citationMeta } from "@chrishayuk/hause/cite";
import { citationLd, breadcrumbLd } from "@chrishayuk/hause/seo";
import { JsonLd } from "@chrishayuk/hause/components/JsonLd";
import { Provenance } from "@chrishayuk/hause/components/forms/Provenance";
import { Citation } from "@chrishayuk/hause/components/forms/Citation";
import { FORMS, formSlug, formBySlug, MODE_ROOM } from "@/data/forms";
import { buildIdentifiers } from "@/data/build";
import { FormStudy } from "@/studies";
import { STUDIES, type StudyName } from "@/studies/catalog";
import { ROOM_PROGRAMMES, ROOM_TITLES, ROOM_DESCRIPTIONS } from "./programmes";

export function roomRecord(mode: FormMode): CitationRecord {
  return { title: ROOM_TITLES[mode], abstract: ROOM_DESCRIPTIONS[mode], authors: ["Chris Hay"], published: "2026-08-29", revised: "2026-09-09", version: "0.1.0", kind: "page", publisher: "hause.design", url: "https://hause.design" + MODE_ROOM[mode].href, identifiers: buildIdentifiers() };
}
export function roomMetadata(mode: FormMode): Metadata {
  return { title: ROOM_TITLES[mode], description: ROOM_DESCRIPTIONS[mode], alternates: { canonical: MODE_ROOM[mode].href }, other: citationMeta(roomRecord(mode)) };
}
export function RoomRecord({ mode }: { mode: FormMode }) {
  const record = roomRecord(mode);
  return <><JsonLd data={citationLd(record)} /><JsonLd data={breadcrumbLd([{ name: "HAUSE", url: "https://hause.design" }, { name: "Forms", url: "https://hause.design/forms" }, { name: mode + "s", url: record.url }])} /></>;
}
export function RoomLabel({ mode }: { mode: FormMode }) {
  return <nav className="room-label voice-evidence" aria-label="Room breadcrumb"><Link href="/forms">THE COLLECTION ↗</Link><span>{mode.toUpperCase()}S / {FORMS.filter(form => form.mode === mode).length} FORMS</span><a href="#programme">THE PROGRAMME ↓</a></nav>;
}
export function RoomProgramme({ mode }: { mode: FormMode }) {
  return <nav id="programme" className="room-programme" aria-label={mode + " room programme"}><p className="voice-evidence">TAKE THE JOURNEY / OR CHOOSE A DOOR</p><div>{ROOM_PROGRAMMES[mode].map((chapter, i) => <a href={"#" + chapter.id} key={chapter.id}><span className="voice-evidence">0{i + 1}</span><strong className="voice-editorial">{chapter.title}</strong><span className="voice-system">{chapter.forms.join(" · ")}</span></a>)}</div><details><summary className="voice-evidence">EVERY FORM ON THIS FLOOR</summary><div className="room-complete-index">{ROOM_PROGRAMMES[mode].flatMap(chapter => chapter.forms).map(name => <a key={name} href={"#" + formSlug(name)} className="voice-system">{name} ↓</a>)}</div></details></nav>;
}
export function RoomChapter({ mode, chapterId, children }: { mode: FormMode; chapterId: string; children: ReactNode }) {
  const chapters = ROOM_PROGRAMMES[mode];
  const chapter = chapters.find(item => item.id === chapterId)!;
  return <section id={chapter.id} className={"room-chapter room-chapter--" + chapter.id}><header><p className="voice-evidence">ROOM {String(chapters.indexOf(chapter) + 1).padStart(2, "0")} / {mode.toUpperCase()}S</p><h2 className="voice-editorial">{chapter.title}</h2><p className="voice-system">{chapter.premise}</p></header>{children}</section>;
}
export function RoomStudy({ name }: { name: StudyName }) {
  const form = formBySlug(formSlug(name))!;
  return <section id={form.slug} className="room-study" aria-label={name + " encounter"}><FormStudy form={form} /><Link className="room-inspect voice-evidence" href={"/forms/" + form.slug}>ENTER {name.toUpperCase()} / SPECIMEN, SELECTION & REACT ↗</Link></section>;
}
export function RoomDoors({ names }: { names: StudyName[] }) {
  return <div className="room-doors">{names.map(name => <Link id={formSlug(name)} href={"/forms/" + formSlug(name)} className="room-door" key={name}><span className="voice-evidence">CONTINUE INTO THE FORM ↗</span><h3 className="voice-editorial" style={{ "--name-characters": name.length } as CSSProperties}>{name}</h3><p className="voice-system">{STUDIES[name].introduction}</p><span className="voice-evidence">{name === "Film" ? "STORYBOARD / FILM ASSET HELD" : "AUTHORED STUDY + SOURCE CONTRACT"}</span></Link>)}</div>;
}
export function RoomPause({ first, second, note }: { first: string; second: string; note: string }) {
  return <aside className="room-pause"><p className="voice-evidence">{note}</p><p className="voice-editorial">{first}<br /><em>{second}</em></p></aside>;
}
export function RoomClose({ mode, next }: { mode: FormMode; next: FormMode }) {
  return <><section className="room-close"><p className="voice-evidence">READ. OPERATE. WATCH.</p><h2 className="voice-editorial">{next === "instrument" ? "Now put your hand on the idea." : next === "performance" ? "Now let the idea move." : "Now give it words."}</h2><div><Link className="voice-evidence" href={MODE_ROOM[next].href}>ENTER {next.toUpperCase()}S ↗</Link><Link className="voice-evidence" href="/choosing">CHOOSE A FORM ↗</Link><Link className="voice-evidence" href="/use">BUILD WITH HAUSE ↗</Link></div></section><Provenance record={roomRecord(mode)} citeHref="#cite" /><Citation record={roomRecord(mode)} /></>;
}

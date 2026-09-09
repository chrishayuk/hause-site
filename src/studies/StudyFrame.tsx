import type { ReactNode } from "react";
import { STUDIES, type StudyName } from "./catalog";

export function StudyFrame({ name, children }: { name: StudyName; children: ReactNode }) {
  const study = STUDIES[name];
  return <article className={`act-study act-study--${name.toLowerCase()}`} data-study={name}>
    <header className="act-study-intro"><p className="voice-evidence">A STUDY IN {name.toUpperCase()}</p><h2 className="voice-editorial">{study.title}</h2><p className="voice-system">{study.introduction}</p></header>
    <div className="act-study-stage">{children}</div>
    <p className="act-study-reading voice-evidence">{study.reading}</p>
  </article>;
}

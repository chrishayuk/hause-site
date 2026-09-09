"use client";

export function StudyChoices({ labels, selected, onSelect, label = "Study setting" }: { labels: string[]; selected: number; onSelect: (index: number) => void; label?: string }) {
  return <div className="study-choices" role="group" aria-label={label}>{labels.map((item, i) => <button className="voice-evidence" type="button" aria-pressed={selected === i} onClick={() => onSelect(i)} key={item}><span>0{i + 1}</span>{item}</button>)}</div>;
}

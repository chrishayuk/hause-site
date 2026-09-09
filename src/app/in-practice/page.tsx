import Link from "next/link";
import { Hero } from "@chrishayuk/hause/components/forms/Hero";
import { MotionProvider } from "@chrishayuk/hause/components/Motion";
import { YouTubeFilm } from "@chrishayuk/hause/components/YouTubeFilm";
import { publicationMetadata } from "@chrishayuk/hause/seo";
import { PRACTICES } from "@/data/practice";
import { relatedKnowledge } from "@/data/knowledge";
import { PracticeFilm } from "@/components/PracticeFilm";
import { VisualPlate } from "@/vendor/hause/components/exhibition/VisualPlate";
import film from "@/data/publication-film.json";

export const metadata = publicationMetadata({ title: "HAUSE in practice", description: "Two real publications, two different demands: watch the VINDEX3 archive and Chris Hay’s film, then follow their recorded contributions into HAUSE.", url: "https://hause.design/in-practice", siteName: "HAUSE", indexable: true, image: film.poster });

export default function Practice() {
  return <main className="system-story journey-page practice-exhibition">
    <Hero kicker="REAL WORK / RECORDED CONTRIBUTIONS" title="THE PAGE CAME FIRST." dek="A mechanism needed to be seen. A film needed room to breathe. The library grew from the work, not the other way around." />
    <nav className="practice-index journey-room" aria-label="The two publications"><a href="#vindex3"><span className="voice-evidence">01 / INSPECT</span><strong className="voice-editorial">VINDEX3</strong></a><a href="#chrishayuk"><span className="voice-evidence">02 / WATCH</span><strong className="voice-editorial">CHRISHAYUK</strong></a></nav>
    <MotionProvider>
      {PRACTICES.map((practice, index) => <section id={practice.id} key={practice.id} className="practice-chapter">
        <header className="journey-room practice-opening"><span className="practice-number voice-editorial" aria-hidden="true">0{index + 1}</span><div><p className="voice-evidence">{practice.name} / {practice.type}</p><h2 className="voice-editorial">{practice.title}</h2><p className="voice-system">{practice.id === "vindex3" ? "A model can have several physical representations. How do you show that choosing one changes its form, not its identity — and make an absent choice visibly refuse?" : "The film should fill the frame. Its chapters, words and sources still need addresses. How do you let the reader watch without losing the record?"}</p></div></header>
        {practice.id === "vindex3" ? <VisualPlate
          media={<PracticeFilm src="/media/practice/selection-not-conversion.mp4" poster="/media/practice/selection-not-conversion-poster.jpg" descriptionId="vindex3-film-description" />}
          label="VINDEX3 / EXISTING EXHIBITION FILM / 11.64 SECONDS / SILENT"
          title="Same identity. Different form."
          reading="A baseline and a present variant belong to one identity. Asking for the absent representation produces a refusal, not a guessed substitute. Play the existing film, then inspect the working chapter."
          credit="Chris Hay / VINDEX3 · Selection, not conversion. Original repository media, copied unchanged; not a newly made screenshot or generated mockup."
        /> : <VisualPlate media={<YouTubeFilm youtubeId={film.youtubeId} title={film.title} poster={film.poster} />} label={`CHRIS HAY / ORIGINAL YOUTUBE FILM / ${film.published}`} title="Let the film have the room." reading="Press play to load the original YouTube screening. The shared HAUSE player is demonstrated here; the publication specimen adds chapter seeking, an attributed transcript excerpt and the citation record." credit="Chris Hay · LLMs Are Databases — So Query Them. Original film and YouTube poster. This screening demonstrates contributed behaviour; it is not a recording of chrishayuk.com." />}
        <div className="journey-room practice-after">
          {practice.id === "vindex3" && <details id="vindex3-film-description"><summary className="voice-evidence">TEXT ALTERNATIVE / WHAT THE SILENT FILM SHOWS</summary><p className="voice-system">The interface keeps one region-set identity while offering exact-q6k as the baseline and native-mxfp4 as an available alternative. Native-nvfp4 is marked absent. The sequence changes the chosen representation, returns to the baseline, then requests the absent representation. The missing choice is refused rather than silently replaced.</p></details>}
          <p className="practice-takeaway voice-editorial">{practice.id === "vindex3" ? "The page needed a distinction. The library gained a form." : "The film keeps its world. The behaviour travels."}</p>
          <details className="practice-contribution-record"><summary className="voice-evidence">WHAT BECAME REUSABLE / TRACE THE CONTRIBUTIONS</summary><p className="voice-system">{practice.contribution}</p><div className="practice-contributions">{relatedKnowledge(`practice:${practice.id}`).filter(({ edge }) => edge.kind === "originated-in" || edge.kind === "contributed").map(({ node, edge }) => <Link href={node.url} key={`${edge.from}:${edge.kind}:${edge.to}`}>{node.title} ↗</Link>)}</div></details>
          <div className="journey-links"><a href={practice.id === "vindex3" ? "https://vindex3.org/representation" : practice.url}>ENTER {practice.name} ↗</a>{practice.id === "chrishayuk" && <a href={film.url}>ORIGINAL FILM ON YOUTUBE ↗</a>}<Link href={practice.recordUrl}>THE SOURCE RECORD ↗</Link><Link href={`/knowledge?node=practice%3A${practice.id}#connections`}>FOLLOW THE CONNECTIONS ↗</Link></div>
        </div>
      </section>)}
    </MotionProvider>
    <section className="journey-room practice-boundary"><p className="voice-evidence">TWO PUBLICATIONS / ONE AUTHOR</p><h2 className="voice-editorial">Real use.<br />Not independent adoption.</h2><p className="voice-system">Both publications are Chris Hay’s work. They show where the forms and capabilities were needed; they do not establish that unrelated teams find HAUSE valuable. That remains an open test.</p><Link href="/use" className="story-link">KEEP YOUR OWN WORLD. BUILD WITH HAUSE. ↗</Link></section>
  </main>;
}

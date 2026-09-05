import {Hero} from "@chrishayuk/hause/components/forms/Hero";
import {Answer} from "@chrishayuk/hause/components/forms/Answer";
import {Observation} from "@chrishayuk/hause/components/forms/Observation";
import {Statement} from "@chrishayuk/hause/components/forms/Statement";
import {Snippet} from "@chrishayuk/hause/components/forms/Snippet";
import {Connection} from "@chrishayuk/hause/components/forms/Connection";
import {Provenance} from "@chrishayuk/hause/components/forms/Provenance";
import {Citation} from "@chrishayuk/hause/components/forms/Citation";
import {CitationExport} from "@chrishayuk/hause/components/CitationExport";
import {JsonLd} from "@chrishayuk/hause/components/JsonLd";
import {citationFormats,type CitationRecord} from "@chrishayuk/hause/cite";
import {publicationMetadata,citationLd,videoObjectLd,breadcrumbLd} from "@chrishayuk/hause/seo";
import {PublicationScreening} from "@/components/PublicationScreening";
import {PUBLICATION_RECORD as record,PUBLICATION_CAPABILITIES} from "@/data/publication";
import film from "@/data/publication-film.json";
const filmCitation:CitationRecord={id:`YT-${film.youtubeId}`,title:film.title,authors:["Chris Hay"],published:film.published!,url:film.url,publisher:"YouTube",kind:"film",abstract:"Chris Hay introduces LARQL and discusses querying learned models as databases."};
export const metadata=publicationMetadata({title:record.title,description:record.abstract!,url:record.url,siteName:"HAUSE",indexable:true,citation:record,image:film.poster});
export default function PublicationPage(){return <main className="publication-room">
 <JsonLd data={[citationLd(record),breadcrumbLd([{name:"HAUSE",url:"https://hause.design"},{name:record.title,url:record.url}]),videoObjectLd({citation:filmCitation,pageUrl:record.url,thumbnailUrl:film.poster,embedUrl:`https://www.youtube-nocookie.com/embed/${film.youtubeId}`,durationSeconds:film.duration})]}/>
 <Hero kicker="FROM A REAL PUBLICATION / 05 SEPTEMBER 2026" title="THE FILM. THE RECORD." dek="A film can open the story. Its source stays with it."/>
 <Answer id="film-and-publication" question="How does HAUSE support film-led publications?" answer={record.abstract!}/>
 <Observation label="THE PAGE THAT NEEDED IT" text="CHRISHAYUK brought a different pressure to HAUSE: a film-and-photography publication whose records also contain technical work. Its player, shared motion, source navigation and citation controls now travel with the library. Its cinematic grading, photographic rhythm and homepage direction remain its own."/>
 <section className="hause-grid py-12" id="screening"><div className="col-span-12 md:col-start-2 md:col-span-10"><PublicationScreening/></div></section>
 <section className="hause-grid py-12" id="film-citation"><div className="col-span-12 md:col-start-2 md:col-span-10"><CitationExport id={filmCitation.id!} formats={citationFormats(filmCitation)} heading="CITE THE ORIGINAL FILM" context="This citation identifies Chris Hay’s YouTube film. The publication page has its own citation below."/></div></section>
 <Statement text="The source is part of the experience."/>
 {PUBLICATION_CAPABILITIES.map(c=><Observation key={c.name} label={c.name.toUpperCase()} text={c.text}/>)}
 <Snippet label="A POSTER-FIRST SCREENING / INSIDE A CLIENT COMPONENT" code={`import { MotionProvider } from "@chrishayuk/hause/components/Motion";
import { YouTubeFilm } from "@chrishayuk/hause/components/YouTubeFilm";

<MotionProvider>
  <YouTubeFilm youtubeId={film.youtubeId}
    title={film.title} poster={film.poster} />
</MotionProvider>`} aside="Wrap participating media once. FilmChapters and TimedTranscript send time offsets to the player's start and playRequest props. Local ambient films register with useMotion. No iframe is loaded before explicit play."/>
 <Snippet label="SEO / AEO / CITATIONS — ONE RECORD" code={`import { publicationMetadata, videoObjectLd } from "@chrishayuk/hause/seo";
import { citationFormats } from "@chrishayuk/hause/cite";

export const metadata = publicationMetadata({
  title: record.title, description: record.abstract,
  url: record.url, siteName: "Your publication",
  indexable: true, citation: record,
});

// Original production and the local screening are different records.
const filmData = videoObjectLd({
  citation: filmCitation, pageUrl: record.url,
  thumbnailUrl: film.poster, embedUrl: film.embedUrl,
});
const exports = citationFormats(filmCitation);`} aside="Render the same factual summary as ordinary text. Indexing is a deliberate site policy; the helpers default to noindex. Omit unknown dates. A participant credit does not make someone the film's producer."/>
 <Observation label="CONTROLS SUPPORT THE ACT" text="These additions extend film and publication behaviour. They do not add six new communicative acts to the form count. The original Film, Citation and Provenance forms remain available; the shared playback coordinator is opt-in."/>
 <Observation label="WHAT THIS DOES NOT ESTABLISH" text="A metadata builder cannot guarantee Google indexing, a video rich result or inclusion in an AI answer. Public pages must be crawlable, sources reachable and summaries meaningful without watching the film. Caption coverage and review status remain explicit. Full YouTube playback resets when suspended."/>
 <Provenance record={record} citeHref="#cite-publication"/>
 <Citation record={record} id="cite-publication"/>
 <Connection text="Take the behaviour. Author the publication." links={[{href:"/use",label:"INSTALL & COMPOSE"},{href:"/performances",label:"THE PERFORMANCES"},{href:"/ask?q=What%20is%20YouTubeFilm%3F",label:"ASK THE SYSTEM"},{href:"https://github.com/chrishayuk/hause/blob/main/PUBLICATION.md",label:"THE SOURCE CONTRACTS"}]}/>
 </main>;}

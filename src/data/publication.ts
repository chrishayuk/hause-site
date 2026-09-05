import type { CitationRecord } from "@chrishayuk/hause/cite";
export const PUBLICATION_RECORD: CitationRecord = {
 title: "Film and publication in HAUSE", authors: ["Chris Hay"], published: "2026-09-05", version: "1.0",
 url: "https://hause.design/publication", publisher: "hause.design", kind: "article",
 abstract: "HAUSE connects poster-first films, shared playback, chapters and timed transcripts to source citations and machine-readable records. These capabilities grew from the CHRISHAYUK publication; editorial art direction remains with each site.",
 about: ["film", "citations", "provenance", "SEO", "AEO", "accessibility"],
};
export const PUBLICATION_CAPABILITIES = [
 { name: "MotionProvider", aliases: ["motionprovider", "usemotion", "choosemotion", "competing videos", "shared playback"], text: "One dominant visible media source owns playback. Local films and system studies can join through useMotion. Reduced motion, data saving, global pause, page visibility and dialog suspension are respected. Full films require explicit activation." },
 { name: "YouTubeFilm", aliases: ["youtubefilm", "youtube player", "poster-first", "cinematic video", "video components"], text: "An external film begins with its poster and loads the privacy-enhanced YouTube player only after a reader presses play. A publication can supply its own preview composition. Full playback resets on suspension and requires another play action on return." },
 { name: "FilmChapters and TimedTranscript", aliases: ["filmchapters", "timedtranscript", "timed transcript", "film chapters", "chapter navigation"], text: "Chapters and transcript passages carry source timestamps. The site supplies seeking, original-source URLs and caption provenance. Transcript text is server-rendered inside a native disclosure; automatic captions must be identified as unreviewed." },
 { name: "CitationExport", aliases: ["citationexport", "film citations", "video citations", "corporate author", "unknown publication date"], text: "The same HAUSE citation record produces Plain, APA, BibTeX, CSL-JSON and head metadata. Film and image kinds, literal corporate authors and unknown publication dates are supported. A retrieval date never substitutes for first publication. CitationExport adds downloads, copy feedback and a no-JS disclosure." },
 { name: "Publication metadata", aliases: ["publicationmetadata", "videoobjectld", "film seo", "video seo", "film aeo", "publication metadata"], text: "HAUSE derives canonical, social, citation and VideoObject metadata from the record supplied by the site. The local screening page, original source, producer and participants are distinct. Meaningful summaries must also be rendered as text. Metadata is not a guarantee of search indexing or AI-engine inclusion." },
 { name: "Authored environments", aliases: ["modescript", "dark and light", "light and dark", "authored environments"], text: "ModeToggle and modeScript share an authored light or dark default. Stored choice is applied before paint. Reading surfaces can change while cinematic scenes retain their own palette; storage failure preserves the default." },
];
export function publicationCapability(question: string) {
 const q=question.toLowerCase();
 return PUBLICATION_CAPABILITIES.find(c=>c.aliases.some(a=>q.includes(a)));
}

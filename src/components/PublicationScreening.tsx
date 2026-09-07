"use client";
import {useRef,useState} from "react";
import {useMotion} from "@chrishayuk/hause/components/Motion";
import {YouTubeFilm} from "@chrishayuk/hause/components/YouTubeFilm";
import {FilmChapters} from "@chrishayuk/hause/components/FilmChapters";
import {TimedTranscript} from "@chrishayuk/hause/components/TimedTranscript";
import film from "@/data/publication-film.json";
export function PublicationScreening() {
 const [start,setStart]=useState(0);const [playRequest,setPlayRequest]=useState(0);const screen=useRef<HTMLDivElement>(null);const{setPaused}=useMotion();
 function seek(time:number){setStart(time);setPlayRequest(n=>n+1);screen.current?.scrollIntoView({behavior:"instant",block:"center"});}
 return <div className="publication-demo">
  <div className="publication-demo-label voice-evidence"><span>FILM / CHRIS HAY · {film.published}</span><button onClick={()=>setPaused(true)}>STOP PLAYBACK</button></div>
  <div ref={screen}><YouTubeFilm youtubeId={film.youtubeId} title={film.title} poster={film.poster} start={start} playRequest={playRequest}/></div>
  <h2 className="voice-editorial">{film.title}</h2>
  <p className="voice-system">A real film from Chris Hay’s channel. Press play to enter the original YouTube screening; choose a chapter or timestamp to jump into the conversation.</p>
  <FilmChapters chapters={film.chapters} onSeek={seek}/>
  <TimedTranscript passages={film.passages} onSeek={seek} sourceAt={time=>`${film.url}&t=${Math.floor(time)}`} provenance="Three opening passages from automatic English captions. Unreviewed: names and technical terms may contain errors. This is an excerpt, not a complete transcript."/>
  <a className="voice-evidence" href={film.url}>WATCH THE ORIGINAL ON YOUTUBE ↗</a>
 </div>;
}

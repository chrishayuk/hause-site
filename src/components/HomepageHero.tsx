import Link from "next/link";

export function HomepageHero() {
  return <header className="hause-home-intro">
    <p>A design system for AI interfaces</p>
    <h1>Give meaning a form.</h1>
    <div><p>Claims, evidence, comparisons and refusals.<br/>Forms for what an interface needs to say.</p><Link href="/use">Build with HAUSE</Link></div>
  </header>;
}

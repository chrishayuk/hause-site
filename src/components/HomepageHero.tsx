import Link from "next/link";

export function HomepageHero() {
  return <header className="hause-home-intro">
    <div><div><h1>A design system for AI interfaces</h1><p>Forms for claims, evidence, comparisons and refusals.</p></div><Link href="/use">Use the library</Link></div>
  </header>;
}

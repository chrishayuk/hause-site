import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { EXHIBITION_STUDIES } from "../src/data/exhibition";
import { KNOWLEDGE_EDGES } from "../src/data/knowledge";
import film from "../src/data/publication-film.json";

for (const plate of Object.values(EXHIBITION_STUDIES)) {
  const png = readFileSync(`public${plate.src}`);
  assert.equal(png.subarray(1, 4).toString(), "PNG");
  assert.equal(png.readUInt32BE(16), 1536);
  assert.equal(png.readUInt32BE(20), 1024);
  assert(plate.alt.startsWith("AI-generated exhibition study:"));
}
for (const capability of ["film", "transcript"]) {
  assert(KNOWLEDGE_EDGES.some(edge => edge.from === "page:/performances" && edge.to === `capability:${capability}` && edge.kind === "uses"));
}
if (process.argv.includes("--built")) {
  for (const [route, studies] of Object.entries({ index: ["attention", "structure", "passage"], "how-hause-grew": ["attention", "structure", "passage"], statements: ["attention"], instruments: ["structure"], performances: ["passage"], problems: ["concealment"], forms: ["collection"] })) {
    const source = readFileSync(`.next/server/app/${route}.html`, "utf8");
    const html = source.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
    for (const study of studies) {
      assert(html.includes(`data-visual-study="${study}"`), `${route}: ${study} visible`);
      assert(html.includes(`${study}.png`), `${route}: source image rendered`);
    }
    assert.equal((html.match(/AI-GENERATED, NOT A REAL INSTALLATION/g) ?? []).length, studies.length);
    const images = [...html.matchAll(/<img\b[^>]*alt="AI-generated exhibition study:[^>]*>/g)].map(match => match[0]);
    assert.equal(images.length, studies.length);
    assert(images.every(img => img.includes('width="1536"') && img.includes('height="1024"') && img.includes('loading="lazy"') && img.includes("srcSet=")), `${route}: responsive, dimensioned, lazy images`);
    if (route === "performances") {
      assert(html.includes(film.title) && html.includes('id="transcript"'));
      assert(html.includes("STOP PLAYBACK") && html.includes("WATCH FILM"));
      assert(!html.includes("<iframe"), "YouTube loads only after explicit playback");
      assert(source.includes('"@type":"VideoObject"'), "Machine-readable film record present");
      assert(html.includes("STORYBOARD / FILM ASSET HELD"), "Real film does not replace the held specimen");
    }
  }
}
console.log(`${Object.keys(EXHIBITION_STUDIES).length} original visual assets and screening relationships pass` + (process.argv.includes("--built") ? " · 7 rendered routes, responsive images, provenance labels and poster-first film pass" : ""));

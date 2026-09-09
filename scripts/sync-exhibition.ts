import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { createHash } from "node:crypto";
import assert from "node:assert/strict";

// Compatibility snapshot: the pinned 35-form package predates these donations.
// Remove this snapshot when upgrading the package to a release containing them.
const files = ["components/exhibition/VisualPlate.tsx", "components/exhibition/ExhibitionChoices.tsx", "components/exhibition/OutcomeMatrix.tsx", "components/exhibition/DecisionTrail.tsx", "components/exhibition/GraphNeighbourhood.tsx", "components/exhibition/SequencePlayer.tsx", "exhibition-graph.ts", "exhibition-outcomes.ts", "record-difference.ts", "exhibition-media.css"];
const target = "src/vendor/hause";
const hash = (path: string) => createHash("sha256").update(readFileSync(path)).digest("hex");
if (process.argv.includes("--write")) {
  for (const file of files) { mkdirSync(dirname(`${target}/${file}`), { recursive: true }); copyFileSync(`../hause/${file}`, `${target}/${file}`); }
  writeFileSync(`${target}/snapshot.json`, JSON.stringify({ source: "https://github.com/chrishayuk/hause", note: "Unreleased exhibition donation, 2026-09-09. Exact source snapshot, not a fork. The site remains on its frozen 35-form package.", files: Object.fromEntries(files.map(file => [file, hash(`${target}/${file}`)])) }, null, 2) + "\n");
}
const record = JSON.parse(readFileSync(`${target}/snapshot.json`, "utf8")) as { files: Record<string, string> };
assert.deepEqual(Object.keys(record.files).sort(), [...files].sort());
for (const file of files) {
  assert.equal(hash(`${target}/${file}`), record.files[file], `${file}: snapshot integrity`);
  if (existsSync(`../hause/${file}`)) assert.equal(hash(`../hause/${file}`), record.files[file], `${file}: library and consumer must not drift; run npm run sync:exhibition`);
}
console.log(`${files.length} donated exhibition sources verified`);

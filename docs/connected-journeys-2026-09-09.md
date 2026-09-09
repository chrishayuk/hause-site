# Three journeys, 9 September 2026

- `/in-practice`: two publishing needs, original moving material, then recorded contributions. VINDEX3’s silent archive film is native, explicit-play and text-described. Chris Hay’s existing YouTube film uses the contributed poster-first player. Both share MotionProvider. No independent-adoption claim; neither is presented as a new recording of the current consumer websites.
- `/choosing`: six intent doors, actual grammar tests, a selected form study and alternative acts. State is in the URL, navigation works without JS, and the full 35-form grammar remains server-rendered in a native disclosure. The Hero preview avoids adding a second h1. Film’s study remains an explicitly held storyboard: the VINDEX3 archive is not smuggled into its specimen.
- `/knowledge`: one record between its incoming and outgoing edges. Direction and basis are explicit; every incident edge remains available. Search includes page records and preserves the current focus. Invalid and repeated query parameters have deterministic fallbacks. The view, Ask and `/api/knowledge` share the same graph source.

## Original media

Copied byte-for-byte from the existing `vindex3-site/public/films` assets. Source repository HEAD inspected: `cc02f5a33c09349b4941fb19f205d999c66ab1f3`. The representation chapter uses this film as *Selection, not conversion*. Its description supplies the sequence: baseline, available variant, return, absent choice refused. The inspected poster shows the original VINDEX3 interface. ffprobe reports 1920×1080, 11.64 seconds, video only; there is no audio track.

- `public/media/practice/selection-not-conversion.mp4`: SHA-256 `e3223d755e1f18aa0a7f47c1a6a599eaa06cedca19590ee3e87237ef59f9fac0`
- `public/media/practice/selection-not-conversion-poster.jpg`: SHA-256 `449202b80109203abc39ce26dcf19385846959957de515c32f1ce9467329c1b7`

The original chapter is https://vindex3.org/representation. Chris Hay’s original YouTube record remains `src/data/publication-film.json`; no replacement metadata or invented caption coverage was introduced.

## Library donation

Canonical `DecisionTrail`, `GraphNeighbourhood` and `exhibition-graph.ts` live in the sibling HAUSE library, with contracts in `EXHIBITION-MEDIA.md` and portable graph tests. This site consumes their exact checked source snapshot. The package pin stays unchanged: 35 forms, not current library HEAD’s 37. Grammar, graph facts, archive assets and curatorial copy stay site-owned. Updated graph edges identify hause.design as the contributor, not CHRISHAYUK.

## Verification

`npm test` checks source coverage, all selection routes, graph invariants and original media hashes. `npm run test:built` checks the static practice page alongside the existing suites. `npx tsx scripts/journey-coverage.ts --url=http://127.0.0.1:3010` checks all 35 selected forms, every graph focus, repeated/invalid parameters, empty search and API parity using actual served HTML.

The in-app browser reported no available browser in this session. These checks are not a substitute for visual, keyboard or playback QA. Before publication, inspect all three routes on desktop/mobile in light/dark mode, keyboard-operate choice links and disclosures, verify focus after navigation, and exercise native video/YouTube ownership, reduced motion and no-JS behaviour.

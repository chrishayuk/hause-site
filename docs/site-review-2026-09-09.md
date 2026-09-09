# HAUSE site review — 9 September 2026

### Latest implementation: operable problem experiments

The three journeys are tightened: compact choices beside the form preview, grouped graph branches retaining every relationship, and less repeated prose around original films. Seven problem chapters gain native experiments or a finite paper performance; the approved tutorial/reference Lens remains. The response now precedes the longer explanation. No-JS Reveal visibility and dark/light status labels are fixed at the problem-page scope. Drift uses a real identity comparison between the pinned manifest and ingested documentation, with a deliberately damaged copy, replacing the misleading three-independent-count framing.

The library receives SequencePlayer and recordDifference as composition capabilities, plus the DecisionTrail and graph grouping refinements. The checked snapshot now has ten files; the site's package pin and 35-form vocabulary are unchanged. Provenance and contribution records are updated: 81 graph nodes and 253 relationships. See `problem-experiments-2026-09-09.md` for individual encounters, test scope and remaining browser QA. No commit or deployment is included.

### Latest follow-up: In practice, Choosing and the connected system

These three former text-first routes now have authored journeys. In practice stages an unchanged VINDEX3 archive film and the original Chris Hay YouTube screening around the need → work → contribution story. Choosing navigates the published grammar into real authored studies, with alternative acts and the complete reference retained. The connected system centres one record among its explicit incoming and outgoing relationships, with basis disclosures and searchable records underneath.

DecisionTrail, GraphNeighbourhood and the graph validation helper are donated to the library and consumed via the exact checked snapshot. The site remains on its pinned 35-form package. The shared graph now has 79 records and 231 relationships, with the two new donations attributed to hause.design. See `connected-journeys-2026-09-09.md` for archive hashes, boundaries and contracts.

Production build, source suites, rendered static-page checks, all 35 served form selections and all 79 served graph neighbourhoods pass. Repeated/invalid query parameters, empty search, API parity, one h1, unique IDs and local anchors are checked. Ten portable library tests and README coverage pass. Selected form content has a scoped visible no-JS Reveal fallback and theme-aware OPEN status. Browser discovery remains unavailable; visual, keyboard and playback sign-off is outstanding. No commit or publication has been made.

Scope: the current local worktree, including the restored cinematic homepage and redesigned problem chapters. Reviewed 61 generated HTML pages, plus served HTML for `/ask` and `/knowledge`, and their shared source components/styles. Browser discovery returned no available browser. Layout observations below are source-based; interactive behaviour and screenshots have not been visually verified.

## Confirmed checks

- All 63 pages have one h1 and no duplicate element IDs.
- Generated pages have no unresolved local fragment links or links to missing site routes. Dynamic routes were checked separately for served HTML, not for model-backed API responses.
- The graph contains 74 records and 91 relationships. Existing Ask coverage passes 43/43 cases.
- The production build passes.

## Fixed during this review: collection typography

The Forms collection sized names relative to the viewport, restricted some to `7ch`, then allowed arbitrary word breaks. This split names such as Transformation and Quantisation instead of giving them a suitable type size.

Names now scale against their containing panels with a character budget. Each name stays intact. Room headings receive the full available width, and navigation headings have their own fitting rule. Specificity is higher than the older per-mode rules so the correction actually takes effect.

Checked the actual Fraunces glyph advances for all 35 names and the three room/navigation titles at 14 viewport widths from 320 to 2560px, with 16, 20 and 32px root sizes: 1,722 geometry checks, no predicted overflow. This is a font-metric check, not a browser screenshot test. The rules leave space for glyph width and do not depend on negative tracking to pass.

## Shared findings

1. **Form pages delay their own specimen.** The common form template presents the hero, optional statement, answer, selection rules and related problems before the Lens. The Lens initially selects Learn. On Claim, roughly 331 words precede its first control, even before reading the selected explanation. Lead with the specimen and put selection/reference beside or after it.
2. **Three forms incorrectly say they are not exhibited.** `/forms/answer`, `/forms/snippet` and `/forms/hero` render the missing-specimen refusal. Answer and Snippet already have examples on `/statements`; Hero is displayed by the page itself. They are absent from the specimen registry. Film is also marked held, but that is the documented distinction between the library's original Film form and the newer publication player.
3. **Dark-mode status labels need their own palette.** OPEN resolves to graphite `#292929` on ink `#0b0b0b`, a calculated contrast ratio of 1.35:1. The local performance override does not fix other Question/Evidence instances. SUPPORTED is approximately 4.00:1 on dark and 4.32:1 on paper; REFUTED is 3.19:1 on dark. Low-opacity labels elsewhere further reduce legibility. Page backgrounds changing correctly is not sufficient.
4. **No-JS visual fallback is incomplete.** The shared `.reveal` starts at opacity zero; only JavaScript visibility updates or reduced-motion CSS expose it. Ordinary no-JS readers therefore miss many visible forms, despite the content remaining in HTML. Lens also keeps noninitial panels `hidden`, making its API/specimen unavailable to a visual no-JS reader.
5. **Some specimen geometry is wider than mobile panels.** Comparison and Transformation use a fixed ±220px spread; Unfolding uses ±200px, before adding the widths of the objects. A narrow viewport cannot contain the full arrangement. Some page wrappers scroll or clip it rather than scale the geometry. Needs responsive geometry and browser verification at mobile widths.
6. **Lens needs keyboard and fragment review.** Its tabs have roles and click handlers, but no arrow-key navigation or roving focus. It reads the hash on effect and changes it with `replaceState`, without listening to subsequent hash changes. Repeated/nested Lens instances share the same storage key and simple fragment values. Direct navigation and nested instruments need explicit testing.

## Route-by-route direction

| Routes | Assessment | Next treatment |
| --- | --- | --- |
| `/` | The restored origin rooms recover the intended pacing. | Preserve the cinematic sequence; improve shared readability without compressing it again. |
| `/problems` | The corridor establishes a distinct argument. | Check the long chapter names and muted side labels in both modes. |
| All eight `/problems/*` | The new opening illustrations and direct demonstrations are the strongest current pattern. | Preserve the specific scenes. Fix mobile geometry and shared status/fallback issues within their specimens. |
| `/forms` | Collection layout has character; name wrapping was a real defect. | Typography fixed in this pass. Next verify focus, responsive composition and the status/registry consistency. |
| All 35 `/forms/*` | Still largely the previous documentation template. | Open on the real form, with concise selection guidance and readily reachable API. Fix the three incorrect missing-specimen states. |
| `/statements` | A long, regular sequence of labels and specimens. | Group related acts into a small argument: assertion → evidence → uncertainty → refusal → answer. Keep the index usable. |
| `/instruments` | Rich interactions, but presented at the same repeated scale. | Group by what a reader can do; give comparisons and structural inspection distinct stages. |
| `/performances` | The first performance follows a hero, index, connection and explanatory observation. | Let a performance open the room; place the programme and motion doctrine after the first experience. |
| `/choosing` | The four-choice demo is useful, but the full grammar remains a long list. | Make intent selection the front door, with nearby comparisons between close alternatives. Retain the full grammar as reference. |
| `/ask` | The large generic hero pushes the input down. | Put the question field into the first screen; make examples and answer provenance part of that working surface. |
| `/knowledge` | The initial response is 54 records and about 3,024 words in a vertical list. | Start with a focused record and its neighbours, plus search and a complete-list option. Preserve the sourced relationship data. |
| `/evidence` | Clear and short, but each evaluation has the same list treatment. | Show the questions and their recorded outcomes together, with limitations visible. Route into the supporting experiments. |
| `/evals/choosing-1` | An effective numerical title, followed by dense evidence and 116 resolver-miss rows. | Give the three conditions a labelled visual comparison; make the complete miss record an inspectable dataset. |
| `/evals/routing-1` | Correct routing versus useful answering is the key distinction. | Show that gap directly before the detailed breakdown. |
| `/evals/routing-2` | The intervention and negative result are strong material. | Stage old list → act records → remaining misses; keep the decision not to remove scaffolding explicit. |
| `/evals/reading-1` | Published predictions and classified claims give it an audit trail. | Lead with what readers understood and what they invented; separate the long claim ledger from the main narrative. |
| `/evals/reading-2` | The before/after Comparison already demonstrates the argument. | Give it more prominence and fix its mobile layout; preserve the dated distinction from READING-1. |
| `/in-practice` | CHRISHAYUK has an image; VINDEX3 remains almost entirely prose. | Exhibit one actual contribution from each site, then link to its recorded origin. |
| `/how-hause-grew` | The archive and genealogy have strong material. | Separate the walk through the origin from the detailed provenance inspection, with clear internal navigation. |
| `/publication` | Strong film, transcript and evidence tools, introduced after explanatory blocks. | Let the screening lead; unfold source, transcript, evidence and citation around it. |
| `/ai-native-design-systems` | An essay/list comparison with limited visual hierarchy. | Map the different problems each approach addresses. Date the comparison and verify external descriptions before revising substantive claims. |
| `/use` | Code-heavy instructions, no h2 section structure or immediate rendered result. | Pair one minimal import/example with its actual rendered form, then separate setup from publication/reference details. |

## Suggested implementation order

1. Correct specimen availability, no-JS visibility, status contrast and mobile specimen geometry.
2. Rebuild the shared individual-form template and the three mode rooms around the actual specimens.
3. Improve the working entry points: Choosing, Ask and Knowledge.
4. Stage Publication, real examples and Evidence; preserve the detailed reference and frozen evaluation records.

The initial review implemented only the Forms typography correction.

### Follow-up: individual form exhibitions

All 35 form clickthroughs now use an encounter-first layout: specimen → selection decision → source account → React contract → origin and onward route. Quantisation opens with a purpose-built interactive study (18 explicitly synthetic values, four precision levels, measured mean absolute error and user-controlled playback), with the actual library component separately inspectable. Hero, Answer and Snippet now have registry specimens; Film remains honestly held.

The form-page styling uses theme tokens, container-fitted names and a scoped visible no-JS fallback for Reveal. OPEN inherits the readable foreground on these pages. Existing stable answer/specimen/API anchors, citations and graph records remain; the form record revision date is 2026-09-09. All 35 local routes passed HTML checks for one h1, unique IDs, valid fragment links, correct specimen availability and encounter-before-answer order. TypeScript and all 43 Ask coverage cases passed (74 records, 91 sourced relationships).

Browser rendering was unavailable, so visual layout, interactive playback and mobile geometry still require browser verification. The remaining shared-library findings above are not claimed fixed by this template pass. Existing uncommitted work was preserved; no deployment was made.

### Follow-up: every form gets an authored study

All 35 routes now have individual study content, not just the shared encounter-first template. Statements use editorial staging; instruments expose specific operations (rearrangement, arithmetic agreement and mismatch, deterministic field routing, proportional byte layout, caps, gates and depth selection); performances have finite sequences with manual stage selection, pause/replay, reduced-motion resting states and text records. Quantisation's approved study remains intact. Film has a clearly labelled storyboard and continues to disclose the absent film asset.

Hero's study uses the real Hero and remains the page's single h1. Other reusable specimens remain separately inspectable. Provenance and Citation use the site's actual publication records; FollowReveal selects a real sourced graph edge. Illustrative values and mechanisms are explicitly distinguished from benchmarks or production evidence.

The graph now includes the collection's 35 form-study relationships: 74 nodes, 126 sourced edges. The ordinary test command includes study coverage and mathematical invariants; `npm test -- --built` also checks all 35 generated routes for authored content, unique IDs, one h1, working fragment targets and truthful specimen availability. All checks pass. A font-metric check of 1,544 headline-word/viewport combinations at 320–1920px found no oversized words using the actual Fraunces font at the default root size.

Browser discovery still reports no available browser. These are build, source, font-metric and rendered-HTML checks, not a visual or interactive browser pass. All work remains local and uncommitted.

### Follow-up: the three mode rooms

The individual-study release above was published as `3ee5339`. This subsequent pass changes only the three mode-room journeys and their shared presentation, records and tests:

- Performances begins with Transformation, then follows reorganisation, passage, scale and the boundary between a storyboard and a real film.
- Instruments begins with a live Comparison, then offers benches for opening, selecting, verifying and tracing. Five full encounters lead into the remaining forms.
- Statements follows a single, explicitly fictional listening-room record through observation, claim, evidence, uncertainty, refusal and answer. The page uses actual prose forms and remains readable without JavaScript.

Every original form anchor remains on its mode page, with a route to the complete individual study. The programmes cover all 35 forms exactly once. Room publication dates are grounded in the first page-creation commit (29 August 2026); revised records, citation metadata and JSON-LD now accompany each room. The graph has 74 nodes and 161 sourced relationships.

`npm test` checks all three programmes, study mechanisms and the 43 Ask cases. `npm run test:built` checks the three generated rooms and all 35 form pages for headings, anchors, study availability and opening order. Production build and both commands pass. Served HTML for all three local preview routes was also checked. Font-metric checks found no predicted opening-headline or door-name overflow in 1,134 combinations of 320–2560px viewports and 16/20/32px root sizes.

Browser discovery remains unavailable. This is not a completed screenshot, keyboard or interactive browser pass. The changes use responsive geometry and theme tokens, but the outstanding shared-library QA findings above are not claimed resolved. This mode-room pass is local and not yet published.

### Follow-up: material, light and a real screening

Three original AI-generated still images now stage attention (copper), structure (glass) and passage (silk). The homepage and origins sequence use one full-width plate followed by a diptych; each mode room carries its corresponding plate. They replace abstract typographic/CSS-only moments with material imagery. Every plate visibly identifies the fictional installation; alt text does too. Original generation metadata is retained in the PNG sources. Final prompts and asset paths are in `exhibition-media-2026-09-09.md`.

Performances now embeds the existing real Chris Hay film, with manual play, stop, chapter seeking and the explicitly unreviewed transcript excerpt. The real screening is separate from the generated still and the held Film specimen. Publication and Performances share one film citation record; the latter also emits its own VideoObject surface. Two new graph edges record the screening and transcript capabilities: 74 nodes, 163 sourced relationships.

Images have intrinsic dimensions, native lazy loading and responsive Next Image derivatives. There is no ambient image animation, autoplaying video or third-party player iframe before explicit activation. Captions follow theme tokens; the imagery retains its own photographic palette.

Production build, 43 Ask cases, all 35 study checks, all three mode-room checks and new five-route media coverage pass. Media checks verify image files/dimensions, visible generation disclosures, responsive lazy markup, source-backed graph edges and poster-first screening HTML. Browser discovery still reports no available browser, so no visual, keyboard or playback QA is claimed. This pass remains local and unpublished.

### Follow-up: distinct section stories and a library donation

Why now pairs a new fictional frosted-glass installation with a native before/after. Both treatments contain the same fictional gallery-opening record; the second uses the actual Claim, Evidence and Refusal components. All eight problem routes remain reachable.

Forms adds its own fictional curatorial workbench and a native Read / Operate / Watch selector. A Statement, reader-operated Comparison and finite Transformation precede the complete 35-form catalogue. Existing fitted names, room anchors and individual form doors are preserved.

Evidence uses no generated imagery. Three outcome matrices render all 124 frozen CHOOSING-1 cases in conditions A, B and C, scored 122, 122 and 8. Each has a complete native table. The two condition-A misses are exposed with their original stimuli, expected and accepted labels, actual selections and deciding tests. A verbatim preregistration excerpt links to the exact existing Git commit. Author/model-family limitations, the historical resolver boundary, and absent independent adoption stay visible. All five full evaluation routes remain available.

Portable VisualPlate, ExhibitionChoices / BeforeAfter and OutcomeMatrix components, CSS, scoring helper, tests and contracts are donated to the sibling `hause` repository. Images, records and art direction stay site-owned. The site is pinned to an older 35-form library release; current library HEAD has 37. A five-file SHA-256-checked compatibility snapshot lets this pass consume the exact donated sources without silently changing that dependency's taxonomy. `npm run sync:exhibition` refreshes it; `npm test` checks integrity and source equality when the sibling library is available. Replace the snapshot with package imports in the next explicit library upgrade.

The graph now contains 77 records and 185 relationships, including the three actual hause.design donations. CHRISHAYUK's contribution query is restricted to its recorded contribution edges so these additions are not misattributed.

The library's eight metadata/evidence/sharing/outcome tests and README coverage check pass. Site production build, 43 Ask cases, 35 study pages, three mode rooms, seven image-bearing routes and the three new section checks pass. The new tests compare all result files with frozen originals, verify every mark and source table, both before/after records, native controls, headings and links. Local routes return successfully; 1080px WebP delivery measured approximately 23 KB (Why) and 67 KB (Forms). Browser discovery remains unavailable: no screenshot, keyboard or playback sign-off is claimed. Nothing is committed or published in this pass.

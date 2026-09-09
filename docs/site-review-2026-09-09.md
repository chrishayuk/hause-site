# HAUSE site review — 9 September 2026

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

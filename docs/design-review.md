# Editorial branch review

Branch: `design/editorial-homepages` · 24 September 2026

## Assessment

The homepage now explains the system through working forms and a quieter Archivo
hierarchy. Its remaining design problem is the transition into older inner pages:
Forms and Why still use large theatrical compositions, decorative rings and
extensive introductory space.

This is a source, content and HTTP review. No browser backend was available, so
rendered desktop/mobile layouts and interactive behaviour have not been signed off.

## Corrections made

- The header no longer assigns half its width to a five-link navigation row at
  640px. A flexible brand/control layout keeps the full row above 1050px and uses
  the existing complete menu below that width.
- Expanded menu links now use Archivo at 16px with normal tracking and 44px targets.
  Group labels are 13px with greater opacity.
- Footer labels have greater opacity, footer links have larger targets, and the
  closing external-link row can wrap.
- Homepage forms no longer start invisible while awaiting the scroll observer.
  Native radio choices reveal readable examples before hydration.

## Remaining design work

| Area | Finding |
| --- | --- |
| Inner page continuity | Forms and Why retain oversized headings, rings, rotated background type and long stage-like sections. Changing the font alone does not reconcile them with the homepage. |
| Comparison example | The library illustration spreads blocks across a fixed 440px distance. Mobile CSS permits scrolling, but left/right endpoints and labels need browser inspection in this narrow embedding. |
| Content rhythm | The homepage closes with an Answer, Provenance, Citation, a large site index and another footer. Review whether the full citation material belongs expanded on the landing page. |
| Entry point | “Give meaning a form” is supported by a concrete descriptor and four examples. Keep the demonstrator prominent when refining spacing. |
| Evidence | Evaluation scores are derived from data and limitations remain explicit. Preserve those qualifications. |

## Verification

- All 29 internal destinations linked from the homepage returned HTTP 200.
- Each contained one `main`, one `h1`, and no duplicate IDs.
- Homepage fragment destinations were present in the fetched target pages.
- Production build, TypeScript and whitespace checks passed after the corrections.

The visual review still needs the homepage, expanded menu, all four examples,
Forms, Why and a form detail at 1440, 1024, 768 and 390px, in both colour modes.
The Browser skill requires a connected browser for this inspection; source checks
do not establish visual quality.

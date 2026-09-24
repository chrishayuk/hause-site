# Editorial branch review and corrections

Branch: `design/editorial-homepages`

## Implemented

- Forms is a compact catalogue derived from the library manifest, preserving all
  35 form destinations, descriptions, recorded origins and availability.
- Why introduces the working before/after comparison, then the eight problem
  chapters. The full relation map remains available in a native disclosure.
- Both entrances omit generated exhibition plates and the older decorative rings,
  rotated background type, enormous headings and full-height introductory scenes.
- The reference-page rule no longer adds a decorative ring or forces a large
  minimum height onto every opening section.
- Catalogue headings use the homepage's Archivo family and scale; small labels
  use readable 13px type with normal tracking.
- The homepage now opens with the recorded CHOOSING-1 evaluation through actual
  library Claim, Evidence and Refusal forms. The fictional headphone example and
  duplicate evaluation section are removed from the page. Native radio inputs
  select the forms without client JavaScript.
- Names/descriptions and full grammar each scored 122/124; the frozen resolver
  scored 8/124. Scores are derived from the bundled outcomes. Interface quality
  and independent production value were not measured; the page says so.
- The opening title is a compact description. Evidence and status retain their
  monospace voice, distinct from reading text and editorial statements.
- Homepage provenance and citation remain server-rendered within a native
  disclosure. The closing links share a compact colophon below one site footer.
- Earlier corrections retained: navigation collapses before its links crowd the
  controls; menu/footer labels and targets are larger; homepage examples are
  visible before hydration.

## Verification

Production build, existing content tests and all built-page checks pass. They
cover 35 form pages, three mode rooms, seven media routes, three section narratives,
three journeys and eight problem chapters. Media assertions now explicitly require
no generated exhibition plates on the redesigned homepage, Forms and Why routes.
Control, provenance and evidence checks remain in place.

Served homepage, Forms and Why HTML each have one h1, unique IDs and valid local
anchors. The earlier review checked all 29 internal homepage destinations.

No browser backend was available. The Browser skill requires a connected browser
for visual inspection; rendered wrapping, keyboard interaction, both colour modes
and optical balance remain unverified.

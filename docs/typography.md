# Typography experiment

Branch: `design/editorial-homepages`.

HAUSE uses Archivo for both display and reading text. Regular text carries the
forms; medium weight distinguishes small section headings and the wordmark.
Geist Mono carries evidence, status, code and measurements. Archivo loads through
`next/font`, including normal and italic styles.

| Role | Family | Size | Treatment |
| --- | --- | --- | --- |
| Homepage title | Archivo | 22–30px | Medium, 1.25 line height, −0.015em tracking |
| Opening form title | Archivo | 28–44px | Regular, 1.2 line height |
| Section labels | Archivo | 17–18px | Medium |
| Form-family titles | Archivo | 25–40px | Regular, −0.015em tracking |
| Body | Archivo | 15–16px | 1.7–1.8 line height |
| Homepage captions / navigation | Archivo | 13px | Near-normal tracking |
| Form evidence / status | Geist Mono | 12–13px | Compact, slight tracking |
| Code | Geist Mono | Context dependent | Tabular numerals, normal tracking |

Role tokens and shared navigation typography live in `src/app/typography.css`.
The original family variables remain compatibility aliases for the installed
library. This changes the website's presentation without editing the package.
Individual specimens keep their contextual scales. Decorative heading italics
are removed; semantic emphasis in prose retains its normal styling.

Font source: [Archivo](https://github.com/google/fonts/tree/main/ofl/archivo).

Production compilation verifies loading and declarations. Rendered line breaks,
mobile wrapping and optical balance still require browser review.

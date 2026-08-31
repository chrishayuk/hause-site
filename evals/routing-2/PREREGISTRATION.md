# ROUTING-2 — preregistration

**Written:** 2026-08-31, before a single fresh case existed.
**Frozen library:** `@chrishayuk/hause` @ 33691b8
**Frozen site:** hause-site @ 6390a67 — selection resolving against the
thirty-five acts, with the old keyword list retained as declared
scaffolding.

## The one intervention being measured

Between ROUTING-1 and ROUTING-2 exactly one thing changed: **selection
moved from a hand-written keyword list onto the choosing acts.** The
system space was deliberately left as it was — still keyword-backed,
still answering 5 of 12 — so that any movement in the useful-answer rate
can be attributed. Making system records at the same time would produce
a better number and a worse experiment.

## What gets reported, that ROUTING-1 could not

Every selection case is resolved twice — once through the act records
alone, once through the scaffold alone — and the pair is classified:

| Outcome | What it says |
|---|---|
| act correct | the replacement architecture carries the request |
| act misses · scaffold rescues | the record still lacks the user's language |
| act wrong · scaffold correct | the semantic surface is actively misleading |
| act correct · scaffold wrong | the scaffold has become harmful |
| both refuse | a genuine recall hole |
| both wrong, same form | a discrimination problem, not a coverage one |

The live system continues to use both. The eval reports where the answer
came from, which is the thing ROUTING-1 could not see.

## The retirement rule, fixed now

**The scaffolding is removable when, on fresh material, act-only
resolution answers at least as many selection cases correctly as
act-plus-scaffold, and the count of "act wrong · scaffold correct" is
zero.**

No percentage threshold is set, deliberately: a threshold chosen after
seeing the cases is a threshold chosen to be met. If the rule is
satisfied, the list goes and ROUTING-3 measures the system without it.
If it is not, the list stays and the failing phrasings are examined one
at a time against a single question — *what concept is present in this
phrasing that the record fails to state?* A real part of the form's
meaning enriches the record. A synonym that happened to occur in one
test does not, because a keyword list that has migrated inside the
records is architectural cleanliness with no semantic improvement.

## The cases

Sixty, twelve topics × five request kinds, in the ROUTING-1 shape and
sharing none of its topics or phrasings. Written in the language someone
would actually use, without consulting the act records while writing —
the point is to find where the records fail to state their own meaning.

**Weakness, stated:** the author of the change is the author of the
cases. ROUTING-2 is a controlled comparison of two resolution paths on
material neither was tuned against, not evidence of generality.

## Frozen

ROUTING-1 and CHOOSING-1 are not rerun, and nothing is adjusted after
these cases are scored. Findings change the records; the changed records
are measured on ROUTING-3.

---

## Addendum — the rule fired, and was not executed

**Written:** 2026-08-31, after scoring, before any code changed.

The retirement rule is satisfied on ROUTING-2's material: act-only
correct (3) is at least act-plus-scaffold (2), and "act wrong · scaffold
correct" is zero. The scaffolding has not been removed.

The reason is a defect in the rule rather than a change of mind about
the architecture. The rule measures one set. The frozen ask-coverage
gate holds two selection questions the records still cannot answer — "I
have six irreversible stages" (Ladder) and "how do I show a claim is
proven" (Evidence) — and the keyword list is what answers them today. On
ROUTING-2's twelve cases the list happened to contribute nothing, which
is not the same as it doing nothing.

Retiring it on that basis would have obeyed the letter of a rule I wrote
and shipped a regression. So: the rule is recorded as fired, the outcome
is recorded as overridden, and the reason is published rather than
quietly resolved. The list goes when enriched records answer those two
cases without it, and ROUTING-3 is what measures that.

**The rule is amended for future use, before the next eval rather than
after it:** scaffolding is removable when the records carry its recall
on fresh material *and* every case it currently rescues elsewhere is
answered without it.

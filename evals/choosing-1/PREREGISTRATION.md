# CHOOSING-1 — preregistration

**Written:** 2026-08-31, before a single case was scored.
**Frozen library:** `@chrishayuk/hause` @ b68d451 — 35 forms, the six-act grammar.
**Frozen site:** hause-site @ 09103cd — the deterministic resolver under test.

The build already proves every form is **structurally reachable**: the
coverage suite fails if the grammar does not name each one exactly once.
That is a fact about the authored grammar. It says nothing about whether
someone who did not author it can find the path.

This eval measures **semantic discoverability**, and it is preregistered
because the temptation to grade after seeing the answers is the whole
reason results like this are usually worthless.

## Two hypotheses, scored separately

**H1 — Semantic sufficiency.** Given unfamiliar content and the choosing
grammar, can a model select the intended form?

**H2 — Resolver robustness.** Can the deployed deterministic resolver
recognise sufficiently varied ways of expressing that intent?

They are not one number. A weak lexical resolver would make the design
language look weak; a strong model would hide a poor grammar. Mixing
them produces a score that cannot change anything.

## Conditions

| | What the selector is given |
|---|---|
| **A · catalogue** | Form names and their one-line descriptions. Nothing else. |
| **B · grammar** | The six acts, each act's deciding test, and the neighbour rules. |
| **C · deterministic** | The deployed `askHause()` resolver. No model call. |

A and B use the same cases and the same model, so the difference between
them is evidence about whether `/choosing` carries selection information
that the catalogue does not. C is a different question: how much of that
coverage survives without a model at all.

## The cases

Written before any run, and **without reusing HAUSE's own wording** —
the vocabulary under test must not appear in the stimulus. Each case
records more than a label:

```
content              what someone is actually trying to do, in their words
expected             the form the authority says fits
decidingTest         why — the test from the grammar, in the case's own terms
nearestAlternative   the form most likely to be chosen instead
whyAlternativeLoses  what separates them here
domain               technical · editorial · commerce · operations · narrative · data · product
kind                 clear · trap · ambiguous · no-form
```

**trap** cases sit deliberately on a neighbour boundary. **ambiguous**
cases have two defensible answers and are scored as correct for either,
but a selector that shows no hesitation is recorded as false confidence.
**no-form** cases have no HAUSE form that fits, and the correct outcome
is refusal.

## What gets published

Not an accuracy figure. All of:

- exact-form selection
- correct **act** — one of the six, even when the form is wrong
- correct **mode** — statement / instrument / performance
- **near-neighbour errors** — chose the recorded nearest alternative
- **valid abstention** on no-form cases
- **false confidence** — a confident pick where the authority says ambiguous or none
- **decision-test consistency** — right form, wrong stated reason (H1 only; C states no reason)

The last one matters most. A selector can luck into `Claim`; if its
reason is "this sounds like a strong opinion", it has not understood the
distinction. A selector that picks the neighbour but articulates the
boundary correctly has failed differently, and better.

Failures are published as failures, with the case, the expected deciding
test, and what was chosen instead.

## The rule that makes it evidence

**CHOOSING-1 runs once, is published, and is frozen.** Its failures may
change the grammar, the wording or the resolver — and the changed system
is then measured on **CHOOSING-2, built from fresh material**. Nothing is
tuned against this set. A resolver tuned against its own test suite is an
elegant memoriser, and the number it produces means nothing.

## Stated weakness

The cases are written by the same author as the grammar. Sympathetic
phrasing is a real risk, and this is the reason CHOOSING-2's material
should come from someone else, or from content that already existed for
another purpose.

---

## Addendum — conditions A and B, written before they were run

**Written:** 2026-08-31, after condition C was published and before a
single A or B case was scored.

**Selector:** Claude, one model, fresh context per batch, no access to
this repository, hause.design, Ask HAUSE or the eval pages. Each context
receives exactly one file: the condition material and its case batch.
The instruction forbids any tool use, and any run showing evidence of
repository or web access is void.

Stated weakness, plainly: this is the same model family as the
assistant that co-authored the grammar. It is not an independent
reasoner. What it is, is a context that has never seen HAUSE — the
library is two days old and the grammar hours old, so neither is in any
training data. That makes this a test of whether the written material
carries the distinction, not of whether an arbitrary system does.

**Batching:** 124 cases in three batches of 42 / 42 / 40, identical for
both conditions, in file order. A context sees one batch.

**One model, one run.** Not five models averaged. Additional models, if
ever run, are marked exploratory replication and reported separately —
turning the first clean experiment into a benchmark exercise would lose
the comparison this eval exists for, which is A against B.

**Recorded per case:** the selected form (or NONE), and the deciding
reason in one sentence. The reason is scored separately as
**decision-test fidelity** — whether it names the distinction the
authority names. `Claim, because it is a testable belief whose status
can change` and `Claim, because the sentence makes a strong claim` are
the same label and different results.

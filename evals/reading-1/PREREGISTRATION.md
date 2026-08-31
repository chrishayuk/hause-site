# READING-1 — what does the site teach a model about HAUSE?

**Written:** 2026-08-31, before any context was asked anything.
**Site under test:** hause.design, live at build 10b87d0. Not the repository —
the public surface, exactly as an unfamiliar reader meets it.

## Why this eval exists

Every other eval here measures whether HAUSE's own machinery can find
the right record. This one measures something the machinery cannot see:
**what conceptual model of HAUSE another model constructs from reading
the site.**

That is the AEO question worth asking. Not "can a crawler retrieve our
paragraph" — the legibility layer already answers that — but "what does
the corpus cause a stranger to believe", including the parts nobody
wrote down and the parts that get compressed into something adjacent.

The prompt for it was a third-party model's unprompted review, which got
the three voices, the constrained motion and the admission rule right,
and then concluded HAUSE was a framework for explainable-AI dashboards,
unsuitable for ordinary sites, with a niche plugin community. One of
those is a compression, one is an untested inference, and one is
boilerplate invented to fill a familiar review shape.

## The rule that makes it evidence

**The site is not changed before the run.** The corpus that produced the
misreading is the corpus under test. Findings change the site; the
changed site is measured on READING-2.

## Method

Three fresh contexts, no access to this repository or these evals, each
told only to read hause.design and answer from what is there. Same eight
questions, asked in the same order:

1. What is HAUSE?
2. What is it for?
3. What is it *not* for?
4. Is it a UI framework?
5. Would you use it for a long-form essay?
6. Would you use it for an e-commerce site?
7. What makes it different from a conventional design system?
8. What evidence exists for its claims?

Each answer must cite the page it came from, so a claim without a source
is visible as one.

## Classification

Every distinct claim in the responses is classified against the site:

| | |
|---|---|
| **supported** | a sentence on the site says this |
| **reasonable inference** | not stated, follows from what is |
| **overgeneralisation** | true of part of it, said of the whole |
| **unsupported invention** | not on the site and not implied |

Counted per class, and the interesting number is not accuracy — it is
**which true things failed to travel** and **which false things arrived
anyway**.

## Stated weaknesses

The classification is done by the site's author, which makes the
boundary between "reasonable inference" and "overgeneralisation" the
softest measure here; the rule is that **supported** requires a sentence
I can point to. And the readers are the same model family as the
assistant that wrote much of the site, which makes this a test of the
corpus rather than of models in general.

## Preregistered predictions

Written now so they can be wrong later. The site will fail to
communicate: that an explanation includes an essay, an answer and a
refusal rather than only a dashboard; that HAUSE is a semantic layer and
not a replacement for transactional chrome; and that its adoption is two
sites by one author. The first two are absences, the third is stated on
the site and expected to be flattened anyway.

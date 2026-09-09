import { FORM_MANIFEST } from "@chrishayuk/hause/manifest";
import docs from "@/data/formDocs.json";
import { recordDifference } from "@/vendor/hause/record-difference";

export const manifestNames = FORM_MANIFEST.map(form => form.name);
export const documentedNames = docs.forms.map(form => form.name);
export const documentationDate = docs.generated;
export const documentCheck = recordDifference(manifestNames, documentedNames);
// Deliberately alter a copy; never mutate the real manifest or ingested record.
export const damagedNames = documentedNames.slice(1);
export const damagedCheck = recordDifference(manifestNames, damagedNames);

export const LISTENING_RECORD = {
  assertion: "Every listener preferred room A.",
  question: "Did every listener prefer room A?",
  answer: "No. In this fictional ten-person listening study, eight listeners chose room A and two chose room B. The record supports a majority preference for A, but contradicts the claim that every listener preferred it.",
  choices: ["A", "A", "A", "A", "A", "A", "A", "A", "B", "B"],
};

export const GALLERY_RECORD = {
  assertion: "The gallery will open on Friday.",
  detail: "Planned opening; inspection not completed.",
  evidence: "Inspection scheduled for Thursday; no result filed.",
  refusal: "Opening is not confirmed.",
  boundary: "No completed inspection is on record.",
};

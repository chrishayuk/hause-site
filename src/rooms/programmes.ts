import type { FormMode } from "@chrishayuk/hause/manifest";
import type { StudyName } from "@/studies/catalog";

export type RoomChapter = { id: string; title: string; premise: string; forms: StudyName[] };
export const ROOM_PROGRAMMES: Record<FormMode, RoomChapter[]> = {
  performance: [
    { id: "rearrange", title: "Change the reading.", premise: "The pieces stay themselves. Their arrangement makes a different argument.", forms: ["Transformation", "Unfolding", "Compilation"] },
    { id: "passage", title: "Follow the passage.", premise: "One thing travels; what it passes through becomes part of the explanation.", forms: ["Procession", "Channel"] },
    { id: "scale", title: "Change the frame.", premise: "Scale and precision determine which differences you can see.", forms: ["Magnitude", "Quantisation"] },
    { id: "screening", title: "Give the subject time.", premise: "A film is a published object, not a decorative background.", forms: ["Film"] },
  ],
  instrument: [
    { id: "rearrange", title: "Move the pieces.", premise: "Begin with the same material. Change how you read it.", forms: ["Comparison"] },
    { id: "open", title: "Open the object.", premise: "See its layers, take it apart, or change the depth of the explanation.", forms: ["Decomposition", "Anatomy", "Lens"] },
    { id: "select", title: "Choose what matters.", premise: "Keep identity fixed while you select a route, a representation or a relevant channel.", forms: ["ExpertField", "Variants", "Gating"] },
    { id: "verify", title: "Put it to the test.", premise: "An equality, a limit, a gate and a byte layout each demand a different check.", forms: ["Agreement", "Derivation", "Ladder", "ByteMap"] },
    { id: "trace", title: "Follow it back.", premise: "Ask the library a question, then follow the answer to its record.", forms: ["Terminal", "FollowReveal", "Provenance", "Citation"] },
  ],
  statement: [
    { id: "arrival", title: "Give it attention.", premise: "An arrival names the room. A statement establishes the turn in the argument.", forms: ["Hero", "Statement"] },
    { id: "notice", title: "Notice. Then assert.", premise: "Separate what was observed from the belief that follows.", forms: ["Observation", "Claim"] },
    { id: "support", title: "Show where it holds.", premise: "Put the receipts beside the uncertainty and the boundary.", forms: ["Evidence", "Question", "Refusal"] },
    { id: "resolve", title: "Leave a clear record.", premise: "Answer plainly, preserve the source, date the history, then open the next door.", forms: ["Answer", "Excerpt", "Timeline", "Snippet", "Connection"] },
  ],
};
export const ROOM_TITLES: Record<FormMode, string> = { performance: "Performances — watch an idea change", instrument: "Instruments — understanding, by hand", statement: "Statements — a sentence becomes an argument" };
export const ROOM_DESCRIPTIONS: Record<FormMode, string> = {
  performance: "A screening-led journey through reorganisation, passage, scale and precision. Finite performances, a labelled AI-generated silk study, and a real Chris Hay film with chapters and transcript. All eight performance forms remain within reach.",
  instrument: "A hands-on journey through rearranging, opening, selecting, verifying and tracing. Operate selected studies and inspect all fifteen instrument forms.",
  statement: "A fictional listening-room study becomes an argument through observation, claim, evidence, uncertainty, refusal and answer. All twelve statement forms remain within reach.",
};

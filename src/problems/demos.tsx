import { Lens } from "@chrishayuk/hause/components/forms/Lens";
import { Observation } from "@chrishayuk/hause/components/forms/Observation";
import { Snippet } from "@chrishayuk/hause/components/forms/Snippet";
import { FORMS } from "@/data/forms";
import { PROBLEMS } from "@/data/problems";
import { ContainerEncounter, RefusalEncounter, MachineEncounter, CitationEncounter, DriftEncounter, CertaintyEncounter, MotionEncounter } from "./encounters";

// Keep the approved three-depth instrument. Other chapters now have their own experiments.
export function TutorialOrReferenceNeverBothDemo() {
  const lens = FORMS.find(form => form.name === "Lens")!;
  return <Lens kicker="THIS PROBLEM — AT THREE DEPTHS" concept="Depth"
    caption="The demonstration is the argument: one subject, one URL, three depths — and the depth you pick here is the depth the rest of the site will greet you with."
    depths={[
      { id: "learn", label: "LEARN", hint: "what the split costs", content: <Observation label="THE COST OF THE SPLIT" text="Two pages about one subject are two things to keep true. The reader pays first — guessing which half holds their answer — and the writer pays afterwards, because the half with the traffic and the half with the precision are rarely the same half, and neither review cycle catches the disagreement between them." /> },
      { id: "inspect", label: "INSPECT", hint: "the instrument, running", content: <Observation label="YOU ARE OPERATING IT" text="This is a Lens: the control above, three panels beneath, every panel in the DOM whether or not you clicked it. Your choice is remembered in localStorage and written into the URL fragment, so this page can be sent to someone at the depth you were reading — and the next chapter opens where you left off rather than back at the introduction." /> },
      { id: "spec", label: "SPEC", hint: "the props, verbatim", content: <Snippet label={`THE CONTRACT — ${lens.file}`} code={lens.api} aside="Read out of the library at build time, like every other contract on this site." /> },
    ]} />;
}

export const DEMOS: Record<string, () => React.ReactNode> = {
  "everything-becomes-a-card": ContainerEncounter,
  "interfaces-that-cannot-refuse": RefusalEncounter,
  "pages-machines-cannot-read": MachineEncounter,
  "nothing-to-cite": CitationEncounter,
  "the-book-drifts-from-the-code": DriftEncounter,
  "tutorial-or-reference-never-both": TutorialOrReferenceNeverBothDemo,
  "everything-sounds-equally-certain": CertaintyEncounter,
  "motion-that-means-nothing": MotionEncounter,
};
for (const problem of PROBLEMS) if (!DEMOS[problem.slug]) throw new Error(`${problem.slug} needs a demonstration`);

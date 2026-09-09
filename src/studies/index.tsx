import type { Form } from "@/data/forms";
import { STUDIES, type StudyName } from "./catalog";
import { StudyFrame } from "./StudyFrame";
import { StatementStudy } from "./StatementStudies";
import { InstrumentStudy } from "./InstrumentStudies";
import { PerformanceStudy } from "./PerformanceStudies";
import { QuantisationStudy } from "@/components/QuantisationStudy";

export function FormStudy({ form }: { form: Form }) {
  if (!(form.name in STUDIES)) throw new Error(`Missing authored study: ${form.name}`);
  const name = form.name as StudyName;
  if (name === "Quantisation") return <div data-study="Quantisation"><QuantisationStudy /></div>;
  return <StudyFrame name={name}>
    {form.mode === "statement" ? <StatementStudy name={name} /> : form.mode === "instrument" ? <InstrumentStudy name={name} /> : <PerformanceStudy key={name} name={name as Parameters<typeof PerformanceStudy>[0]["name"]} />}
  </StudyFrame>;
}

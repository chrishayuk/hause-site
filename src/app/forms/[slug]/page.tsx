import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Hero } from "@chrishayuk/hause/components/forms/Hero";
import { Statement } from "@chrishayuk/hause/components/forms/Statement";
import { Observation } from "@chrishayuk/hause/components/forms/Observation";
import { Answer } from "@chrishayuk/hause/components/forms/Answer";
import { Timeline } from "@chrishayuk/hause/components/forms/Timeline";
import { Refusal } from "@chrishayuk/hause/components/forms/Refusal";
import { Snippet } from "@chrishayuk/hause/components/forms/Snippet";
import { Connection } from "@chrishayuk/hause/components/forms/Connection";
import { Lens } from "@chrishayuk/hause/components/forms/Lens";
import { Provenance } from "@chrishayuk/hause/components/forms/Provenance";
import { Citation } from "@chrishayuk/hause/components/forms/Citation";
import { JsonLd } from "@chrishayuk/hause/components/JsonLd";
import { breadcrumbLd, citationLd } from "@chrishayuk/hause/seo";
import { FORMS, MODE_DISCIPLINE, MODE_LABEL, MODE_ROOM, formAnswer, formBySlug, formBody, formHasOwnHeadline, formHeadline, formOriginKicker, formRecord, formCiteMeta, formSlug } from "@/data/forms";
import { specimenFor } from "@/specimens";

export function generateStaticParams() {
	return FORMS.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const form = formBySlug((await params).slug);
	if (!form) return {};
	return {
		title: `The ${form.name} Form: ${formHeadline(form)}`,
		alternates: { canonical: `/forms/${form.slug}` },
		description: form.line,
		other: formCiteMeta(form),
	};
}

/**
 * ONE FORM, ONE PAGE — and the page is a chapter, not an entry.
 *
 * Everything here is projected: the manifest gives the mode, the line
 * and the recorded origin; the form's own doc comment gives the
 * argument; the ingest gives the API verbatim; the specimen registry
 * gives the live specimen the mode room shows. The lens holds all three
 * depths — what it is, the form running, and the props that are its
 * contract — so a reader can meet a form at whatever depth they came
 * for, and cite the page either way.
 */
export default async function FormPage({ params }: { params: Promise<{ slug: string }> }) {
	const form = formBySlug((await params).slug);
	if (!form) notFound();

	const record = formRecord(form);
	const Specimen = specimenFor(form.name);
	const body = formBody(form);
	const room = MODE_ROOM[form.mode];
	const related = form.mentions.filter((m) => m !== form.name);

	return (
		<main>
			<JsonLd data={citationLd(record)} />
			<JsonLd
				data={breadcrumbLd([
					{ name: "HAUSE", url: "https://hause.design" },
					{ name: "The holdings", url: "https://hause.design/forms" },
					{ name: form.name, url: record.url },
				])}
			/>

			<Hero
				kicker={`THE LIBRARY · ${MODE_LABEL[form.mode]}${formOriginKicker(form)}`}
				title={form.name.toUpperCase()}
				dek={form.line}
			/>

			{formHasOwnHeadline(form) && <Statement text={formHeadline(form)} />}

			<Answer
				id={`what-is-the-${form.slug}-form`}
				question={`What is the ${form.name} form in HAUSE, and when do you use it?`}
				answer={formAnswer(form)}
				cite={form.origin ? `origin — ${form.origin}${form.date ? ` · ${form.date}` : ""}` : undefined}
			/>

			<Lens
				kicker={`${form.name.toUpperCase()} — THREE DEPTHS`}
				concept={`The ${form.name} form`}
				caption={`The library's own account of ${form.name}, the specimen the book exhibits, and the props that are its contract — projected from ${form.file}, never retyped.`}
				depths={[
					{
						id: "learn",
						label: "LEARN",
						hint: "why the form exists",
						content: (
							<>
								{body.map((p, i) => (
									<Observation key={i} label={i === 0 ? "THE LIBRARY'S OWN ACCOUNT" : undefined} text={p} />
								))}
								<Observation label={`THE ${form.mode.toUpperCase()}'S DISCIPLINE`} text={MODE_DISCIPLINE[form.mode]} />
							</>
						),
					},
					{
						id: "inspect",
						label: "INSPECT",
						hint: Specimen ? "the form, running" : "held, not exhibited",
						content: Specimen ? (
							<Specimen />
						) : (
							<Refusal
								kicker="THE BOOK REFUSES TO FAKE ONE"
								title="HELD · NOT YET EXHIBITED"
								lines={[
									`requested    a ${form.name} specimen`,
									`available    the form itself, in ${form.file}`,
								]}
								principle="A form the library holds without a real subject is shown as held — never as an empty frame."
							/>
						),
					},
					{
						id: "spec",
						label: "SPEC",
						hint: "the props, verbatim",
						content: (
							<Snippet
								label={`THE CONTRACT — ${form.file}`}
								code={`import { ${form.name} } from "@chrishayuk/hause/components/forms/${form.name}";\n\n${form.api}`}
								aside="Verbatim from the source: the props a caller passes are the whole contract, and this block is read out of the file rather than written beside it."
							/>
						),
					},
				]}
			/>

			{form.origin && form.date && (
				<Timeline entries={[{ date: form.date, text: `Entered the library from ${form.origin} — built for a real page, then generalised until its props no longer knew whose content they carried.` }]} />
			)}

			<Connection
				text={related.length ? "The forms this one names in its own account — the relations are stated by the source, not curated here." : "Where this form sits in the book."}
				links={[
					...related.map((name) => ({ href: `/forms/${formSlug(name)}`, label: name.toUpperCase() })),
					{ href: room.href, label: `${room.label} — THE ROOM` },
					{ href: "/forms", label: "THE HOLDINGS" },
				]}
			/>

			<Provenance record={record} citeHref="#cite" />
			<Citation
				record={record}
				note={`A form is a published object like any other: this page carries the same four surfaces the library gives every consumer — the reference, the provenance line above it, the citation tags in the head, and the JSON-LD in the graph.`}
			/>
		</main>
	);
}

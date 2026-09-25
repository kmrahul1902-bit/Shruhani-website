"use client";

import { useState } from "react";

/**
 * The book-a-demo form.
 *
 * Posts directly to Formspree (`NEXT_PUBLIC_FORMSPREE_FORM_ID`) — this
 * project is a static export (see CLAUDE.md → Decisions), so there's no
 * server left to run a `/api/demo-request` route handler against; the
 * validation and webhook-forwarding that route used to do now live on
 * Formspree's side instead.
 *
 * Field NAMES come from code, not content: they are this form's contract
 * with Formspree, so rewording a label cannot silently stop a submission
 * mapping. Only the wording is content.
 *
 * Adapted from the reference: the baked content's `form.inputs[]` carries no
 * `.key` (no CMS — see plan/CLAUDE.md → Decisions), so `FIELD_KEYS` supplies
 * one per input, by the same position the reference's `form.fields[].key`
 * always held (confirmed against `ROWS`' pairing below). The hidden `_gotcha`
 * field is Formspree's own honeypot convention (a filled one is silently
 * dropped server-side) — it replaces the API route's custom `company_hp`
 * check, which had no server left to run on.
 */
const FIELD_KEYS = [
  "firstName",
  "lastName",
  "email",
  "company",
  "phone",
  "companySize",
  "message",
];

const ROWS = [
  ["firstName", "lastName"],
  ["email"],
  ["company"],
  ["phone", "companySize"],
  ["message"],
];

const REQUIRED = new Set(["firstName", "email"]);

function Field({ field }) {
  const id = `demo-${field.key}`;
  const required = REQUIRED.has(field.key);
  const shared = {
    id,
    // The field key IS the input name on the wire.
    name: field.key,
    required,
    placeholder: field.placeholder,
    className: "ct-input text-body-md",
  };
  return (
    <div className="ct-f">
      <label htmlFor={id} className="text-eyebrow text-muted font-semibold">
        {field.label}
        {required && (
          <span aria-hidden="true" className="text-blue">
            {" *"}
          </span>
        )}
      </label>
      {field.options ? (
        <select {...shared} defaultValue="">
          {field.options.map((option, i) => (
            <option key={option} value={i === 0 ? "" : option}>
              {option}
            </option>
          ))}
        </select>
      ) : field.key === "message" ? (
        <textarea
          {...shared}
          rows={4}
          className="ct-input text-body-md min-h-29.5"
        />
      ) : (
        <input
          {...shared}
          type={
            field.key === "email"
              ? "email"
              : field.key === "phone"
                ? "tel"
                : "text"
          }
        />
      )}
    </div>
  );
}

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID;

export default function ContactForm({ form, labels }) {
  const [state, setState] = useState("idle");
  const [error, setError] = useState(null);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!FORMSPREE_ID) {
      // No form configured — fail loudly to whoever's testing rather than
      // pretending the lead went somewhere. Set NEXT_PUBLIC_FORMSPREE_FORM_ID
      // in .env.local (see .env.example).
      console.error(
        "[ContactForm] NEXT_PUBLIC_FORMSPREE_FORM_ID is not set — nowhere to send this."
      );
      setError(form.errorBody);
      return;
    }
    const formData = new FormData(event.currentTarget);
    formData.set("sourcePath", window.location.pathname);
    setState("sending");
    setError(null);
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.errors?.[0]?.message || form.errorBody);
      }
      setState("sent");
    } catch (e) {
      setError(e.message || form.errorBody);
      setState("idle");
    }
  };

  // Adapted: the baked content's `input.options` (the companySize select)
  // is one newline-delimited string, not an array — same shape gotcha as
  // `form.checks` on this page (see book-a-demo/page.js).
  const fields = form.inputs.map((input, i) => ({
    ...input,
    key: FIELD_KEYS[i],
    options: input.options
      ? input.options.split("\n").map((o) => o.trim())
      : undefined,
  }));
  const byName = Object.fromEntries(fields.map((f) => [f.key, f]));

  if (state === "sent") {
    return (
      <div className="ct-form-col" role="status">
        <h2 className="text-title-3 tracking-heading text-ink font-bold">
          {form.successHeading}
        </h2>
        <p className="text-body text-muted mt-2.5 text-pretty">
          {form.successBody}
        </p>
      </div>
    );
  }

  return (
    <div className="ct-form-col">
      <h2 className="text-title-3 tracking-heading text-ink mb-2.5 font-bold">
        {form.heading}
      </h2>
      <p className="text-body-md text-body mb-8 text-pretty">{form.deck}</p>

      <form
        className="ct-fields mt-7"
        onSubmit={onSubmit}
        aria-label={labels.formRegion}
      >
        {ROWS.map((row) =>
          row.length === 2 ? (
            <div key={row.join("-")} className="ct-row">
              {row.map((name) => (
                <Field key={name} field={byName[name]} />
              ))}
            </div>
          ) : (
            <Field key={row[0]} field={byName[row[0]]} />
          )
        )}

        {/* Honeypot: hidden from a sighted user and skipped by a screen
            reader, but a bot filling every field on the page fills this
            one too. `_gotcha` is Formspree's own convention — a filled one
            is silently dropped server-side, no code on our end involved. */}
        <div aria-hidden="true" className="sr-only">
          <label htmlFor="demo-gotcha">Leave this field empty</label>
          <input
            id="demo-gotcha"
            name="_gotcha"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {error && (
          <p className="text-body-md text-danger" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={state === "sending"}
          className="focus-ring bg-blue rounded-pill hover:bg-blue-hover text-body-md mt-2 justify-self-start px-7.5 py-4 font-semibold text-white transition hover:-translate-y-px disabled:opacity-70"
        >
          {state === "sending" ? "Sending…" : form.submitLabel}
        </button>
      </form>
    </div>
  );
}

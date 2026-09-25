/**
 * Receives the book-a-demo form.
 *
 * Adapted from the reference: that version writes the submission to Strapi
 * with a server-side write token. This project has no CMS and no email/CRM
 * credentials (guardrail #5: no secrets in the repo) — so this forwards to
 * a CONFIGURABLE endpoint instead: set `DEMO_REQUEST_WEBHOOK_URL` (e.g. a
 * Formspree/Zapier/CRM webhook) in `.env.local` and every validated lead
 * POSTs there as JSON. With no URL configured, it falls back to logging the
 * lead (dev-friendly, never silently drops a submission).
 *
 * The webhook URL is a SERVER env var, not `NEXT_PUBLIC_*` — it never
 * reaches the client bundle. The browser always posts to this same-origin
 * route; only this route knows (or doesn't) where the lead goes next. An
 * optional `DEMO_REQUEST_WEBHOOK_TOKEN` is sent as a Bearer token if the
 * target needs auth.
 *
 * Validation is deliberately thin: two required fields and length caps.
 * This is a sales lead, not a login. Rejecting a real prospect because
 * their phone number has an unexpected shape costs more than storing a
 * messy one, so the only hard rules are the two things a lead is useless
 * without — plus the honeypot, which is new here (not in the reference).
 */

const MAX = {
  firstName: 120,
  lastName: 120,
  email: 200,
  company: 200,
  phone: 40,
  companySize: 40,
  message: 4000,
};

/** An email at all, not a deliverable one — that is a bounce's job to tell us. */
const looksLikeEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

const json = (body, status) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });

export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ error: "Expected a JSON body." }, 400);
  }

  // A filled honeypot means a bot: pretend success rather than telling it
  // what tripped, and skip the rest of validation entirely.
  if (typeof payload?.company_hp === "string" && payload.company_hp.trim()) {
    return json({ ok: true }, 201);
  }

  const fields = {};
  for (const [key, limit] of Object.entries(MAX)) {
    const value = payload?.[key];
    if (typeof value !== "string") continue;
    const trimmed = value.trim().slice(0, limit);
    if (trimmed) fields[key] = trimmed;
  }

  if (!fields.firstName || !fields.email) {
    return json({ error: "A name and an email address are required." }, 422);
  }
  if (!looksLikeEmail(fields.email)) {
    return json({ error: "That email address does not look right." }, 422);
  }

  // Where the reader was, and what they used. Useful to sales, and the
  // first thing to look at if this endpoint starts getting hammered.
  fields.sourcePath =
    typeof payload?.sourcePath === "string"
      ? payload.sourcePath.slice(0, 200)
      : "";
  fields.userAgent = (request.headers.get("user-agent") ?? "").slice(0, 500);

  const webhookUrl = process.env.DEMO_REQUEST_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          ...(process.env.DEMO_REQUEST_WEBHOOK_TOKEN && {
            authorization: `Bearer ${process.env.DEMO_REQUEST_WEBHOOK_TOKEN}`,
          }),
        },
        body: JSON.stringify(fields),
        signal: AbortSignal.timeout(10_000),
      });
      if (!res.ok) {
        console.error(
          "[demo-request] webhook rejected the lead:",
          res.status
        );
        return json({ error: "Unable to record that right now." }, 502);
      }
    } catch (e) {
      console.error("[demo-request] webhook unreachable:", e?.message);
      return json({ error: "Unable to record that right now." }, 502);
    }
  } else {
    // No DEMO_REQUEST_WEBHOOK_URL configured — log rather than silently
    // drop, so a lead is never lost without a trace during local dev or
    // before a real endpoint is wired up.
    console.warn(
      "[demo-request] DEMO_REQUEST_WEBHOOK_URL not set — logging only:",
      fields
    );
  }

  return json({ ok: true, contact: "amit@shruhani.com" }, 201);
}

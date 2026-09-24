# PHASE 6 · Content pages — about, FAQ, investors, contact/demo, privacy, resources

**Goal:** the remaining routes, including the contact/CTA destination and the
content that needs the heaviest Shruhani‑specific rewrite.

## Read first

- `plan/docs/03-content-and-pages.md` (Core table)
- `<REFERENCE>/src/app/{about,faq,investors-partners,privacy-policy,book-a-demo,resources}/**`
- `<REFERENCE>/src/app/resources/article/[slug]/page.js`
- `<REFERENCE>/cms-sync-baseline/{about,faq,investorsPartners,privacyPolicy,contact,blog}.json`
- `<REFERENCE>/src/app/api/demo-request/route.js` (if Path A)
- `<REFERENCE>/e2e/{blog}.spec.js`

## Tasks by page

- [ ] **About** — port structure; **replace all** people/offices/press/certs/
      investors with Shruhani's real content or `TODO(content)`. This page is mostly
      company‑specific facts; do not carry Sign3's over.
- [ ] **FAQ** — reuse Q/A structure; verify each answer is true for Shruhani.
- [ ] **Investors & Partners** — replace named investors/partners or remove the
      page's specific sections; keep the layout only if Shruhani has real entities.
- [ ] **Privacy policy** — **rewrite** for Shruhani's legal entity, jurisdiction
      (India), data‑handling, and contact. Legal text is not reusable verbatim →
      `TODO(legal): review by counsel`.
- [ ] **Book a demo (contact/CTA)** — port the form. **Path A:** wire POST →
      `/api/demo-request` and connect to email/CRM. **Path B:** point the form at a
      third‑party endpoint (Formspree/your backend). Add success/error states,
      validation, spam honeypot.
- [ ] **Resources** — port blog index + `article/[slug]` template
      (`react-markdown` pipeline). Start with **no** posts or author real Shruhani
      posts; do not import Sign3 articles wholesale. Port `blog.spec.js` if keeping
      the blog.

## Copy‑paste prompt

> Read `plan/docs/03-content-and-pages.md` and the reference's about, faq,
> investors‑partners, privacy‑policy, book‑a‑demo, and resources routes plus their
> `cms-sync-baseline` JSON. Port each into our project. For **about, investors, and
> privacy**, do not carry Sign3's specific facts — replace with Shruhani's real
> content or insert `TODO(content)` / `TODO(legal)`. Rewrite the privacy policy for
> Shruhani's entity and Indian jurisdiction and flag it for counsel review. Port the
> book‑a‑demo form and wire submission per our hosting path (API route for Path A,
> third‑party endpoint for Path B) with validation, honeypot, and success/error
> states. Port the resources blog index and article template but start with no
> imported Sign3 posts. Run lint + build + e2e, then give me the Phase 6 report and a
> consolidated TODO(content)/TODO(legal) list.

## Acceptance gate

- All six routes render inside the shell, pink‑themed.
- Demo form submits successfully end‑to‑end (test the wired path).
- Privacy policy is Shruhani‑specific and flagged for legal review.
- No unflagged Sign3‑specific facts anywhere; blog has no imported Sign3 articles.
- Lint + build + e2e pass; responsive.

**Commit:** `phase(6): about, faq, investors, contact, privacy, resources`

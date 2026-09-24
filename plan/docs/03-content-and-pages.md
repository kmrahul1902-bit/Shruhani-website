# 03 · Content & Pages

Every route to build, its content source in the reference, and what needs a
**global rename** (Sign3 → Shruhani) vs. what needs a human **`TODO(verify)`**
sign‑off before it ships.

## The substitution rule (read first)

This is a corporate rebrand of the same legal entity (Sign3 Technologies →
Shruhani Technologies), not a switch to a different company. **Carry the
existing content over** — reuse it, don't replace it.

Perform a careful **global rename** of Sign3 → Shruhani everywhere: brand
name, wordmark/logo, domains, email addresses, copyright line, package/repo
names where brand‑facing, and any product names that are brand‑prefixed. **Do
not invent or alter metrics, customer names, or claims** — preserve them
exactly as written.

Mark these rename‑sensitive items `TODO(verify)` so a human confirms they
reflect the new legal name before the investor presentation — `TODO(verify)`
means "keep the content, flag for human sign‑off," not "remove":

- registered legal entity details — name, CIN, GST, registered address
- certification names (ISO/SOC/PCI/etc.) reissued under the new entity name
- customer logos, testimonials, and press displayable under the new name
- investor and partner names on the investors‑partners page

Content source files live in `<REFERENCE>/cms-sync-baseline/`.

---

## Route inventory

### Core

| Route                                             | Reference content        | Notes                                                                                                                                                                                                     |
| ------------------------------------------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/` (home)                                        | `home.json`              | Hero + product/use‑case overview + CTA band. Phase 3.                                                                                                                                                     |
| `/about`                                          | `about.json`             | Story, people, offices, press, certs, investors — carry over, global‑rename Sign3→Shruhani; `TODO(verify)` certs, press mentions, and investor names (guardrail #2).                                      |
| `/faq`                                            | `faq.json`               | Reusable Q/A structure; rename Sign3→Shruhani, confirm answers still hold for the renamed entity.                                                                                                         |
| `/investors-partners`                             | `investorsPartners.json` | Carry over, rename Sign3→Shruhani; `TODO(verify)` every investor/partner name before the investor presentation.                                                                                           |
| `/privacy-policy`                                 | `privacyPolicy.json`     | Carry over, global‑rename to the Shruhani entity — but **this page needs a real legal review before publishing**: jurisdiction, contact, and entity details are all `TODO(verify)`, not a copy‑edit call. |
| `/book-a-demo`                                    | `contact.json`           | Contact / primary CTA. Wire form per hosting path. Phase 6.                                                                                                                                               |
| `/resources` + `/resources/article/[slug]`        | `blog.json`              | Blog index + article template. Reuse template; author real Shruhani posts or start empty.                                                                                                                 |
| `/design-system`                                  | —                        | Internal token/preview page; keep for QA.                                                                                                                                                                 |
| `not-found`, `robots`, `sitemap`, `health-status` | —                        | Keep; update URLs/branding.                                                                                                                                                                               |

### Products (Phase 4)

| Route                                      | Reference content        |
| ------------------------------------------ | ------------------------ |
| `/products/screenx`                        | `screenx.json`           |
| `/products/cortex`                         | `cortex.json`            |
| `/products/escalation`                     | `escalation.json`        |
| `/products/modules/behavioural-biometrics` | `moduleBehavioural.json` |
| `/products/modules/device-intelligence`    | `moduleDevice.json`      |
| `/products/modules/digital-footprint`      | `moduleFootprint.json`   |
| `/products/modules/image-intelligence`     | `moduleImage.json`       |
| `/products/modules/location-intelligence`  | `moduleLocation.json`    |
| `/products/modules/sms-intelligence`       | `moduleSms.json`         |

### Solutions → Use cases (Phase 5)

| Route                              | Reference content        |
| ---------------------------------- | ------------------------ |
| `/solutions`                       | `solutions.json`         |
| `/solutions/use-cases/fraud`       | `useCaseFraud.json`      |
| `/solutions/use-cases/credit-risk` | `useCaseCreditRisk.json` |
| `/solutions/use-cases/onboarding`  | `useCaseOnboarding.json` |
| `/solutions/use-cases/compliance`  | `useCaseCompliance.json` |

### Solutions → Industries (Phase 5)

| Route                                          | Reference content        |
| ---------------------------------------------- | ------------------------ |
| `/solutions/industries/banks-sfbs`             | `industryBanks.json`     |
| `/solutions/industries/nbfcs-lending`          | `industryLending.json`   |
| `/solutions/industries/fintechs-neobanks`      | `industryFintechs.json`  |
| `/solutions/industries/ecommerce-marketplaces` | `industryEcommerce.json` |

---

## Global content to set once

- **Company:** Sign3 Technologies Pvt. Ltd. → Shruhani Technologies Pvt. Ltd.
  — same entity. Global‑rename the name everywhere it appears; `TODO(verify)`
  the exact legal name, registered address, and CIN/GST (footer/privacy) and
  the support email against your records and the legacy `index.html` before
  the investor presentation.
- **Tagline / positioning:** carry the reference's positioning, renamed
  Sign3→Shruhani; cross‑check it against the legacy site's own line
  ("real‑time fraud & credit‑risk intelligence for Indian BFSI"; the "see
  intent, not just identity" line) and reconcile if the two diverge.
- **Nav / mega‑menu:** the information architecture (Products / Solutions /
  Resources / Company) can be reused; product and use‑case labels follow the
  Phase‑0 naming decision.
- **CTAs:** primary CTA = "Book a demo" → `/book-a-demo`. Keep consistent
  everywhere (header, CTA band, footer).

## Content loader

Build all pages against one helper so the source is swappable:

```js
// src/lib/content.js
import fs from "node:fs";
import path from "node:path";
export function getContent(key) {
  // Path B (baked): read src/content/<key>.json
  const p = path.join(process.cwd(), "src/content", `${key}.json`);
  return JSON.parse(fs.readFileSync(p, "utf8"));
  // Path A (Strapi): swap this body to fetch from the CMS.
}
```

Copy `cms-sync-baseline/*.json` → `src/content/` in Phase 0 (Path B), then
global‑rename Sign3→Shruhani in each file as you touch it, marking
`TODO(verify)` per the substitution rule above.

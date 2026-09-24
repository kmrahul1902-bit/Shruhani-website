/**
 * Structural metadata (route + wash/tone) for the hero's four use cases, in
 * the same order `home.json`'s `useCases` array carries them (fraud,
 * onboarding, credit risk, compliance) — the reference reads this from the
 * CMS alongside the copy; we have no CMS, so it lives here instead (see
 * plan/CLAUDE.md → Decisions) and is merged with the baked copy in
 * `UseCases.jsx`. No `tags`/`illustration` — the baked content has neither,
 * and nothing here should invent facts not in the source.
 */
export const USE_CASE_META = [
  { key: "fraud", href: "/solutions/use-cases/fraud", tone: "fraud" },
  { key: "onboarding", href: "/solutions/use-cases/onboarding", tone: "pass" },
  { key: "creditrisk", href: "/solutions/use-cases/credit-risk", tone: "warn" },
  {
    key: "compliance",
    href: "/solutions/use-cases/compliance",
    tone: "violet",
  },
];

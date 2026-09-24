/**
 * Structural metadata (route/key) for the four industries, in the same
 * order `home.json`'s `industryGrid.industries` carries them (confirmed by
 * each entry's own `title`) — the reference reads `key`/`href`/`image` from
 * the CMS alongside the copy; we have no CMS, so it lives here instead (see
 * plan/CLAUDE.md → Decisions). No `image` — same situation as Modules/
 * LogoGrid, no asset exists anywhere in this project yet.
 */
export const INDUSTRY_META = [
  { key: "banks", href: "/solutions/industries/banks-sfbs" },
  { key: "lending", href: "/solutions/industries/nbfcs-lending" },
  { key: "fintechs", href: "/solutions/industries/fintechs-neobanks" },
  { key: "ecommerce", href: "/solutions/industries/ecommerce-marketplaces" },
];

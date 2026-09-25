/**
 * Partner/customer roster, carried over from the reference's
 * `data/content/shell.js` → `clientLogos` (this project has no CMS/routes
 * registry — see plan/CLAUDE.md → Decisions). Names preserved as written
 * per guardrail #2 — no metric or claim invented or altered.
 *
 * Image files live at `public/logos/<file>` — downloaded from the live
 * site's own CDN (cdn.sign3.in), 600x200 each, matching exactly what this
 * component already expected (`width={600} height={200}` in LogoGrid.jsx).
 *
 * TODO(verify): every name below (guardrail #2, item 3) — confirm each is
 * still a customer displayable under the Shruhani name before launch.
 */
export const clientLogos = [
  { file: "jupiter.png", alt: "Jupiter" },
  { file: "niyo.png", alt: "Niyo" },
  { file: "punjab-sind.png", alt: "Punjab & Sind Bank", tall: true },
  { file: "jana.png", alt: "Jana Small Finance Bank", tall: true },
  { file: "csb.png", alt: "CSB Bank" },
  { file: "lendenclub.png", alt: "LenDenClub" },
  { file: "moneyview.png", alt: "moneyview" },
  { file: "snapmint.png", alt: "Snapmint" },
  { file: "indiamart.png", alt: "IndiaMART" },
  { file: "bajaj-finance.png", alt: "Bajaj Finance" },
  { file: "kissht.png", alt: "Kissht" },
  { file: "onecard.png", alt: "OneCard" },
  { file: "smartcoin.png", alt: "SmartCoin" },
  { file: "oto.png", alt: "OTO" },
].map(({ file, alt, tall }) => ({
  src: `/logos/${file}`,
  file,
  alt,
  tall: tall ?? false,
}));

// Carried over verbatim — no brand mention to rename.
export const logoStripEyebrow =
  "Trusted by 20+ banks, NBFCs & fintechs across India";

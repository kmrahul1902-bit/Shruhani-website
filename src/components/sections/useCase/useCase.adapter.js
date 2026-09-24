/**
 * Bridges the baked content's shape to what the ported components expect.
 *
 * The four `useCase*.json` files share one shape (confirmed by inspecting
 * all four), which differs from the reference's live-CMS shape in ways a
 * flat Strapi export can't express:
 *
 * - `hero.heading` here, `hero.h1` expected — a field-name difference,
 *   not a content gap.
 * - `split.body` is a single newline-delimited string; `Split` renders one
 *   `<p>` per `paragraphs[]` entry.
 * - `capabilities.cards[].description` is also newline-delimited, but
 *   `Capabilities` renders it as `bullets[]` chips, not prose — so this is
 *   a rename *and* a re-split, not just a re-split.
 * - `scenarios.tabs[].proofLabel/proofStat/proofBody/proofSource` are flat;
 *   `Scenarios` reads a nested `tab.proof.{label,stat,body,source}`.
 * - No card/tab in any of the four files carries a `key` (CMS-only
 *   metadata) — every list gets an index fallback.
 *
 * Components stay byte-for-byte portable from the reference; this is the
 * one seam where "our content" meets "their prop contract."
 */
function splitLines(text) {
  return (text ?? "").split("\n").filter(Boolean);
}

function withKeys(items = []) {
  return items.map((item, i) => ({ ...item, key: item.key ?? i }));
}

export function adaptUseCaseContent(raw) {
  return {
    ...raw,
    hero: {
      ...raw.hero,
      h1: raw.hero.heading,
    },
    split: {
      ...raw.split,
      paragraphs: splitLines(raw.split.body),
      cards: withKeys(raw.split.cards),
    },
    capabilities: {
      ...raw.capabilities,
      gapItems: withKeys(raw.capabilities.gapItems),
      cards: withKeys(raw.capabilities.cards).map((card) => ({
        ...card,
        bullets: splitLines(card.description),
      })),
    },
    scenarios: {
      ...raw.scenarios,
      tabs: withKeys(raw.scenarios.tabs).map((tab) => ({
        ...tab,
        cards: (tab.cards ?? []).map((card) => ({
          ...card,
          body: card.description,
        })),
        proof: {
          label: tab.proofLabel,
          stat: tab.proofStat,
          body: tab.proofBody,
          source: tab.proofSource,
        },
      })),
    },
  };
}

/**
 * Bridges the baked content's shape to what the ported About components
 * expect (this project has no CMS/routes registry — see plan/CLAUDE.md →
 * Decisions). All real content, carried over as-is per guardrail #2; this
 * file only reshapes it.
 */

// Route order confirmed against the content: platform.suites[] lists
// ScreenX, Cortex, EscalationX in that order, matching the three suite
// routes already built.
const SUITE_KEYS = ["screenx", "cortex", "escalation"];
const SUITE_HREFS = [
  "/products/screenx",
  "/products/cortex",
  "/products/escalation",
];

// The content's module labels don't all match their route slugs exactly
// (e.g. "SMS Parser" vs. the sms-intelligence route) — mapped by the actual
// label text rather than assumed position.
const MODULE_HREF_BY_LABEL = {
  "Digital Footprint": "/products/modules/digital-footprint",
  "Device Intelligence": "/products/modules/device-intelligence",
  "Behavioural Biometrics": "/products/modules/behavioural-biometrics",
  "Image Intelligence": "/products/modules/image-intelligence",
  "Location Intelligence": "/products/modules/location-intelligence",
  "SMS Parser": "/products/modules/sms-intelligence",
};

/**
 * The baked export flattens what should be array fields (a bio, a run of
 * story paragraphs) into one newline-delimited string, not an array — a
 * Strapi field flattened on export, where the live CMS would return a real
 * array. Every consumer `.map()`s over these, so this normalizes once here.
 */
function splitParagraphs(value) {
  if (Array.isArray(value)) return value;
  return (value ?? "").split("\n").filter(Boolean);
}

export function enrichAboutContent(content) {
  return {
    ...content,
    story: {
      ...content.story,
      paragraphs: splitParagraphs(content.story.paragraphs),
      paragraphsAfter: splitParagraphs(content.story.paragraphsAfter),
      card: {
        ...content.story.card,
        // Content names this field `heading`; the component reads `label`.
        meta: (content.story.card.meta ?? []).map((row) => ({
          label: row.heading,
          value: row.value,
        })),
      },
    },
    leaders: {
      ...content.leaders,
      people: (content.leaders.people ?? []).map((person) => ({
        ...person,
        // Content stores a flat `imageUrl`; the component reads `image.src`.
        image: person.imageUrl
          ? { src: person.imageUrl, alt: person.name }
          : undefined,
        bio: splitParagraphs(person.bio),
      })),
    },
    platform: {
      ...content.platform,
      suites: (content.platform.suites ?? []).map((suite, i) => ({
        ...suite,
        key: SUITE_KEYS[i] ?? `suite-${i}`,
        href: SUITE_HREFS[i] ?? "/products",
      })),
      modules: (content.platform.modules ?? []).map((mod, i) => ({
        ...mod,
        key: `module-${i}`,
        href: MODULE_HREF_BY_LABEL[mod.label] ?? "/products",
      })),
    },
  };
}

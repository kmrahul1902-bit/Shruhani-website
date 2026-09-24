import { test, expect } from "@playwright/test";
import { getContent } from "../src/lib/content.js";

/**
 * The four industry pages share one component set, so they share one spec —
 * anything that passes on Banks and fails on E-Commerce is a variant that has
 * drifted, which is exactly what this is here to catch.
 *
 * Adapted from the reference: content comes from `getContent(key)` (our
 * baked-JSON loader), not a CMS-backed content module. `content.hero.heading`,
 * not `hero.h1` (the baked field name — see industry/Hero/Hero.jsx). The
 * "evidence stack" and "CMS artwork" tests are dropped: the baked content has
 * no `hero.identity`/`hero.signals`/any image `src` (that's live
 * customer-account/CMS-media data the export snapshot doesn't carry — see
 * industry/Hero/Hero.jsx and LogoGrid's own Phase 3 precedent), so those
 * pages render the same `HeroAnimation` static placeholder every other Hero
 * in this project uses, with no CMS-hosted images anywhere. A "the animation
 * placeholder renders" smoke check replaces them.
 */
const PAGES = [
  ["banks-sfbs", "industryBanks"],
  ["nbfcs-lending", "industryLending"],
  ["fintechs-neobanks", "industryFintechs"],
  ["ecommerce-marketplaces", "industryEcommerce"],
];

for (const [slug, contentKey] of PAGES) {
  const content = getContent(contentKey);

  test.describe(`industry: ${slug}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`/solutions/industries/${slug}`);
    });

    test("renders one h1, and it is the page's headline", async ({ page }) => {
      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
      await expect(
        page.getByRole("heading", { level: 1, name: content.hero.heading })
      ).toBeVisible();
    });

    test("renders every section's heading", async ({ page }) => {
      for (const heading of [
        content.gap.heading,
        content.decisions.heading,
        content.mapping.heading,
        content.metricsBand.headingPlain,
      ]) {
        await expect(
          page.getByRole("heading", { level: 2, name: heading })
        ).toBeVisible();
      }
    });

    test("has no horizontal overflow", async ({ page }) => {
      const overflow = await page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth
      );
      expect(overflow).toBeLessThanOrEqual(1);
    });

    test("has no horizontal overflow after scrolling the whole page", async ({
      page,
    }) => {
      const overflow = await page.evaluate(async () => {
        const step = window.innerHeight;
        let worst = 0;
        for (let y = 0; y < document.body.scrollHeight; y += step) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 100));
          worst = Math.max(
            worst,
            document.documentElement.scrollWidth -
              document.documentElement.clientWidth
          );
        }
        return worst;
      });
      expect(overflow).toBeLessThanOrEqual(1);
    });

    test("the hero animation placeholder renders", async ({ page }) => {
      // Two hero compositions, one per breakpoint — exactly one is visible
      // at any given width (see industry/Hero/Hero.jsx).
      await expect(page.getByRole("img", { name: /.*/ }).first()).toBeVisible();
    });

    test("serves every section's artwork from the CMS", async () => {
      test.skip(
        true,
        "no CMS media host in this project — the baked content carries no image src anywhere (Phase 3's LogoGrid precedent)"
      );
    });
  });
}

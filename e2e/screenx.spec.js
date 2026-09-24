import { test, expect } from "@playwright/test";
import { getContent } from "../src/lib/content.js";

// Runs once per breakpoint (see playwright.config.mjs projects). Covers what
// jsdom cannot: real layout across the matrix and no-horizontal-overflow.
//
// Adapted from the reference: this project has no CMS (see plan/CLAUDE.md →
// Decisions), so the CMS-backed-media assertion and the hero-animation-frame
// assertion (Phase 7 — no real animation assets exist yet) are skipped
// explicitly below rather than ported as-is or silently dropped.

const screenx = getContent("screenx");

test.describe("screenx page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/products/screenx");
  });

  test("renders one h1, and it is the page's headline", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(
      page.getByRole("heading", { level: 1, name: screenx.hero.heading })
    ).toBeVisible();
  });

  test("renders every section's heading in the mockup's order", async ({
    page,
  }) => {
    const headings = [
      screenx.gap.heading,
      screenx.howItWorks.heading,
      screenx.personaLayers.heading,
      screenx.toolkit.heading,
      screenx.threats.heading,
      screenx.metricsBand.headingPlain,
    ];
    for (const heading of headings) {
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
        await new Promise((r) => setTimeout(r, 120));
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

  test("frames the screenx hero animation, decoratively", async () => {
    test.skip(
      true,
      "no real hero-animation assets exist yet — HeroAnimation is Phase 3's static placeholder until Phase 7"
    );
  });

  test("serves every section's artwork from the CMS", async () => {
    test.skip(
      true,
      "this project has no CMS/media host — see plan/CLAUDE.md → Decisions; illustration assets are TODO(content) in gap.constants.js et al."
    );
  });
});

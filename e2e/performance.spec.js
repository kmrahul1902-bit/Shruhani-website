import { test, expect } from "@playwright/test";

/**
 * LCP guards, adapted from the reference.
 *
 * These assert the CAUSES of a good LCP, not a millisecond number. A wall-clock
 * threshold measured on CI hardware is noise — it fails on a busy runner and
 * passes on a fast one, and it tells you nothing about what changed. The two
 * things that actually made the hero slow are both structural and both stable
 * to assert:
 *
 *   1. the LCP image must be eager and high-priority, so the browser starts it
 *      from the preload scanner rather than on parsing the body;
 *   2. it must not fetch a variant far larger than it renders.
 *
 * Adapted from the reference: no `config/routes.js` in this project (see
 * plan/CLAUDE.md → Decisions) — paths are hardcoded. And `/solutions/use-cases/fraud`
 * is dropped from `PHOTO_HERO_PAGES`: in the reference it has a real CMS photo
 * hero (data we don't have — no image assets exist for use-case pages), but its
 * actual Hero component (`useCase/Hero`) doesn't use `HeroAnimation` either —
 * it's `UseCaseStack`, a hand-built inline SVG diagram, true in the reference
 * too. So for us that page's LCP element is the h1/SVG, needing no special
 * loading attributes — the same reason the reference itself exempts Cortex and
 * ScreenX (CSS/SVG heroes). `/solutions/industries/banks-sfbs` keeps its place:
 * its Hero genuinely renders through `HeroAnimation` (Phase 5b), so the
 * framed-hero fallback below applies to it for real.
 */
const PHOTO_HERO_PAGES = ["/solutions/industries/banks-sfbs"];

/**
 * The hero image this width actually paints, or null where the hero is not a
 * photo at all.
 *
 * `main img` first was reading whichever image came first in source order, and
 * below the mobile breakpoint that is the desktop composition's hero — present,
 * display:none, zero wide. The size check then compared a 640px fetch against a
 * 0px box and failed for a hero that was never on screen. Take the first image
 * with a box in the opening viewport instead, which is the LCP candidate on
 * every composition that has one.
 *
 * Scoped to `.hero-under-nav` (the hero section's own class), not all of
 * `main`: once the customer-logo roster got real images, a wide-enough
 * viewport (the `large` project, 1920x1080) fits the LogoGrid section's
 * marks above the fold too, and an unscoped search picked the first LOGO
 * as "the hero image" — correctly lazy-loaded, and correctly not eager,
 * which is exactly why it failed this hero-only assertion.
 */
async function heroPhoto(page) {
  return page.evaluate(() => {
    const scope = document.querySelector(".hero-under-nav") ?? document;
    const img = [...scope.querySelectorAll("img")].find((candidate) => {
      const box = candidate.getBoundingClientRect();
      return box.width > 0 && box.height > 0 && box.top < window.innerHeight;
    });
    if (!img) return null;
    const url = new URL(img.currentSrc, location.origin);
    return {
      loading: img.getAttribute("loading"),
      fetchpriority: img.getAttribute("fetchpriority"),
      requested: Number(url.searchParams.get("w")),
      rendered: img.getBoundingClientRect().width,
    };
  });
}

/**
 * The other kind of hero: pages whose hero is the design bundle in a framed
 * animation rather than a photo. Asserted rather than skipped, so a hero that
 * disappears entirely fails here instead of going quiet.
 */
async function expectFramedHero(page) {
  const frames = await page.$$eval(
    "iframe.animation-frame",
    (els) =>
      els.filter((el) => {
        const box = el.getBoundingClientRect();
        return box.width > 0 && box.height > 0;
      }).length
  );
  expect(frames, "this hero has neither a photo nor a framed animation").toBe(
    1
  );
}

for (const path of PHOTO_HERO_PAGES) {
  test.describe(`LCP: ${path}`, () => {
    test("the hero image is eager and high priority", async ({ page }) => {
      await page.goto(path);
      const hero = await heroPhoto(page);
      if (!hero) return expectFramedHero(page);
      expect(hero.loading).toBe("eager");
      expect(hero.fetchpriority).toBe("high");
    });

    test("does not fetch a hero variant far larger than it renders", async ({
      page,
    }) => {
      await page.goto(path);
      await page.waitForLoadState("networkidle");
      const hero = await heroPhoto(page);
      if (!hero) return expectFramedHero(page);
      const { requested, rendered } = hero;
      // 2x covers retina; beyond that the `sizes` hint has drifted from the
      // layout, which is exactly the bug this is here to catch.
      expect(requested).toBeLessThanOrEqual(rendered * 2 + 1);
    });
  });
}

test("everything below the fold stays lazy", async ({ page }) => {
  // Re-enabled: LogoGrid's customer roster now has real images (post-build
  // fix), so this page has something to assert against again.
  await page.goto("/solutions/industries/banks-sfbs");
  const lazy = await page.evaluate(
    () => [...document.images].filter((i) => i.loading === "lazy").length
  );
  expect(lazy).toBeGreaterThan(0);
});

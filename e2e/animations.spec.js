import fs from "node:fs";
import path from "node:path";
import { test, expect } from "@playwright/test";

// Guards the changes scripts/sync-hero-animations.mjs makes to the design
// bundles' own files. Every one of them is a CSS override, which means every one
// of them can be silently outranked by the next design drop — this asserts they
// still win, on the files we actually serve.
//
// Written after exactly that happened. The rotation pivot was pinned in 930ad8e
// with a bare `[data-scan-ring]` selector, which worked until the 24 Aug cut
// replaced device-intelligence.html with a file that namespaces every selector
// under its wrapper id. `#diHero [data-scan-ring]` is (1,1,0) against our
// (0,1,0), so the override stopped applying no matter the source order, the
// concentric rings went back to being non-concentric in Safari, and nothing in
// the diff or in any green gate said so. It surfaced only because someone looked
// at the page.

// Playwright runs from the repo root, so this resolves without import.meta —
// which these .js specs cannot use (the package is not type: module).
const ANIMATIONS_DIR = path.join(process.cwd(), "public/animations");

/**
 * The elements whose pivot the sync script pins.
 *
 * Kept as one flat selector rather than mirroring the override's own list: this
 * has to fail when a bundle brings in an element the override does NOT cover,
 * and a copy of the override's selectors could only ever agree with itself.
 */
const PINNED = [
  "[data-scan-ring]",
  "[data-breathe]",
  ".hf-core",
  ".hf-ripple",
  ".hf-spin",
  ".hf-spin-rev",
  ".nCore",
  ".nRipple",
  ".nSpin",
  ".nSpinRev",
].join(", ");

const files = fs
  .readdirSync(ANIMATIONS_DIR)
  .filter((f) => f.endsWith(".html"))
  .sort();

test.describe("hero animations — the sync script's overrides still win", () => {
  for (const file of files) {
    test(`${file} pins every rotation pivot to fill-box`, async ({ page }) => {
      await page.goto(`/animations/${file}`);
      // The controllers build and rebuild their artwork after load; a pivot that
      // only applies to the first paint is not a pivot that applies.
      await page.waitForTimeout(1500);

      const found = await page.$$eval(PINNED, (els) =>
        els.map((el) => ({
          box: getComputedStyle(el).transformBox,
          origin: getComputedStyle(el).transformOrigin,
        }))
      );

      // Not every animation has these elements, and that is fine — this asserts
      // about the ones that do, and the count is reported so a bundle that drops
      // them is visible rather than silently vacuous.
      test.info().annotations.push({
        type: "pinned elements",
        description: String(found.length),
      });

      for (const el of found) {
        // view-box is the value the bundles declare and the one Safari resolves
        // differently, which is the whole reason for the override.
        expect(el.box).toBe("fill-box");
        expect(el.origin).not.toBe("");
      }
    });
  }

  test("the harness caption never reaches the page", async ({ page }) => {
    // The 24 Aug cut labels each standalone with its own preview title. Framed,
    // it paints a stray grey line above the hero.
    for (const file of files) {
      await page.goto(`/animations/${file}`);
      const caption = page.locator(".stage > .cap");
      if ((await caption.count()) > 0) {
        await expect(caption.first()).toBeHidden();
      }
    }
  });

  test("no animation reserves more height than it paints", async ({ page }) => {
    /* The budget has to scale with the bundle. This walks every vendored
       animation, and the 2026-09-04 cut added five more — three flow
       documents of 1.1-1.4MB, the globe and the stacked hero. At a load
       plus 800ms settle each, the default 30s expired part-way through
       the list rather than on any assertion. */
    test.setTimeout(files.length * 3000);
    // The square-sequence heroes are fixed 1080x1080 artboards scaled down to
    // fit. A transform does not participate in layout, so without an explicit
    // height the document still reserves the full 1080 — which reaches a reader
    // as "the animation is too tall and there is white space after it". It did,
    // in Safari, because the frame is sized from painted rects and only Chromium
    // was giving the right answer by luck.
    //
    // Asserted on the square-sequence heroes only. They are the family that
    // sets its own document height, and the only one where body height is the
    // contract: the others let their document fill the frame and are sized from
    // painted rects instead, so a body as tall as the viewport is correct there.
    // At a phone's width, which is the only width this can be seen at: the
    // artboard is 1080 wide, so at a desktop viewport it scales UP and the
    // un-set height (1080) is SMALLER than what it paints. The bug is a
    // narrow-frame bug, and a guard that runs wide cannot fail.
    await page.setViewportSize({ width: 390, height: 844 });

    for (const file of files.filter((f) => f.endsWith("-mobile.html"))) {
      await page.goto(`/animations/${file}`);
      await page.waitForTimeout(1200);
      const { painted, document: docHeight } = await page.evaluate(() => {
        const root = [...window.document.body.children].find(
          (el) => !["STYLE", "SCRIPT", "LINK"].includes(el.tagName)
        );
        return {
          painted: root ? Math.round(root.getBoundingClientRect().height) : 0,
          document: Math.round(
            window.document.body.getBoundingClientRect().height
          ),
        };
      });
      // A document may be shorter than its artwork (things that paint outside
      // their box) but never meaningfully taller — that is reserved emptiness.
      expect(
        docHeight,
        `${file} reserves ${docHeight}px for ${painted}px of artwork`
      ).toBeLessThanOrEqual(Math.max(painted, 1) * 1.15 + 8);
    }
  });

  test("no animation is left scaling itself with zoom", async ({ page }) => {
    /* The budget has to scale with the bundle. This walks every vendored
       animation, and the 2026-09-04 cut added five more — three flow
       documents of 1.1-1.4MB, the globe and the stacked hero. At a load
       plus 800ms settle each, the default 30s expired part-way through
       the list rather than on any assertion. */
    test.setTimeout(files.length * 3000);
    // `zoom` is a Safari layout fault in the desktop hero ROWS: those fill
    // their host and wrap at a width they were not measured for, so the sync
    // script converts them to transform: scale(). This catches a row the
    // conversion misses.
    //
    // The square-sequence heroes are excluded, and keep their zoom on purpose.
    // They use it the other way round — on fixed-size pieces inside a fixed
    // 1080 artboard, scaled UP — where there is no responsive width for the
    // fault to bite, and where converting a fixed width to a percentage of its
    // parent visibly distorts the drawing. It did: that is what made the hero
    // stop matching the handoff.
    for (const file of files.filter((f) => !f.endsWith("-mobile.html"))) {
      await page.goto(`/animations/${file}`);
      await page.waitForTimeout(800);
      const zoomed = await page.$$eval(
        "body *",
        (els) =>
          els.filter((el) => {
            const z = Number.parseFloat(getComputedStyle(el).zoom);
            return z > 0 && z !== 1;
          }).length
      );
      expect(zoomed, `${file} still has zoomed elements`).toBe(0);
    }
  });
});

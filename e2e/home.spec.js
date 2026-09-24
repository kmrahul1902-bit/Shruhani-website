import { test, expect } from "@playwright/test";

// Runs once per breakpoint. Covers what jsdom cannot: the page assembling,
// real layout, and responsive behaviour.
//
// Adapted from the reference's e2e/home.spec.js + heroFrame.js:
// - No `config/routes.js` registry in this project (see plan/CLAUDE.md →
//   Decisions) — module/use-case paths are listed directly below instead.
// - No Strapi CMS, so `requireCmsMedia` always skips its assertion here —
//   kept anyway so the test still runs (and would tighten itself) the day
//   this project gets real media.
// - The hero/flow animations are a Phase 7 concern (`HeroAnimation` is a
//   static placeholder for now, no `<iframe>` at all) — the two tests that
//   asserted on framed animations are skipped with a reason rather than
//   faked into passing. See plan/docs/04-components-and-animations.md.
// - A few section/use-case heading assertions were rewritten against our
//   actual baked content (`src/content/home.json`), which text-differs from
//   the reference spec's expectations in a couple of places (e.g. Modules'
//   real heading is "Six signal modules. One verdict", not "Six sensing
//   modalities") — carried over as written, per guardrail #2.

const MODULE_PATHS = [
  "/products/modules/device-intelligence",
  "/products/modules/behavioural-biometrics",
  "/products/modules/digital-footprint",
  "/products/modules/image-intelligence",
  "/products/modules/location-intelligence",
  "/products/modules/sms-intelligence",
];

/**
 * True when the served page's imagery came from a CMS media host. This
 * project has none — no `public/logos/*` files exist yet either (see
 * `src/components/sections/LogoGrid/logoGrid.constants.js`) — so this is
 * always false today.
 */
async function cmsBackedMedia(page) {
  return (
    (await page.locator("main section").nth(1).locator("img[src]").count()) > 0
  );
}

const NO_CMS =
  "no CMS and no local logo image files yet (see logoGrid.constants.js TODO) — nothing to assert on";

async function requireCmsMedia(page) {
  const served = await cmsBackedMedia(page);
  if (!served) {
    test.skip(true, NO_CMS);
  }
}

test.describe("home page sections", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders every section in order", async ({ page }) => {
    await expect(
      page.getByRole("heading", { level: 1, name: /AI-Powered Fraud/ })
    ).toBeVisible();
    for (const name of [
      /Three intelligence suites/,
      /Six signal modules/,
      /Measured at the gate/,
      /Calibrated for the institutions/,
      /Run your last week/, // CtaBand, rendered by the root layout
    ]) {
      await expect(page.getByRole("heading", { level: 2, name })).toBeVisible();
    }
  });

  test("shows the partner logo strip caption", async ({ page }) => {
    // The roster has no image files yet — see logoGrid.constants.js — so
    // only the caption is assertable today.
    await expect(
      page.getByText(/Trusted by 20\+ banks, NBFCs & fintechs/)
    ).toBeVisible();
    await requireCmsMedia(page);
  });

  test("exposes the six intelligence modules as links", async ({ page }) => {
    for (const path of MODULE_PATHS) {
      await expect(
        page.locator(`main a[href="${path}"]`).first(),
        `the home page does not link to ${path}`
      ).toBeAttached();
    }
  });

  // Skipped: the hero's animated diagram is a static token-colored
  // placeholder (no <iframe>) until Phase 7 ports the real animation
  // bundles — see HeroAnimation.jsx and plan/docs/04.
  test("frames the home hero animation, decoratively", async () => {
    test.skip(true, "Phase 7 scope — HeroAnimation has no iframe yet");
  });
});

test.describe("use cases", () => {
  test("puts every use case on the page", async ({ page }) => {
    await page.goto("/");
    for (const heading of [
      /Stay one step ahead of fraudsters/,
      /See the person, not just the paperwork/,
      /Approve more, without taking on more risk/,
      /Clear every case faster with a trail you can defend/,
    ]) {
      await expect(page.getByText(heading).first()).toBeAttached();
    }
  });

  test("links each case to its own page", async ({ page }) => {
    await page.goto("/");
    for (const path of [
      "/solutions/use-cases/fraud",
      "/solutions/use-cases/onboarding",
      "/solutions/use-cases/credit-risk",
      "/solutions/use-cases/compliance",
    ]) {
      await expect(
        page.locator(`main a[href="${path}"]`).first()
      ).toBeAttached();
    }
  });
});

test.describe("product suites", () => {
  test("gives every suite its own heading and link", async ({ page }) => {
    await page.goto("/");
    await page
      .getByRole("heading", { name: /Three intelligence suites/ })
      .scrollIntoViewIfNeeded();

    for (const [copy, href] of [
      [/Score every new application/, "/products/screenx"],
      [/Watch every active account/, "/products/cortex"],
      [/Work the flag/, "/products/escalation"],
    ]) {
      const heading = page
        .getByRole("heading", { level: 3, name: copy })
        .filter({ visible: true });
      await expect(heading, `${href} has no visible heading`).toHaveCount(1);
      await expect(
        page.locator(`main a[href="${href}"]`).first(),
        `${href} is not linked`
      ).toBeAttached();
    }
  });

  // Skipped: same as the hero — no flow-animation bundles exist yet
  // (Phase 7). Products.jsx already guards on `item.animation`, which is
  // absent from our content, so no <iframe> renders for any suite.
  test("frames a flow animation for every suite", async () => {
    test.skip(true, "Phase 7 scope — no flow-animation bundles ported yet");
  });
});

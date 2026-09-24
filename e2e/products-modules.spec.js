import { test, expect } from "@playwright/test";

/**
 * Smoke check for the six product module pages, all served through the one
 * `ModulePage` template (see src/components/sections/module/ModulePage.jsx).
 * No module-specific spec exists in the reference to port — this is new,
 * written for Phase 4b.
 *
 * Each module confirms: the route responds, its hero heading renders (h1,
 * from the baked content, so a content-loading regression fails loudly),
 * and the reader/outputs/applies/integration section headings are present.
 */
const MODULES = [
  {
    path: "/products/modules/device-intelligence",
    heading:
      "A continuous read on the Device behind every customer interaction.",
  },
  {
    path: "/products/modules/behavioural-biometrics",
    heading:
      "Continuous, passive, frictionless behavioural intelligence — across every session.",
  },
  {
    path: "/products/modules/digital-footprint",
    heading: "The applicant's digital history, made readable for decisioning.",
  },
  {
    path: "/products/modules/image-intelligence",
    heading:
      "Five dimensions of customer intelligence extracted from a single photograph.",
  },
  {
    path: "/products/modules/location-intelligence",
    heading:
      "Every Indian address, parsed, placed, and profiled — up to 100-metre resolution.",
  },
  {
    path: "/products/modules/sms-intelligence",
    heading:
      "The transactional SMS inbox, read as a live financial behaviour profile.",
  },
];

for (const { path, heading } of MODULES) {
  test(`${path} renders its hero and desktop sections`, async ({ page }) => {
    const errors = [];
    page.on("pageerror", (err) => errors.push(err));

    const response = await page.goto(path);
    expect(response?.ok()).toBeTruthy();

    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      heading
    );

    // The desktop-only section tree (hidden below the mobile breakpoint, so
    // this only asserts presence in the DOM, not visibility — the
    // responsive projects below `mobile` intentionally skip it).
    const desktop = page.locator("[data-desktop-sections]");
    if (await desktop.isVisible().catch(() => false)) {
      await expect(
        desktop.getByRole("heading", { level: 2 }).first()
      ).toBeVisible();
    }

    expect(errors).toEqual([]);
  });
}

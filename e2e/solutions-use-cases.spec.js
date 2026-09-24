import { test, expect } from "@playwright/test";

/**
 * Smoke check for the solutions hub and the four use-case pages, all served
 * through the one useCase section set (Hero/Split/Scenarios/Capabilities —
 * see src/components/sections/useCase/). No spec for these exists in the
 * reference to port — new for Phase 5a.
 */
test("/solutions renders its hero", async ({ page }) => {
  const errors = [];
  page.on("pageerror", (err) => errors.push(err));

  const response = await page.goto("/solutions");
  expect(response?.ok()).toBeTruthy();

  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "One platform. Every risk decision"
  );
  // exact: the page also renders the site-wide closing CtaBand ("Book a
  // demo →"), so an unscoped/substring match resolves to both and fails
  // strict mode — the hero's own CTA has no arrow.
  await expect(
    page.getByRole("link", { name: "Book a demo", exact: true })
  ).toBeVisible();

  expect(errors).toEqual([]);
});

const USE_CASES = [
  { path: "/solutions/use-cases/fraud", heading: "The fraud evolved" },
  { path: "/solutions/use-cases/credit-risk", heading: "A second read on risk" },
  {
    path: "/solutions/use-cases/onboarding",
    heading: "Every customer decision begins at onboarding",
  },
  { path: "/solutions/use-cases/compliance", heading: "The regulatory clock" },
];

for (const { path, heading } of USE_CASES) {
  test(`${path} renders its hero and desktop sections`, async ({ page }) => {
    const errors = [];
    page.on("pageerror", (err) => errors.push(err));

    const response = await page.goto(path);
    expect(response?.ok()).toBeTruthy();

    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      heading
    );

    // Scenarios' tablist — the one client-interactive piece on these pages.
    const tablist = page.getByRole("tablist");
    if (await tablist.isVisible().catch(() => false)) {
      await expect(tablist.getByRole("tab").first()).toHaveAttribute(
        "aria-selected",
        "true"
      );
    }

    // The desktop-only section tree (hidden below the mobile breakpoint, so
    // this only asserts presence in the DOM, not visibility).
    const desktop = page.locator("[data-desktop-sections]");
    if (await desktop.isVisible().catch(() => false)) {
      await expect(
        desktop.getByRole("heading", { level: 2 }).first()
      ).toBeVisible();
    }

    expect(errors).toEqual([]);
  });
}

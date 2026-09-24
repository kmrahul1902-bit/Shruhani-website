import { test, expect } from "@playwright/test";

/**
 * Smoke check for About, Investors & Partners, and FAQ. No spec for these
 * exists in the reference to port — new for Phase 6a.
 */
test("/about renders its hero and the TODO(verify) sections", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (err) => errors.push(err));

  const response = await page.goto("/about");
  expect(response?.ok()).toBeTruthy();

  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Building the AI-first customer decisioning layer for BFSI."
  );

  // Confirms the TODO(verify)-flagged investor/cert content is actually
  // present in the rendered page, not silently dropped by an adapter bug.
  await expect(page.getByText("Cedar Hill Capital").first()).toBeVisible();
  await expect(page.getByText("ISO 27001:2022")).toBeVisible();

  expect(errors).toEqual([]);
});

test("/investors-partners renders its hero and investor roster", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (err) => errors.push(err));

  const response = await page.goto("/investors-partners");
  expect(response?.ok()).toBeTruthy();

  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "The investors and partners behind Shruhani."
  );
  await expect(page.getByText("Smile Group").first()).toBeVisible();
  // The four angel investor cards.
  await expect(page.getByRole("listitem").filter({ hasText: "Rajesh Sawhney" })).toBeVisible();

  expect(errors).toEqual([]);
});

test("/faq renders its hero and accordion", async ({ page }) => {
  const errors = [];
  page.on("pageerror", (err) => errors.push(err));

  const response = await page.goto("/faq");
  expect(response?.ok()).toBeTruthy();

  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Frequently asked questions."
  );

  // The first row starts open.
  const firstAnswer = page.getByRole("region").first();
  await expect(firstAnswer).toBeVisible();

  // Clicking a closed row opens it and closes the first (single-open).
  const secondQuestion = page.getByRole("button", {
    name: /Does Shruhani replace our existing fraud or KYC stack\?/,
  });
  await secondQuestion.click();
  await expect(secondQuestion).toHaveAttribute("aria-expanded", "true");

  expect(errors).toEqual([]);
});

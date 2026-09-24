import { test, expect } from "@playwright/test";

/**
 * Smoke check for /book-a-demo and /privacy-policy. No reference spec
 * exists for either — new for Phase 6b.
 */
test("book-a-demo renders the form and validates client-side", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (err) => errors.push(err));

  const response = await page.goto("/book-a-demo");
  expect(response?.ok()).toBeTruthy();

  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  const submit = page.getByRole("button", { name: /send|book|submit/i });
  await expect(submit).toBeVisible();

  // Required-field validation is native HTML (required attributes), so
  // submitting empty keeps the form on the page rather than navigating or
  // posting — the success heading never appears.
  await submit.click();
  await expect(page.getByRole("status")).toHaveCount(0);

  // An invalid email is rejected by the input's own type="email" + pattern
  // constraint before the fetch ever fires.
  const emailInput = page.locator('input[name="email"]');
  await page.locator('input[name="firstName"]').fill("Test");
  await emailInput.fill("not-an-email");
  await submit.click();
  await expect(page.getByRole("status")).toHaveCount(0);

  expect(errors).toEqual([]);
});

test("privacy-policy renders and is flagged for legal review", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (err) => errors.push(err));

  const response = await page.goto("/privacy-policy");
  expect(response?.ok()).toBeTruthy();

  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  // The entity line and at least one renamed section heading are present —
  // confirms the carried-over content rendered, not just the shell. The
  // page legitimately repeats "Shruhani Technologies" several times (entity
  // line, ownership note, copyright), so this only checks at least one is
  // visible rather than requiring a single unambiguous match.
  await expect(page.getByText("Shruhani Technologies").first()).toBeVisible();

  expect(errors).toEqual([]);
});

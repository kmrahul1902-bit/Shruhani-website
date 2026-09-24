import fs from "node:fs";
import { defineConfig, devices } from "@playwright/test";

// Next loads .env.local for the server it starts, but this process does not see
// it — and the asset-dependent specs need to know whether a CMS is configured to
// decide between asserting and skipping. In CI the same variables arrive as step
// env, so loading the file here makes local runs behave like CI rather than
// silently skipping the imagery coverage.
if (fs.existsSync(".env.local")) process.loadEnvFile(".env.local");

// Every E2E/responsive test runs once per breakpoint below. Keep this matrix
// in sync with CLAUDE.md § Responsive Design.
const BREAKPOINTS = [
  { name: "mobile", width: 375, height: 667 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "laptop", width: 1024, height: 768 },
  { name: "desktop", width: 1440, height: 900 },
  { name: "large", width: 1920, height: 1080 },
];

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,

  // Playwright defaults to ONE worker under CI, which is what turned this suite
  // into a 2h22m job: 1730 tests (346 specs x 5 breakpoints) run end to end on a
  // single core. The runners have 4 vCPU and the app server needs one of them.
  workers: process.env.CI ? 3 : undefined,

  // Bound the damage when something is systemically broken. Every failure costs
  // three attempts under `retries`, so a run where the CMS is unreachable used
  // to grind through 178 failures x 3 before reporting -- most of the 2h22m. The
  // 25th failure is well past the point where the pattern is obvious.
  maxFailures: process.env.CI ? 25 : 0,

  // "github" alone writes annotations and NO report directory, so the workflow's
  // upload step had nothing to collect and warned on every run. The html
  // reporter is what fills playwright-report/.
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",

  // Dedicated port so tests never reuse an unrelated dev server on :3000.
  use: {
    baseURL: "http://localhost:3100",
    // retain-on-failure, not on-first-retry: a test that fails every attempt
    // should leave a trace, and one that only fails intermittently should not
    // have its evidence discarded the moment a retry passes.
    trace: "retain-on-failure",
  },

  // One project per breakpoint — Chromium only.
  projects: BREAKPOINTS.map(({ name, width, height }) => ({
    name,
    use: { ...devices["Desktop Chrome"], viewport: { width, height } },
  })),

  // Build once, serve the production output — closest to what users get.
  webServer: {
    command: "npm run build && npm run start -- -p 3100",
    url: "http://localhost:3100",
    reuseExistingServer: !process.env.CI,
    // The command builds before it serves. 120s was comfortable only while CI
    // built with no CMS configured and had almost nothing to prerender; a build
    // that actually renders the 44 articles needs considerably more room.
    timeout: 300_000,
  },
});

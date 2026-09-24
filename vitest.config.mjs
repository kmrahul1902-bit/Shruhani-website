import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

// Unit / component / integration tests (jsdom). E2E lives in ./e2e (Playwright).
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    globals: false,
    setupFiles: ["./vitest.setup.js"],
    // scripts/ too: the CMS migration helpers keep their transform as a pure
    // exported function precisely so it can be tested, and until now nothing
    // ran those tests.
    include: [
      "src/**/*.{test,spec}.{js,jsx}",
      "scripts/**/*.{test,spec}.{js,mjs}",
    ],
    exclude: ["node_modules", ".next", "e2e"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["src/**/*.{js,jsx}"],
      exclude: [
        "src/**/*.{test,spec}.{js,jsx}",
        "src/**/index.js",
        "src/app/**/{layout,page,loading,error,not-found}.js",
      ],
      // Thresholds are intentionally unset while the codebase is small.
      // Raise them as real code lands (see CLAUDE.md § Testing).
    },
  },
});

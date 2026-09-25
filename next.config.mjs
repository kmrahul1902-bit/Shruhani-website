/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Static export — Phase 8 hosting decision, revisited and finalized (see
   * CLAUDE.md → Decisions): GitHub Pages via a static `out/` build, not a
   * Node server. This is why `src/app/api/demo-request/route.js` is gone
   * (the form posts to Formspree directly instead — see ContactForm.jsx)
   * and why `redirects()`/`headers()` below are gone too: static export
   * supports neither (there's no server to run them against a request) —
   * see `node_modules/next/dist/docs/01-app/02-guides/static-exports.md`
   * → Unsupported Features.
   */
  output: "export",

  /**
   * The default `next/image` loader calls `/_next/image`, a server route
   * that doesn't exist on a static host. `unoptimized: true` makes
   * `next/image` emit a plain `<img>` at the source resolution instead —
   * no CDN loader is configured, so this is the only export-compatible
   * option (see the static-exports doc's Image Optimization section).
   */
  images: {
    unoptimized: true,
  },

  /**
   * Next.js 16 auto-injects an "agent rules" block into CLAUDE.md (or
   * AGENTS.md) on every `next dev`/`next build`. This repo's CLAUDE.md is
   * hand-curated by the revamp plan — disable the auto-injection so it
   * doesn't get rewritten into it.
   */
  agentRules: false,

  /**
   * There's an unrelated package-lock.json in the user's home directory
   * (C:\Users\Infinix), above this repo. Without this, Turbopack finds it
   * during root inference and warns on every build. Pinning root to this
   * repo is the fix Next.js itself suggests.
   */
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;

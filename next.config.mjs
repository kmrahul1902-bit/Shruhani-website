/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Full dynamic Next.js app for now — Phase 0 hosting decision (see
   * CLAUDE.md → Decisions). Do NOT set `output: 'export'` until the Phase 8
   * hosting decision is revisited: the default server output is what lets
   * `src/app/api/` route handlers run.
   */

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

  /**
   * `X-Robots-Tag` for every response on a deployment that should not be
   * indexed (e.g. a preview/staging build). robots.txt and per-page `robots`
   * metadata only cover HTML; this reaches every response.
   */
  async headers() {
    if (process.env.DISABLE_INDEXING !== "true") return [];
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
        ],
      },
    ];
  },
};

export default nextConfig;

"use client";

import { useEffect } from "react";
import Link from "next/link";

/**
 * `/home` is a common guess for the landing page URL (nav muscle memory
 * from other sites) — redirect rather than 404 it.
 *
 * Previously a `next.config.mjs` `redirects()` entry; moved here because
 * static export doesn't support `redirects()` (no server to evaluate it
 * against a request) — see next.config.mjs's note.
 *
 * A Server Component `redirect("/")` was tried first, but under static
 * export it silently bakes the destination page's full HTML into this
 * route's output with no client-side navigation trigger anywhere in the
 * emitted flight payload (verified: no meta-refresh, no NEXT_REDIRECT
 * marker) — so the address bar would stay on `/home` forever, not a real
 * redirect. This does it explicitly instead, client-side, once mounted.
 * `location.replace` rather than `.href` so this page doesn't enter
 * browser history (back button shouldn't land here).
 */
export default function HomeRedirect() {
  useEffect(() => {
    window.location.replace("/");
  }, []);

  return (
    <p className="p-8 text-center">
      Redirecting to <Link href="/">shruhani.com</Link>…
    </p>
  );
}

"use client";

import { usePathname } from "next/navigation";

/**
 * Hides the closing CTA band on routes that opt out of it — just
 * `/book-a-demo`, which already carries the primary CTA itself.
 *
 * Simplified from the reference's `NO_CLOSING_CTA_PATHS` route-registry set
 * (this project has no routes registry — see plan/CLAUDE.md → Decisions).
 */
const NO_CLOSING_CTA_PATHS = new Set(["/book-a-demo"]);

export default function CtaBandGate({ children }) {
  const pathname = usePathname();
  if (NO_CLOSING_CTA_PATHS.has(pathname)) return null;
  return children;
}

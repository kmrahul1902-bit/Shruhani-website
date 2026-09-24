"use client";

import { usePathname } from "next/navigation";
import MaybeLink from "@/components/ui/MaybeLink";
import { isCurrentPath } from "@/components/layout/Header/header.helpers";
import { cn } from "@/lib/cn";

/**
 * A sitemap link that marks itself when it names the page you are on.
 *
 * `isCurrentPath` is the header's, deliberately — the two chromes should not
 * disagree about which page is current.
 *
 * Rendered through MaybeLink rather than `next/link` directly: an href that
 * fails to resolve renders a span instead of throwing.
 */
export default function FooterLink({ href, children }) {
  const pathname = usePathname();
  const current = isCurrentPath(pathname, href);

  return (
    <MaybeLink
      href={href}
      aria-current={current ? "page" : undefined}
      className={cn(
        "focus-ring",
        current ? "text-white" : "text-on-dark-body hover:text-white"
      )}
    >
      {children}
    </MaybeLink>
  );
}

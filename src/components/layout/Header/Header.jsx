"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Logo from "@/components/shared/Logo";
import { cn } from "@/lib/cn";
import { useHeaderScroll } from "./hooks/useHeaderScroll";
import MegaMenu from "./MegaMenu";
import MobileDrawer from "./MobileDrawer";
import { mainNav, navCopy, site } from "./header.nav";

/**
 * Nav treatment, at rest and once scrolled.
 *
 * Simplified from the reference: it themes the bar per-route (a different
 * treatment for each product/industry page, keyed off that page's hero
 * wash). None of those pages exist yet — Phases 3-6 build them — so this
 * project uses one treatment everywhere for now: glass at rest, solid white
 * scrolled. Revisit per-route theming once product/industry hero sections
 * land.
 */
const NAV_THEME = {
  rest: "bg-nav-glass backdrop-blur-lg",
  scrolled: "border-border shadow-nav bg-nav-solid border-b backdrop-blur-lg",
};

/** Site header — the ONLY client island in the shell. */
export default function Header() {
  const pathname = usePathname();
  const { scrolled, showCta } = useHeaderScroll();

  return (
    <header
      className={cn(
        "motion-safe:nav-transition sticky top-0 z-50",
        scrolled ? NAV_THEME.scrolled : NAV_THEME.rest,
        !scrolled && "max-mob:bg-transparent max-mob:backdrop-blur-none",
        scrolled && "max-mob:bg-white max-mob:shadow-nav-mob"
      )}
    >
      <div className="container-fluid max-mob:h-16 max-mob:px-4 flex h-18 items-center justify-between gap-6">
        <Link href="/" className="focus-ring rounded-lg">
          <Logo />
        </Link>

        <MegaMenu nav={mainNav} pathname={pathname} />

        <div className="flex items-center gap-3">
          <span
            aria-hidden={!showCta}
            className={cn(
              "max-mob:hidden motion-safe:transition-opacity motion-safe:duration-300",
              !showCta && "pointer-events-none opacity-0"
            )}
          >
            <Button
              href={site.demoHref}
              className="whitespace-nowrap"
              size="sm"
              tabIndex={showCta ? undefined : -1}
            >
              {navCopy.demo}
            </Button>
          </span>
          <Button
            variant="soft"
            size="sm"
            href={site.loginUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="nav:inline-flex hidden"
          >
            {navCopy.login}
          </Button>
          <MobileDrawer pathname={pathname} />
        </div>
      </div>
    </header>
  );
}

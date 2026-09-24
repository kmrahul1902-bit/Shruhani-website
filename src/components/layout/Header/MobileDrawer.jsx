"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import Button from "@/components/ui/Button";
import { Accordion } from "@/components/ui/accordion";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/cn";
import { mobileNav, navCopy, site } from "./header.nav";
import DrawerCategory from "./DrawerCategory";
import { HamburgerBars } from "./mobileDrawer.icons";
import { isCurrentPath } from "./header.helpers";

/**
 * The mobile navigation drawer — a Sheet (Radix Dialog), full-screen, with
 * its own back-button header rather than Sheet's corner X.
 */
const DEFAULT_OPEN_CATEGORY = "products";

export default function MobileDrawer({ pathname }) {
  const [open, setOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(DEFAULT_OPEN_CATEGORY);
  const close = () => setOpen(false);

  const categories = mobileNav.filter((item) => item.type === "category");
  const links = mobileNav.filter((item) => item.type === "link");

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className="hamburger focus-ring text-ink nav:hidden"
        data-open={open}
        aria-label={navCopy.openMenu}
      >
        <HamburgerBars />
      </SheetTrigger>

      <SheetContent
        side="right"
        showCloseButton={false}
        className="flex w-full max-w-none flex-col bg-white p-0 sm:max-w-none"
      >
        <div className="border-border sticky top-0 z-10 flex h-15 shrink-0 items-center gap-2 border-b bg-white px-5">
          <button
            type="button"
            onClick={close}
            aria-label={navCopy.backLabel}
            className="focus-ring text-ink -ml-2 flex h-11 w-11 items-center justify-center rounded-lg"
          >
            <ChevronLeft size={22} aria-hidden="true" />
          </button>
          <SheetTitle className="text-ink-slate text-base font-semibold">
            {navCopy.menuTitle}
          </SheetTitle>
        </div>

        <nav
          aria-label={navCopy.menuTitle}
          className="flex-1 overflow-y-auto px-5"
        >
          <Accordion
            type="single"
            collapsible
            value={openCategory}
            onValueChange={setOpenCategory}
          >
            {categories.map((category) => (
              <DrawerCategory
                key={category.key}
                category={category}
                onNavigate={close}
                pathname={pathname}
              />
            ))}
          </Accordion>

          {links.map((item) => {
            const current = isCurrentPath(pathname, item.href);
            return (
              <Link
                key={item.key}
                href={item.href}
                onClick={close}
                aria-current={current ? "page" : undefined}
                className={cn(
                  "drawer-link border-border focus-ring block border-b font-semibold",
                  current && "text-blue"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-border flex shrink-0 flex-col gap-3 border-t bg-white px-5 py-4">
          <Button href={site.demoHref} className="w-full" onClick={close}>
            {navCopy.demo}
          </Button>
          <a
            href={site.loginUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            onClick={close}
            className="focus-ring border-border-strong text-ink-slate flex min-h-11 w-full items-center justify-center rounded-full border px-5 font-semibold"
          >
            {navCopy.login}
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}

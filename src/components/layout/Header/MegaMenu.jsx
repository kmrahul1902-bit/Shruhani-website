import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/cn";
import { isCurrentPath, isItemCurrent } from "./header.helpers";
import { MegaIcon } from "./megaMenu.icons";
import { navCopy } from "./header.nav";

/**
 * Simplified from the reference: no third "featured article" column — this
 * project has no blog/resources content wired yet (Phase 2 scope). Each
 * panel is just the two link columns.
 */
const PANEL_BOX = "container-wide pt-11 pb-13";
const PANEL_GRID = "grid-cols-2";

const TRIGGER_HIT_AREA = "hit-area [--hit-top:18px] [--hit-bottom:36px]";
const LINK_HIT_AREA = "hit-area [--hit-y:18px]";
const HOVER_DELAY_MS = 90;
const HOVER_SKIP_MS = 400;

function MegaColumn({ group, pathname }) {
  return (
    <div>
      <p className="text-eyebrow tracking-label text-faint mb-3.5 pl-2.5 uppercase">
        {group.eyebrow}
      </p>
      <ul>
        {group.items.map((item) => {
          const current = isCurrentPath(pathname, item.href);
          return (
            <li key={item.key}>
              <NavigationMenuLink asChild>
                <Link
                  href={item.href}
                  aria-current={current ? "page" : undefined}
                  className={cn(
                    "rounded-tile focus-ring group/row flex items-center gap-3.5 px-2.5 py-2 transition-colors duration-150",
                    current ? "bg-blue-wash" : "hover:bg-surface-hover"
                  )}
                >
                  <span
                    className={cn(
                      "rounded-field text-blue flex size-10 shrink-0 items-center justify-center",
                      current ? "bg-blue-tint" : "bg-surface-3"
                    )}
                  >
                    <MegaIcon name={item.icon} />
                  </span>
                  <span className="flex flex-col">
                    <strong
                      className={cn(
                        "text-body-md font-medium transition-colors duration-150",
                        current
                          ? "text-blue"
                          : "text-menu-title group-hover/row:text-ink"
                      )}
                    >
                      {item.label}
                    </strong>
                    <span className="text-body-sm text-menu-sub mt-0.5">
                      {item.description}
                    </span>
                  </span>
                </Link>
              </NavigationMenuLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function MegaMenu({ nav, pathname }) {
  return (
    <NavigationMenu
      aria-label={navCopy.mainLabel}
      delayDuration={HOVER_DELAY_MS}
      skipDelayDuration={HOVER_SKIP_MS}
      className="nav-menu-stretch nav:block static hidden max-w-none"
      viewportWrapperClassName="right-0 left-0 w-full translate-x-0"
      viewportClassName="border-hairline shadow-menu w-full max-w-none rounded-none border-t bg-white"
    >
      <NavigationMenuList className="h-full items-stretch gap-4">
        {nav.map((item) => {
          if (item.type !== "mega") {
            return (
              <NavigationMenuItem
                key={item.key}
                className="nav-tab-underline self-stretch"
                data-current={isItemCurrent(pathname, item) || undefined}
              >
                <NavigationMenuLink asChild>
                  <Link
                    href={item.href}
                    aria-current={
                      isItemCurrent(pathname, item) ? "page" : undefined
                    }
                    className={cn(
                      "text-body-md focus-ring relative flex h-full items-center px-3.5 font-medium transition-colors duration-150",
                      LINK_HIT_AREA,
                      isItemCurrent(pathname, item) ? "text-blue" : "text-ink"
                    )}
                  >
                    {item.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          }

          return (
            <NavigationMenuItem
              key={item.key}
              className="nav-tab-underline self-stretch"
              data-current={isItemCurrent(pathname, item) || undefined}
            >
              <NavigationMenuTrigger
                className={cn(
                  "text-body-md focus-ring relative h-full gap-1.5 bg-transparent px-3.5 py-2.5 font-medium hover:bg-transparent data-[state=open]:bg-transparent",
                  TRIGGER_HIT_AREA,
                  isItemCurrent(pathname, item) ? "text-blue" : "text-ink"
                )}
              >
                {item.label}
              </NavigationMenuTrigger>
              <NavigationMenuContent className={PANEL_BOX}>
                <div className={`grid gap-7.5 ${PANEL_GRID}`}>
                  {item.groups.map((group) => (
                    <MegaColumn
                      key={group.key}
                      group={group}
                      pathname={pathname}
                    />
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

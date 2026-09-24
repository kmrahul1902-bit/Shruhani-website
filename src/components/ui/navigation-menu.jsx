import * as React from "react";
import { cva } from "class-variance-authority";
import { ChevronDownIcon } from "lucide-react";
import { NavigationMenu as NavigationMenuPrimitive } from "radix-ui";
import { cn } from "@/lib/cn";

function NavigationMenu({
  className,
  children,
  viewport = true,
  viewportClassName,
  // The positioning wrapper AROUND the viewport. Separate from
  // viewportClassName because the two do different jobs: that one styles the
  // panel, this one places it. A full-bleed panel has to override the
  // wrapper's centring, which no class on the panel itself can reach.
  viewportWrapperClassName,
  ...props
}) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      data-viewport={viewport}
      className={cn(
        "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
        // caller may pass `static` so a viewport can centre on an ancestor
        className
      )}
      {...props}
    >
      {children}
      {viewport && (
        <NavigationMenuViewport
          className={viewportClassName}
          wrapperClassName={viewportWrapperClassName}
        />
      )}
    </NavigationMenuPrimitive.Root>
  );
}

function NavigationMenuList({ className, ...props }) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn(
        "group flex flex-1 list-none items-center justify-center gap-1",
        className
      )}
      {...props}
    />
  );
}

function NavigationMenuItem({ className, ...props }) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn("relative", className)}
      {...props}
    />
  );
}

// Behaviour only, for the same reason as NavigationMenuLink below: upstream
// styled this as a pill (h-9, rounded-md, bg-white, px-4 py-2, text-sm, and
// bg/text colours for hover, focus and open). Some of those a caller cannot
// reach at all — `data-[state=open]:hover:bg-surface` is a compound variant, so
// neither `hover:` nor `data-[state=open]:` alone dedupes against it and the
// pill background reappeared whenever an open trigger was hovered. The look is
// the caller's.
const navigationMenuTriggerStyle = cva(
  "group inline-flex w-max items-center justify-center transition outline-none focus-visible:ring-2 focus-visible:ring-muted/50 focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50"
);

function NavigationMenuTrigger({ className, children, ...props }) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle(), "group", className)}
      {...props}
    >
      {children}
      {""}
      <ChevronDownIcon
        className="relative top-px size-2.75 transition duration-300 group-data-[state=open]:rotate-180"
        strokeWidth={1.4}
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  );
}

function NavigationMenuContent({ className, ...props }) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        // Motion only. The upstream copy also set `top-0 left-0 w-full p-2
        // pr-2.5 md:absolute md:w-auto` — sizing and positioning for a small
        // dropdown. Removed rather than overridden: they hide behind md: and
        // group-data: variants, which tailwind-merge cannot dedupe against a
        // caller's base classes, so a consumer could never win. Layout now
        // belongs to the caller (or to the viewport, when one is used).
        "data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 data-[motion^=from-]:animate-in data-[motion^=from-]:fade-in data-[motion^=to-]:animate-out data-[motion^=to-]:fade-out",
        "group-data-[viewport=false]/navigation-menu:border-border group-data-[viewport=false]/navigation-menu:text-ink group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95 group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-md group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:bg-white group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:duration-200 **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none",
        className
      )}
      {...props}
    />
  );
}

function NavigationMenuViewport({ className, wrapperClassName, ...props }) {
  return (
    // `left-1/2 -translate-x-1/2` instead of upstream's `left-0`: the panel is
    // centred on its positioned ancestor. Give the Root `static` and that
    // ancestor becomes the header, which is how a full-width mega panel centres
    // on the page rather than on the nav cluster.
    //
    // `pointer-events-none`, with the panel itself opting back in below. This
    // div is positioning and nothing else, but it is z-50 and its box includes
    // the panel's top offset — so it was catching the pointer in the band
    // between the nav and the panel, where it is neither trigger nor content,
    // and Radix closed the menu on the way down. Transparent to the pointer, it
    // hands that band back to the trigger's own hit area underneath.
    <div
      className={cn(
        "pointer-events-none absolute top-full left-1/2 isolate z-50 flex -translate-x-1/2 justify-center",
        wrapperClassName
      )}
    >
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        className={cn(
          // Radix drives height/width from the active content, which is what
          // animates the panel between panels of different sizes. Border,
          // radius, shadow and background are the caller's.
          "origin-top-center text-ink data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:zoom-in-90 pointer-events-auto relative h-[var(--radix-navigation-menu-viewport-height)] w-[var(--radix-navigation-menu-viewport-width)]",
          className
        )}
        {...props}
      />
    </div>
  );
}

function NavigationMenuLink({ className, ...props }) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        // Behaviour only — focus/active states, no layout or typography.
        //
        // Upstream also shipped `flex flex-col gap-1 rounded-sm p-2 text-sm`
        // plus a hover background: a look for shadcn's stacked list items.
        // Those CANNOT be overridden by a caller here, because this component is
        // used with `asChild` and Radix's Slot concatenates the two class
        // strings instead of running them through tailwind-merge. Both classes
        // survive and CSS source order decides, so `text-sm` beat a caller's
        // `text-body-md` and `flex-col` stacked every icon above its label.
        // Deleted rather than fought; the caller owns the look.
        "focus-visible:ring-muted/50 data-[active=true]:text-ink transition-all outline-none focus-visible:ring-2 focus-visible:outline-1",
        className
      )}
      {...props}
    />
  );
}

function NavigationMenuIndicator({ className, ...props }) {
  return (
    <NavigationMenuPrimitive.Indicator
      data-slot="navigation-menu-indicator"
      className={cn(
        "data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:animate-in data-[state=visible]:fade-in top-full z-10 flex h-1.5 items-end justify-center overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="bg-surface-2 relative top-3/5 h-2 w-2 rotate-45 rounded-tl-sm shadow-md" />
    </NavigationMenuPrimitive.Indicator>
  );
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
};

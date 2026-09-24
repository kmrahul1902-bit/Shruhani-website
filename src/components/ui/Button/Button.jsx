import { cva } from "class-variance-authority";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  // pill shape, focus ring, subtle lift — shared by every variant (design §10)
  "focus-ring inline-flex items-center justify-center rounded-pill font-semibold transition-all duration-150 hover:-translate-y-px",
  {
    variants: {
      variant: {
        // actions are blue or ink — NEVER the accent (design §2)
        primary: "bg-blue text-white hover:bg-blue-hover",
        dark: "bg-ink text-white hover:bg-ink-hover",
        outline:
          "border-1-5 border-ink bg-transparent text-ink hover:bg-ink hover:text-white",
        // soft outline pill — header "Log in" affordance (shared-shell spec)
        soft: "border border-border-strong bg-transparent text-ink hover:bg-surface",
        // ghost affordance is a growing gap (for its icon), not a bg change
        ghost: "gap-2 bg-transparent text-ink hover:gap-3",
        // Secondary action on a dark surface (mockup .df-btn-ghost) — glass,
        // not an outline. `soft` is the same idea on light ground, but its
        // grey border and surface hover disappear against black.
        "on-dark":
          "border border-white/15 bg-white/8 text-white hover:bg-white/14",
      },
      size: {
        sm: "px-6.5 py-3.5 text-sm",
        md: "px-7 py-3.5 text-base",
        // hero CTA (mockup .btn-pill) — flat leading, see the token comment
        lg: "text-body-md px-8 py-4.5",
        // The design system's base pill, unmodified (mockup .btn-pill): 16px
        // at 16/30. The home hero pads it out to 18/32; the industry pages use
        // it as-is.
        pill: "text-body-md gap-2 px-7.5 py-4 whitespace-nowrap",
        // "Know more" affordance (mockup .btn-know): 15px at metric-default
        // leading, with a gap that grows on hover like the ghost variant's.
        action: "text-body-md gap-1.5 px-6.5 py-3.5 hover:gap-2.5",
        // the same affordance one step down, for inside a card (mockup .case-btn)
        "action-sm": "text-body-sm gap-2 px-5.5 py-3 hover:gap-3",
        // Squared CTA (mockup .howx-cta) — the one button in the design that is
        // not a pill, so it overrides the base `rounded-pill` rather than
        // adding a variant nobody else would use.
        block: "text-body-md gap-2.5 rounded-tile px-7.5 py-4 font-bold",
        // Product-page hero CTA (mockup .hero-actions .btn-pill) — the pill at
        // 15px, one step down from home's `lg`, which the product heroes use
        // because their headline block is narrower.
        hero: "text-body-md gap-2 px-7.5 py-4",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

/**
 * Single configurable button. Renders an <a> when `href` is set, otherwise a
 * <button> (see CLAUDE.md § Component Architecture — one component, not many).
 */
export default function Button({
  variant,
  size,
  href,
  type = "button",
  className,
  children,
  ...props
}) {
  const classes = cn(buttonVariants({ variant, size }), className);

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}

"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { cn } from "@/lib/cn";

/**
 * shadcn's Accordion, retinted to our tokens. Vendor file — lowercase name, see
 * CLAUDE.md.
 *
 * The mobile handoffs drive their accordions with `max-height` on a fixed
 * ceiling (320px in the drawer, 900px on the modules). That is the prototype's
 * technique, not its design: a fixed ceiling makes the easing depend on how much
 * shorter than the ceiling the panel happens to be, and silently clips anything
 * taller. Radix measures the panel and publishes it as
 * `--radix-accordion-content-height`, so the same motion runs on the real height
 * at the design's own duration and curve. The numbers are the design's; the
 * mechanism is ours, which is what the parity audit is set up to prove.
 *
 * It also brings the semantics the prototype has no way to express: a real
 * button per header, `aria-expanded`, a labelled region, and arrow-key
 * navigation between headers.
 */
function Accordion({ ...props }) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({ className, ...props }) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-border border-b", className)}
      {...props}
    />
  );
}

function AccordionTrigger({ className, children, ...props }) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          // min-h-11 is the handoff's 44px floor for every touch target.
          "focus-ring flex min-h-11 flex-1 items-center justify-between gap-4",
          "text-left transition-colors outline-none disabled:pointer-events-none",
          "[&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon
          className="accordion-chevron text-muted pointer-events-none size-4 shrink-0"
          aria-hidden="true"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({ className, children, ...props }) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="accordion-panel overflow-hidden"
      {...props}
    >
      <div className={cn("pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };

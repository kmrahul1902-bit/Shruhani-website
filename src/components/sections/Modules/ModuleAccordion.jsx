"use client";

import { useState } from "react";
import Image from "next/image";
import MaybeLink from "@/components/ui/MaybeLink";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { MODULE_IMAGE_SIZES } from "./modules.constants";

/**
 * The six sensing modules on a phone. The desktop grid becomes a single
 * column of collapsibles, title as control, one open at a time.
 *
 * See `Modules.jsx`'s note on the tile art's temporary Art Direction override.
 */
export default function ModuleAccordion({ modules }) {
  const [open, setOpen] = useState(modules[0]?.key);

  return (
    <Accordion
      type="single"
      collapsible
      value={open}
      onValueChange={setOpen}
      className="mob:hidden mt-6 flex flex-col"
    >
      {modules.map((item, index) => (
        <AccordionItem
          key={item.key}
          id={item.key}
          value={item.key}
          className="border-0"
        >
          <AccordionTrigger className="text-body-md text-ink data-[state=open]:text-blue min-h-14 justify-center gap-2 font-semibold">
            {item.title}
          </AccordionTrigger>

          <AccordionContent className="pt-4 pb-8 text-center">
            {item.image?.src && (
              <div className="bg-surface-3 rounded-panel aspect-square w-full overflow-hidden p-6.5">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  width={900}
                  height={900}
                  sizes={MODULE_IMAGE_SIZES}
                  priority={index === 0}
                  className="h-full w-full object-contain"
                />
              </div>
            )}

            <p className="text-body-sm text-body mt-5.5 text-pretty">
              {item.description}
            </p>

            <MaybeLink
              href={item.href}
              className="text-body-md text-ink focus-ring mt-5 inline-block font-semibold underline underline-offset-4"
            >
              {item.linkLabel}
            </MaybeLink>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

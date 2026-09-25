"use client";

import Image from "next/image";
import { ReaderTick } from "@/components/sections/module/Reader/reader.icons";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

/**
 * "What comes out" on a phone: three independently-opening collapsibles —
 * `type="multiple"`, so a reader comparing two outputs can hold both open.
 *
 * See `Outputs/OutputCard.jsx`'s note on the temporary Art Direction
 * override — same applies here.
 */
export default function OutputsMobile({ heading, sub, cards }) {
  return (
    <section className="px-4.5 pt-14 pb-15">
      <div className="text-center">
        <h2 className="text-title-2 text-ink">{heading}</h2>
        <p className="text-body-sm text-body mt-4">{sub}</p>
      </div>

      <Accordion type="multiple" className="mt-8 flex flex-col gap-3">
        {cards.map((card, i) => {
          const value = card.key ?? `output-${i}`;
          return (
            <AccordionItem
              key={value}
              value={value}
              className="border-border-faint rounded-card overflow-hidden border bg-white"
            >
              <AccordionTrigger className="group/out min-h-18 gap-3 px-4 py-3.5 text-left">
                <span className="flex flex-1 items-center gap-3">
                  {card.image?.src && (
                    <span className="bg-surface-plate rounded-tile flex size-11.5 shrink-0 items-center justify-center group-data-[state=open]/out:hidden">
                      <Image
                        src={card.image.src}
                        alt=""
                        width={152}
                        height={152}
                        sizes="38px"
                        className="size-9.5 object-contain"
                      />
                    </span>
                  )}
                  <span className="flex min-w-0 flex-1 flex-col">
                    <strong className="text-body-md text-ink font-bold">
                      {card.title}
                    </strong>
                    <span className="text-caption text-muted mt-1 line-clamp-2 group-data-[state=open]/out:hidden">
                      {card.description}
                    </span>
                  </span>
                </span>
              </AccordionTrigger>

              <AccordionContent className="px-4 pb-4">
                {card.image?.src && (
                  <div className="bg-surface-plate rounded-panel mx-3 mt-1 mb-4 aspect-square p-4.5">
                    <Image
                      src={card.image.src}
                      alt={card.image.alt}
                      width={900}
                      height={900}
                      sizes="322px"
                      className="h-full w-full object-contain"
                    />
                  </div>
                )}
                <p className="text-body-sm text-body">{card.description}</p>
                {card.points?.length > 0 && (
                  <ul className="mt-3.5 flex flex-col gap-2">
                    {card.points.map((point) => (
                      <li key={point} className="output-point text-body-sm">
                        <span className="output-tick">
                          <ReaderTick />
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </section>
  );
}

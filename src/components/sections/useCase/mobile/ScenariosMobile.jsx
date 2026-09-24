"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

/**
 * The five scenarios on a phone (use-case mobile handoff, the ".fq" section).
 *
 * The desktop version is a tab strip over a shared panel. At 390px five tab
 * labels cannot sit in a row, so the handoff turns them into a timeline
 * accordion: a rail of dots down the left, one row per scenario, one open at a
 * time, the first open by default.
 *
 * THE TAB LABELS BECOME THE HEADERS, and that is not cosmetic — every panel's
 * own copy opens with the identical "The challenge" heading, so without the
 * label there is nothing on screen saying which scenario you are reading.
 *
 * Each scenario keeps its OWN illustration rather than sharing one element the
 * way the desktop tab handler does: with one shared image the artwork depends
 * on a swap firing, and a panel that opens without it shows the previous
 * scenario's picture.
 *
 * The illustration comes first inside the panel, then the three light cards,
 * then the dark proof card — the order the design reads in. It sits on a
 * bordered white plate rather than in a bare rounded clip: these are line
 * drawings on white, so without the 1px rule they have no edge at all.
 */
export default function ScenariosMobile({ heading, sub, tabs }) {
  const [open, setOpen] = useState(tabs[0]?.key);

  return (
    <section className="px-4.5 pt-12 pb-13">
      <h2 className="text-title-2 text-ink font-bold text-balance">
        {heading}
      </h2>
      <p className="text-body-md text-body mt-4 text-pretty">{sub}</p>

      <Accordion
        type="single"
        collapsible
        value={open}
        onValueChange={setOpen}
        className="timeline-rail mt-7 flex flex-col"
      >
        {tabs.map((tab, index) => (
          <AccordionItem
            key={tab.key}
            value={tab.key}
            className="timeline-item border-divider border-0 not-first:border-t"
          >
            <AccordionTrigger className="text-body-md tracking-snug text-ink data-[state=open]:text-blue min-h-14 justify-between gap-3 py-5 text-left font-semibold">
              {tab.label}
            </AccordionTrigger>

            <AccordionContent className="pb-6">
              {tab.image?.src && (
                <div className="rounded-card border-blue/10 mb-3 overflow-hidden border bg-white">
                  <Image
                    src={tab.image.src}
                    alt={tab.image.alt}
                    width={1000}
                    height={1000}
                    sizes="320px"
                    priority={index === 0}
                    className="block h-auto w-full"
                  />
                </div>
              )}

              <div className="flex flex-col gap-3">
                {tab.cards.map((card) => (
                  <article
                    key={card.title}
                    className="fq-card rounded-panel p-5"
                  >
                    <h3 className="text-body-md tracking-snug text-ink font-bold">
                      {card.title}
                    </h3>
                    <p className="text-body-sm text-body mt-2.5 text-pretty">
                      {card.body}
                    </p>
                  </article>
                ))}

                <article className="fq-card fq-card-dark rounded-panel p-5">
                  <span className="text-eyebrow tracking-caps block text-white/50 uppercase">
                    {tab.proof.label}
                  </span>
                  <p className="text-display-2 tracking-display mt-3.5 text-white">
                    {tab.proof.stat}
                  </p>
                  <p className="text-body-sm mt-2.5 text-pretty text-white/72">
                    {tab.proof.body}
                  </p>
                  <p className="text-eyebrow mt-5 text-white/42 uppercase">
                    {tab.proof.source}
                  </p>
                </article>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

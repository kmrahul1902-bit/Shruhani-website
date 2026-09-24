"use client";

import Image from "next/image";
import AccentText from "@/components/shared/AccentText";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

/**
 * "One platform across the risk lifecycle" on a phone (industry mobile
 * handoff, `.bk-carousel` / `.bk-prod`).
 *
 * The desktop version is a three-column grid of tall suite cards. The handoff
 * is specific that on a phone this is a vertical stack of COLLAPSIBLES — "not
 * the desktop three-column grid and not a swipe carousel" — and that toggling
 * is independent, with the first open on load. So `type="multiple"` with a
 * default, the same reasoning as the module outputs: someone comparing two
 * suites should be able to hold both open.
 *
 * Each card keeps its suite's own colour through the `suite-*` utilities the
 * desktop grid uses, which set `--pc`. The identity is the product's, not the
 * page's, and it is the same on all four industry pages — so the rail changes
 * the experience and not the colour.
 */
const SUITE_TONE = {
  screenx: "suite-screenx",
  cortex: "suite-cortex",
  escalation: "suite-escalation",
};

export default function MappingMobile({ heading, sub, note, noteAccent, cards }) {
  return (
    <section className="px-4.5 pt-13 pb-14">
      <div className="text-center">
        <h2 className="text-title-2 text-footer-heading font-bold text-balance">
          {heading}
        </h2>
        <p className="text-body-md text-body mx-auto mt-4">{sub}</p>
      </div>

      <Accordion
        type="multiple"
        defaultValue={cards?.[0] ? [cards[0].key] : []}
        className="mt-8 flex flex-col gap-3.5"
      >
        {(cards ?? []).map((card) => (
          <AccordionItem
            key={card.key}
            value={card.key}
            className={`border-border-cool rounded-band suite-wash border px-5 py-4.5 ${
              SUITE_TONE[card.key] ?? SUITE_TONE.screenx
            }`}
          >
            <AccordionTrigger className="accent-chevron min-h-11 justify-between gap-3 py-0 text-left">
              <span className="flex flex-col">
                <span className="text-caption text-muted">{card.stage}</span>
                <strong className="text-body-lg text-ink font-bold">
                  {card.title}
                </strong>
              </span>
            </AccordionTrigger>

            <AccordionContent className="pt-0 pb-0">
              <p className="text-body-sm text-body mt-2.5">{card.description}</p>
              {card.image?.src && (
                <Image
                  src={card.image.src}
                  alt={card.image.alt}
                  width={690}
                  height={690}
                  sizes="230px"
                  className="mx-auto mt-4 block h-auto w-full max-w-57.5 object-contain"
                />
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {note && (
        <p className="text-body-md text-muted mt-5.5">
          <AccentText
            text={note}
            phrase={noteAccent}
            className="text-ink font-bold"
          />
        </p>
      )}
    </section>
  );
}

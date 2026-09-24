"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCarouselDrift } from "@/hooks/useCarouselDrift";
import { resolveGlyph } from "@/lib/glyph";
import { ICONS } from "../Toolkit/toolkit.icons";

/**
 * The toolkit row on a phone (product mobile handoffs).
 *
 * The desktop grid becomes one swipeable row that drifts on its own, with
 * arrows below it. The card set is rendered TWICE: half the track is one full
 * pass, so wrapping the scroll at the midpoint lands on the identical card and
 * the loop has no seam. The duplicate is aria-hidden — the same five cards
 * announced twice is worse than not announcing the motion at all.
 *
 * The arrows are real buttons, so the row is reachable without a swipe and
 * without a pointer. They step one card and hold the drift for five seconds,
 * which is the difference between an invitation to browse and a fight with it.
 *
 * `labels` defaults to plain English — the reference reads them from a CMS
 * `labels` group our baked content doesn't carry (see plan/CLAUDE.md →
 * Decisions); a caller can still override them.
 */
export default function ToolkitMobile({
  heading,
  sub,
  cards,
  labels = { prev: "Previous", next: "Next" },
}) {
  const trackRef = useRef(null);
  const { step } = useCarouselDrift(trackRef);

  const renderCard = (card, hidden) => (
    <li
      key={hidden ? `${card.key}-copy` : card.key}
      aria-hidden={hidden || undefined}
      className="border-border-dark-soft rounded-band w-59 shrink-0 border px-5 pt-6 pb-6.5"
    >
      {/* ICONS holds bare paths, not whole glyphs — the box, stroke and fill
          live on this svg, exactly as the desktop tile does it. */}
      <span className="text-accent-bright flex size-9 items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-5.5"
          aria-hidden="true"
        >
          {resolveGlyph(ICONS, card.icon, "ToolkitMobile")}
        </svg>
      </span>
      <h3 className="text-body-md mt-3.5 font-bold text-white">{card.title}</h3>
      <p className="text-caption mt-2.5 text-white/55">{card.description}</p>
    </li>
  );

  return (
    <section className="bg-ground pt-14 pb-15">
      <div className="px-4.5 text-center">
        <h2 className="text-title-2 text-balance text-white">{heading}</h2>
        <p className="text-body-sm mx-auto mt-4 text-white/48">{sub}</p>
      </div>

      <ul
        ref={trackRef}
        className="carousel-track mt-9 flex gap-3.5 overflow-x-auto"
      >
        {cards.map((card) => renderCard(card, false))}
        {cards.map((card) => renderCard(card, true))}
      </ul>

      <div className="mt-6 flex justify-end gap-3 px-5.5">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label={labels.prev}
          className="focus-ring border-border-dark-soft flex size-11 items-center justify-center rounded-full border text-white"
        >
          <ChevronLeft size={18} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label={labels.next}
          className="focus-ring border-border-dark-soft flex size-11 items-center justify-center rounded-full border text-white"
        >
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}

"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * The accordion — the FAQ page's only interactive part, and the only thing on
 * it that ships JavaScript.
 *
 * Single-open: ten answers open at once is a wall of text, and the reader who
 * wants two side by side is better served by the page than by the accordion.
 *
 * The first row starts open — an accordion where every row is shut reads as a
 * list of links rather than as answers.
 *
 * The panel's open/close animation is CSS only — see the `faq-panel` utility
 * for why it runs on grid-template-rows rather than max-height.
 */
export default function FaqList({ items }) {
  const [openIndex, setOpenIndex] = useState(0);
  const baseId = useId();

  return (
    <div className="border-faq-rule border-t">
      {items.map((item, index) => {
        const open = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const headerId = `${baseId}-header-${index}`;
        return (
          <div key={item.question} className="border-faq-rule border-b">
            <h3>
              <button
                type="button"
                id={headerId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : index)}
                className="focus-ring group max-faq-row:gap-3.5 max-faq-row:px-0 max-faq-row:py-5.5 grid-cols-faq-row grid w-full cursor-pointer items-start gap-5 px-1 py-6.5 text-left"
              >
                {/* Tabular numerals so 01 and 10 occupy the same width and the
                    questions stay on one left edge. Hidden on a phone, where the
                    handoff drops it to give the question the full width. */}
                <span className="text-eyebrow tracking-note text-faint max-faq-row:hidden pt-1.5 tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "text-body-lg tracking-snug max-faq-row:text-body-lg tracking-snug font-semibold transition-colors duration-180",
                    open ? "text-ink" : "text-ink group-hover:text-blue"
                  )}
                >
                  {item.question}
                </span>
                {/* A plus that becomes a minus: the vertical stroke fades and
                    flattens while the whole mark turns over. One glyph doing two
                    states, which is what the mockup draws. */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "rounded-circle grid size-8 flex-none place-items-center border transition duration-200",
                    open
                      ? "border-ink bg-ink rotate-180 text-white"
                      : "border-faq-icon text-ink group-hover:border-blue group-hover:text-blue"
                  )}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    className="size-3.75"
                  >
                    <path d="M5 12h14" />
                    <path
                      d="M12 5v14"
                      className={cn(
                        "origin-center transition duration-300",
                        open && "scale-y-20 opacity-0"
                      )}
                    />
                  </svg>
                </span>
              </button>
            </h3>
            {/* The panel animates on grid-template-rows 0fr -> 1fr, which is
                the one way to transition to a content height CSS can compute.
                `visibility` rides along so a collapsed answer leaves the
                accessibility tree — the text staying in the DOM is what makes
                find-in-page work, and what would otherwise have a screen reader
                read all ten answers in a row. */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              className={cn("faq-panel", open && "faq-panel-open")}
            >
              {/* The padding is on this wrapper, not the paragraph, as the
                  mockup has it — inside the overflow clip, so it collapses with
                  the panel instead of holding it open by 30px when shut. */}
              <div className="overflow-hidden">
                <div className="max-faq-row:pr-2 max-faq-row:pl-0 pr-15 pb-7.5 pl-13.5">
                  <p className="text-body-md text-body text-pretty">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

"use client";

import { useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * The cluster bars: buttons that jump to their block. Real buttons, roving
 * tabindex, `aria-current` (not `aria-selected` — every block is on the
 * page, these jump rather than switch a panel).
 */
export default function ReaderBars({ slides, index, onSelect, labelPrefix }) {
  const barRefs = useRef([]);

  const onKeyDown = (event) => {
    const last = slides.length - 1;
    const next =
      event.key === "ArrowRight"
        ? (index + 1) % slides.length
        : event.key === "ArrowLeft"
          ? (index + last) % slides.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;
    if (next === null) return;
    event.preventDefault();
    onSelect(next);
    barRefs.current[next]?.focus();
  };

  return (
    <div className="reader-bars">
      {slides.map((slide, i) => (
        <button
          key={slide.key ?? i}
          type="button"
          ref={(el) => {
            barRefs.current[i] = el;
          }}
          onClick={() => onSelect(i)}
          onKeyDown={onKeyDown}
          tabIndex={i === index ? 0 : -1}
          aria-current={i === index ? "true" : undefined}
          aria-label={`${labelPrefix}: ${slide.title}`}
          className={cn(
            "reader-bar hit-area focus-ring",
            i === index && "reader-bar-on"
          )}
        />
      ))}
    </div>
  );
}

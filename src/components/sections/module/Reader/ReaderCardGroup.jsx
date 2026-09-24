"use client";

import ReaderCard from "./ReaderCard";
import {
  CARD_ENTER_MS,
  CARD_ENTER_STAGGER_MS,
  CARD_EXIT_MS,
  CARD_EXIT_STAGGER_MS,
  CARD_EXIT_SHIFT_PX,
  REDUCED,
} from "./reader.constants";

/**
 * The card group for one cluster. Each card's delay is its index times the
 * stagger. The parent keys this group by cluster so React remounts it and
 * the enter keyframe replays.
 */
export default function ReaderCardGroup({ cards, phase, prefersReduced }) {
  const timing = prefersReduced
    ? REDUCED
    : {
        CARD_EXIT_MS,
        CARD_EXIT_STAGGER_MS,
        CARD_ENTER_MS,
        CARD_ENTER_STAGGER_MS,
      };
  const leaving = phase === "out";

  return (
    <div className="reader-group">
      {cards.map((card, i) => (
        <ReaderCard
          key={card.label ?? i}
          {...card}
          style={
            leaving
              ? {
                  animation: "none",
                  opacity: 0,
                  transform: prefersReduced
                    ? "none"
                    : `translateX(${CARD_EXIT_SHIFT_PX}px)`,
                  transitionProperty: "opacity, transform",
                  transitionDuration: `${timing.CARD_EXIT_MS}ms`,
                  transitionDelay: `${i * timing.CARD_EXIT_STAGGER_MS}ms`,
                  transitionTimingFunction: "cubic-bezier(.4,0,1,1)",
                }
              : {
                  animationName: "reader-card-in",
                  animationDuration: `${timing.CARD_ENTER_MS}ms`,
                  animationDelay: `${i * timing.CARD_ENTER_STAGGER_MS}ms`,
                  animationTimingFunction: "cubic-bezier(.22,1,.36,1)",
                  animationFillMode: "both",
                }
          }
        />
      ))}
    </div>
  );
}

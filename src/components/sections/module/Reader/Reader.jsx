"use client";

import SectionHead from "@/components/sections/module/SectionHead";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useCardStagger } from "./hooks/useCardStagger";
import { useSlideReader } from "./hooks/useSlideReader";
import ReaderBars from "./ReaderBars";
import ReaderBlock from "./ReaderBlock";
import ReaderFrame from "./ReaderFrame";

/**
 * "What <Module> Reads" — the five-cluster reader. A sticky frame holds the
 * cluster's image and signal cards; the right column scrolls through blocks
 * of copy. Whichever block covers most of the frame is active.
 *
 * `plate` is how this module's mockup grounds the frame — passed straight
 * down from the template's per-module layout table.
 */
export default function Reader({ heading, sub, slides, labels, plate }) {
  const { index, goTo, frameRef, registerBlock } = useSlideReader(
    slides.length
  );
  const prefersReduced = usePrefersReducedMotion();
  const { shown, phase } = useCardStagger({
    activeIndex: index,
    cardCount: slides[index]?.cards?.length ?? 0,
    prefersReduced,
  });

  return (
    <section className="reader-section">
      <SectionHead heading={heading} sub={sub} />

      <div className="reader-track">
        <div className="reader-left">
          <ReaderFrame
            frameRef={frameRef}
            slides={slides}
            shown={shown}
            phase={phase}
            prefersReduced={prefersReduced}
            label={labels.readerRegion}
            plate={plate}
          />
          <ReaderBars
            slides={slides}
            index={index}
            onSelect={goTo}
            labelPrefix={labels.readerBar}
          />
        </div>

        <div className="reader-right">
          {slides.map((slide, i) => (
            <ReaderBlock
              key={slide.key ?? i}
              id={`reader-${slide.key ?? i}`}
              blockRef={registerBlock(i)}
              slide={slide}
              active={i === index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

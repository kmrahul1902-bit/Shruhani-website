"use client";

import Image from "next/image";
import { cn } from "@/lib/cn";
import ReaderCardGroup from "./ReaderCardGroup";

/**
 * The sticky visual: the cluster's photograph with its signal cards over it.
 * Every image is rendered and cross-faded by opacity; only the first is
 * eager. `plate` says how this module's mockup grounds the frame.
 *
 * TODO(content): no module's `reader.slides[].image` is wired — the live
 * site's CDN art for this section (and for Applies/Outputs/Integration on
 * the same pages) is isometric/3D icon-pack and podium-render illustration,
 * banned outright by CLAUDE.md § Art Direction regardless of color.
 */
export default function ReaderFrame({
  frameRef,
  slides,
  shown,
  phase,
  prefersReduced,
  label,
  plate,
}) {
  const slide = slides[shown];
  return (
    <div
      ref={frameRef}
      className={cn("reader-frame", plate === "photo" && "reader-frame-photo")}
      role="img"
      aria-label={label}
    >
      <div className="reader-images">
        {slides.map((item, i) =>
          !item.image?.src ? null : (
            <Image
              key={item.image.src}
              src={item.image.src}
              alt={i === shown ? (item.image.alt ?? "") : ""}
              aria-hidden={i !== shown}
              fill
              sizes="560px"
              loading={i === 0 ? "eager" : "lazy"}
              className={cn("reader-image", i === shown && "reader-image-on")}
            />
          )
        )}
      </div>
      <ReaderCardGroup
        key={slide.key ?? shown}
        cards={slide.cards ?? []}
        phase={phase}
        prefersReduced={prefersReduced}
      />
    </div>
  );
}

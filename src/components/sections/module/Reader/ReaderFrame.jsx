"use client";

import Image from "next/image";
import { cn } from "@/lib/cn";
import ReaderCardGroup from "./ReaderCardGroup";

/**
 * The sticky visual: the cluster's photograph with its signal cards over it.
 * Every image is rendered and cross-faded by opacity; only the first is
 * eager. `plate` says how this module's mockup grounds the frame.
 *
 * The cluster photographs are the live site's isometric/3D-render art,
 * which CLAUDE.md § Art Direction bans outright — wired anyway per an
 * explicit, temporary override for the investor presentation (filled pages
 * over empty boxes); slated for replacement with on-brand art.
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

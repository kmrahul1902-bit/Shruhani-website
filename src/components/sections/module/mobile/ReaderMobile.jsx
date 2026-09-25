import Image from "next/image";
import { cn } from "@/lib/cn";
import { ReaderIcon, ReaderTick } from "../Reader/reader.icons";

/**
 * The signal explorer on a phone. Each block gets its own image and signal
 * cards (rather than the desktop's sticky-frame swap), so this renders on
 * the server with no JS.
 *
 * See `Reader/ReaderFrame.jsx`'s note on the temporary Art Direction
 * override — same applies here.
 */
const TONE_CLASS = {
  ok: "text-signal-ok",
  warn: "text-signal-warn",
  bad: "text-signal-bad",
};

const FRAME_RATIO_CLASS = { "16/11": "aspect-16/11" };
const DEFAULT_FRAME_RATIO = "aspect-4/3";

export default function ReaderMobile({ heading, sub, slides, frameRatio }) {
  return (
    <section className="reader-wash px-4.5 pt-14 pb-15">
      <div className="text-center">
        <h2 className="text-title-2 text-ink font-bold">{heading}</h2>
        <p className="text-body-md text-body mt-4">{sub}</p>
      </div>

      <div className="mt-9 flex flex-col gap-14">
        {slides.map((slide, i) => (
          <article key={slide.key ?? i}>
            {slide.image?.src && (
              <div
                className={cn(
                  "reader-mframe rounded-panel relative mb-5 overflow-hidden",
                  FRAME_RATIO_CLASS[frameRatio] ?? DEFAULT_FRAME_RATIO
                )}
              >
                <Image
                  src={slide.image.src}
                  alt={slide.image.alt}
                  fill
                  sizes="354px"
                  className="z-0 object-cover"
                />
                {slide.cards?.length > 0 && (
                  <ul className="absolute inset-x-4 top-4 z-2 flex flex-col gap-2">
                    {slide.cards.map((card, ci) => (
                      <li
                        key={card.label ?? ci}
                        className="rounded-tile flex items-center gap-2 bg-white px-3 py-3"
                      >
                        <span className="text-muted flex size-4 shrink-0 items-center justify-center">
                          <ReaderIcon name={card.icon} />
                        </span>
                        <span className="text-eyebrow text-ink flex-1 font-semibold">
                          {card.label}
                        </span>
                        <span
                          className={cn(
                            "text-eyebrow",
                            card.tone ? TONE_CLASS[card.tone] : "text-ink"
                          )}
                        >
                          {card.value}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            <h3 className="text-title-3 text-ink font-bold">{slide.title}</h3>
            <p className="text-body-md text-body mt-3">{slide.body}</p>

            {slide.points?.length > 0 && (
              <ul className="mt-4 flex flex-col gap-2">
                {slide.points.map((point) => (
                  <li key={point} className="reader-point text-body-sm">
                    <span className="reader-tick">
                      <ReaderTick />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

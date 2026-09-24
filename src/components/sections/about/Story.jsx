import Image from "next/image";
import Reveal from "@/components/shared/Reveal";
import { SECTION } from "./about.constants";

/**
 * Founding story — the narrative on the left, a sticky founders card on the
 * right.
 *
 * The card sticks at 120px above 1080px and goes static below, which is the
 * handoff's rule and also the only one that works: below that width the column
 * is full width and a sticky element would pin a 700px card over the text it is
 * meant to sit beside.
 */
export default function Story({ story }) {
  return (
    <section className={SECTION}>
      <div className="max-bento:grid-cols-1 max-bento:gap-9 grid-cols-au-story grid items-start gap-18">
        <Reveal>
          {/* whitespace-pre-line renders the break the copy authors, the same
              way the CTA band does — so where the line turns stays an editable
              decision rather than a <br /> nobody in the CMS can see. Normal
              wrapping below `mob`: a break chosen for a wide column leaves a
              short orphan line on a phone. */}
          <h2 className="text-display-2 tracking-display font-display text-ink max-mob:whitespace-normal mt-4.5 mb-7.5 whitespace-pre-line">
            {story.h2}
          </h2>
          {story.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="text-body-md text-strong mt-5.5 text-pretty first:mt-0"
            >
              {paragraph}
            </p>
          ))}
          {/* --color-strong and a 22/34 margin, not ink and 34/34: the mockup's
              `.au-story-body p` rule outranks `.au-quote` on both (class+element
              beats class), so what the design RENDERS is the paragraph colour and
              the paragraph's top margin with the quote's bottom one. Parity is
              against the render. */}
          <p className="text-title-3 font-display text-strong border-blue mt-5.5 mb-8.5 border-l-3 pl-6 font-bold">
            {story.quote}
          </p>
          {story.paragraphsAfter.map((paragraph) => (
            <p
              key={paragraph}
              className="text-body-md text-strong mt-5.5 text-pretty"
            >
              {paragraph}
            </p>
          ))}
        </Reveal>

        <Reveal
          as="aside"
          delayIndex={1}
          className="border-au-hair rounded-au-card shadow-au-card max-bento:static sticky top-30 overflow-hidden border bg-white"
        >
          {/* Square-cropped at 430px while the card is its designed 430px wide,
                which is the handoff. Below the bento breakpoint the card goes
                full width and the fixed height turns into the same crop the
                team photo had — 53% of the founders visible at 390. Capped at
                the designed height, the frame takes the photo's 3:2 only where
                that is shorter, so nothing above 1080 moves. */}
          <div className="bg-surface-3 max-bento:h-auto max-bento:aspect-3/2 max-bento:max-h-107.5 relative h-107.5 w-full min-w-0">
            {story.card.image?.src && (
              <Image
                src={story.card.image.src}
                alt={story.card.image.alt}
                fill
                sizes="(max-width: 1080px) 100vw, 430px"
                className="object-cover"
              />
            )}
          </div>
          <p className="text-body-md tracking-snug text-ink px-6.5 pt-5.5 pb-1 font-semibold">
            {story.card.caption}
          </p>
          <dl className="grid px-6.5 pt-3 pb-6">
            {story.card.meta.map((row) => (
              /* Each row draws its own top hairline, so the list reads as four
                 ruled rows with an open bottom — the caption above supplies the
                 first rule's context. */
              <div
                key={row.label}
                className="border-au-hair-soft text-body-sm text-muted flex justify-between gap-4 border-t py-3"
              >
                <dt>{row.label}</dt>
                <dd className="text-ink font-semibold">{row.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

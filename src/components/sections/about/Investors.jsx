import Image from "next/image";
import Reveal from "@/components/shared/Reveal";
import { INNER } from "./about.constants";

/**
 * Investors — the sentence and its angel chips on the left, two logo cards on
 * the right.
 *
 * The band is the page's one tinted section: `--color-au-band` between two
 * hairlines, full-bleed, with the content pinned to the same 1240px column
 * every other section uses.
 *
 * TODO(verify): investor/partner names (Cedar Hill Capital, Smile Group) and
 * the angel roster below — guardrail #2 item 4. Carried over as written.
 */
export default function Investors({ investors }) {
  return (
    <section className="bg-au-band border-au-hair-soft max-bento:px-11 max-flow:px-5.5 border-y px-20 py-26">
      <div
        className={`max-bento:grid-cols-1 max-bento:gap-9 grid-cols-au-inv grid items-center gap-16 ${INNER}`}
      >
        <Reveal>
          <p className="text-body-md text-body mt-4">
            {investors.leadBefore}
            <b className="text-ink font-semibold">{investors.leadFirstName}</b>
            {investors.leadBetween}
            <b className="text-ink font-semibold">{investors.leadSecondName}</b>
            {investors.leadAfter}
          </p>

          <ul className="mt-5.5 flex flex-wrap gap-2.5">
            {investors.angels.map((angel) => (
              <li
                key={angel.name}
                className="border-au-hair text-body-sm text-strong rounded-pill inline-flex items-center gap-2.5 border bg-white py-1.5 pr-4 pl-1.5 font-medium"
              >
                {/* `object-top` is the handoff's `object-position: top center` —
                    these are cropped headshots, and centring them takes the top
                    of the head off. */}
                <span className="bg-au-avatar rounded-circle relative size-9.5 shrink-0 overflow-hidden">
                  {angel.image?.src && (
                    <Image
                      src={angel.image.src}
                      alt={angel.image.alt}
                      fill
                      sizes="38px"
                      className="object-cover object-top"
                    />
                  )}
                </span>
                {angel.name}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal
          delayIndex={1}
          className="max-flow:grid-cols-1 grid grid-cols-2 gap-3.5"
        >
          {investors.firms.map((firm) => (
            <div
              key={firm.name}
              className="border-au-hair flex min-h-70 flex-col items-center justify-center gap-1.5 rounded-2xl border bg-white p-6"
            >
              <span className="relative mb-3 min-h-42.5 w-full min-w-0 flex-1">
                {firm.image?.src && (
                  <Image
                    src={firm.image.src}
                    alt={firm.image.alt}
                    fill
                    sizes="(max-width: 680px) 90vw, 300px"
                    /* Smile Group's mark carries far less padding of its own
                       than Cedar Hill's, so the handoff scales it to 65% to sit
                       at the same optical size beside it. */
                    className={`object-contain ${firm.scaled ? "scale-65" : ""}`}
                  />
                )}
              </span>
              <b className="text-body-lg tracking-snug font-display text-au-firm-name font-bold">
                {firm.name}
              </b>
              <span className="text-eyebrow tracking-label text-faint font-semibold uppercase">
                {firm.role}
              </span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

import Link from "next/link";
import Reveal from "@/components/shared/Reveal";
import { SECTION } from "./about.constants";

/**
 * Our office — the address on the left, a map on the right.
 *
 * Adapted from the reference: no routes registry in this project (see
 * plan/CLAUDE.md → Decisions) — `/book-a-demo` is the same path the
 * reference's `ROUTES.contact.path` resolves to.
 *
 * TODO(verify): registered office address (guardrail #2 item 1) — carried
 * over as written; confirm it matches the entity's current registered
 * address before the investor presentation.
 *
 * The map is a lazily-loaded Google embed, which is what the handoff specifies
 * and what the address is actually useful for. `loading="lazy"` matters here:
 * it is the last section on the page, and an eager iframe would put a
 * third-party frame on the critical path of every About page load.
 */
export default function Office({ office }) {
  return (
    <section className={SECTION}>
      <div className="max-bento:grid-cols-1 max-bento:gap-9 grid grid-cols-2 items-center gap-16">
        <Reveal>
          <h2 className="text-display-2 tracking-display font-display text-ink mt-4.5">
            {office.h2}
          </h2>
          <p className="text-body-md text-strong mt-6.5">{office.intro}</p>
          <address className="text-body-md text-strong mt-6.5 not-italic">
            <b className="font-semibold">{office.addressLine}</b>
            <br />
            {office.addressRest}
            <br />
            {office.contactLine}
          </address>
          <div className="mt-7.5 flex flex-wrap gap-3.5">
            {/* The arrow is decorative and hidden, as it is everywhere else on
                the site. It costs 2.3px of pill width against the mockup, and
                that is a FONT difference rather than a layout one: U+2192 sits
                outside our self-hosted Inter's latin subset, so it renders in
                the fallback face at a slightly wider advance. See the parity
                suite's note on this pair. */}
            <Link
              href="/book-a-demo"
              className="text-body-md border-au-hair-pill text-blue hover:bg-blue hover:border-blue focus-ring rounded-pill inline-flex items-center gap-2 border px-5.5 py-3.5 font-semibold transition-colors duration-160 hover:text-white"
            >
              {office.ctaLabel} <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </Reveal>
        <Reveal
          delayIndex={1}
          className="border-au-hair rounded-au-card bg-surface-3 relative h-110 min-w-0 overflow-hidden border"
        >
          <iframe
            title={office.mapTitle}
            src={office.mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 block size-full border-0"
          />
        </Reveal>
      </div>
    </section>
  );
}

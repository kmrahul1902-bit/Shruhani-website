import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/shared/Reveal";
import { INNER, SECTION_DARK } from "./about.constants";
import { ArrowIcon } from "./about.icons";

/**
 * What we have built — the three suites and the six modules, on the dark ground.
 *
 * Adapted from the reference: no routes registry in this project (see
 * plan/CLAUDE.md → Decisions) — each suite/module already carries its own
 * `href` and `key`, attached by `about.adapter.js`, rather than looking one
 * up in a route registry here.
 *
 * TODO(content): no suite's `.image` is wired — the live site's CDN icons
 * for ScreenX/Cortex/EscalationX are 3D podium-render illustrations (glossy
 * highlights, drop shadows, blue), banned outright by CLAUDE.md § Art
 * Direction regardless of color — same conflict as the product/module pages
 * (see `SignalLayers.jsx`'s note).
 */
export default function Platform({ platform }) {
  return (
    <section className={SECTION_DARK}>
      <div className={INNER}>
        <Reveal
          as="h2"
          className="text-display-2 tracking-display font-display mt-4.5"
        >
          {platform.h2FirstLine}
          <br />
          {platform.h2SecondLine}
        </Reveal>

        <div className="max-bento:grid-cols-2 max-flow:grid-cols-1 mt-14 grid grid-cols-3 gap-4.5">
          {platform.suites.map((suite, index) => (
            <Reveal
              key={suite.key}
              delayIndex={index}
              className="border-au-hair-suite au-card-dark rounded-au-panel flex flex-col border p-8"
            >
              {/* 90px, and no plate behind it — the handoff drops the tinted
                  tile the icon-only variant uses once the icon is artwork. */}
              <span className="text-au-accent relative mb-5 block size-22.5">
                {suite.image?.src && (
                  <Image
                    src={suite.image.src}
                    alt={suite.image.alt}
                    fill
                    sizes="90px"
                    className="object-contain"
                  />
                )}
              </span>
              <h3 className="text-body-lg tracking-snug font-display font-bold">
                {suite.name}
              </h3>
              <p className="text-body-md mt-3 text-white/60">
                {suite.description}
              </p>
              {/* `mt-auto` pins the link to the card's bottom edge, so three
                  cards of unequal copy still line their links up. */}
              <Link
                href={suite.href}
                className="text-body-sm text-au-accent hover:text-au-accent-hover focus-ring group/more transition-gap-color mt-auto inline-flex items-center gap-2 self-start pt-5.5 font-bold hover:gap-3"
              >
                {platform.moreLabel}
                <ArrowIcon className="size-3.5 transition-transform duration-180 group-hover/more:translate-x-0.75" />
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal
          as="p"
          className="text-eyebrow tracking-label mt-16 font-semibold text-white/42 uppercase"
        >
          {platform.modulesLabel}
        </Reveal>
        <Reveal as="ul" delayIndex={1} className="mt-4.5 flex flex-wrap gap-2.5">
          {platform.modules.map((module) => (
            <li key={module.key}>
              {/* The pill IS the link, so the whole chip is the target rather
                  than the words inside it. Its resting look is the handoff's
                  exactly; the hover is the only addition, because a chip that
                  navigates has to say so. */}
              <Link
                href={module.href}
                className="text-body-sm border-au-hair-mod rounded-pill focus-ring hover:border-au-accent hover:text-au-accent block border px-4.5 py-3 text-white/82 transition-colors duration-150"
              >
                {module.label}
              </Link>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

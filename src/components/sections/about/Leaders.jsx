import Image from "next/image";
import Reveal from "@/components/shared/Reveal";
import { SECTION_TIGHT } from "./about.constants";
import { LinkedInIcon } from "./about.icons";

/**
 * Our leaders — two cards, each a square portrait beside a bio.
 *
 * The portraits were originally real, live URLs on an external CDN
 * (`cdn.sign3.in`), not local files — using them required either a plain
 * `<img>` or allowlisting that host in `next.config.mjs`. Post-build fix:
 * downloaded locally to `public/images/team/`, so this uses `next/image`
 * (optimized, sized) like every other image on the site.
 */
export default function Leaders({ leaders }) {
  return (
    <section className={SECTION_TIGHT}>
      <Reveal
        as="h2"
        className="text-display-2 tracking-display font-display text-ink mt-4.5"
      >
        {leaders.h2}
      </Reveal>

      <div className="max-bento:grid-cols-1 mt-14 grid grid-cols-2 gap-6.5">
        {leaders.people.map((person, index) => (
          <Reveal
            as="article"
            key={person.name}
            delayIndex={index}
            className="border-au-hair rounded-au-card max-flow:grid-cols-1 grid-cols-au-leader grid items-start overflow-hidden border bg-white"
          >
            <div className="bg-surface-3 max-flow:aspect-4/3 relative aspect-square min-w-0">
              {person.image?.src && (
                <Image
                  src={person.image.src}
                  alt={person.image.alt ?? person.name}
                  fill
                  sizes="(max-width: 760px) 100vw, 460px"
                  className="object-cover"
                />
              )}
            </div>
            <div className="leading-auto px-8 pt-8 pb-7.5">
              <h3 className="text-body-lg tracking-snug font-display text-ink font-bold">
                {person.name}
              </h3>
              <p className="text-body-sm text-blue mt-1.5 font-semibold">
                {person.role}
              </p>
              {person.bio.map((paragraph) => (
                <p key={paragraph} className="text-body-md text-body mt-4">
                  {paragraph}
                </p>
              ))}
              <a
                href={person.linkedIn}
                className="text-body-sm text-blue hover:text-blue-hover focus-ring mt-5.5 inline-flex items-center gap-2 font-semibold"
              >
                <LinkedInIcon className="size-4" />
                {/* The link is named for the person, not just "LinkedIn" — four
                    identical link names on one page is the classic screen-reader
                    complaint, and the visible label stays as the design has it. */}
                <span aria-hidden="true">{leaders.linkedInLabel}</span>
                <span className="sr-only">
                  {leaders.linkedInLabel} — {person.name}
                </span>
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

import Reveal from "@/components/shared/Reveal";
import { SECTION_TIGHT } from "./about.constants";
import { LinkedInIcon } from "./about.icons";

/**
 * Our leaders — two cards, each a square portrait beside a bio.
 *
 * Adapted from the reference: the content's portraits are real, live URLs on
 * an external CDN (`cdn.sign3.in`) rather than local files — but that host
 * isn't on this project's `next.config.mjs` image allowlist, and adding a
 * remote pattern is a shared-config decision beyond this page. A plain
 * `<img>` renders the actual photo without needing that change; swap back to
 * `next/image` once the asset is either local or the host is allowlisted.
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
                // eslint-disable-next-line @next/next/no-img-element -- external CDN, not on the next/image allowlist; see comment above.
                <img
                  src={person.image.src}
                  alt={person.image.alt ?? person.name}
                  className="absolute inset-0 h-full w-full object-cover"
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

import Reveal from "@/components/shared/Reveal";

/**
 * In the press — four article cards on the dark ground.
 *
 * TODO(verify): press mentions (guardrail #2 item 3). Each headline below is
 * a real, published article title that names "Sign3" — left unmodified
 * rather than rewritten, since a headline is a quotation of what was
 * actually published, not our own copy; renaming it would misrepresent what
 * the article says. A human should confirm whether these are still the
 * mentions to show, or whether updated coverage under the Shruhani name
 * should replace them.
 */
export default function Press({ press }) {
  return (
    <section className="bg-ground px-au-press py-28 text-white">
      <Reveal
        as="h2"
        className="text-display-2 tracking-display font-display mt-4.5"
      >
        {press.h2}
      </Reveal>
      {/* p-1 pb-2, as the mockup has it: the padding is there so a card's
          hover lift is not clipped, and it also narrows each card by 2px —
          geometry, not decoration. */}
      <ul className="max-bento:grid-cols-2 max-flow:grid-cols-1 mt-11 grid grid-cols-4 gap-4.5 p-1 pb-2">
        {press.articles.map((article, index) => (
          <Reveal as="li" key={article.headline} delayIndex={index}>
            {/* Third-party coverage, so it leaves the site: a new tab, and
                `nofollow` because a press mention is not an endorsement we are
                passing rank to. Same treatment the footer gives its map link. */}
            <a
              href={article.href}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="border-au-hair-press au-card-dark hover:border-au-press-hover hover:shadow-au-press-dark focus-ring rounded-au-panel flex h-full min-w-0 flex-col border p-7 transition duration-180 hover:-translate-y-0.75"
            >
              <span className="text-body-md tracking-snug font-display text-au-accent block font-bold">
                {article.publication}
              </span>
              <span className="text-body-lg tracking-snug mt-4 mb-6.5 block font-semibold text-pretty text-white">
                {article.headline}
              </span>
              {/* `mt-auto` pins the foot to the card's bottom edge, so four
                  headlines of unequal length still line their dates up. */}
              <span className="border-au-hair-suite text-body-sm mt-auto flex items-center justify-between border-t pt-4 text-white/50">
                <span>{article.date}</span>
                <span>
                  {press.readLabel} <span aria-hidden="true">&rarr;</span>
                </span>
              </span>
            </a>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

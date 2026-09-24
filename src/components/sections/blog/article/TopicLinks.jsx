import Link from "next/link";

/**
 * The topic-interlinking widget at the foot of every article.
 *
 * Adapted from the reference: `ROUTES.blog.path` (no routes registry in this
 * project) becomes the plain path `/resources`. Empty today (see
 * `src/lib/articles.js` → `getTopics()`), same as the reference's own
 * zero-topics case.
 */
export default function TopicLinks({ topics, copy }) {
  if (!topics?.length) return null;

  return (
    <section
      aria-labelledby="blog-topics-heading"
      className="border-border-cool container-wide max-mob:px-4.5 max-mob:pt-8 border-t pt-11 pb-2"
    >
      <h2
        id="blog-topics-heading"
        className="text-faint text-caption tracking-caps mb-4 font-bold uppercase"
      >
        {copy.topicsHeading}
      </h2>
      <ul className="flex flex-wrap gap-2.5">
        {topics.map((topic) => (
          <li key={topic.slug}>
            <Link
              href={`/resources?topic=${encodeURIComponent(topic.slug)}`}
              className="border-border-cool rounded-pill text-body-sm text-blog-chip-label hover:border-blue hover:text-blue focus-ring inline-flex min-h-11 items-center gap-2 border bg-white px-4 py-2.5 font-semibold transition-colors"
            >
              {topic.name}
              <span className="text-faint text-caption tabular-nums">
                {topic.count}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

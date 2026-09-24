import Link from "next/link";
import ArticleCard from "../ArticleCard";

/**
 * Three more articles at the foot of one, reusing the index's card verbatim.
 *
 * Adapted from the reference: `ROUTES.blog.path` (no routes registry in this
 * project) becomes the plain path `/resources`.
 */
export default function ReadNext({ articles, copy, readLabel }) {
  if (!articles.length) return null;

  return (
    <section className="container-wide max-mob:px-4.5 max-mob:pt-11.5 pt-19.5 pb-4">
      <div className="max-mob:mb-4.5 mb-6.5 flex items-baseline justify-between gap-5">
        <h2 className="text-ink text-title-3 max-mob:text-body-lg font-extrabold tracking-tighter">
          {copy.readNextHeading}
        </h2>
        <Link
          href="/resources"
          className="text-blue focus-ring rounded-xs text-sm font-bold"
        >
          {copy.readNextLinkLabel}
        </Link>
      </div>
      <ul className="max-bento:grid-cols-2 max-cards:grid-cols-1 max-mob:gap-3.5 grid grid-cols-3 gap-6.5">
        {articles.map((article) => (
          <li key={article.slug} className="flex">
            <ArticleCard
              article={article}
              readLabel={readLabel}
              sizes="(max-width: 520px) 100vw, (max-width: 1080px) 50vw, 33vw"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

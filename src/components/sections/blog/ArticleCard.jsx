import Link from "next/link";
import ArticleCover from "./ArticleCover";
import Byline from "./Byline";

/**
 * One article in the grid — and, unchanged, one in "Read next" at the foot of
 * an article. The design draws them identically, so they are one component
 * rather than two that drift.
 *
 * The whole card is the link. The arrow is `aria-hidden` because the link's
 * accessible name is already the headline.
 */
export default function ArticleCard({
  article,
  readLabel,
  sizes,
  chipCategory,
}) {
  return (
    <Link
      href={article.href}
      className="group border-border-cool rounded-band max-mob:rounded-card hover:border-blog-hover-border hover:shadow-blog-card max-mob:hover:translate-y-0 max-mob:hover:shadow-none focus-ring flex flex-col overflow-hidden border bg-white transition duration-220 hover:-translate-y-1"
    >
      <ArticleCover
        article={article}
        chipCategory={chipCategory}
        className="aspect-3/2"
        sizes={sizes}
      />

      <div className="max-mob:px-4.5 max-mob:pt-4.5 max-mob:pb-5 flex flex-1 flex-col px-6.5 pt-6 pb-6.5">
        <h3 className="text-ink text-body-lg tracking-snug max-mob:text-body-md font-bold text-pretty">
          {article.title}
        </h3>
        {article.deck ? (
          <p className="text-muted text-body-sm max-mob:text-body-sm mt-2.5 line-clamp-3">
            {article.deck}
          </p>
        ) : null}

        <span className="text-blue max-mob:mt-3.5 max-mob:text-body-sm mt-4.5 inline-flex items-center gap-1.5 text-sm font-bold transition-all group-hover:gap-2.5">
          {readLabel}
          <span aria-hidden="true">→</span>
        </span>

        <div className="max-mob:mt-4 max-mob:pt-4 mt-auto pt-5">
          <Byline author={article.author} published={article.published} />
        </div>
      </div>
    </Link>
  );
}

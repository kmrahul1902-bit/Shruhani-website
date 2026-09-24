import Link from "next/link";
import ArticleCover from "../ArticleCover";
import Byline from "../Byline";

/**
 * The newest article, given the full width above the grid.
 *
 * Unlike a grid card it carries NO "Read blog" link — the whole panel is the
 * link and the design leaves the byline as its last line.
 */
export default function FeaturedArticle({ article, kicker, chipCategory }) {
  return (
    <Link
      href={article.href}
      className="group border-border-cool rounded-visual max-mob:rounded-surface hover:border-blog-hover-border hover:shadow-blog-feat max-mob:hover:translate-y-0 max-mob:hover:shadow-none focus-ring blog-feat-cols grid overflow-hidden border bg-white transition duration-220 hover:-translate-y-0.75"
    >
      <ArticleCover
        article={article}
        chipCategory={chipCategory}
        priority
        className="aspect-3/2 self-start"
        sizes="(max-width: 960px) 100vw, 55vw"
      />

      <div className="max-nav:px-7 max-nav:py-8 max-mob:px-4.5 max-mob:pt-5.5 max-mob:pb-6 flex flex-col justify-center px-12 py-11">
        <p className="text-blue text-caption max-mob:text-caption tracking-caps max-mob:mb-2.5 mb-4 font-bold uppercase">
          {kicker}
        </p>
        <h2 className="text-ink text-title-1 tracking-display max-mob:text-title-3 font-bold text-balance">
          {article.title}
        </h2>
        {article.deck ? (
          <p className="text-muted max-mob:text-body-sm max-mob:mt-3 mt-4 text-base leading-relaxed text-pretty">
            {article.deck}
          </p>
        ) : null}

        <div className="max-mob:mt-5 mt-7">
          <Byline author={article.author} published={article.published} />
        </div>
      </div>
    </Link>
  );
}

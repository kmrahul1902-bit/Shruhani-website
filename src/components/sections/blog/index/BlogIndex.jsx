import ArticleCard from "../ArticleCard";
import FeaturedArticle from "./FeaturedArticle";

/**
 * The blog index: a washed hero, then the newest article followed by a grid
 * of the rest — or, today, neither, since zero articles exist anywhere in
 * this project (see src/lib/articles.js). That's this page's correct,
 * deliberate state right now, not a bug.
 *
 * Simplified from the reference: no search box, no topic/length filter rail,
 * no `BlogFilterProvider`/`FilterUrlSync` — all of that exists to narrow a
 * list of many articles, which is meaningless with zero. Once real posts
 * exist, `articles-modules.spec.js`-style call sites can grow that back; see
 * plan/docs/03-content-and-pages.md ("start with no posts").
 */
export default function BlogIndex({ featured, rest, copy }) {
  const hasArticles = Boolean(featured) || rest.length > 0;

  return (
    <>
      {/* .res-hero — the wash is pulled up under the sticky header, which is
          why the negative margin and the matching padding are a pair. */}
      <section className="blog-hero-wash -mt-23 pt-23">
        <div className="container-wide max-mob:px-4.5 max-mob:pt-5.5 pt-14 text-center">
          <h1 className="text-ink text-display-1 max-mob:text-title-2 tracking-display max-mob:text-pretty font-bold text-balance">
            {copy.hero.h1}
          </h1>
          <p className="text-body text-body-lg max-mob:text-body-md max-mob:mt-3.5 max-mob:max-w-none mx-auto mt-5.5 max-w-155 text-pretty">
            {copy.hero.deck}
          </p>
        </div>
      </section>

      <div className="container-wide max-mob:px-4.5 max-mob:pt-7 max-mob:pb-16 pt-13 pb-24">
        {hasArticles ? (
          <>
            {featured ? (
              <div className="mb-10">
                <FeaturedArticle
                  article={featured}
                  kicker={copy.featuredKicker}
                />
              </div>
            ) : null}
            {rest.length ? (
              <ul className="max-bento:grid-cols-2 max-cards:grid-cols-1 grid grid-cols-3 gap-6.5">
                {rest.map((article) => (
                  <li key={article.slug} className="flex">
                    <ArticleCard
                      article={article}
                      readLabel={copy.readLabel}
                      sizes="(max-width: 520px) 100vw, (max-width: 1080px) 50vw, 33vw"
                    />
                  </li>
                ))}
              </ul>
            ) : null}
          </>
        ) : (
          <p className="text-muted text-body-lg py-16 text-center">
            {copy.indexEmpty}
          </p>
        )}
      </div>
    </>
  );
}

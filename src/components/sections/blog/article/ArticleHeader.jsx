import Link from "next/link";
import ArtDirectedImage from "@/components/shared/ArtDirectedImage";
import Byline from "../Byline";
import { formatArticleDate, readTimeLabel } from "../blog.helpers";
import { HERO_SIZE } from "./articleHeader.constants";

/**
 * Breadcrumb, category, title, byline and hero image.
 *
 * Adapted from the reference: `ROUTES.home.path`/`ROUTES.blog.path` (no
 * routes registry in this project — see plan/CLAUDE.md → Decisions) become
 * the plain paths `/` and `/resources` directly.
 *
 * The breadcrumb's first crumb reads "Resources" and is NOT a link — the
 * design draws it as a section name; "Articles" is the real destination.
 */
const Dot = () => (
  <span aria-hidden="true" className="bg-border-strong size-1 rounded-full" />
);

export default function ArticleHeader({ article, copy }) {
  const date = formatArticleDate(article.published);
  const minutes = readTimeLabel(article.minutes);

  const updated =
    article.updated && article.updated !== article.published
      ? formatArticleDate(article.updated)
      : null;

  return (
    <header className="article-hero-wash -mt-23 pt-23">
      <div className="container-wide max-mob:px-4.5 max-mob:pt-3.5 max-mob:pb-0 pt-8.5 pb-10">
        <nav aria-label={copy.breadcrumbLabel}>
          <ol className="text-muted text-caption max-mob:text-caption max-mob:gap-2 flex flex-wrap items-center gap-2">
            <li>
              <Link
                href="/"
                className="focus-ring hover:text-blue rounded-xs transition-colors"
              >
                {copy.crumbSection}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href="/resources"
                className="focus-ring hover:text-blue rounded-xs transition-colors"
              >
                {copy.crumbBlog}
              </Link>
            </li>
          </ol>
        </nav>

        {article.category ? (
          <p className="text-blue bg-blue/8 rounded-tag text-caption max-mob:text-caption tracking-caps max-mob:mt-4 max-mob:px-2.5 max-mob:py-1.5 mt-6.5 inline-flex items-center gap-2 px-3 py-1.5 font-bold uppercase">
            {article.category.name}
          </p>
        ) : null}

        <h1 className="text-ink text-display-1 max-mob:text-title-2 tracking-heading max-mob:mt-3.5 max-mob:text-pretty mt-4.5 font-bold text-balance">
          {article.title}
        </h1>

        <div className="max-mob:mt-5 mt-6.5 flex items-center gap-3">
          <Byline author={article.author} size="lg" nameOnly />
          <div className="min-w-0">
            <span className="text-ink text-body-sm max-mob:text-caption block font-semibold">
              {article.author?.name}
            </span>
            <p className="text-muted text-caption max-mob:text-caption mt-0.5 flex flex-wrap items-center gap-2">
              {article.author?.designation ? (
                <span>{article.author.designation}</span>
              ) : null}
              {date ? <Dot /> : null}
              {date ? (
                <span>
                  {copy.publishedLabel ? `${copy.publishedLabel} ` : ""}
                  {date}
                </span>
              ) : null}
              {updated ? <Dot /> : null}
              {updated ? (
                <span>
                  {copy.updatedLabel ? `${copy.updatedLabel} ` : ""}
                  {updated}
                </span>
              ) : null}
              {minutes ? <Dot /> : null}
              {minutes ? <span>{minutes}</span> : null}
            </p>
          </div>
        </div>

        {article.hero ? (
          <div
            className="rounded-hero-img max-mob:rounded-card max-mob:mt-5.5 relative mt-8.5 w-full overflow-hidden"
            style={{
              maxWidth: `${article.hero.width ?? HERO_SIZE.width}px`,
            }}
          >
            <ArtDirectedImage
              image={article.hero}
              mobile={article.heroMobile}
              alt={article.hero.alt || article.title}
              title={article.title}
              width={article.hero.width ?? HERO_SIZE.width}
              height={article.hero.height ?? HERO_SIZE.height}
              priority
              sizes={`(max-width: 1320px) 100vw, ${article.hero.width ?? HERO_SIZE.width}px`}
              className="block h-auto w-full"
            />
          </div>
        ) : null}
      </div>
    </header>
  );
}

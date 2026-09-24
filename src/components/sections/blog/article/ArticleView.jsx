import ArticleBody from "./ArticleBody";
import ArticleHeader from "./ArticleHeader";
import ArticleToc from "./ArticleToc";
import AuthorCard from "./AuthorCard";
import ReadNext from "./ReadNext";
import ShareRail from "./ShareRail";
import { outlineOf } from "./articleHeadings";

/**
 * The article template: header, contents rail, body, share, read next.
 *
 * The outline is derived here, once, from the markdown the body is about to
 * render — not hand-authored and not stored.
 *
 * Only the TOC is a Client Component; everything else, including the whole
 * body, renders on the server.
 *
 * Genuinely unverified end-to-end: no article exists anywhere in this
 * project (see src/lib/articles.js), so this component has never actually
 * received real data — it's ported faithfully from the reference and should
 * work once one exists, but that's not the same as having been checked.
 */
export default function ArticleView({ article, readNext, copy, url }) {
  const blocks = article.blocks;
  const markdown = blocks
    .filter((b) => b.__component === "shared.rich-text")
    .map((b) => b.body ?? "")
    .join("\n\n");
  const { sections } = outlineOf(markdown);

  return (
    <>
      <ArticleHeader article={article} copy={copy.article} />

      <div className="container-wide article-body-cols max-bento:gap-9 max-mob:gap-0 max-mob:px-4.5 max-mob:pt-6.5 max-mob:pb-9 grid items-start gap-16 pt-14 pb-16">
        <div className="max-bento:static sticky top-26 self-start">
          <ArticleToc sections={sections} label={copy.article.contentsLabel} />
          <div className="max-mob:hidden">
            <ShareRail url={url} title={article.title} copy={copy.share} />
          </div>
        </div>

        <article>
          <ArticleBody blocks={blocks} copy={copy.article} />

          <div className="mob:hidden">
            <ShareRail url={url} title={article.title} copy={copy.share} />
          </div>

          <AuthorCard
            author={article.author}
            heading={copy.article.authorHeading}
          />
        </article>
      </div>

      <ReadNext
        articles={readNext}
        copy={copy.article}
        readLabel={copy.readLabel}
      />
    </>
  );
}

import { notFound } from "next/navigation";
import ArticleView from "@/components/sections/blog/article/ArticleView";
import TopicLinks from "@/components/sections/blog/article/TopicLinks";
import { BLOG_LABELS } from "@/components/sections/blog/blog.labels";
import { getContent } from "@/lib/content";
import { getArticle, getArticles, getReadNext, getTopics } from "@/lib/articles";

const SITE_URL = "https://shruhani.com";

/**
 * Every article prerendered at build time — `[]` today, since
 * `getArticles()` always returns empty (see src/lib/articles.js). No
 * articles to build; the route falls through to `notFound()` for any slug,
 * which is correct, not a bug, until real content exists.
 */
export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

/**
 * Adapted from the reference: plain metadata fields (no `lib/seo.js`/routes
 * registry — see plan/CLAUDE.md → Decisions), no `ArticleSchema` (JSON-LD,
 * Phase 8 scope).
 */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};

  const seo = article.seo ?? {};
  return {
    title: seo.title ?? article.seoTitle ?? article.title,
    description: seo.description ?? article.deck,
    keywords: seo.keywords,
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const content = getContent("blog");
  const copy = { ...BLOG_LABELS, ...content };
  const [readNext, topics] = await Promise.all([
    getReadNext(article),
    getTopics(),
  ]);

  return (
    <>
      <ArticleView
        article={article}
        readNext={readNext}
        copy={copy}
        url={`${SITE_URL}/resources/article/${article.slug}`}
      />
      <TopicLinks topics={topics} copy={copy.article} />
    </>
  );
}

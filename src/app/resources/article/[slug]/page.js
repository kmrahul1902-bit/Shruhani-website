import { notFound } from "next/navigation";
import ArticleView from "@/components/sections/blog/article/ArticleView";
import TopicLinks from "@/components/sections/blog/article/TopicLinks";
import PageSchema from "@/components/shared/PageSchema";
import { BLOG_LABELS } from "@/components/sections/blog/blog.labels";
import {
  getArticle,
  getArticles,
  getReadNext,
  getTopics,
} from "@/lib/articles";
import { buildMetadata, SITE } from "@/lib/seo";

/**
 * Every article is prerendered at build time — this is a static-export site
 * (see plan/CLAUDE.md → Decisions), so there is no request-time fallback.
 */
export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};

  return buildMetadata({
    title: article.title,
    description: article.deck,
    path: `/resources/article/${article.slug}`,
    shareImage: article.cover
      ? { src: article.cover.src, alt: article.title }
      : undefined,
  });
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const [readNext, topics] = await Promise.all([
    getReadNext(article),
    getTopics(),
  ]);
  const copy = BLOG_LABELS;

  return (
    <>
      <PageSchema
        path={`/resources/article/${article.slug}`}
        seo={{ metaTitle: article.title, metaDescription: article.deck }}
      />
      <ArticleView
        article={article}
        readNext={readNext}
        copy={copy}
        url={`${SITE.url}/resources/article/${article.slug}`}
      />
      <TopicLinks topics={topics} copy={copy.article} />
    </>
  );
}

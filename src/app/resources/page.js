import BlogIndex from "@/components/sections/blog/index/BlogIndex";
import { BLOG_LABELS } from "@/components/sections/blog/blog.labels";
import PageSchema from "@/components/shared/PageSchema";
import { getArticles } from "@/lib/articles";
import { getContent } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata() {
  const { seo } = getContent("blog");
  return buildMetadata({
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.keywords,
    path: "/resources",
  });
}

export default async function ResourcesPage() {
  const content = getContent("blog");
  const copy = { ...BLOG_LABELS, ...content };
  const articles = await getArticles();

  // Newest first is the sort a real CMS query would already apply. Today
  // `articles` is always [] (see src/lib/articles.js), so BlogIndex renders
  // its empty state.
  const [featured, ...rest] = articles;

  return (
    <>
      <PageSchema path="/resources" seo={content.seo} />
      <BlogIndex featured={featured} rest={rest} copy={copy} />
    </>
  );
}

import BlogIndex from "@/components/sections/blog/index/BlogIndex";
import { BLOG_LABELS } from "@/components/sections/blog/blog.labels";
import { getArticles } from "@/lib/articles";
import { getContent } from "@/lib/content";

/**
 * Adapted from the reference: plain `generateMetadata`/`getContent` (no
 * `lib/seo.js`/routes registry — see plan/CLAUDE.md → Decisions). No
 * `BlogIndexSchema` (JSON-LD, Phase 8 scope).
 */
export function generateMetadata() {
  const { seo } = getContent("blog");
  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.keywords,
  };
}

export default async function ResourcesPage() {
  const content = getContent("blog");
  const copy = { ...BLOG_LABELS, ...content };
  const articles = await getArticles();

  // Newest first is the sort a real CMS query would already apply. Today
  // `articles` is always [] (see src/lib/articles.js), so BlogIndex renders
  // its empty state.
  const [featured, ...rest] = articles;

  return <BlogIndex featured={featured} rest={rest} copy={copy} />;
}

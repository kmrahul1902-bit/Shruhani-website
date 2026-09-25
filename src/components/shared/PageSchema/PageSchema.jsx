import JsonLd from "@/components/shared/JsonLd";
import { webPageSchema } from "@/lib/schema";

/**
 * The per-page half of the structured-data graph: just WebPage.
 *
 * Rewritten from the reference, which also took a `pageKey` and looked up the
 * route + breadcrumb trail via `ROUTES`/`getShellContent()`. Neither exists
 * here (no CMS/routes registry — see plan/CLAUDE.md → Decisions), so this
 * takes `path` directly — every route's path is already a literal string in
 * its own `page.js` — and drops breadcrumb JSON-LD entirely (see the note in
 * `lib/schema.js`).
 *
 * `extraSchemas` lets a specific page (currently just `/faq`) add its own
 * graph — e.g. FAQPage — without this component needing to know about every
 * page-specific schema type.
 */
export default function PageSchema({ path, seo, extraSchemas = [] }) {
  return (
    <JsonLd
      schemas={[
        webPageSchema({
          title: seo.metaTitle,
          description: seo.metaDescription,
          path,
        }),
        ...extraSchemas,
      ]}
    />
  );
}

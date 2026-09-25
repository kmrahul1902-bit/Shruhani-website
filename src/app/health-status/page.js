import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Health Status — Shruhani",
  description: "Internal service health check. Not a public page.",
  path: "/health-status",
  noIndex: true,
});

export default function Page() {
  return <div>TODO: /health-status — placeholder, core infra.</div>;
}

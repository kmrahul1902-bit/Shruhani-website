import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CtaBand, { CtaBandGate } from "@/components/sections/CtaBand";
import JsonLd from "@/components/shared/JsonLd";
import { footerContent } from "@/components/layout/Footer/footer.content";
import { organizationSchema, webSiteSchema } from "@/lib/schema";
import { SITE } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  // Resolves every page's relative OG/Twitter image URL (e.g. buildMetadata's
  // `/images/og-preview.png`) to an absolute one — required for social
  // crawlers, and Next warns on every build without it.
  metadataBase: new URL(SITE.url),
  title: "Shruhani",
  description: "Real-time fraud & credit-risk intelligence for Indian BFSI.",
  manifest: "/manifest.json",
};

/** @type {import("next").Viewport} */
export const viewport = {
  themeColor: "#E536A3",
};

const ORGANIZATION_DESCRIPTION =
  "Real-time fraud & credit-risk intelligence for Indian BFSI.";

// Reuses the same socials list the footer renders (and its TODO(verify) —
// see footer.content.js) rather than a second, independently-flagged copy.
const ORGANIZATION_SAME_AS = footerContent.socials.map((social) => social.href);

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <JsonLd
          schemas={[
            organizationSchema({
              description: ORGANIZATION_DESCRIPTION,
              sameAs: ORGANIZATION_SAME_AS,
            }),
            webSiteSchema({ description: ORGANIZATION_DESCRIPTION }),
          ]}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <CtaBandGate>
          <CtaBand />
        </CtaBandGate>
        <Footer />
      </body>
    </html>
  );
}

/**
 * Footer copy + sitemap, carried over from the reference's
 * data/content/shell.js (this project has no CMS/routes registry — see
 * plan/CLAUDE.md → Decisions). Sign3→Shruhani renamed where brand-facing;
 * facts are preserved as written per guardrail #2, with `TODO(verify)` on
 * the rename-sensitive items a human must confirm before the investor
 * presentation.
 */

export const footerContent = {
  homeLabel: "Shruhani home",
  navLabel: "Footer",

  // Six groups, paired two-at-a-time into three columns by Footer.jsx —
  // layout, not content (matches the reference's own footerColumnPairs).
  columns: [
    {
      heading: "Products",
      links: [
        { label: "ScreenX", href: "/products/screenx" },
        { label: "Cortex", href: "/products/cortex" },
        { label: "EscalationX", href: "/products/escalation" },
      ],
    },
    {
      heading: "Modules",
      links: [
        {
          label: "Device Intelligence",
          href: "/products/modules/device-intelligence",
        },
        {
          label: "Behavioural Intelligence",
          href: "/products/modules/behavioural-biometrics",
        },
        {
          label: "Digital Footprint",
          href: "/products/modules/digital-footprint",
        },
        {
          label: "Image Intelligence",
          href: "/products/modules/image-intelligence",
        },
        {
          label: "Location Intelligence",
          href: "/products/modules/location-intelligence",
        },
        {
          label: "SMS Intelligence",
          href: "/products/modules/sms-intelligence",
        },
      ],
    },
    {
      heading: "Use cases",
      links: [
        { label: "Onboarding", href: "/solutions/use-cases/onboarding" },
        { label: "Fraud Detection", href: "/solutions/use-cases/fraud" },
        { label: "Credit Risk", href: "/solutions/use-cases/credit-risk" },
        { label: "AML & Compliance", href: "/solutions/use-cases/compliance" },
      ],
    },
    {
      heading: "Industries",
      links: [
        { label: "Banks & SFBs", href: "/solutions/industries/banks-sfbs" },
        {
          label: "Fintechs & Neobanks",
          href: "/solutions/industries/fintechs-neobanks",
        },
        {
          label: "NBFCs & Lending",
          href: "/solutions/industries/nbfcs-lending",
        },
        {
          label: "E-Commerce & Marketplaces",
          href: "/solutions/industries/ecommerce-marketplaces",
        },
      ],
    },
    {
      heading: "Resources",
      links: [
        { label: "Articles", href: "/resources" },
        { label: "FAQs", href: "/faq" },
      ],
    },
    {
      heading: "About Shruhani",
      links: [
        { label: "About us", href: "/about" },
        { label: "Investors & partners", href: "/investors-partners" },
        { label: "Contact us", href: "/book-a-demo" },
      ],
    },
  ],

  // TODO(verify): registered legal entity details — name, CIN, GST,
  // registered address (guardrail #2, item 1). Carried over verbatim from
  // the reference; the entity name below is already "Shruhani Technologies
  // Pvt. Ltd." in the source content (it names the legal owner behind the
  // Sign3-branded product), so it may need no change — confirm against
  // current company records before the investor presentation.
  contact: {
    heading: "Contact",
    // Global-rename of the reference's "contact@sign3.ai", then updated to
    // the team's real contact address.
    email: "amit@shruhani.com",
    phone: "+91 88103 94015",
    addressLines: [
      "241, Udyog Vihar Phase 1, Sector 20",
      "Gurugram, Haryana 122016",
    ],
  },

  language: { heading: "Language", value: "English" },

  legal: [
    { label: "Terms of use", href: "/privacy-policy" },
    { label: "Privacy policy", href: "/privacy-policy" },
  ],

  // TODO(verify): customer/press-displayable items (guardrail #2, item 3) —
  // confirm these social accounts have been renamed/rebranded to Shruhani
  // (or point to new ones) before launch. URLs carried over unchanged so
  // nothing here silently breaks.
  socials: [
    { label: "LinkedIn", href: "https://in.linkedin.com/company/sign3labs" },
    { label: "X", href: "https://x.com/sign3labs" },
    {
      label: "Facebook",
      href: "https://www.facebook.com/profile.php?id=100090065815365",
    },
  ],

  // TODO(verify): registered legal entity details — see the note on
  // `contact` above. This line already reads "Shruhani Technologies Pvt.
  // Ltd." in the reference; confirm it matches current records.
  copyright: `© ${new Date().getFullYear()} Shruhani Technologies Pvt. Ltd.`,

  // TODO(verify): certification names reissued under the new entity name
  // (guardrail #2, item 2) — SOC 2 Type II and ISO 27001 are carried over
  // as claimed by the reference; confirm both are still valid/reissued
  // under Shruhani Technologies before this ships.
  disclaimer:
    "Shruhani operates in compliance with applicable financial regulations in the regions where we do business. We are SOC 2 Type II certified, ISO 27001 compliant and use bank-grade encryption to protect every signal we process. Services and features may vary by country and are subject to licensing and local compliance requirements. Availability of specific modules, integrations and data sources may vary by customer and region.",
};

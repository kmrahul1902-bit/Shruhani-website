/**
 * Nav structure + copy, combined (no CMS, no routes registry in this project
 * — see plan/CLAUDE.md → Decisions). Carried over from the reference's
 * config/navigation.js + data/content/shell.js, Sign3→Shruhani renamed where
 * brand-facing; category/product copy is unchanged (guardrail #2).
 *
 * The reference's "featured article" third column (a pinned blog post with a
 * cover image) is dropped here — Phase 2 has no blog/resources content wired
 * yet. Each mega panel is two link columns only.
 */

const mega = (key, label, groups) => ({ key, type: "mega", label, groups });

export const mainNav = [
  mega("products", "Products", [
    {
      key: "products",
      eyebrow: "Products",
      items: [
        {
          key: "screenx",
          icon: "screenx",
          href: "/products/screenx",
          label: "ScreenX",
          description: "Live decisioning engine",
        },
        {
          key: "cortex",
          icon: "cortex",
          href: "/products/cortex",
          label: "Cortex",
          description: "GNN + EDD intelligence",
        },
        {
          key: "escalation",
          icon: "escalation",
          href: "/products/escalation",
          label: "EscalationX",
          description: "Investigation & financial-crime ops",
        },
      ],
    },
    {
      key: "modules",
      eyebrow: "Modules",
      items: [
        {
          key: "device",
          icon: "device",
          href: "/products/modules/device-intelligence",
          label: "Device Intelligence",
          description: "Persistent fingerprint",
        },
        {
          key: "behaviour",
          icon: "behaviour",
          href: "/products/modules/behavioural-biometrics",
          label: "Behavioral Biometrics",
          description: "How they type is who they are",
        },
        {
          key: "footprint",
          icon: "footprint",
          href: "/products/modules/digital-footprint",
          label: "Digital Footprint",
          description: "Phone + email → 300+ signals",
        },
        {
          key: "location",
          icon: "location",
          href: "/products/modules/location-intelligence",
          label: "Location Intelligence",
          description: "India at 100m × 100m",
        },
        {
          key: "image",
          icon: "image",
          href: "/products/modules/image-intelligence",
          label: "Image Intelligence",
          description: "Four layers from one selfie",
        },
        {
          key: "sms",
          icon: "sms",
          href: "/products/modules/sms-intelligence",
          label: "SMS Intelligence",
          description: "Financial SMS to structured data",
        },
      ],
    },
  ]),
  mega("solutions", "Solutions", [
    {
      key: "useCases",
      eyebrow: "Use cases",
      items: [
        {
          key: "onboarding",
          icon: "onboarding",
          href: "/solutions/use-cases/onboarding",
          label: "Onboarding",
          description: "Pre-KYC intelligence",
        },
        {
          key: "fraud",
          icon: "fraud",
          href: "/solutions/use-cases/fraud",
          label: "Fraud Detection",
          description: "Mules, ATO, fraud rings",
        },
        {
          key: "credit",
          icon: "credit",
          href: "/solutions/use-cases/credit-risk",
          label: "Credit Underwriting",
          description: "FPD + thin-file scoring",
        },
        {
          key: "aml",
          icon: "doc",
          href: "/solutions/use-cases/compliance",
          label: "AML & Compliance",
          description: "EDD, GNN, goAML STR",
        },
      ],
    },
    {
      key: "industries",
      eyebrow: "Industries",
      items: [
        {
          key: "banks",
          icon: "bank",
          href: "/solutions/industries/banks-sfbs",
          label: "Banks & SFBs",
          description: "Savings, loans, UPI, mules",
        },
        {
          key: "lending",
          icon: "lending",
          href: "/solutions/industries/nbfcs-lending",
          label: "NBFCs & Lending",
          description: "FPD, device farms, thin-file",
        },
        {
          key: "fintechs",
          icon: "card",
          href: "/solutions/industries/fintechs-neobanks",
          label: "Fintechs & Neobanks",
          description: "Real-time. Days to deploy.",
        },
        {
          key: "ecommerce",
          icon: "cart",
          href: "/solutions/industries/ecommerce-marketplaces",
          label: "E-Commerce",
          description: "Multi-accounting, fake sellers",
        },
      ],
    },
  ]),
  { key: "blog", type: "link", href: "/resources", label: "Articles" },
  { key: "about", type: "link", href: "/about", label: "About" },
];

const megaByKey = Object.fromEntries(
  mainNav.filter((item) => item.type === "mega").map((item) => [item.key, item])
);

const groupOf = (panelKey, groupKey) => ({
  panel: panelKey,
  group: groupKey,
  ...megaByKey[panelKey].groups.find((g) => g.key === groupKey),
});

export const mobileNav = [
  {
    key: "products",
    type: "category",
    label: "Products",
    groups: [groupOf("products", "products")],
  },
  {
    key: "modules",
    type: "category",
    label: "Modules",
    groups: [groupOf("products", "modules")],
  },
  {
    key: "solutions",
    type: "category",
    label: "Solutions",
    groups: [
      groupOf("solutions", "useCases"),
      groupOf("solutions", "industries"),
    ],
  },
  { key: "blog", type: "link", href: "/resources", label: "Articles" },
  { key: "about", type: "link", href: "/about", label: "About" },
];

export const navCopy = {
  mainLabel: "Main",
  demo: "Book a demo",
  login: "Log in",
  openMenu: "Open menu",
  menuTitle: "Menu",
  backLabel: "Close menu",
};

export const site = {
  demoHref: "/book-a-demo",
  // Global-rename of the reference's "https://platform.sign3labs.com".
  // TODO(verify): confirm the platform.shruhani.com subdomain is live before
  // launch — this is a mechanical domain rename, not a confirmed URL.
  loginUrl: "https://platform.shruhani.com",
};

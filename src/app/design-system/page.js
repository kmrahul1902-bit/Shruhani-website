export const metadata = {
  title: "Design System — Shruhani",
  robots: { index: false, follow: false },
};

// Page-specific reference data — lives with the route, not src/data.
// Phase 1 scope: verify color tokens, type scale, and per-product accent
// theming render correctly after the pink rebrand. Button/Badge/Card
// primitives don't exist yet (Phase 2) — their swatches return once built.
const COLOR_GROUPS = [
  {
    name: "Brand & action",
    tokens: [
      "bg-blue",
      "bg-blue-hover",
      "bg-ink",
      "bg-surface",
      "bg-surface-2",
      "bg-navy",
    ],
  },
  {
    name: "Accent (themed per product)",
    tokens: [
      "bg-accent",
      "bg-accent-bright",
      "bg-accent-deep",
      "bg-accent-tint-1",
      "bg-accent-tint-2",
      "bg-accent-tint-3",
    ],
  },
  {
    name: "Semantic",
    tokens: [
      "bg-success",
      "bg-success-bg",
      "bg-warn-bright",
      "bg-warn-bg",
      "bg-danger-bright",
      "bg-danger-bg",
    ],
  },
  {
    name: "Role text (content=gray / footer=slate)",
    tokens: [
      "bg-ink",
      "bg-body",
      "bg-muted",
      "bg-faint",
      "bg-strong",
      "bg-footer-heading",
      "bg-footer-text",
      "bg-footer-faint",
    ],
  },
  {
    name: "Borders & misc",
    tokens: [
      "bg-border",
      "bg-border-dark",
      "bg-payload",
      "bg-fraud",
      "bg-blue-on-dark",
    ],
  },
];

const TYPE_SCALE = [
  { cls: "text-display-1", label: "display-1 — landing hero" },
  {
    cls: "text-display-2 tracking-display",
    label: "display-2 — product hero",
  },
  { cls: "text-title-1", label: "title-1 32/600" },
  { cls: "text-title-2 tracking-snug", label: "title-2 28/600" },
  { cls: "text-title-3", label: "title-3 24/600" },
  { cls: "text-body-lg font-bold tracking-snug", label: "body-lg 20/700" },
  { cls: "text-body-md", label: "body-md 16" },
  { cls: "text-body-sm", label: "body-sm 14" },
  { cls: "text-caption", label: "caption 12" },
  { cls: "text-eyebrow", label: "eyebrow 12, +0.09em, 700" },
];

const ACCENTS = [
  { id: undefined, name: "ScreenX (default — logo pink)" },
  { id: "cortex", name: "Cortex (green)" },
  { id: "escalation", name: "Escalation (purple)" },
];

function Swatch({ token }) {
  return (
    <div className="border-border overflow-hidden rounded-lg border">
      <div className={`h-14 ${token}`} />
      <p className="text-caption text-muted px-2 py-1 font-mono">{token}</p>
    </div>
  );
}

export default function DesignSystemPage() {
  return (
    <main className="container-default section-pad flex flex-col gap-16">
      <header className="flex flex-col gap-2">
        <p className="text-eyebrow text-accent-deep">Internal</p>
        <h1 className="text-display-2 text-ink">Design System</h1>
        <p className="text-body-lg text-muted">
          Every color, type and accent token — dev-only reference (noindex).
        </p>
      </header>

      {COLOR_GROUPS.map((group) => (
        <section key={group.name} className="flex flex-col gap-4">
          <h2 className="text-body-lg tracking-snug text-ink font-bold">
            {group.name}
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {group.tokens.map((token) => (
              <Swatch key={token} token={token} />
            ))}
          </div>
        </section>
      ))}

      <section className="flex flex-col gap-6">
        <h2 className="text-body-lg tracking-snug text-ink font-bold">
          Type scale
        </h2>
        {TYPE_SCALE.map(({ cls, label }) => (
          <div key={cls} className="border-border border-b pb-4">
            <p className={`${cls} text-ink`}>Stop fraud before it acts</p>
            <p className="text-caption text-muted font-mono">{label}</p>
          </div>
        ))}
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-body-lg tracking-snug text-ink font-bold">
          Containers & rhythm
        </h2>
        <div className="flex flex-col gap-4">
          <div className="container-narrow">
            <div className="bg-surface-2 rounded-pill h-4" />
          </div>
          <p className="text-caption text-muted">container-narrow (1200px)</p>
          <div className="container-default">
            <div className="bg-surface-2 rounded-pill h-4" />
          </div>
          <p className="text-caption text-muted">container-default (1320px)</p>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-body-lg tracking-snug text-ink font-bold">
          Accent theming — one attribute, three products
        </h2>
        <div className="grid gap-6 lg:grid-cols-3">
          {ACCENTS.map(({ id, name }) => (
            <div
              key={name}
              data-accent={id}
              className="rounded-card border-border flex flex-col gap-0 overflow-hidden border"
            >
              <div className="hero-wash flex h-40 flex-col justify-end p-5">
                <p className="eyebrow">{name}</p>
              </div>
              <div className="flex items-center gap-3 p-5">
                <span
                  data-testid="accent-dot"
                  className="bg-accent h-6 w-6 rounded-full"
                />
                <span className="bg-accent-bright h-6 w-6 rounded-full" />
                <span className="bg-accent-deep h-6 w-6 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-body-lg tracking-snug text-ink font-bold">
          Surfaces & motifs
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="dotted-texture rounded-card border-border h-32 border bg-white" />
          <div className="cta-glow rounded-card flex h-32 items-center justify-center">
            <p className="text-on-dark text-body-lg tracking-snug font-bold">
              CTA glow
            </p>
          </div>
          <div className="bg-dark rounded-card flex h-32 flex-col justify-center gap-1 p-5">
            <p className="text-on-dark">on-dark heading</p>
            <p className="text-on-dark-body">on-dark body copy</p>
            <p className="text-on-dark-faint text-caption">on-dark faint</p>
          </div>
        </div>
      </section>

      <p className="text-caption text-muted">
        Buttons, Badges and Cards return here once their primitives are built in
        Phase 2.
      </p>
    </main>
  );
}

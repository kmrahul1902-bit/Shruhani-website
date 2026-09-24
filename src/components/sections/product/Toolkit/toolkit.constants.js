/**
 * Per-page dressing for the toolkit band: the section is shared, and only its
 * ground, accent and spacing differ between the product pages.
 */
const ICONS = {
  gauge: (
    <>
      <path d="M12 3a9 9 0 1 0 9 9" />
      <path d="M12 12l5-5" />
      <path d="M12 12V7" />
    </>
  ),
  flag: (
    <>
      <path d="M4 21V4h12l-2 3 2 3H4" />
      <line x1="4" y1="21" x2="4" y2="14" />
    </>
  ),
  clipboard: (
    <g
      dangerouslySetInnerHTML={{
        __html: `<path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12h6M9 16h4"/>`,
      }}
    />
  ),
  inbox: (
    <g
      dangerouslySetInnerHTML={{
        __html: `<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>`,
      }}
    />
  ),
  sort: (
    <g
      dangerouslySetInnerHTML={{
        __html: `<path d="M3 6h18M6 12h12M10 18h4"/>`,
      }}
    />
  ),
  branch: (
    <>
      <circle cx="6" cy="6" r="3" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="12" cy="18" r="3" />
      <path d="M6 9v3a2 2 0 0 0 2 2h2M18 9v3a2 2 0 0 1-2 2h-2" />
    </>
  ),
  graph: (
    <>
      <path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-5h6v5" />
    </>
  ),
  log: (
    <>
      <path d="M4 6h16M4 12h16M4 18h10" />
      <circle cx="19" cy="18" r="2.5" />
    </>
  ),
};

/**
 * "Everything Cortex returns on every account" — five dark tiles (mockup
 * .tk-sec, lines 3906–3940).
 *
 * A centred flex wrap rather than a 3-column grid, because five items in a
 * grid leave a hole: the design wants three then two, centred, and that is
 * what `flex-wrap` + a one-third basis produces at every column count.
 *
 * Server Component: the hover treatment is pure CSS.
 */
/**
 * Both pages return five things and both lay them out three-then-two, centred
 * — but the mockups reach it differently and tune the tile to their own page.
 * Cortex uses a flex wrap with a one-third basis; ScreenX a 3-column grid with
 * a second, narrower row. The rendered result is the same shape, so this stays
 * one component with the flex mechanism (which is correct at every column
 * count) and a variant for the tuning.
 */
export const VARIANTS = {
  cortex: {
    section: "px-10 py-27.5",
    wrap: "max-w-280",
    head: "mb-14",
    heading: "text-display-2 font-semibold tracking-display",
    deck: "mt-4.5 max-w-145 text-white/55",
    grid: "gap-7",
    tile: "px-7.5 py-8.5",
  },
  screenx: {
    section: "px-20 pt-25 pb-27.5",
    wrap: "max-w-295",
    head: "mb-15",
    heading: "text-display-2 font-semibold tracking-display mb-4",
    deck: "max-w-155 text-white/48",
    grid: "gap-5.5",
    tile: "toolkit-tile-tight px-7 pt-8 pb-9",
  },
};

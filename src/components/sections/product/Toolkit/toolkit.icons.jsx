/**
 * The five glyphs, keyed by the content module's `icon`. Inline SVG rather
 * than an icon package: these are drawn for this grid (1.7 stroke, 24-box) and
 * pulling five shapes out of lucide would not match, while shipping a runtime
 * dependency for five static paths costs more than it saves.
 */
export const ICONS = {
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

/**
 * One `sizes` for both layouts, and it has to stay that way.
 */
export const MODULE_IMAGE_SIZES =
  "(max-width: 620px) 350px, (max-width: 960px) 50vw, 300px";

/**
 * Structural metadata (route/key) for the six modules, in the same order
 * `home.json`'s `modulesGrid.modules` carries them (confirmed by each
 * module's own `title`) — the reference reads `key`/`href`/`image` from the
 * CMS alongside the copy; we have no CMS, so it lives here instead (see
 * plan/CLAUDE.md → Decisions). No `image` — none of these have an asset
 * anywhere in this project (same situation as LogoGrid), so the tile
 * renders without artwork rather than a broken image.
 */
export const MODULE_META = [
  { key: "device", href: "/products/modules/device-intelligence" },
  { key: "behavioural", href: "/products/modules/behavioural-biometrics" },
  { key: "footprint", href: "/products/modules/digital-footprint" },
  { key: "image", href: "/products/modules/image-intelligence" },
  { key: "location", href: "/products/modules/location-intelligence" },
  { key: "sms", href: "/products/modules/sms-intelligence" },
];

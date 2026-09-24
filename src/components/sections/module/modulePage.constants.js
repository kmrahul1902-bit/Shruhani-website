/**
 * How each module's MOBILE hero animation is framed.
 *
 * Per module, not one number: five fit a 354px-wide host and only need
 * their height reserved; Location is drawn at 680x510 and scaled INTO the
 * host, carrying a scale and a wrapper height that is not its own.
 */
export const MOBILE_HERO_FRAME = {
  "device-intelligence": { height: 264 },
  "behavioural-biometrics": { height: 246 },
  "digital-footprint": { height: 226 },
  "image-intelligence": { height: 234 },
  "location-intelligence": {
    width: 680,
    height: 510,
    scale: 0.5206,
    wrapperHeight: 268,
  },
  "sms-intelligence": { height: 227 },
};

/**
 * Where one module's mockup treats a shared section differently, as
 * layout rather than copy. Absent means the shared default, which is what
 * five of the six modules take.
 *
 * SMS is the only entry: `readerPlate: "photo"` grounds the explorer in
 * navy rather than pale blue (its slides show photographs, not line
 * artwork); `integrationMeasure: "wide"` widens the lead card/body for its
 * sentence-length opening fact; `readerMobileFrame: "16/11"` gives its
 * mobile explorer block a wider photo frame than its five siblings;
 * `gapArt: "bleed"` lets its "why it exists" illustration overflow its
 * cell on purpose; `appliesVisual: "plate"` supplies a white ground its
 * deployment illustrations don't carry themselves.
 */
export const MODULE_LAYOUT = {
  "sms-intelligence": {
    readerPlate: "photo",
    integrationMeasure: "wide",
    readerMobileFrame: "16/11",
    gapArt: "bleed",
    appliesVisual: "plate",
  },
};

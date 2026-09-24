import fs from "node:fs";
import path from "node:path";

/**
 * Baked-JSON content loader (Phase 0 decision — see CLAUDE.md → Decisions).
 * Reads `src/content/<key>.json`. Swapping to a live CMS later means
 * changing this function's body only — every page calls `getContent(key)`.
 */
export function getContent(key) {
  const filePath = path.join(process.cwd(), "src/content", `${key}.json`);
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

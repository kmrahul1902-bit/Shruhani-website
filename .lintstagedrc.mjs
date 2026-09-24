/**
 * Function-form config, not the package.json string-array shorthand: that
 * form (and a naive function form that ignores its `filenames` argument)
 * either interpolates every staged file's absolute path onto one command
 * line, or reformats the whole project regardless of what's staged. On
 * Windows, a commit touching ~90 files (a whole ported phase) blows past
 * the ~8k char argv limit on the first — "The command line is too long,"
 * silently reverting the commit — and the second quietly rewrites files
 * nobody asked to touch (confirmed: it reformatted legacy/index.html, an
 * .html file outside either glob below, because a bare `prettier --write .`
 * discovers everything Prettier supports, not just what lint-staged matched).
 *
 * The fix is to keep the file list but batch it, so eslint/prettier only
 * ever touch what's actually staged, in chunks small enough to never hit
 * the argv ceiling no matter how large the commit.
 */
const CHUNK_SIZE = 20;

function chunk(filenames, size) {
  const chunks = [];
  for (let i = 0; i < filenames.length; i += size) {
    chunks.push(filenames.slice(i, i + size));
  }
  return chunks;
}

function quote(filenames) {
  return filenames.map((f) => `"${f}"`).join(" ");
}

export default {
  "*.{js,jsx,mjs}": (filenames) =>
    chunk(filenames, CHUNK_SIZE).map((batch) => `eslint --fix ${quote(batch)}`),
  "*.{json,css,md}": (filenames) =>
    chunk(filenames, CHUNK_SIZE).map(
      (batch) => `prettier --write ${quote(batch)}`
    ),
};

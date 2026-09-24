import { cn } from "@/lib/cn";
import { ReaderIcon } from "./reader.icons";

/** Tone key → class. Whole literals so Tailwind actually emits them. */
const TONE_CLASS = {
  ok: "reader-tone-ok",
  warn: "reader-tone-warn",
  bad: "reader-tone-bad",
};

/**
 * One signal card: a glyph, a label, and the value the module read.
 * Presentational and stateless.
 */
export default function ReaderCard({ icon, label, value, tone, style }) {
  return (
    <div className="reader-card" style={style}>
      <span className="reader-card-ic">
        <ReaderIcon name={icon} />
      </span>
      <span className="reader-card-lb">{label}</span>
      <span className={cn("reader-card-vl", tone && TONE_CLASS[tone])}>
        {value}
      </span>
    </div>
  );
}

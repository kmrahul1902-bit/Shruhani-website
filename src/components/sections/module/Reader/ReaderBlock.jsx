import { cn } from "@/lib/cn";
import { ReaderTick } from "./reader.icons";

/**
 * One cluster's block of copy: rule, heading, body, and its bullet list.
 * Presentational — renders dimmer when it isn't the active one.
 */
export default function ReaderBlock({ blockRef, slide, active, id }) {
  return (
    <article
      ref={blockRef}
      id={id}
      className={cn("reader-block", active && "reader-block-on")}
    >
      <span className="reader-rule" aria-hidden="true" />
      <h3 className="reader-block-h">{slide.title}</h3>
      <p className="reader-block-p">{slide.body}</p>
      {slide.points?.length > 0 && (
        <ul className="reader-points">
          {slide.points.map((point) => (
            <li key={point} className="reader-point">
              <span className="reader-tick">
                <ReaderTick />
              </span>
              {point}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

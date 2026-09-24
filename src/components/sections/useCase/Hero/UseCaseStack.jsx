import Image from "next/image";
import { STATE } from "./useCaseStack.constants";
import { Node, StateIcon, Wires } from "./StackParts";

/**
 * The use-case hero's evidence stack.
 *
 * One animation across all four pages — only the photograph, rows, panel and
 * count-up target differ, and all of those live in content.
 *
 * Server Component. The mockup staircases its entrance from a script; the same
 * effect is an animation-delay per row here, so the hero ships no JavaScript and
 * reduced motion is one media query rather than a branch in a controller.
 *
 * The count-up is the one thing CSS cannot do honestly — an animated `@property`
 * counter renders a number no screen reader or copy-paste can reach. The final
 * figure is real text; only the bar animates.
 */
export default function UseCaseStack({ stack, photo, label }) {
  const { identityTitle, pill, rows, panel } = stack;

  return (
    <div
      className={`uc-stack ${panel.tone === "pass" ? "uc-panel-pass" : "uc-panel-alarm"}`}
      role="img"
      aria-label={label}
    >
      {/* The LCP element on this page. `priority` is deprecated in Next 16
          and emitted nothing — no eager load, no priority hint — so the
          browser discovered the hero photo only on parsing the body. */}
      {photo?.src && (
        <Image
          src={photo.src}
          alt=""
          fill
          sizes="(max-width: 760px) 370px, (max-width: 1080px) 515px, (max-width: 1200px) 528px, (max-width: 1460px) 594px, 660px"
          className="object-cover"
          loading="eager"
          fetchPriority="high"
        />
      )}
      <span className="evidence-scrim" aria-hidden="true" />

      <div className="uc-layer">
        <Wires />
        <Node />

        <div className="uc-col">
          <div className="uc-id">
            <span className="uc-mark" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 3l7.5 3.6v5c0 4.4-3.1 8.2-7.5 9.4-4.4-1.2-7.5-5-7.5-9.4v-5L12 3z"
                  stroke="#fff"
                  strokeWidth="1.9"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="text-body-md tracking-snug text-uc-heading-ink flex-1 font-bold">
              {identityTitle}
            </span>
            <span className="uc-pill">
              <i className="uc-pill-dot" aria-hidden="true" />
              {pill}
            </span>
          </div>

          {rows.map((row, i) => (
            <div key={row.key} className="uc-chip uc-enter">
              <span className={STATE[row.state].icon} aria-hidden="true">
                <StateIcon state={row.state} />
              </span>
              <span className="text-body-sm text-uc-label-ink flex-1 font-medium">
                {row.label}
              </span>
              {/* value and dot are one row — the same flex pair the industry
                  stack needed, for the same reason */}
              <span
                className="uc-resolve flex flex-none items-center gap-2"
                style={{ "--uc-step": `${i * 600}ms` }}
              >
                <span className={STATE[row.state].value}>{row.value}</span>
                <i className={`uc-dot ${STATE[row.state].dot}`} />
              </span>
            </div>
          ))}

          {/* The wrapper collapses; the panel inside keeps its natural height.
              Animating the panel itself squashed it to 30px instead of
              revealing it. */}
          <div className="uc-panel-wrap">
            <div className="uc-panel">
              <div className="flex items-center justify-between gap-2.5">
                <span className="text-eyebrow uc-panel-ink">{panel.label}</span>
                {/* The animated digits are decorative; the accessible name is
                  the real figure, so a screen reader announces "94" once
                  rather than every value it passes through. */}
                <span
                  className="text-title-1 uc-panel-score-ink uc-count font-bold"
                  style={{ "--uc-target": panel.target }}
                  aria-label={String(panel.target)}
                  role="text"
                />
              </div>
              {/* The spec fills the bar to 94% of the track at the target
                figure, whatever that figure is — the bar reads as "nearly
                there", not as a percentage of anything. */}
              <div className="uc-track" aria-hidden="true">
                <span className="uc-track-fill block" />
              </div>
              <p className="text-eyebrow uc-panel-copy-ink mt-2.5 font-normal">
                {panel.copy}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

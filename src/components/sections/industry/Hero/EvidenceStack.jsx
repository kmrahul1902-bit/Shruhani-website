import Image from "next/image";
import { resolveGlyph } from "@/lib/glyph";
import { DRIFT, TONE, WIRES } from "./evidenceStack.constants";
import { ICONS } from "./evidenceStack.icons";

/**
 * The four signal rows, and the dashed wires that carry a light from each into
 * the node. Coordinates are the mockup's SVG path data — artwork, so they live
 * with the artwork.
 *
 * Each row has a wire IN (from the customer card down the left) and a wire OUT
 * (into the node on the right); a light travels each on its own offset, so the
 * stack reads as evidence resolving continuously rather than in lockstep.
 *
 * Ported from the reference. Its two literal-blue accents (`#1D4ED8` badge
 * stroke, node ripple/core/arc) are recolored to the pink brand via
 * `TONE.blue` and a matching `--color-blue` fallback — the purple accent
 * (`#6D5AE6`) is Escalation's kept identity (Option A) and is untouched.
 */
export default function EvidenceStack({ visual, identity, signals, label }) {
  return (
    <div className="evidence-frame" role="img" aria-label={label}>
      {/* The LCP element on this page. `priority` is deprecated in Next 16
          and emitted nothing — no eager load, no priority hint — so the
          browser discovered the hero photo only on parsing the body. */}
      {visual?.src && (
        <Image
          src={visual.src}
          alt=""
          fill
          sizes="(max-width: 520px) 297px, (max-width: 1180px) 363px, 550px"
          className="object-cover"
          loading="eager"
          fetchPriority="high"
        />
      )}
      <span className="evidence-scrim" aria-hidden="true" />

      <div className="evidence-layer">
        <svg
          className="evidence-wires"
          width="500"
          height="430"
          viewBox="0 0 500 430"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <filter
              id="ind-glow"
              x="-300%"
              y="-300%"
              width="700%"
              height="700%"
            >
              <feGaussianBlur stdDeviation="2.4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {WIRES.map((w) => (
              <path
                key={`${w.key}-in`}
                id={`ind-${w.key}-in`}
                d={w.in}
                fill="none"
              />
            ))}
            {WIRES.map((w) => (
              <path
                key={`${w.key}-out`}
                id={`ind-${w.key}-out`}
                d={w.out}
                fill="none"
              />
            ))}
          </defs>

          <g
            stroke="#B9C2D0"
            strokeWidth="1"
            strokeDasharray="4 4"
            strokeLinecap="round"
            fill="none"
          >
            {WIRES.map((w) => (
              <g key={w.key}>
                <path d={w.in} />
                <path d={w.out} />
              </g>
            ))}
          </g>

          <g filter="url(#ind-glow)">
            {WIRES.flatMap((w) =>
              ["in", "out"].map((leg) => {
                const tone = TONE[w.tone];
                // the outbound light leaves after the inbound one has landed
                const begin = `${parseFloat(w.begin) + (leg === "out" ? 1.1 : 0)}s`;
                return (
                  <g key={`${w.key}-${leg}`} opacity="0">
                    <circle r="5.5" fill={tone.halo} opacity=".16" />
                    <circle r="2.2" fill={tone.core} />
                    <animate
                      attributeName="opacity"
                      values="0;1;1;0"
                      keyTimes="0;0.12;0.8;1"
                      dur="2.2s"
                      begin={begin}
                      repeatCount="indefinite"
                    />
                    <animateMotion
                      dur="2.2s"
                      begin={begin}
                      repeatCount="indefinite"
                    >
                      <mpath href={`#ind-${w.key}-${leg}`} />
                    </animateMotion>
                  </g>
                );
              })
            )}
          </g>
        </svg>

        <div className="evidence-col">
          <div className="evidence-id">
            <div className="relative size-19 flex-none">
              <div className="evidence-avatar">
                {identity.image?.src && (
                  <Image
                    src={identity.image.src}
                    alt=""
                    width={228}
                    height={228}
                    sizes="76px"
                    className="evidence-avatar-img"
                  />
                )}
              </div>
              <span className="evidence-badge">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--color-blue)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3.5 9.4L12 4.6l8.5 4.8" />
                  <path d="M5.6 10.6v7.4M18.4 10.6v7.4M12 10.6v7.4M9 10.6v7.4M15 10.6v7.4" />
                  <path d="M3.8 19.4h16.4" />
                </svg>
              </span>
            </div>
            <div className="min-w-0">
              <div className="text-body-lg font-bold">{identity.name}</div>
              <div className="text-eyebrow mt-1 font-medium">
                {identity.meta}
              </div>
            </div>
          </div>

          {signals.map((signal) => (
            <div
              key={signal.key}
              className="evidence-card"
              style={{
                animation: `evidence-drift ${DRIFT[signal.key]} ease-in-out infinite`,
              }}
            >
              <span
                className={`evidence-ic evidence-ic-${TONE[signal.tone] ? signal.tone : "blue"}`}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={TONE[signal.tone]?.halo ?? "var(--color-blue)"}
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {resolveGlyph(ICONS, signal.key, "EvidenceStack")}
                </svg>
              </span>
              <span className="text-body-sm flex-1 font-semibold">
                {signal.label}
              </span>
              {/* value and dot are one row: the mockup's .hf-val is a flex
                  pair, and without it the dot drops onto its own line */}
              <span className="text-eyebrow flex flex-none items-center gap-2 font-medium">
                {signal.value}
                <i className="evidence-dot" />
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-none items-center self-stretch">
          <div className="evidence-node">
            <svg width="64" height="64" viewBox="0 0 64 64" aria-hidden="true">
              <circle
                className="nRipple"
                cx="32"
                cy="32"
                r="20"
                fill="rgba(229,54,163,.16)"
              />
              <circle
                className="nCore"
                cx="32"
                cy="32"
                r="6"
                fill="var(--color-blue)"
              />
              <g className="nSpin">
                <circle
                  className="arcA"
                  cx="32"
                  cy="32"
                  r="20"
                  fill="none"
                  stroke="var(--color-blue)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </g>
              <g className="nSpinRev">
                <circle
                  className="arcB"
                  cx="32"
                  cy="32"
                  r="13.5"
                  fill="none"
                  stroke="#6D5AE6"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

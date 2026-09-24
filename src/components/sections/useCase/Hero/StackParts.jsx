import { STATE, WIRES } from "./useCaseStack.constants";

/**
 * The two purely decorative pieces of the stack: the wire bundle behind it and
 * the pulsing node it converges on.
 *
 * Dumb and stateless — they take nothing and draw the same thing every time,
 * which is exactly why they do not belong inline in a component that also
 * arranges the panels around them.
 *
 * Colors adapted from the reference: the institutional blue (`#2447F0`) is
 * `var(--color-blue)` (pink rebrand, Phase 1) — same token `--uc-blue`
 * already aliases to. Its brighter companion (`#3B6FF5`) maps to
 * `var(--color-accent-bright)`, the palette's own "bright" step.
 */
export function Wires() {
  return (
    <svg
      className="uc-wires"
      width="628"
      height="560"
      viewBox="0 0 628 560"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <filter id="ucGlow" x="-300%" y="-300%" width="700%" height="700%">
          <feGaussianBlur stdDeviation="2.4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {WIRES.map(([id, d]) => (
          <path key={id} id={id} d={d} fill="none" />
        ))}
      </defs>

      {WIRES.map(([id, d]) => (
        <path
          key={`${id}-line`}
          d={d}
          stroke="rgba(255,255,255,.22)"
          strokeWidth="1.2"
          strokeDasharray="4 5"
          fill="none"
        />
      ))}

      <g filter="url(#ucGlow)">
        {WIRES.map(([id, , dur, begin]) => (
          <g key={`${id}-light`} opacity="0">
            <circle r="5.5" fill="var(--color-blue)" opacity=".16" />
            <circle r="2.2" fill="var(--color-accent-bright)" />
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              keyTimes="0;.14;.84;1"
              dur={`${dur}s`}
              begin={`${begin}s`}
              repeatCount="indefinite"
            />
            <animateMotion
              dur={`${dur}s`}
              begin={`${begin}s`}
              repeatCount="indefinite"
            >
              <mpath href={`#${id}`} />
            </animateMotion>
          </g>
        ))}
      </g>
    </svg>
  );
}

/** The convergence node: a breathing core inside two counter-rotating arcs. */
export function Node() {
  return (
    <div className="uc-node" aria-hidden="true">
      <svg width="64" height="64" viewBox="0 0 64 64">
        <circle
          className="uc-ripple"
          cx="32"
          cy="32"
          r="20"
          fill="color-mix(in srgb, var(--color-blue) 16%, transparent)"
        />
        <circle className="uc-core" cx="32" cy="32" r="6" fill="var(--color-blue)" />
        <g className="uc-spin">
          <circle
            cx="32"
            cy="32"
            r="20"
            fill="none"
            stroke="var(--color-blue)"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeDasharray="30 96"
          />
        </g>
        <g className="uc-spin-rev">
          <circle
            cx="32"
            cy="32"
            r="13.5"
            fill="none"
            stroke="#6D5AE6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="14 71"
            opacity=".85"
          />
        </g>
      </svg>
    </div>
  );
}

export function StateIcon({ state }) {
  return state === "none" ? (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 12h14"
        stroke="#94A3B8"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ) : (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4.5 12.5l5 5 10-11"
        stroke="var(--color-blue)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useHoverIntent } from "@/hooks/useHoverIntent";

/**
 * The scenario grid (handoff_scenario_grid).
 *
 * Five tabs; each names a situation and answers it three ways, with one measured
 * result beside them and an illustration that changes with the tab.
 *
 * A Client Component, and one of few here: a real tablist needs state, roving
 * focus and arrow keys. Every panel renders and inactive ones are `hidden`,
 * which is what lets find-in-page and a screen reader reach copy nobody has
 * clicked yet — and why each tab has its own <Image> rather than one element
 * whose `src` is swapped.
 *
 * Five tabs is where click-only hurt most: four situations, each with three
 * answers and a measured result, all invisible until someone clicks. Hover
 * selects too (useHoverIntent), and because every panel is already in the DOM
 * there is nothing to load when it does.
 */
export default function Scenarios({ heading, sub, tabs }) {
  const [active, setActive] = useState(0);
  const hover = useHoverIntent(setActive);
  const tabRefs = useRef([]);

  /**
   * Keyboard selection moves DOM focus with it; hover deliberately does not.
   *
   * Without the focus move this was the classic roving-tabindex bug: the
   * selection advanced, the tab left behind became tabIndex=-1, and focus
   * stayed on it — so the next Tab left the strip from a stale position and a
   * screen reader went on describing the scenario the reader had moved off.
   */
  const selectFromKeyboard = (i) => {
    setActive(i);
    tabRefs.current[i]?.focus();
  };

  const onKeyDown = (event) => {
    const last = tabs.length - 1;
    const next =
      event.key === "ArrowRight"
        ? (active + 1) % tabs.length
        : event.key === "ArrowLeft"
          ? (active + last) % tabs.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;
    if (next === null) return;
    // Home and End scroll the page by default, and Arrow keys scroll it
    // sideways — either one moves the section out from under the reader.
    event.preventDefault();
    selectFromKeyboard(next);
  };

  // 104px above, none below. The handoff ships this section standalone, so its
  // 104px bottom padding is "space before whatever comes next" — and on the
  // page the next section brings its own 104px, which stacked to 208 where
  // every other seam here is 104, 80 or 64. Every gap on this page is one
  // section's padding; this was the only place two were.
  return (
    <section className="bg-white pt-26">
      <div className="max-threats:px-9 mx-auto max-w-365 px-20">
        <h2 className="text-display-2 tracking-display text-ink max-w-225 text-balance">
          {heading}
        </h2>
        <p className="text-body-md text-body mt-4 max-w-170 text-pretty">
          {sub}
        </p>

        <div className="fq-tabs mt-8.5" role="tablist" aria-label={heading}>
          {tabs.map((tab, i) => (
            <button
              key={tab.key}
              type="button"
              role="tab"
              id={`scenario-tab-${tab.key}`}
              aria-selected={i === active}
              aria-controls={`scenario-panel-${tab.key}`}
              tabIndex={i === active ? 0 : -1}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              {...hover.tabProps(i)}
              onKeyDown={onKeyDown}
              className="fq-tab text-body-sm tracking-snug focus-ring font-bold"
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="fq-body">
          <div>
            {tabs.map((tab, i) => (
              <div
                key={tab.key}
                role="tabpanel"
                id={`scenario-panel-${tab.key}`}
                aria-labelledby={`scenario-tab-${tab.key}`}
                hidden={i !== active}
              >
                <div className="fq-grid">
                  {tab.cards.map((card) => (
                    <article key={card.title} className="fq-card">
                      <h3 className="text-body-md tracking-snug text-ink font-bold">
                        {card.title}
                      </h3>
                      <p className="text-body-sm text-body mt-2.5 text-pretty">
                        {card.body}
                      </p>
                    </article>
                  ))}

                  <article className="fq-card fq-card-dark">
                    <div>
                      <span className="text-eyebrow tracking-caps block text-white/50 uppercase">
                        {tab.proof.label}
                      </span>
                      <p className="text-display-2 tracking-display mt-3.5 text-white">
                        {tab.proof.stat}
                      </p>
                      <p className="text-body-sm mt-2.5 text-pretty text-white/72">
                        {tab.proof.body}
                      </p>
                    </div>
                    <p className="text-eyebrow mt-5 text-white/42 uppercase">
                      {tab.proof.source}
                    </p>
                  </article>
                </div>
              </div>
            ))}
          </div>

          <div className="fq-media">
            {tabs.map((tab, i) =>
              tab.image?.src ? (
                <Image
                  key={tab.key}
                  src={tab.image.src}
                  alt={tab.image.alt}
                  width={900}
                  height={900}
                  sizes="(max-width: 900px) 100vw, 640px"
                  className="drop-shadow-scenario block h-full w-full object-contain"
                  hidden={i !== active}
                />
              ) : null
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

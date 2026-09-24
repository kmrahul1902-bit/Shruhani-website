"use client";

import { useCallback, useEffect, useRef } from "react";

/**
 * How long a pointer has to rest on a tab before that counts as a choice.
 *
 * Not zero, and this is the whole difference between hover-to-switch feeling
 * effortless and feeling broken: a pointer travelling from the first tab to the
 * fifth crosses the three in between, and switching on every crossing fires
 * four panel changes nobody asked for — on the products strip that is four
 * Lottie compositions mounted and thrown away on the way past.
 *
 * 110ms is below the ~130ms most people read as "instant" and well above the
 * 20-40ms a deliberate sweep spends over each tab.
 */
const INTENT_MS = 110;

/**
 * Once a hover HAS chosen a tab, the strip stays warm for this long after the
 * pointer leaves it, and switches this fast while it is warm.
 *
 * The intent delay is protection against an accidental first switch. After a
 * deliberate one the visitor is reading the strip, and making them wait 110ms
 * for each subsequent tab is the lag that makes a hover menu feel gluey. This
 * is the pattern Radix's own navigation menu uses between its panels
 * (`skipDelayDuration`), applied to a tablist.
 */
const WARM_MS = 400;
const WARM_INTENT_MS = 0;

/**
 * Hover-to-select for a tab strip, with intent.
 *
 * Tabs on this site were click-only, which means the information behind four of
 * five tabs is invisible until someone works out that the strip is interactive
 * and pays a click per panel. Hovering is the cheaper gesture and the one every
 * comparable product site answers to, so it selects here too — with click and
 * the arrow keys unchanged, because hover is an addition, not a replacement.
 *
 * Three things it deliberately does not do:
 *
 * - **It never fires for a non-mouse pointer.** A touch tap fires
 *   `pointerenter` immediately before `click`, so honouring it on a phone
 *   selects twice, and a tap that was meant to stop a scroll would select as
 *   well. Pen behaves like touch here for the same reason.
 * - **It never moves focus.** Hovering a tab does not focus it: focus is the
 *   keyboard's, and stealing it on a mouse move both scrolls the page under
 *   some browsers and throws away where a keyboard user was.
 * - **It carries no timing state into render.** The warm window lives in a ref,
 *   so a pointer moving across a strip never re-renders anything except through
 *   the selection it actually makes.
 *
 * Usage — `tabProps` replaces the tab's own `onClick`:
 *
 *     const hover = useHoverIntent(setIndex);
 *     <button {...hover.tabProps(i)} role="tab" … />
 */
export function useHoverIntent(onSelect, { intentMs = INTENT_MS } = {}) {
  const timer = useRef(null);
  const warmUntil = useRef(0);

  const cancel = useCallback(() => {
    if (timer.current === null) return;
    clearTimeout(timer.current);
    timer.current = null;
  }, []);

  // A pending switch outliving the component would call setState on something
  // unmounted; a strip that unmounts mid-sweep (the products panel behind a
  // breakpoint) is a real case, not a theoretical one.
  useEffect(() => cancel, [cancel]);

  /** Marks the strip warm, so the next hover switches without the delay. */
  const engage = useCallback(() => {
    warmUntil.current = performance.now() + WARM_MS;
  }, []);

  const tabProps = useCallback(
    (index) => ({
      onPointerEnter: (event) => {
        if (event.pointerType !== "mouse") return;
        cancel();
        const warm = performance.now() < warmUntil.current;
        timer.current = setTimeout(
          () => {
            timer.current = null;
            engage();
            onSelect(index);
          },
          warm ? WARM_INTENT_MS : intentMs
        );
      },
      onPointerLeave: cancel,
      onClick: () => {
        // Click is immediate and unconditional — it is an explicit choice, and
        // it should never wait behind a hover timer or be undone by one.
        cancel();
        engage();
        onSelect(index);
      },
    }),
    [cancel, engage, onSelect, intentMs]
  );

  return { tabProps, engage, cancel };
}

export default useHoverIntent;

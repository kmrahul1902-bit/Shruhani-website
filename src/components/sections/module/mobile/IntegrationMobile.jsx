"use client";

import { useRef } from "react";
import { useCarouselDrift } from "@/hooks/useCarouselDrift";
import { IntegrationIcon } from "../Integration/integration.icons";

/**
 * Integration on a phone: the desktop grid becomes a drifting rail (the same
 * mechanism the product pages' Toolkit uses). Rendered twice for a seamless
 * loop; the duplicate is aria-hidden.
 */
export default function IntegrationMobile({ heading, lede, cards, labels }) {
  const trackRef = useRef(null);
  const { step } = useCarouselDrift(trackRef);

  const card = (item, i, duplicate) => (
    <li
      key={`${item.key ?? i}${duplicate ? "-dup" : ""}`}
      aria-hidden={duplicate || undefined}
      className="border-border-dark-soft rounded-band w-59 shrink-0 border px-5 pt-6 pb-6.5"
    >
      <span className="integration-card-ic-mob">
        <IntegrationIcon name={item.icon} />
      </span>
      <h3 className="text-body-md mt-3.5 font-bold text-white">{item.title}</h3>
      <p className="text-caption mt-2.5 text-white/55">{item.body}</p>
    </li>
  );

  return (
    <section className="bg-ink pt-14 pb-15">
      <div className="px-4.5 text-center">
        <h2 className="text-title-2 text-white">{heading}</h2>
        <p className="text-body-sm mx-auto mt-4 text-white/48">{lede}</p>
      </div>

      <ul
        ref={trackRef}
        className="carousel-track mt-9 flex gap-3.5 overflow-x-auto"
      >
        {cards.map((item, i) => card(item, i, false))}
        {cards.map((item, i) => card(item, i, true))}
      </ul>

      <div className="mt-6 flex justify-end gap-3 px-5.5">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label={labels.prev}
          className="focus-ring border-border-dark-soft flex size-11 items-center justify-center rounded-full border text-white"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="size-4"
            aria-hidden="true"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label={labels.next}
          className="focus-ring border-border-dark-soft flex size-11 items-center justify-center rounded-full border text-white"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="size-4"
            aria-hidden="true"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </section>
  );
}

"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import { useScrollSpy } from "./useScrollSpy";

/**
 * The sticky contents rail, with the section a reader is in marked.
 *
 * Below 1080px it stops being a rail and sits above the article as a band.
 * Below the mobile layer it collapses further, into a tap-to-open accordion
 * behind a "Contents" row.
 */
export default function ArticleToc({ sections, label }) {
  const ids = useMemo(
    () => sections.flatMap((s) => [s.id, ...s.children.map((c) => c.id)]),
    [sections]
  );
  const activeId = useScrollSpy(ids);
  const [open, setOpen] = useState(false);

  if (!sections.length) return null;

  const activeSection = sections.find(
    (s) => s.id === activeId || s.children.some((c) => c.id === activeId)
  );

  return (
    <nav
      aria-label={label}
      className="border-border-cool max-bento:border-r-0 max-bento:border-b max-bento:pr-0 max-bento:pb-6 max-mob:mb-6 max-mob:pb-1.5 border-r pr-6.5"
    >
      <h2 className="text-faint text-caption tracking-caps max-mob:hidden mb-3.5 font-bold uppercase">
        {label}
      </h2>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={cn(
          "text-caption tracking-caps focus-ring mob:hidden flex min-h-13 w-full items-center justify-between gap-3 py-4 font-bold uppercase transition-colors",
          open ? "text-blue" : "text-faint"
        )}
      >
        {label}
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(
            "size-3.75 flex-none transition-transform duration-260",
            open && "rotate-180"
          )}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <ul className="blog-toc-body" data-open={open}>
        {sections.map((section) => {
          const isCurrent = activeSection?.id === section.id;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={section.id === activeId ? "location" : undefined}
                className={cn(
                  "focus-ring max-mob:text-body-sm max-mob:py-3 block border-l-2 py-3 pl-3 text-sm leading-snug transition-colors",
                  section.id === activeId
                    ? "border-blue text-blue blog-toc-active font-semibold"
                    : "border-blog-toc-rule text-body hover:border-blue hover:text-blue"
                )}
              >
                {section.text}
              </a>

              {section.children.length ? (
                <div className="blog-toc-sub" data-open={isCurrent}>
                  <ul className="overflow-hidden">
                    {section.children.map((child) => (
                      <li key={child.id}>
                        <a
                          href={`#${child.id}`}
                          aria-current={
                            child.id === activeId ? "location" : undefined
                          }
                          className={cn(
                            "focus-ring border-blog-track max-bento:pl-5 max-mob:pl-6.5 max-mob:py-2.5 block border-l-2 py-2 pl-7 text-xs leading-snug transition-colors",
                            child.id === activeId
                              ? "text-blue font-semibold"
                              : "text-faint hover:text-blue"
                          )}
                        >
                          {child.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

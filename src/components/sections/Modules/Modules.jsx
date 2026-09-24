import Image from "next/image";
import MaybeLink from "@/components/ui/MaybeLink";
import ModuleAccordion from "./ModuleAccordion";
import { MODULE_IMAGE_SIZES, MODULE_META } from "./modules.constants";

/**
 * Six sensing modules — a 4-column grid whose first cell is the section intro
 * (spanning two columns) rather than a separate heading block above it.
 *
 * Adapted from the reference: `modules` is the baked copy (`home.json`'s
 * `modulesGrid.modules`), merged here with `MODULE_META` by array position.
 *
 * Server Component: hover lift + the "Learn more" gap growth are CSS.
 */
export default function Modules({ heading, sub, modules: content }) {
  const modules = content.map((m, i) => ({ ...m, ...MODULE_META[i] }));

  return (
    <section className="container-fluid max-mob:px-5 max-nav:pt-17.5 max-nav:pb-20 max-mob:pt-12 max-mob:pb-14 relative bg-white pt-2 pb-25">
      <div className="max-nav:grid-cols-2 max-nav:gap-5 grid grid-cols-4 items-start gap-x-6 gap-y-7.5">
        <div className="modules-head-fill rounded-card max-nav:mb-2 col-span-2 flex flex-col justify-center self-stretch px-11 py-12">
          <h2 className="text-display-2 tracking-snug max-mob:text-title-3 text-ink mb-3.5 w-100 max-w-full font-semibold">
            {heading}
          </h2>
          <p className="text-body-md max-mob:text-body-md text-body max-w-90">
            {sub}
          </p>
        </div>

        {modules.map((item) => (
          <MaybeLink
            key={item.key}
            id={item.key}
            href={item.href}
            className="max-mob:hidden focus-ring rounded-tile group flex flex-col self-stretch overflow-hidden transition-transform duration-200 hover:-translate-y-1"
          >
            <div className="bg-surface-3 rounded-tile mod-plate flex aspect-square items-center justify-center overflow-hidden">
              {item.image?.src && (
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  width={900}
                  height={900}
                  sizes={MODULE_IMAGE_SIZES}
                  loading="lazy"
                  className="h-full w-full object-contain"
                />
              )}
            </div>
            <div className="flex flex-1 flex-col px-1 pt-5">
              <h3 className="text-body-lg tracking-snug text-ink mb-2 font-bold">
                {item.title}
              </h3>
              <p className="text-body-sm text-body mb-4 flex-1 text-pretty">
                {item.description}
              </p>
              <span className="border-b-1-5 border-ink text-ink text-body-sm mt-auto inline-flex items-center gap-1 self-start pb-px font-semibold opacity-85 transition-all duration-150 group-hover:gap-2 group-hover:opacity-100">
                {item.linkLabel}
              </span>
            </div>
          </MaybeLink>
        ))}
      </div>

      <ModuleAccordion modules={modules} />
    </section>
  );
}

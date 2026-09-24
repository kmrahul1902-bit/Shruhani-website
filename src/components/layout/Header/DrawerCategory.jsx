import Link from "next/link";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { cn } from "@/lib/cn";
import { isCurrentPath } from "./header.helpers";

/**
 * One category of the mobile drawer: a label that opens a panel of links.
 *
 * A sub-heading shows only when it says something the category label has
 * not already said (Solutions is the one category holding two groups).
 */
export default function DrawerCategory({ category, onNavigate, pathname }) {
  return (
    <AccordionItem value={category.key}>
      <AccordionTrigger className="drawer-category">
        {category.label}
      </AccordionTrigger>
      <AccordionContent>
        {category.groups.map((group) => {
          const showEyebrow =
            group.eyebrow &&
            group.eyebrow.toLowerCase() !== category.label.toLowerCase();
          return (
            <div key={group.key} className="flex flex-col">
              {showEyebrow && (
                <p className="text-eyebrow text-body-slate pt-3 pb-0.5 uppercase">
                  {group.eyebrow}
                </p>
              )}
              {group.items.map((item) => {
                const current = isCurrentPath(pathname, item.href);
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={current ? "page" : undefined}
                    className={cn(
                      "drawer-link focus-ring",
                      current && "text-blue font-semibold"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          );
        })}
      </AccordionContent>
    </AccordionItem>
  );
}

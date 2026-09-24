import { cn } from "@/lib/cn";

/**
 * The recurring section-intro composition: optional eyebrow, heading, optional
 * deck paragraph (design §10). All content via props — no hardcoded copy.
 */
export default function SectionHeading({
  eyebrow,
  as: Heading = "h2",
  deck,
  align = "left",
  className,
  children,
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Heading className="text-display-1 text-ink">{children}</Heading>
      {deck && <p className="text-body-lg text-body max-w-2xl">{deck}</p>}
    </div>
  );
}

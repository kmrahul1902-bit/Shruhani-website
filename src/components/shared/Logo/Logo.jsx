import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * The Shruhani fingerprint-S mark, plus "SHRUHANI" as an uppercase wordmark
 * (the provided SVGs are icon-only — see public/logo*.svg). `variant="mono"`
 * swaps in the white cutout for dark grounds (footer, 48px icon); default is
 * the pink mark for light grounds (header, 40px icon).
 *
 * The wordmark's font-size is set inline to match the icon's pixel height —
 * not a type-scale role. A logo lockup's size is tied 1:1 to its mark so the
 * two read as equal weight, which isn't what the content type steps are for.
 */
const SIZES = {
  color: { iconClass: "h-10", px: 40 }, // header
  mono: { iconClass: "h-12", px: 48 }, // footer
};

// The SVGs' viewBox is 1524 x 2226 — used to give next/image the correct
// intrinsic width for each rendered height (the box itself is set by
// `iconClass`; these props only fix the aspect ratio next/image reserves).
const ASPECT = 1524 / 2226;

export default function Logo({
  variant = "color",
  className,
  label = "Shruhani",
}) {
  const src = variant === "mono" ? "/logo-mono-white.svg" : "/logo.svg";
  const { iconClass, px } = SIZES[variant];

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src={src}
        alt=""
        width={Math.round(px * ASPECT)}
        height={px}
        priority
        className={cn(iconClass, "w-auto")}
      />
      <span
        className={cn(
          "font-bold uppercase",
          variant === "mono" ? "text-white" : "text-ink"
        )}
        style={{ fontSize: `${px}px` }}
      >
        {label}
      </span>
    </span>
  );
}

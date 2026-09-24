import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * The Shruhani fingerprint-S mark, plus the wordmark as text (the provided
 * SVGs are icon-only — see public/logo*.svg). `variant="mono"` swaps in the
 * white cutout for dark grounds (footer); default is the pink mark for light
 * grounds (header).
 */
export default function Logo({
  variant = "color",
  className,
  label = "Shruhani",
}) {
  const src = variant === "mono" ? "/logo-mono-white.svg" : "/logo.svg";

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src={src}
        alt=""
        width={28}
        height={41}
        priority
        className="h-8.5 w-auto"
      />
      <span
        className={cn(
          "text-body-lg tracking-snug font-bold",
          variant === "mono" ? "text-white" : "text-ink"
        )}
      >
        {label}
      </span>
    </span>
  );
}

import Image from "next/image";
import { cn } from "@/lib/cn";
import { formatArticleDate } from "./blog.helpers";

/**
 * Author initials, name and date — the row under every card and beside every
 * article title.
 *
 * The avatar is the author's portrait where there is one, and initials on a
 * gradient where there is not — which is how the design draws it, and what a
 * newly added author gets before anyone supplies a photograph. Either way it is
 * `aria-hidden`: the name is the very next thing a screen reader reaches, so an
 * avatar that announced itself would say everything twice.
 *
 * The two gradients alternate by author so a list of cards does not read as one
 * repeated dot; which author gets which is arbitrary and stable.
 */
const TONES = [
  "bg-linear-135 from-avatar-a-from to-avatar-a-to",
  "bg-linear-135 from-avatar-b-from to-avatar-b-to",
];

/**
 * Three sizes, from the three places the design draws this: a card's 32px, an
 * article byline's 42px and the author card's 64px.
 */
const SIZES = {
  sm: "text-caption size-8",
  lg: "text-body-sm max-mob:text-caption size-10.5 max-mob:size-9.5",
  xl: "text-body-lg max-mob:text-body-md size-16 max-mob:size-13",
};

export default function Byline({ author, published, size = "sm", nameOnly }) {
  if (!author) return null;
  const date = formatArticleDate(published);
  const large = size !== "sm";

  const avatar = author.image ? (
    <Image
      src={author.image}
      alt=""
      aria-hidden="true"
      width={128}
      height={128}
      unoptimized={author.image.endsWith(".svg")}
      className={cn(
        "flex-none rounded-full object-cover",
        "bg-surface-3",
        SIZES[size]
      )}
    />
  ) : (
    <span
      aria-hidden="true"
      className={cn(
        "flex flex-none items-center justify-center rounded-full font-bold text-white",
        TONES[author.name.length % TONES.length],
        SIZES[size]
      )}
    >
      {author.initials}
    </span>
  );

  if (nameOnly) return avatar;

  return (
    <div className={cn("flex items-center gap-3", large && "gap-3")}>
      {avatar}
      <span className="min-w-0">
        <span
          className={cn(
            "text-ink block font-semibold",
            large ? "text-body-sm" : "text-caption"
          )}
        >
          {author.name}
        </span>
        {date ? (
          <span className="text-faint text-caption block">{date}</span>
        ) : null}
      </span>
    </div>
  );
}

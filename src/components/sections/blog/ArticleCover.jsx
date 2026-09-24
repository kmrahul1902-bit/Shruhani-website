import ArtDirectedImage from "@/components/shared/ArtDirectedImage";
import { cn } from "@/lib/cn";
import { CATEGORY_TONE, DEFAULT_TONE } from "./blog.constants";
import { readTimeLabel } from "./blog.helpers";

/**
 * The image band at the top of every article card, and of the featured one.
 *
 * The scrim is not decoration: the category chip and read-time pill are white
 * text laid over an editorial photograph nobody vets for contrast, so the
 * gradient is what keeps them legible on a bright cover.
 *
 * `alt=""` because the cover is decorative here — the article's title sits
 * beside it in text, and every one of these is inside a link that already
 * announces where it goes.
 */
export default function ArticleCover({
  article,
  className,
  sizes,
  priority,
  chipCategory,
}) {
  const label = readTimeLabel(article.minutes);
  const category = chipCategory ?? article.category;
  const tone = category
    ? (CATEGORY_TONE[category.slug] ?? DEFAULT_TONE)
    : DEFAULT_TONE;

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {article.cover ? (
        <ArtDirectedImage
          image={article.cover}
          mobile={article.coverMobile}
          alt=""
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : null}
      <div aria-hidden="true" className="cover-scrim absolute inset-0" />

      {category ? (
        <span
          className={cn(
            "rounded-tag tracking-label text-caption absolute top-4.5 left-4.5 z-2 px-2.5 py-1.5 font-bold text-white uppercase",
            tone
          )}
        >
          {category.name}
        </span>
      ) : null}

      {label ? (
        <span className="rounded-pill bg-blog-chip-scrim backdrop-blur-chip text-caption absolute right-3.5 bottom-3.5 z-2 px-2.5 py-1 font-semibold text-white/95">
          {label}
        </span>
      ) : null}
    </div>
  );
}

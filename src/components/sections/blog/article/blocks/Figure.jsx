import ArtDirectedImage from "@/components/shared/ArtDirectedImage";

/**
 * A framed body image with an optional badge and caption.
 */
export default function Figure({ block }) {
  if (!block.image?.url) return null;

  return (
    <figure className="max-mob:my-6.5 my-8">
      <div className="blog-fig-frame border-blog-cool-border rounded-band shadow-blog-fig max-mob:rounded-card max-mob:p-2.5 border p-3.5">
        <div className="rounded-panel relative overflow-hidden">
          <ArtDirectedImage
            image={{ src: block.image.url }}
            mobile={
              block.imageMobile?.url ? { src: block.imageMobile.url } : null
            }
            alt={block.alt ?? ""}
            {...(block.caption || block.alt
              ? { title: block.caption ?? block.alt }
              : {})}
            width={block.image.width ?? 1200}
            height={block.image.height ?? 800}
            sizes="(max-width: 1080px) 100vw, 700px"
            className="block h-auto w-full"
          />
          {block.badge ? (
            <span className="rounded-tag bg-blog-chip-scrim backdrop-blur-chip text-caption tracking-caps absolute top-3.5 left-3.5 px-2.5 py-1 font-bold text-white uppercase">
              {block.badge}
            </span>
          ) : null}
        </div>
      </div>
      {block.caption ? (
        <figcaption className="text-muted text-body-sm max-mob:text-caption border-blue/50 max-mob:mt-3 mt-3.5 border-l-2 pl-3.5 leading-relaxed">
          {block.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

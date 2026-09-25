import Image from "next/image";
import { ReaderTick } from "@/components/sections/module/Reader/reader.icons";
import { cn } from "@/lib/cn";

/**
 * One consumption tier: an illustration on its own plate, then the copy.
 * `tallIllustration` is the plate the two-up row uses; the section decides
 * it from the card count.
 *
 * TODO(content): see `ReaderFrame.jsx`'s note — no module's `.image` here is
 * wired, the live CDN art is banned by CLAUDE.md § Art Direction.
 */
export default function OutputCard({
  title,
  description,
  points,
  image,
  tallIllustration,
}) {
  return (
    <article className="output-card">
      <div
        className={cn("output-illus", tallIllustration && "output-illus-tall")}
      >
        {image?.src && (
          <Image
            src={image.src}
            alt={image.alt ?? ""}
            width={560}
            height={400}
            sizes="360px"
            className="output-illus-img"
          />
        )}
      </div>
      <div className="output-text">
        <h3 className="output-title">{title}</h3>
        <p className="output-desc">{description}</p>
        {points?.length > 0 && (
          <ul className="output-list">
            {points.map((point) => (
              <li key={point} className="output-point">
                <span className="output-tick">
                  <ReaderTick />
                </span>
                {point}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

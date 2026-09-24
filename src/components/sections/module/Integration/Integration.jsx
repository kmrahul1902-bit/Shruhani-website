import Image from "next/image";
import { cn } from "@/lib/cn";
import IntegrationCard from "./IntegrationCard";

/**
 * "Integration" — the dark band that closes the module template. Copy and
 * an illustration on the left, facts on the right, shared by all six module
 * pages. `className` is where the template hands this section a wider
 * measure (see integration-measure-wide).
 */
export default function Integration({
  heading,
  lede,
  image,
  cards,
  className,
}) {
  return (
    <section className={cn("integration-section", className)}>
      <div className="integration-wrap">
        <div className="integration-left">
          <h2 className="integration-h">{heading}</h2>
          <p className="integration-lede">{lede}</p>
          {image?.src && (
            <div className="integration-illus">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="520px"
                className="object-cover"
              />
            </div>
          )}
        </div>

        <div className="integration-grid">
          {cards.map(({ key, ...card }, i) => (
            <IntegrationCard key={key ?? i} {...card} lead={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

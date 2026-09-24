import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * One deployment: a framed illustration with its title and a sentence
 * beneath. By default the visual carries no background of its own.
 * `visual: "plate"` is the exception, for a module whose illustrations have
 * no ground of their own.
 */
export default function AppliesCard({ title, description, image, visual }) {
  const plate = visual === "plate";

  return (
    <div className="applies-card">
      <div className={cn("applies-visual", plate && "applies-visual-plate")}>
        {image?.src && (
          <Image
            src={image.src}
            alt={image.alt ?? ""}
            width={image.width}
            height={image.height}
            sizes="340px"
            className={
              plate ? "applies-visual-img-bleed" : "applies-visual-img"
            }
          />
        )}
      </div>
      <h3 className="applies-title">{title}</h3>
      <p className="applies-desc">{description}</p>
    </div>
  );
}

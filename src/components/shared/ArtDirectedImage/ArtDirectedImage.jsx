import Image from "next/image";
import { MOBILE_MEDIA } from "./artDirectedImage.constants";

/**
 * An image that can be a different crop on phones.
 *
 * Editors can upload a second, phone-shaped version of a blog hero or figure.
 * A wide editorial photograph cropped to a phone's aspect ratio usually loses
 * its subject, and the fix is a different crop rather than a different fit —
 * which is art direction, and needs the browser to choose between two files.
 *
 * `<picture>` is what does the choosing. It is not decoration around
 * `next/image`: a `<source>` that matches wins outright, so only ONE of the two
 * files is ever fetched. The alternative — rendering both and hiding one with
 * CSS — downloads both, because `display: none` does not stop a fetch.
 *
 * With no mobile variant this renders exactly what it rendered before: a bare
 * `next/image`, no wrapper, no second request. The `<picture>` only appears
 * when there is genuinely a second image to choose from.
 *
 * The mobile `<source>` points at the CDN file directly rather than through
 * Next's optimiser, which cannot be addressed from a `srcSet` attribute. That
 * is the trade this makes: the phone gets the right crop, unoptimised, instead
 * of the wrong crop, optimised. Upload mobile variants already sized for a
 * phone.
 */
export default function ArtDirectedImage({
  image,
  mobile,
  alt = "",
  ...props
}) {
  if (!image?.src) return null;

  const desktop = <Image src={image.src} alt={alt} {...props} />;
  if (!mobile?.src) return desktop;

  return (
    <picture>
      <source media={MOBILE_MEDIA} srcSet={mobile.src} />
      {desktop}
    </picture>
  );
}

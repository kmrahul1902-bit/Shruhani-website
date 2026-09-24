import Image from "next/image";

/**
 * "Why it exists" on a phone. `imageMobile` is optional and wins where a
 * page ships one; every other module falls through to the desktop image.
 */
export default function GapMobile({ heading, sub, image, imageMobile }) {
  const art = imageMobile?.src ? imageMobile : image;

  return (
    <section className="bg-ground px-4.5 py-14 text-center">
      <h2 className="text-title-2 text-white">{heading}</h2>

      {art?.src && (
        <Image
          src={art.src}
          alt={art.alt}
          width={840}
          height={840}
          sizes="280px"
          className="mx-auto my-5.5 block h-auto w-full max-w-70 object-contain"
        />
      )}

      <p className="text-body-sm text-on-dark-muted">{sub}</p>
    </section>
  );
}

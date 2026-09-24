import Image from "next/image";
import Reveal from "@/components/shared/Reveal";
import { INNER } from "./about.constants";

/**
 * Certifications — four badges on the dark ground.
 *
 * TODO(verify): certification names (ISO 27001:2022, DPDP Act 2023, GDPR,
 * on-premise deployment) reissued/still valid under the Shruhani entity —
 * guardrail #2 item 2. Carried over as written.
 *
 * The seal is `mix-blend-mode: multiply` over the pale face, which is how the
 * supplied artwork — drawn on white — sits on the tint without a white square
 * around it.
 *
 * The section's padding is its own (170px top, 88px bottom), not the page's
 * 112px: it opens the dark run below the team photo and closes tight against
 * the press section under it.
 */
export default function Certifications({ certifications }) {
  return (
    <section className="bg-ground max-bento:px-11 max-flow:px-5.5 px-20 pt-42.5 pb-22">
      <Reveal className={`text-center ${INNER}`}>
        <h2 className="text-title-3 tracking-label font-bold text-white/55 uppercase">
          {certifications.heading}
        </h2>
        <ul className="grid-cols-au-certs mt-14 grid justify-center gap-7">
          {certifications.items.map((item) => (
            <li
              key={item.label}
              /* No `isolation` here, deliberately. The seal is
                 `mix-blend-mode: multiply` and needs the badge's own pale face as
                 its backdrop; isolating the badge would start the blend group
                 transparent and change the result — measured, the two differ.
                 The mockup isolates nothing either. */
              className="bg-au-cert rounded-au-badge hover:shadow-au-badge flex aspect-5/4 flex-col items-center overflow-hidden transition duration-200 hover:-translate-y-0.75"
            >
              <span className="relative min-h-0 w-full flex-1 py-4.5">
                {item.image?.src && (
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="270px"
                    className="object-contain mix-blend-multiply"
                  />
                )}
              </span>
              <b className="text-body-md tracking-note tracking-note bg-au-cert-cap flex h-19.5 w-full flex-none items-center justify-center p-3 text-center font-semibold text-white uppercase">
                {item.label}
              </b>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

import MaybeLink from "@/components/ui/MaybeLink";
import Logo from "@/components/shared/Logo";
import { footerContent } from "./footer.content";
import FooterLink from "./FooterLink";
import { socialIconFor } from "./footer.icons";
import {
  footerColumnPairs,
  mailtoHref,
  mapsHref,
  telHref,
} from "./footer.helpers";

const CONTACT_LINK = "focus-ring rounded-xs transition-colors hover:text-white";

/** Site footer — dark, sitemap + legal. Server Component. */
export default function Footer() {
  const footer = footerContent;

  return (
    <footer className="overflow-x-clip bg-black text-white">
      <div className="container-fluid max-mob:px-5 nav:pt-27.5 nav:pb-14 pt-17.5 pb-10">
        <nav
          aria-label={footer.navLabel}
          className="nav:grid-cols-footer nav:gap-x-12 nav:gap-y-14 nav:pb-14 grid grid-cols-2 gap-8 pb-10"
        >
          <div className="max-w-75">
            <MaybeLink
              href="/"
              aria-label={footer.homeLabel}
              className="focus-ring mb-6 inline-flex rounded-xs"
            >
              <Logo variant="mono" />
            </MaybeLink>

            <div className="mb-6.5 flex items-center gap-4.5">
              {footer.socials.map((s) => {
                const Icon = socialIconFor(s);
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    rel="nofollow"
                    className="focus-ring text-white/55 transition-transform hover:-translate-y-px hover:text-white"
                  >
                    {Icon ? <Icon /> : null}
                  </a>
                );
              })}
            </div>

            <ul className="flex flex-col gap-3">
              <li className="text-body-sm text-white/55">
                <a
                  href={telHref(footer.contact.phone)}
                  className={CONTACT_LINK}
                >
                  {footer.contact.phone}
                </a>
              </li>
              <li className="text-body-sm text-white/55">
                <a
                  href={mailtoHref(footer.contact.email)}
                  className={CONTACT_LINK}
                >
                  {footer.contact.email}
                </a>
              </li>
              <li className="text-body-sm whitespace-pre-line text-white/55">
                <a
                  href={mapsHref(footer.contact.addressLines)}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className={CONTACT_LINK}
                >
                  {footer.contact.addressLines.join("\n")}
                </a>
              </li>
            </ul>
          </div>

          {footerColumnPairs(footer.columns).map((group) => (
            <div key={group[0].heading}>
              {group.map((col, i) => (
                <div key={col.heading} className={i > 0 ? "mt-8.5" : undefined}>
                  <h3 className="text-body-md tracking-snug mb-5.5 font-bold text-white">
                    {col.heading}
                  </h3>
                  <ul className="flex flex-col gap-3.5">
                    {col.links.map((l) => (
                      <li key={l.label} className="text-body-sm">
                        <FooterLink href={l.href}>{l.label}</FooterLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </nav>

        <div className="border-border-dark nav:flex-row nav:items-center nav:justify-between flex flex-col items-start gap-5 border-t pt-7 pb-5">
          <div className="flex flex-wrap items-center gap-6">
            <p className="text-caption font-medium text-white/50">
              {footer.copyright}
            </p>
            {footer.legal.map((l) => (
              <MaybeLink
                key={l.label}
                href={l.href}
                className="focus-ring text-caption text-white/50 hover:text-white"
              >
                {l.label}
              </MaybeLink>
            ))}
          </div>
        </div>

        <p className="text-caption max-w-275 text-white/38">
          {footer.disclaimer}
        </p>
      </div>
    </footer>
  );
}

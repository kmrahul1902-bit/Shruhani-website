import Link from "next/link";
import { LegalIcon } from "./legal.icons";

const BUTTON =
  "focus-ring rounded-tile border-border-cool text-muted hover:text-blue hover:border-blue-edge-soft hover:bg-blue-wash flex size-8.5 items-center justify-center border transition-colors";

/**
 * The block under the contents rail: a label and two ways to ask a
 * question about the policy. Adapted from the reference: `ROUTES.contact`
 * (no routes registry here — see plan/CLAUDE.md → Decisions) is just
 * `/book-a-demo`.
 */
export default function LegalQuestions({ content }) {
  return (
    <div className="border-border-cool max-flow:hidden mt-7.5 border-t pt-5.5">
      <p className="text-faint text-caption tracking-caps mb-3 font-bold uppercase">
        {content.questionsLabel}
      </p>
      <div className="flex gap-2.5">
        <a
          href={`mailto:${content.contact.email}`}
          className={BUTTON}
          aria-label={content.emailLabel}
        >
          <LegalIcon name="envelope" />
        </a>
        <Link href="/book-a-demo" className={BUTTON} aria-label={content.askLabel}>
          <LegalIcon name="chat" />
        </Link>
      </div>
    </div>
  );
}

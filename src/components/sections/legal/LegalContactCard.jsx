/**
 * The card that closes a legal document: a named officer and an address to
 * write to.
 */
export default function LegalContactCard({ contact }) {
  if (!contact?.name) return null;

  return (
    <aside className="border-border-cool rounded-band max-mob:rounded-card max-mob:mt-8.5 max-mob:px-4.5 max-mob:py-5 mt-13 border bg-white px-7.5 py-7">
      <p className="text-faint text-caption tracking-caps mb-2 font-bold uppercase">
        {contact.label}
      </p>
      <b className="text-ink text-body-md max-mob:text-body-md block font-bold tracking-tight">
        {contact.name}
      </b>
      <a
        href={`mailto:${contact.email}`}
        className="focus-ring text-blue mt-0.5 inline-block text-sm font-semibold"
      >
        {contact.email}
      </a>
      {contact.note && (
        <p className="text-muted text-body-md max-mob:text-body-sm mt-3 leading-relaxed">
          {contact.note}
        </p>
      )}
    </aside>
  );
}

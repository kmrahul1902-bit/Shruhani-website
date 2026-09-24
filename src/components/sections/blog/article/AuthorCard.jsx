import Byline from "../Byline";

/**
 * The author card that closes an article.
 *
 * `about` is what gates it: an author with no bio gets no card rather than an
 * empty box.
 */
export default function AuthorCard({ author, heading }) {
  if (!author?.about) return null;

  return (
    <aside className="border-border-cool rounded-band blog-author-cols max-mob:rounded-card max-mob:mt-8.5 max-mob:gap-3.5 max-mob:px-4.5 max-mob:py-5 mt-13 grid items-start gap-5 border bg-white px-7.5 py-7">
      <Byline author={author} size="xl" nameOnly />
      <div>
        <h2 className="text-faint text-caption tracking-caps mb-2 font-bold uppercase">
          {heading}
        </h2>
        <b className="text-ink text-body-md max-mob:text-body-md block font-bold tracking-tight">
          {author.name}
        </b>
        {author.designation ? (
          <span className="text-blue mt-0.5 block text-sm font-semibold">
            {author.designation}
          </span>
        ) : null}
        <p className="text-muted text-body-md max-mob:text-body-sm mt-3 leading-relaxed">
          {author.about}
        </p>
      </div>
    </aside>
  );
}

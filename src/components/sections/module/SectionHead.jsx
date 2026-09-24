import { cn } from "@/lib/cn";

/**
 * The centred heading block shared by the reader and the outputs section.
 * `flush` drops the padding and narrows the measure for the outputs section,
 * whose band supplies its own gutter.
 */
export default function SectionHead({ heading, sub, flush = false }) {
  return (
    <>
      <h2 className={cn("module-head", flush && "module-head-flush")}>
        {heading}
      </h2>
      {sub && (
        <p className={cn("module-head-sub", flush && "module-head-sub-flush")}>
          {sub}
        </p>
      )}
    </>
  );
}

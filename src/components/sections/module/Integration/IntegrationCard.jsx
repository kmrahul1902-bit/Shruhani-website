import { cn } from "@/lib/cn";
import { IntegrationIcon } from "./integration.icons";

/**
 * One integration fact: glyph, title, and a sentence. `lead` is the first
 * card, which the design spans across both columns at a narrower width.
 */
export default function IntegrationCard({ icon, title, body, lead }) {
  return (
    <div className={cn("integration-card", lead && "integration-card-lead")}>
      <span className="integration-card-ic">
        <IntegrationIcon name={icon} />
      </span>
      <h3 className="integration-card-h">{title}</h3>
      <p className="integration-card-p">{body}</p>
    </div>
  );
}

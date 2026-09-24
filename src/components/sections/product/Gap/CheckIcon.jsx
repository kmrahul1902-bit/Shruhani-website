import { cn } from "@/lib/cn";

export default function CheckIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`size-4.25 shrink-0 ${className ?? ""}`}
      aria-hidden="true"
    >
      <path d="M5 12l5 5L20 6" />
    </svg>
  );
}

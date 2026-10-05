import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function PlusIndicator({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative grid size-6 shrink-0 place-items-center border border-rule text-mute transition-colors",
        "group-hover:border-accent-ink group-hover:text-accent-ink",
        "group-open:border-ink group-open:text-ink",
        className,
      )}
    >
      <span className="absolute h-px w-2.5 bg-current" />
      <span className="absolute h-2.5 w-px bg-current transition-opacity duration-200 group-open:opacity-0" />
    </span>
  );
}

type DisclosureProps = {
  summary: ReactNode;
  children: ReactNode;
  className?: string;
  defaultOpen?: boolean;
};

export function Disclosure({ summary, children, className, defaultOpen }: DisclosureProps) {
  return (
    <details open={defaultOpen} className={cn("group border-b border-rule", className)}>
      <summary className="group/row flex cursor-pointer list-none items-center gap-4 py-5 transition-colors duration-200 hover:bg-surface-2/40 [&::-webkit-details-marker]:hidden">
        <span className="flex min-w-0 flex-1 items-baseline gap-4 transition-transform duration-200 ease-out group-hover/row:translate-x-1 motion-reduce:transition-none">
          {summary}
        </span>
        <PlusIndicator />
      </summary>
      <div className="pb-8">{children}</div>
    </details>
  );
}

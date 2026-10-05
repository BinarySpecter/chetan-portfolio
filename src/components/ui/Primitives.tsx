import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function MonoLabel({
  children,
  className,
  as: Tag = "span",
}: {
  children: ReactNode;
  className?: string;
  as?: "span" | "p" | "div";
}) {
  return <Tag className={cn("mono-label", className)}>{children}</Tag>;
}

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center border border-rule px-1.5 py-[0.18rem]",
        "tag-mono text-[0.62rem] text-mute",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function StatusDot({ className, label }: { className?: string; label?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span
        aria-hidden="true"
        className="size-1.5 shrink-0 rounded-full bg-accent motion-safe:animate-[pulse-dot_2.6s_ease-in-out_infinite]"
      />
      {label ? <span className="mono-label text-mute">{label}</span> : null}
    </span>
  );
}

export function Tick({ className }: { className?: string }) {
  return <span aria-hidden="true" className={cn("inline-block h-px w-3 shrink-0 bg-accent", className)} />;
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("tag-mono flex items-center gap-3 text-accent-ink", className)}>
      <Tick />
      {children}
    </p>
  );
}

import type { CSSProperties, ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

type SectionProps = {
  id: string;
  index: string;
  title: string;
  meta?: string;
  children: ReactNode;
  className?: string;
};

function stagger(ms: number) {
  return { "--stagger-delay": `${ms}ms` } as CSSProperties;
}

export function Section({ id, index, title, meta, children, className }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn("scroll-mt-20", className)}>
      <div className="shell py-14 sm:py-16 lg:py-20">
        <Reveal animate={false}>
          <header className="mb-9 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-rule pb-3.5">
            <span className="section-stagger tag-mono text-faint" style={stagger(0)}>
              [ {index} ]
            </span>
            <span aria-hidden="true" className="section-line h-px w-6 bg-rule-strong" />
            <h2
              id={`${id}-title`}
              className="section-stagger text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-ink"
              style={stagger(90)}
            >
              {title}
            </h2>
            {meta ? (
              <p className="section-stagger mono-label ml-auto" style={stagger(170)}>
                {meta}
              </p>
            ) : null}
          </header>
        </Reveal>
        <Reveal delay={70}>{children}</Reveal>
      </div>
    </section>
  );
}

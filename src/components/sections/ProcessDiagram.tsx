import type { CSSProperties } from "react";

const steps = ["Idea", "Build", "Experiment", "Break", "Understand", "Write"];

export function ProcessDiagram({ className }: { className?: string }) {
  return (
    <div
      className={`process relative ${className ?? ""}`}
      aria-label="Working loop: idea, build, experiment, break, understand, write, then repeat until it clicks."
    >
      <div className="flex items-center justify-between gap-3 px-4 pb-1 pt-3.5">
        <span className="tag-mono text-faint">process</span>
        <span className="tag-mono text-[0.6rem] text-faint">repeat until it clicks</span>
      </div>

      <div className="relative px-4 pb-5 pt-3">
        <span aria-hidden="true" className="absolute bottom-[2.25rem] left-[1.45rem] top-[1.75rem] w-px bg-rule" />
        <span
          aria-hidden="true"
          className="absolute right-3 top-[1rem] bottom-[1.5rem] w-3 rounded-r-[0.7rem] border-y border-r border-dashed border-rule-strong"
        />

        <ol className="relative">
          {steps.map((step, index) => (
            <li key={step} className="process-step grid h-8 grid-cols-[0.9rem_1fr] items-center gap-3">
              <span
                aria-hidden="true"
                className="process-step-dot relative z-10 size-1.5 justify-self-center rounded-full border border-rule-strong bg-paper"
              />
              <span
                className="process-node inline-flex justify-self-start border border-rule px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-mute"
                style={{ "--node-index": index } as CSSProperties}
                data-active={index === 0 ? "true" : undefined}
              >
                {step}
              </span>
            </li>
          ))}
        </ol>

        <span aria-hidden="true" className="process-traveler absolute left-[1.45rem] top-[1.75rem]">
          <span className="absolute left-1/2 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
        </span>
      </div>

      <div className="flex items-center gap-2 border-t border-dashed border-rule px-4 py-2.5">
        <span aria-hidden="true" className="tag-mono text-[0.6rem] text-faint">
          write
        </span>
        <span aria-hidden="true" className="text-[0.7rem] leading-none text-faint">
          &#8601;
        </span>
        <span aria-hidden="true" className="tag-mono text-[0.6rem] text-faint">
          idea
        </span>
        <span aria-hidden="true" className="ml-auto h-px w-8 bg-rule" />
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useState, type CSSProperties } from "react";
import type { Project, ProjectStatus } from "@/types/content";
import { cn } from "@/lib/cn";

export type FeaturedProject = Project & { screenshot: string };

const statusLabels: Record<ProjectStatus, string> = {
  "in-progress": "In progress",
  shipped: "Shipped",
  exploring: "Exploring",
  archived: "Archived",
};

const caseSections: { key: keyof Project; label: string }[] = [
  { key: "why", label: "The problem" },
  { key: "whatItDoes", label: "What I built" },
  { key: "howItWorks", label: "How it works" },
  { key: "technicalDecisions", label: "Technical decisions" },
  { key: "challenges", label: "Challenges" },
  { key: "outcome", label: "Outcome" },
];

function pad(value: number) {
  return String(value).padStart(2, "0");
}

export function FeaturedProjects({ projects }: { projects: FeaturedProject[] }) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [caseOpen, setCaseOpen] = useState(false);
  const panelId = useId();
  const total = projects.length;
  const active = projects[index];

  const goTo = useCallback(
    (target: number) => {
      const clamped = ((target % total) + total) % total;
      if (clamped === index) return;
      setDir(clamped > index ? 1 : -1);
      setCaseOpen(false);
      setIndex(clamped);
    },
    [index, total],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)
      ) {
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goTo(index - 1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goTo(index + 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo, index]);

  const sections = caseSections
    .map((section) => ({ label: section.label, body: active[section.key] }))
    .filter((section): section is { label: string; body: string } => typeof section.body === "string" && section.body.length > 0);

  const href = active.live ?? active.github;

  return (
    <div className="mt-9">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] lg:items-start lg:gap-12">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${active.name}`}
          className="group relative block focus-visible:outline-none"
        >
          <figure className="border border-rule bg-surface p-2 transition-colors duration-300 group-hover:border-rule-strong group-focus-visible:border-rule-strong sm:p-3">
            <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
              {projects.map((project, i) => {
                const isActive = i === index;
                const offset = isActive ? 0 : i < index ? -18 : 18;
                return (
                  <div
                    key={project.slug}
                    aria-hidden={!isActive}
                    style={{ transform: `translateX(${offset}px)`, opacity: isActive ? 1 : 0 }}
                    className={cn(
                      "absolute inset-0 transition-[opacity,transform] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                      !isActive && "pointer-events-none",
                    )}
                  >
                    <Image
                      src={project.screenshot}
                      alt={isActive ? project.screenshotAlt ?? project.tagline : ""}
                      fill
                      sizes="(min-width: 1024px) 58vw, 100vw"
                      className="object-contain transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.015] group-focus-visible:scale-[1.015] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                      priority={i === 0}
                      loading={i === 0 ? undefined : "eager"}
                    />
                  </div>
                );
              })}
            </div>
          </figure>

          <span className="pointer-events-none absolute right-4 top-4 -translate-y-0.5 border border-rule bg-paper/90 px-2 py-1 tag-mono text-[0.58rem] text-ink opacity-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:transition-none">
            open project &#8599;
          </span>
        </a>

        <div
          key={active.slug}
          className="project-enter flex min-w-0 flex-col"
          style={{ "--project-dir": String(dir) } as CSSProperties}
        >
          <span className="tag-mono text-accent-ink">{active.category}</span>

          <h3 className="mt-3 font-serif text-[clamp(1.9rem,3.2vw,2.6rem)] leading-[1.03] tracking-[-0.01em] text-ink">
            {active.name}
          </h3>

          <p className="mt-3 max-w-md text-base leading-relaxed text-ink-soft">{active.tagline}</p>

          <p className="mt-5 tag-mono text-[0.62rem] text-mute">
            {active.stack.slice(0, 6).join("  ·  ")}
          </p>

          <div className="mt-4 flex items-center gap-3 tag-mono text-[0.62rem]">
            <span className="flex items-center gap-2 text-ink">
              <span
                aria-hidden="true"
                className={cn(
                  "size-1.5 rounded-full bg-accent",
                  active.status === "in-progress" &&
                    "motion-safe:animate-[pulse-dot_2.6s_ease-in-out_infinite]",
                )}
              />
              {statusLabels[active.status]}
            </span>
            <span aria-hidden="true" className="text-faint">
              ·
            </span>
            <span className="text-mute">{active.year}</span>
          </div>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            {active.github ? (
              <a
                href={active.github}
                target="_blank"
                rel="noopener noreferrer"
                className="u-line group/link inline-flex items-center gap-1.5 tag-mono text-[0.62rem] text-mute transition-colors hover:text-accent-ink"
              >
                github
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover/link:translate-x-1 motion-reduce:transition-none"
                >
                  &#8599;
                </span>
              </a>
            ) : null}
            {active.live ? (
              <a
                href={active.live}
                target="_blank"
                rel="noopener noreferrer"
                className="u-line group/link inline-flex items-center gap-1.5 tag-mono text-[0.62rem] text-ink transition-colors hover:text-accent-ink"
              >
                live demo
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover/link:translate-x-1 motion-reduce:transition-none"
                >
                  &#8599;
                </span>
              </a>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-rule pt-4">
        <span key={index} className="animate-fade-in tag-mono text-faint">
          [ {pad(index + 1)} / {pad(total)} ]
        </span>
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            className="u-line group inline-flex items-center gap-2 tag-mono text-mute transition-colors hover:text-accent-ink"
          >
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:-translate-x-1 motion-reduce:transition-none"
            >
              &#8592;
            </span>
            previous
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            className="u-line group inline-flex items-center gap-2 tag-mono text-mute transition-colors hover:text-accent-ink"
          >
            next
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
            >
              &#8594;
            </span>
          </button>
        </div>
      </div>

      <div className="mt-10 border-t border-rule">
        <button
          type="button"
          onClick={() => setCaseOpen((value) => !value)}
          aria-expanded={caseOpen}
          aria-controls={panelId}
          className="group flex w-full items-center justify-between gap-4 py-4 text-left"
        >
          <span className="tag-mono text-ink transition-colors group-hover:text-accent-ink">
            view case study
          </span>
          <span
            aria-hidden="true"
            className="relative grid size-5 shrink-0 place-items-center border border-rule text-mute transition-colors group-hover:border-accent-ink group-hover:text-accent-ink"
          >
            <span className="absolute h-px w-2.5 bg-current" />
            <span
              className={cn(
                "absolute h-2.5 w-px bg-current transition-transform duration-300 motion-reduce:transition-none",
                caseOpen && "rotate-90 opacity-0",
              )}
            />
          </span>
        </button>

        <div
          id={panelId}
          aria-hidden={!caseOpen}
          inert={!caseOpen}
          className={cn(
            "grid transition-[grid-template-rows,opacity] duration-500 ease-out motion-reduce:transition-none",
            caseOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
          )}
        >
          <div className="min-h-0 overflow-hidden">
            <dl className="flex flex-col gap-6 pb-8">
              {sections.map((section) => (
                <div
                  key={section.label}
                  className="grid gap-1.5 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-6"
                >
                  <dt className="tag-mono pt-1 text-[0.62rem] text-mute">{section.label}</dt>
                  <dd className="max-w-3xl text-sm leading-relaxed text-ink-soft">
                    {section.body}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <ol className="mt-10 border-t border-rule">
        {projects.map((project, i) => {
          const isActive = i === index;
          return (
            <li key={project.slug} className="border-b border-rule">
              <button
                type="button"
                onClick={() => goTo(i)}
                aria-current={isActive ? "true" : undefined}
                className="group flex w-full items-baseline gap-4 py-3.5 text-left transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:translate-x-1 motion-reduce:transition-none"
              >
                <span
                  className={cn(
                    "tag-mono w-7 shrink-0 text-[0.62rem]",
                    isActive ? "text-accent-ink" : "text-faint",
                  )}
                >
                  [ {pad(i + 1)} ]
                </span>
                <span
                  className={cn(
                    "shrink-0 text-sm transition-colors",
                    isActive ? "text-ink" : "text-ink-soft group-hover:text-ink",
                  )}
                >
                  {project.name}
                </span>
                <span aria-hidden="true" className="leader" />
                <span
                  className={cn(
                    "tag-mono shrink-0 text-[0.62rem] transition-colors",
                    isActive ? "text-accent-ink" : "text-mute group-hover:text-ink",
                  )}
                >
                  {statusLabels[project.status]}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

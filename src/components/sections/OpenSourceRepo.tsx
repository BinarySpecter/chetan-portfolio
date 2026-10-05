"use client";

import { useId, useState } from "react";
import { RepoAvatar } from "@/components/ui/RepoAvatar";
import type { Contribution, ContributionStatus, OpenSourceRepository } from "@/types/content";
import { cn } from "@/lib/cn";

const statusLabels: Record<ContributionStatus, string> = {
  merged: "merged pr",
  open: "open pr",
  closed: "closed pr",
  draft: "draft pr",
};

type TimelineEvent = {
  key: string;
  accent: boolean;
  date: string;
  label: string;
  title?: string;
  description?: string;
  meta?: string;
  url: string;
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatDate(iso: string) {
  const date = new Date(`${iso}T00:00:00Z`);
  return `${String(date.getUTCDate()).padStart(2, "0")} ${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

function changeLine(contribution: Contribution): string {
  const parts: string[] = [];

  if (typeof contribution.additions === "number") parts.push(`+${contribution.additions}`);
  if (typeof contribution.deletions === "number") parts.push(`\u2212${contribution.deletions}`);
  if (typeof contribution.changedFiles === "number") {
    parts.push(`${contribution.changedFiles} ${contribution.changedFiles === 1 ? "file" : "files"}`);
  }

  return parts.join(" \u00b7 ");
}

function primaryContribution(repo: OpenSourceRepository): Contribution | undefined {
  return [...repo.contributions].sort((a, b) => {
    const aDate = a.mergedAt ?? a.openedAt ?? "";
    const bDate = b.mergedAt ?? b.openedAt ?? "";
    if (aDate === bDate) return 0;
    return aDate < bDate ? 1 : -1;
  })[0];
}

function buildEvents(repo: OpenSourceRepository): TimelineEvent[] {
  const events: TimelineEvent[] = [];

  for (const contribution of repo.contributions) {
    if (contribution.events?.length) {
      for (const event of contribution.events) {
        events.push({
          key: `${contribution.id}-${event.type}-${event.date}`,
          accent: event.type === "merged",
          date: event.date,
          label: event.type,
          title: event.title,
          description: event.description,
          url: event.url ?? contribution.url,
        });
      }
      continue;
    }

    if (contribution.mergedAt) {
      events.push({
        key: `${contribution.id}-merged`,
        accent: true,
        date: contribution.mergedAt,
        label: contribution.number ? `merged \u00b7 pr #${contribution.number}` : "merged",
        title: contribution.title,
        meta: changeLine(contribution),
        url: contribution.url,
      });
    }

    if (contribution.openedAt) {
      events.push({
        key: `${contribution.id}-opened`,
        accent: false,
        date: contribution.openedAt,
        label: contribution.number ? `opened \u00b7 pr #${contribution.number}` : "opened",
        title: "Pull request opened",
        url: contribution.url,
      });
    }
  }

  return events.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

function ExternalArrow() {
  return (
    <span
      aria-hidden="true"
      className="transition-transform group-hover/link:translate-x-1 motion-reduce:transition-none"
    >
      &#8599;
    </span>
  );
}

export function OpenSourceRepo({ repo }: { repo: OpenSourceRepository }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  const primary = primaryContribution(repo);
  const events = buildEvents(repo);
  const primaryDate = primary?.mergedAt ?? primary?.openedAt;
  const primaryMeta = primary ? changeLine(primary) : "";

  return (
    <li className="group/row border-b border-rule py-7 transition-colors hover:border-rule-strong">
      <div className="grid gap-x-8 gap-y-5 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/row:translate-x-1 motion-reduce:transition-none sm:grid-cols-[minmax(0,16rem)_minmax(0,1fr)]">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <RepoAvatar
              src={repo.avatarUrl}
              alt={`${repo.repo} repository icon`}
              label={repo.owner}
            />
            <a
              href={repo.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-w-0 break-words font-mono text-xs leading-snug text-ink transition-colors hover:text-accent-ink group-hover/row:text-accent-ink"
            >
              {repo.repo}
            </a>
          </div>

          <p className="mt-3 line-clamp-2 text-sm leading-snug text-mute">{repo.description}</p>

          <p className="tag-mono mt-3 text-[0.62rem] text-faint">
            {repo.language} &middot; {repo.stars.toLocaleString("en-US")} stars
          </p>

          <p className="tag-mono mt-2 inline-flex items-center gap-2 border border-rule px-1.5 py-[0.18rem] text-[0.62rem] text-mute">
            <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-accent" />
            {repo.role}
          </p>
        </div>

        <div className="min-w-0">
          {primary ? (
            <div className="min-w-0">
              <p className="tag-mono flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.62rem] text-mute">
                <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-accent" />
                {primaryDate ? <span>{formatDate(primaryDate)}</span> : null}
                <span aria-hidden="true" className="text-faint">
                  &middot;
                </span>
                <span>{statusLabels[primary.status]}</span>
              </p>
              <h3 className="mt-2 break-words text-base font-medium leading-snug text-ink">
                {primary.title}
              </h3>
              {primaryMeta ? (
                <p className="tag-mono mt-2 text-[0.62rem] text-faint">{primaryMeta}</p>
              ) : null}
            </div>
          ) : null}

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls={panelId}
            className="group/disclosure mt-5 inline-flex items-center gap-2 border border-rule px-3 py-2 tag-mono text-[0.62rem] text-mute transition-colors hover:border-ink hover:text-ink"
          >
            contributions
            <span
              aria-hidden="true"
              className={cn(
                "transition-transform duration-200 motion-reduce:transition-none",
                open && "rotate-180",
              )}
            >
              &#8595;
            </span>
          </button>

          <div
            id={panelId}
            aria-hidden={!open}
            inert={!open}
            className={cn(
              "grid transition-[grid-template-rows,opacity] duration-500 ease-out motion-reduce:transition-none",
              open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
            )}
          >
            <div className="min-h-0 overflow-hidden">
              <div className="mt-5 border-l border-rule pl-6">
                <ol className="flex flex-col gap-5">
                  {events.map((event, index) => (
                    <li
                      key={event.key}
                      className={cn("relative", open && "animate-fade-in")}
                      style={open ? { animationDelay: `${index * 45}ms` } : undefined}
                    >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute -left-7 top-[0.28rem] size-2 rounded-full border",
                        event.accent
                          ? "border-accent bg-accent"
                          : "border-rule-strong bg-paper",
                      )}
                    />
                    <p className="tag-mono flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.62rem] text-faint">
                      <span className="text-mute">{formatDate(event.date)}</span>
                      <span aria-hidden="true">&middot;</span>
                      <span className={event.accent ? "text-accent-ink" : "text-mute"}>
                        {event.label}
                      </span>
                    </p>

                    {event.title ? (
                      <p className="mt-1 break-words text-sm leading-snug text-ink">
                        <a
                          href={event.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition-colors hover:text-accent-ink"
                        >
                          {event.title}
                        </a>
                      </p>
                    ) : null}

                    {event.description ? (
                      <p className="mt-1 max-w-2xl text-sm leading-relaxed text-mute">
                        {event.description}
                      </p>
                    ) : null}

                    {event.meta ? (
                      <p className="tag-mono mt-1.5 text-[0.62rem] text-faint">{event.meta}</p>
                    ) : null}
                  </li>
                ))}
              </ol>

              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
                {primary ? (
                  <a
                    href={primary.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex items-center gap-1.5 tag-mono text-[0.62rem] text-mute transition-colors hover:text-accent-ink"
                  >
                    view pull request
                    <ExternalArrow />
                  </a>
                ) : null}
                <a
                  href={repo.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center gap-1.5 tag-mono text-[0.62rem] text-mute transition-colors hover:text-accent-ink"
                >
                  view repository
                  <ExternalArrow />
                </a>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

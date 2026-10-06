"use client";

import { RepoAvatar } from "@/components/ui/RepoAvatar";
import type { Contribution, ContributionStatus, OpenSourceRepository } from "@/types/content";

const statusLabels: Record<ContributionStatus, string> = {
  merged: "merged pr",
  open: "open pr",
  closed: "closed pr",
  draft: "draft pr",
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

export function OpenSourceRepo({ repo }: { repo: OpenSourceRepository }) {
  const primary = primaryContribution(repo);
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
                <a
                  href={primary.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-accent-ink"
                >
                  {primary.title}
                </a>
              </h3>
              {primaryMeta ? (
                <p className="tag-mono mt-2 text-[0.62rem] text-faint">{primaryMeta}</p>
              ) : null}
              <a
                href={primary.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link mt-4 inline-flex items-center gap-1.5 tag-mono text-[0.62rem] text-mute transition-colors hover:text-accent-ink"
              >
                view pull request
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover/link:translate-x-1 motion-reduce:transition-none"
                >
                  &#8599;
                </span>
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </li>
  );
}

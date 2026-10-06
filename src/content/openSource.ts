import type { OpenSourceRepository } from "@/types/content";

export const repositories: OpenSourceRepository[] = [
  {
    repo: "internetarchive/openlibrary",
    owner: "internetarchive",
    name: "openlibrary",
    repoUrl: "https://github.com/internetarchive/openlibrary",
    description: "One webpage for every book ever published!",
    language: "Python",
    stars: 6707,
    avatarUrl: "https://github.com/internetarchive.png?size=64",
    role: "Contributor",
    contributions: [
      {
        id: "ol-13556",
        kind: "pull-request",
        title: "refactor: convert SubjectPublishingHistory partial to Jinja",
        number: 13556,
        status: "merged",
        description:
          "Converted a server partial to Jinja. Kept the i18n catalogue in sync.",
        openedAt: "2026-09-05",
        mergedAt: "2026-09-06",
        additions: 46,
        deletions: 17,
        changedFiles: 3,
        url: "https://github.com/internetarchive/openlibrary/pull/13556",
      },
    ],
  },
  {
    repo: "semantica-agi/semantica",
    owner: "semantica-agi",
    name: "semantica",
    repoUrl: "https://github.com/semantica-agi/semantica",
    description: "Graph-Native Infrastructure for Context and Accountable AI Systems",
    language: "Python",
    stars: 13469,
    avatarUrl: "https://github.com/semantica-agi.png?size=64",
    role: "Contributor",
    contributions: [
      {
        id: "semantica-1381",
        kind: "pull-request",
        title: "fix(context): deep-copy store results in ErasureReceipt.to_dict()",
        number: 1381,
        status: "merged",
        description:
          "Fixed a shared-reference bug in to_dict(). Added a regression test.",
        openedAt: "2026-09-02",
        mergedAt: "2026-09-05",
        additions: 126,
        deletions: 2,
        changedFiles: 2,
        url: "https://github.com/semantica-agi/semantica/pull/1381",
      },
    ],
  },
  {
    repo: "GoogleCloudPlatform/genmedia-creative-studio",
    owner: "GoogleCloudPlatform",
    name: "genmedia-creative-studio",
    repoUrl: "https://github.com/GoogleCloudPlatform/genmedia-creative-studio",
    description: "Google Cloud generative media demo.",
    language: "Jupyter Notebook",
    stars: 1212,
    avatarUrl: "https://github.com/GoogleCloudPlatform.png?size=64",
    role: "Contributor",
    contributions: [
      {
        id: "genmedia-1688",
        kind: "pull-request",
        title: "fix(babel): update stale Gemini model IDs to gemini-3.5-flash",
        number: 1688,
        status: "merged",
        description:
          "Updated retired Gemini model IDs to a current model.",
        openedAt: "2026-08-15",
        mergedAt: "2026-08-15",
        additions: 4,
        deletions: 4,
        changedFiles: 3,
        url: "https://github.com/GoogleCloudPlatform/genmedia-creative-studio/pull/1688",
      },
    ],
  },
  {
    repo: "sipyourdrink-ltd/bernstein",
    owner: "sipyourdrink-ltd",
    name: "bernstein",
    repoUrl: "https://github.com/sipyourdrink-ltd/bernstein",
    description: "Declarative rules engine for AI agents.",
    language: "Python",
    stars: 1280,
    avatarUrl: "https://github.com/sipyourdrink-ltd.png?size=64",
    role: "Contributor",
    contributions: [
      {
        id: "bernstein-3809",
        kind: "pull-request",
        title: "fix(cost): scope the /metrics/predictions forecast by tenant",
        number: 3809,
        status: "merged",
        description:
          "Scoped the cost forecast by tenant. Added an isolation test.",
        openedAt: "2026-08-14",
        mergedAt: "2026-08-14",
        additions: 295,
        deletions: 3,
        changedFiles: 4,
        url: "https://github.com/sipyourdrink-ltd/bernstein/pull/3809",
      },
    ],
  },
];

const mergedContributions = repositories.reduce(
  (total, repository) =>
    total + repository.contributions.filter((contribution) => contribution.status === "merged").length,
  0,
);

export const contributionStats = {
  merged: mergedContributions,
  repos: repositories.length,
};

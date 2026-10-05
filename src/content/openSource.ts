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
          "Moved the SubjectPublishingHistory server-rendered partial to a Jinja template — relocating the macro to .html.jinja, updating the partial registry and keeping the i18n string catalogue in sync so translations still resolve.",
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
          "to_dict() returned a shallow copy, so nested dicts in backend_result were shared by reference with the live receipt and callers could mutate internal state. Now deep-copies the result, with a regression test covering the erasure coordinator.",
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
    description:
      "GenMedia Creative Studio is a generative media user experience highlighting the use of Gemini, Gemini Omni, Veo, Gemini Image, Gemini TTS, Chirp 3, Lyria and other generative media APIs on Google Cloud.",
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
          "The Babel experiment still defaulted to retired Gemini model IDs, so the demo failed on launch. Updated the default MODEL_ID and the companion Go snippets to a current model.",
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
    description:
      "The open-source AI Agents Governance & Orchestration framework: write the rules declaratively, Bernstein enforces them and produces the verifiable, replayable record.",
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
          "GET /metrics/predictions computed its forecast across every tenant's cost history, leaking one tenant's spend into another's predictions. Scoped the query to the caller's tenant and added an HTTP isolation test to keep it that way.",
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

import type { BuildLogEntry } from "@/types/content";

export const buildLog: BuildLogEntry[] = [
  {
    date: "09.06.26",
    title: "Merged a template refactor into Open Library",
    body: "Converted the SubjectPublishingHistory partial to a Jinja template — relocating the macro, updating the partial registry and keeping the i18n string catalogue in sync. The templates suite passed (688 tests).",
    tags: ["Python", "Open source"],
    repo: "internetarchive/openlibrary",
    href: "https://github.com/internetarchive/openlibrary/pull/13556",
  },
  {
    date: "09.05.26",
    title: "Fixed a shared-reference bug in Semantica",
    body: "ErasureReceipt.to_dict() shallow-copied its nested results, so callers could mutate the live receipt. Deep-copied it and added a regression test for the erasure coordinator.",
    tags: ["Python", "Open source"],
    repo: "semantica-agi/semantica",
    href: "https://github.com/semantica-agi/semantica/pull/1381",
  },
  {
    date: "08.19.26",
    title: "Shipped DevLens",
    body: "An AI screenshot debugger: an image goes in, a structured problem / root-cause / fix report comes out. Output is constrained by a Zod schema, and history stays in the browser.",
    tags: ["Next.js", "AI"],
  },
  {
    date: "08.15.26",
    title: "Updated stale model IDs in a Google sample app",
    body: "The Babel experiment in genmedia-creative-studio still defaulted to retired Gemini models, so it failed on launch. Swapped in a current model ID.",
    tags: ["Open source"],
    repo: "GoogleCloudPlatform/genmedia-creative-studio",
    href: "https://github.com/GoogleCloudPlatform/genmedia-creative-studio/pull/1688",
  },
  {
    date: "08.14.26",
    title: "Scoped a tenant leak in Bernstein's cost forecast",
    body: "GET /metrics/predictions computed its forecast across every tenant's history. Scoped the query to the caller's tenant and added an isolation test so it stays that way.",
    tags: ["Python", "Open source"],
    repo: "sipyourdrink-ltd/bernstein",
    href: "https://github.com/sipyourdrink-ltd/bernstein/pull/3809",
  },
  {
    date: "08.11.26",
    title: "Shipped Internet Archaeologist",
    body: "Turns the Wayback Machine into a timeline: enter a URL and it picks meaningful snapshots across the site's life, with a deterministic selection algorithm and server-side fetching.",
    tags: ["React", "Wayback Machine"],
  },
];

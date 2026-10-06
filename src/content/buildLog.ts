import type { BuildLogEntry } from "@/types/content";

export const buildLog: BuildLogEntry[] = [
  {
    date: "09.06.26",
    title: "Merged a template refactor into Open Library",
    body: "Converted the SubjectPublishingHistory partial to Jinja. Updated the registry and kept i18n in sync. Templates suite passed (688 tests).",
    tags: ["Python", "Open source"],
    repo: "internetarchive/openlibrary",
    href: "https://github.com/internetarchive/openlibrary/pull/13556",
  },
  {
    date: "09.05.26",
    title: "Fixed a shared-reference bug in Semantica",
    body: "ErasureReceipt.to_dict() shared nested state by reference. Deep-copied it and added a regression test.",
    tags: ["Python", "Open source"],
    repo: "semantica-agi/semantica",
    href: "https://github.com/semantica-agi/semantica/pull/1381",
  },
  {
    date: "08.19.26",
    title: "Shipped DevLens",
    body: "AI screenshot debugger. Image in, structured problem and fix out. Zod-validated output, browser-only history.",
    tags: ["Next.js", "AI"],
  },
  {
    date: "08.15.26",
    title: "Updated stale model IDs in a Google sample app",
    body: "The Babel experiment defaulted to retired Gemini models and failed on launch. Updated to a current model ID.",
    tags: ["Open source"],
    repo: "GoogleCloudPlatform/genmedia-creative-studio",
    href: "https://github.com/GoogleCloudPlatform/genmedia-creative-studio/pull/1688",
  },
  {
    date: "08.14.26",
    title: "Scoped a tenant leak in Bernstein cost forecast",
    body: "GET /metrics/predictions read every tenant history. Scoped the query to the caller tenant and added an isolation test.",
    tags: ["Python", "Open source"],
    repo: "sipyourdrink-ltd/bernstein",
    href: "https://github.com/sipyourdrink-ltd/bernstein/pull/3809",
  },
  {
    date: "08.11.26",
    title: "Shipped Internet Archaeologist",
    body: "Wayback Machine as a timeline. Deterministic snapshot selection with server-side fetching.",
    tags: ["React", "Wayback Machine"],
  },
];

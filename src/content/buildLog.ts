import type { BuildLogEntry } from "@/types/content";

export const buildLog: BuildLogEntry[] = [
  {
    date: "09.06.26",
    title: "Merged template refactor into Open Library",
    body: "Moved a partial to Jinja. Kept i18n in sync.",
    tags: ["Python", "Open source"],
    repo: "internetarchive/openlibrary",
    href: "https://github.com/internetarchive/openlibrary/pull/13556",
  },
  {
    date: "09.05.26",
    title: "Fixed shared-reference bug in Semantica",
    body: "Deep-copied nested state. Added a regression test.",
    tags: ["Python", "Open source"],
    repo: "semantica-agi/semantica",
    href: "https://github.com/semantica-agi/semantica/pull/1381",
  },
  {
    date: "08.19.26",
    title: "Shipped DevLens",
    body: "Screenshot in, structured fix out.",
    tags: ["Next.js", "AI"],
  },
  {
    date: "08.15.26",
    title: "Updated stale model IDs in Google sample",
    body: "Swapped retired IDs for a current model.",
    tags: ["Open source"],
    repo: "GoogleCloudPlatform/genmedia-creative-studio",
    href: "https://github.com/GoogleCloudPlatform/genmedia-creative-studio/pull/1688",
  },
  {
    date: "08.14.26",
    title: "Scoped tenant leak in Bernstein forecast",
    body: "Scoped query by tenant. Added isolation test.",
    tags: ["Python", "Open source"],
    repo: "sipyourdrink-ltd/bernstein",
    href: "https://github.com/sipyourdrink-ltd/bernstein/pull/3809",
  },
  {
    date: "08.11.26",
    title: "Shipped Internet Archaeologist",
    body: "Wayback Machine as a timeline.",
    tags: ["React", "Wayback Machine"],
  },
];

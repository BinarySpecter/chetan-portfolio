import type { Stat } from "@/types/content";
import { projects } from "./projects";
import { contributionStats } from "./openSource";

const technologies = new Set<string>();
for (const project of projects) {
  for (const tech of project.stack) technologies.add(tech);
}

export const stats: Stat[] = [
  {
    id: "projects",
    value: projects.length,
    label: "Selected projects",
    sub: "shipped + in progress",
  },
  {
    id: "merged",
    value: contributionStats.merged,
    label: "Merged pull requests",
    sub: "in other people's projects",
  },
  {
    id: "repos",
    value: contributionStats.repos,
    label: "Repositories",
    sub: "contributed to",
  },
  {
    id: "technologies",
    value: technologies.size,
    label: "Technologies",
    sub: "across projects",
  },
];

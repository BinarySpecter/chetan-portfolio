import type { Experiment } from "@/types/content";

export const experiments: Experiment[] = [
  {
    name: "Procedural 3D pirate ship",
    category: "AI experiment",
    summary:
      "A self-contained WebGL scene written by a coding model in a single ~9.3M-token session.",
    status: "Shipped",
    href: "https://binaryspecter.github.io/glm-5.3-pirate-ship",
  },
  {
    name: "LLM coding workflows",
    category: "Developer tooling",
    summary: "Coding assistants as a system. Context, tools, review loops.",
    status: "Ongoing",
  },
  {
    name: "Agent automation",
    category: "Automation",
    summary: "Small tool-using agents wired to real tasks.",
    status: "Ongoing",
  },
  {
    name: "Model comparisons",
    category: "LLM tooling",
    summary: "One task across model providers, comparing output, cost and failure modes.",
    status: "Ongoing",
  },
  {
    name: "Self-hosted assistant",
    category: "Self-hosting",
    summary: "A self-hosted AI setup with a Telegram front end.",
    status: "Ongoing",
  },
];

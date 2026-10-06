import type { Experiment } from "@/types/content";

export const experiments: Experiment[] = [
  {
    name: "Procedural 3D pirate ship",
    category: "AI experiment",
    summary: "WebGL scene written by a coding model in one session.",
    status: "Shipped",
    href: "https://binaryspecter.github.io/glm-5.3-pirate-ship",
  },
  {
    name: "LLM coding workflows",
    category: "Developer tooling",
    summary: "Context, tools, review loops.",
    status: "Ongoing",
  },
  {
    name: "Agent automation",
    category: "Automation",
    summary: "Small tool-using agents for real tasks.",
    status: "Ongoing",
  },
  {
    name: "Model comparisons",
    category: "LLM tooling",
    summary: "One task, many models. Output, cost, failure modes.",
    status: "Ongoing",
  },
  {
    name: "Self-hosted assistant",
    category: "Self-hosting",
    summary: "Self-hosted AI with a Telegram front end.",
    status: "Ongoing",
  },
];

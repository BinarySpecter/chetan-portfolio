import type { Note } from "@/types/content";

export const notes: Note[] = [
  {
    title: "Why database indexes finally clicked",
    description: "B-trees and query performance, explained simply.",
    status: "planned",
    topic: "Databases",
  },
  {
    title: "What I learned building an AI screenshot debugger",
    description: "Schema-validated output changes what you can build.",
    status: "planned",
    topic: "AI",
  },
  {
    title: "The boundary around the model is the interesting part",
    description: "Models recommend, deterministic rules decide.",
    status: "planned",
    topic: "Systems",
  },
  {
    title: "Something I had wrong about LLM context",
    description: "A costly assumption, and what replaced it.",
    status: "planned",
    topic: "LLMs",
  },
];

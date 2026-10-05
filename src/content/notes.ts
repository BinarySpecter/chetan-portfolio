import type { Note } from "@/types/content";

export const notes: Note[] = [
  {
    title: "Why database indexes finally clicked",
    description: "The mental model that made B-trees and query performance make sense.",
    status: "planned",
    topic: "Databases",
  },
  {
    title: "What I learned building an AI screenshot debugger",
    description: "Why structured, schema-validated model output changes what you can build.",
    status: "planned",
    topic: "AI",
  },
  {
    title: "The boundary around the model is the interesting part",
    description: "Building an AI system where the model recommends and deterministic rules decide.",
    status: "planned",
    topic: "Systems",
  },
  {
    title: "Something I had wrong about LLM context",
    description: "The assumption that cost more than it should have, and what replaced it.",
    status: "planned",
    topic: "LLMs",
  },
];

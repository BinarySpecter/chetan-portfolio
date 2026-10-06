import type { Project } from "@/types/content";

export const projects: Project[] = [
  {
    slug: "devlens",
    name: "DevLens",
    year: "2026",
    tagline: "AI debugging from screenshots.",
    status: "shipped",
    category: "AI developer tool",
    screenshot: "/projects/devlens/hero.png",
    screenshotAlt:
      "DevLens debug session interface showing a code screenshot beside its structured problem, root cause and fix analysis.",
    why: "Bugs often start as a screenshot of an error. DevLens reads the image and answers immediately.",
    whatItDoes:
      "Drop in a screenshot of code, a terminal, or a stack trace. Get a structured report with problem, root cause, and a copy-ready fix.",
    howItWorks:
      "A Next.js App Router client posts the image to a route handler. Gemini responds through the Vercel AI SDK with Zod-validated JSON. History stays in localStorage, capped at 50. Nothing persists server-side.",
    technicalDecisions:
      "Schema-validated output so the report renders as components, not markdown. Browser storage keeps the app account-free and private.",
    challenges:
      "Getting consistent structured output from a vision model. Handling large screenshots without bloating requests.",
    learned:
      "Structured generation turns a model from a chat window into a UI you can build against.",
    outcome: "Shipped. Live demo available.",
    stack: ["Next.js", "React", "TypeScript", "Vercel AI SDK", "Gemini", "Tailwind CSS", "Zod"],
    live: "https://getdevlens.vercel.app",
    github: "https://github.com/BinarySpecter/DevLens",
  },
  {
    slug: "recoverai",
    name: "RecoverAI",
    year: "2026",
    tagline: "AI recovery for failed payments. The model recommends, rules decide.",
    status: "shipped",
    category: "AI payments infrastructure",
    screenshot: "/projects/recoverai/hero.png",
    screenshotAlt:
      "RecoverAI dashboard showing revenue at risk, recovered value, incremental recovery versus a do-nothing baseline and recovery performance by failure type.",
    why: "Failed payments cost merchants revenue, but an LLM should never move money. This tests if AI can help without holding authorization.",
    whatItDoes:
      "Diagnoses failed payments and recommends one action from a fixed catalogue. A deterministic policy engine approves, rejects, or holds for review. Every decision goes to an append-only audit trail.",
    howItWorks:
      "The LLM returns schema-validated JSON with diagnosis, action, and confidence. A pure function over request plus history makes the authorization decision. Providers are swappable: offline engine, Gemini, or DeepSeek.",
    technicalDecisions:
      "Authorization lives in a pure function. Same inputs always give the same verdict, and the model cannot bypass a rule.",
    challenges:
      "Keeping the action catalogue small enough to reason about but useful enough to matter. Adding an economic stopping rule.",
    learned:
      "The boundary around the model matters more than the model. Define what it cannot decide.",
    outcome: "Built for the Razorpay AI Buildathon. Live demo hosted.",
    stack: ["TypeScript", "Next.js", "LLM", "Policy engine"],
    live: "https://recoverai-v90c.onrender.com/",
    github: "https://github.com/BinarySpecter/RecoverAI",
  },
  {
    slug: "internet-archaeologist",
    name: "Internet Archaeologist",
    year: "2026",
    tagline: "Type a website, travel through its history.",
    status: "shipped",
    why: "The Wayback Machine holds decades of web history but is hard to browse. This makes a site history easy to move through.",
    whatItDoes:
      "Enter a URL to get meaningful snapshots on an interactive timeline. Select a point to open the archived page in a sandboxed preview.",
    howItWorks:
      "A server queries the Internet Archive CDX API. A deterministic algorithm picks up to 14 points, one per year with gap fillers. Server-side fetching avoids CORS. Responses cache for ten minutes.",
    technicalDecisions:
      "Deterministic selection instead of showing every snapshot, which keeps the timeline legible. A server-side proxy holds caching and rate limits.",
    challenges:
      "Making the selection feel representative. Handling upstream timeouts without breaking the timeline.",
    learned: "A good abstraction is about what you leave out.",
    outcome: "Shipped with unit, API, and Playwright end-to-end tests.",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Express", "Vitest", "Playwright"],
    github: "https://github.com/BinarySpecter/internet-archaeologist",
  },
  {
    slug: "bizpilot",
    name: "BizPilot",
    year: "2026",
    tagline: "Sales data turned into recommended actions.",
    status: "shipped",
    category: "Decision intelligence",
    screenshot: "/projects/bizpilot/hero.png",
    screenshotAlt:
      "BizPilot dashboard showing total revenue, units sold, seven-day forecast, demand trends and recommended inventory actions.",
    why: "Small businesses have data but little time to interpret it. Most dashboards show what happened. BizPilot suggests what to do next.",
    whatItDoes:
      "Turns sales and inventory data into signals, insights, recommended actions, and deterministic what-if simulations.",
    howItWorks:
      "A pipeline of Data to Signals to Insights to Actions to Simulate to Ask. Python and pandas compute numbers and simulations. The LLM only explains results, so decisions stay deterministic.",
    technicalDecisions:
      "Deterministic maths for anything that drives a decision. The model handles language only.",
    challenges:
      "Making recommendations legible enough for a non-technical owner to trust.",
    learned:
      "If an output drives a decision, it should not depend on model arithmetic.",
    outcome: "Hackathon project. Live demo deployed.",
    stack: ["Next.js", "TypeScript", "Python", "pandas", "Recharts", "LLM"],
    live: "https://bizpilot-two.vercel.app",
    github: "https://github.com/BinarySpecter/BizPilot",
  },
  {
    slug: "iq-lab",
    name: "IQ Lab",
    alias: "Skill Arena",
    year: "2026",
    tagline: "Cross-platform practice app built with Flutter and Firebase.",
    status: "in-progress",
    why: "Tutorials end with little retention and no feedback loop. IQ Lab makes practice structured and repeatable.",
    whatItDoes:
      "Mobile app for structured skill practice with measured sessions and progress tracking.",
    howItWorks:
      "Flutter client from one codebase. Firebase for auth and realtime data. Session and progress model measures practice. Batched writes and local cache support offline use.",
    technicalDecisions:
      "Built for weak connections. Writes are batched and data is cached locally, then reconciled later.",
    challenges: "Keeping Firestore reads cheap while syncing progress across devices.",
    outcome: "In progress. Data model and core flow built. Refining the interface.",
    stack: ["Flutter", "Dart", "Firebase", "Cloud Firestore"],
  },
];

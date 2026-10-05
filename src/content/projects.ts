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
    why: "Most bugs start as a screenshot of an error you don't fully understand. I wanted it read and answered immediately, without sending your code to someone else's database.",
    whatItDoes:
      "Drop a screenshot of code, a terminal, a stack trace or a console. DevLens returns a structured report — problem, root cause, explanation, fix — with copy-ready code or commands.",
    howItWorks:
      "A Next.js App Router client posts the image to a route handler, which calls Gemini through the Vercel AI SDK. The response is constrained by a Zod schema, so the UI renders real fields instead of parsing prose. Analyses stay in localStorage (capped at 50) — nothing is persisted server-side.",
    technicalDecisions:
      "Schema-validated output rather than free text, so the report is a component and not a blob of markdown. History lives in the browser to keep the app account-free and private.",
    challenges:
      "Getting consistent, parseable structure out of a vision model, and handling large screenshots without bloating the request.",
    learned:
      "Structured generation turns a model from a chat window into something you can build a UI against.",
    outcome: "Shipped and deployed — live demo available.",
    stack: ["Next.js", "React", "TypeScript", "Vercel AI SDK", "Gemini", "Tailwind CSS", "Zod"],
    live: "https://getdevlens.vercel.app",
    github: "https://github.com/BinarySpecter/DevLens",
  },
  {
    slug: "recoverai",
    name: "RecoverAI",
    year: "2026",
    tagline: "AI recovery for failed payments — the model recommends, rules authorise.",
    status: "shipped",
    category: "AI payments infrastructure",
    screenshot: "/projects/recoverai/hero.png",
    screenshotAlt:
      "RecoverAI dashboard showing revenue at risk, recovered value, incremental recovery versus a do-nothing baseline and recovery performance by failure type.",
    why: "Failed payments are a silent tax on merchants, but letting an LLM act on real payment rails is unsafe. I wanted to know if AI could be useful here without ever being trusted to move money.",
    whatItDoes:
      "Diagnoses why a payment failed and recommends one action from a fixed catalogue. A deterministic policy engine decides whether it may run, high-value cases are held for human approval, and every decision is written to an append-only audit trail.",
    howItWorks:
      "The LLM is never on the authorisation path. It returns schema-validated JSON — a diagnosis, root cause, one action and a confidence — and a pure function over (request, history) approves, rejects or gates it. The provider is abstracted, so the system runs on an offline engine, Gemini, or DeepSeek.",
    technicalDecisions:
      "Keeping authorisation in a pure function means the same inputs always produce the same verdict, and the model can never talk its way past a rule.",
    challenges:
      "Designing a bounded action catalogue expressive enough to be useful but small enough to reason about, plus an economic stopping rule.",
    learned:
      "The interesting part of an AI system is the boundary around the model — what it is and isn't allowed to decide.",
    outcome: "Built for the Razorpay AI Buildathon; live demo hosted.",
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
    why: "The Wayback Machine holds decades of the web but is awkward to browse. I wanted a site's history to be something you can move through.",
    whatItDoes:
      "Enter a URL and the app selects meaningful snapshots — the earliest capture, one per year and gap fillers — then lays them on an interactive timeline. Selecting a point opens the archived page in a sandboxed preview.",
    howItWorks:
      "A server queries the Internet Archive CDX API, then a deterministic algorithm picks up to 14 points: one per year closest to July 1, with gaps over two years filled at the midpoint. Fetching is server-side, so the browser never hits CORS. Responses cache for ten minutes.",
    technicalDecisions:
      "Deterministic selection instead of 'show every snapshot', which keeps the timeline legible. A server-side proxy keeps upstream handling, caching and rate limits out of the client.",
    challenges:
      "Making the selection feel representative rather than arbitrary, and handling upstream timeouts and malformed responses without breaking the timeline.",
    learned: "A good abstraction is as much about what you leave out as what you show.",
    outcome: "Shipped with unit, API and Playwright end-to-end tests.",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Express", "Vitest", "Playwright"],
    github: "https://github.com/BinarySpecter/internet-archaeologist",
  },
  {
    slug: "bizpilot",
    name: "BizPilot",
    year: "2026",
    tagline: "Decision intelligence for small businesses.",
    status: "shipped",
    category: "Decision intelligence",
    screenshot: "/projects/bizpilot/hero.png",
    screenshotAlt:
      "BizPilot dashboard showing total revenue, units sold, seven-day forecast, demand trends and recommended inventory actions.",
    why: "Small businesses have the data but not the time to interpret it. Most dashboards answer 'what happened?' — I wanted one that answers 'what should I do next?'",
    whatItDoes:
      "Turns everyday sales and inventory data into signals, insights, recommended actions and deterministic what-if simulations.",
    howItWorks:
      "A pipeline of Data → Signals → Insights → Actions → Simulate → Ask. Python and pandas compute the numbers and simulations; the LLM only explains results, so anything a decision depends on stays deterministic.",
    technicalDecisions:
      "Separating computation from explanation — deterministic maths for anything that drives a decision, the model only for language.",
    challenges:
      "Making the pipeline legible enough that a non-technical owner can trust a recommendation they didn't calculate themselves.",
    learned:
      "If an output drives a decision, it shouldn't depend on a language model's arithmetic.",
    outcome: "Hackathon project; live demo deployed.",
    stack: ["Next.js", "TypeScript", "Python", "pandas", "Recharts", "LLM"],
    live: "https://bizpilot-two.vercel.app",
    github: "https://github.com/BinarySpecter/BizPilot",
  },
  {
    slug: "iq-lab",
    name: "IQ Lab",
    alias: "Skill Arena",
    year: "2026",
    tagline: "A cross-platform practice app in Flutter and Firebase.",
    status: "in-progress",
    why: "Practising a skill is usually unstructured. You finish a tutorial and retain very little — there's no loop telling you what to do next.",
    whatItDoes:
      "A mobile app I'm building end to end — interface, data model and backend — to turn practice into something structured and repeatable.",
    howItWorks:
      "A Flutter client from one codebase, with Firebase for auth and realtime data and a session and progress model so practice is measured rather than guessed.",
    technicalDecisions:
      "The constraint is staying usable on a weak connection: writes are batched and data cached locally so the app works offline and reconciles later.",
    challenges: "Keeping Firestore reads cheap while still reflecting progress across devices.",
    outcome: "In progress. Core data model and flow are built; the interface is being refined.",
    stack: ["Flutter", "Dart", "Firebase", "Cloud Firestore"],
  },
];

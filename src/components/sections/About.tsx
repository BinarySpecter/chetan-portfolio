import { Section } from "@/components/ui/Section";

export function About() {
  return (
    <Section id="about" index="01" title="About" meta="Read first">
      <p className="statement max-w-3xl">
        I learn by <span className="marker-hover">building and shipping</span>.
      </p>

      <div className="mt-7 max-w-2xl space-y-4 text-base leading-relaxed text-mute">
        <p>
          I&apos;m Chetan, a B.Tech IT student in Delhi. I build AI developer tools
          with Next.js, TypeScript, and Python.
        </p>
        <p>
          I contribute to open-source projects maintained by others. Recent work
          includes DevLens, an AI screenshot debugger, and merged PRs to
          Open Library and other real codebases.
        </p>
      </div>
    </Section>
  );
}

import { Section } from "@/components/ui/Section";

export function About() {
  return (
    <Section id="about" index="01" title="About" meta="Read first">
      <p className="statement max-w-3xl">
        B.Tech IT student <span className="marker-hover">building AI developer tools</span>.
      </p>

      <p className="mt-7 max-w-2xl text-base leading-relaxed text-mute">
        Next.js, TypeScript, Python. 4 shipped projects. 4 merged open-source PRs.
      </p>
    </Section>
  );
}

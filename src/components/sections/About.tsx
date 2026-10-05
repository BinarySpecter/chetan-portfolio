import { Section } from "@/components/ui/Section";

export function About() {
  return (
    <Section id="about" index="01" title="About" meta="Read first">
      <p className="statement max-w-3xl">
        I&apos;m more interested in <span className="marker-hover">how things work</span> than in
        collecting the tools that build them.
      </p>

      <p className="mt-7 max-w-2xl text-base leading-relaxed text-mute">
        I&apos;m Chetan, a B.Tech IT student in Delhi. I build AI developer tools and contribute to
        open-source projects maintained by other people — that&apos;s where I learn the most. My work
        starts with a question rather than a framework: can an AI debug code from a screenshot
        without your data leaving the browser? Can a model recommend a payment action while
        deterministic rules keep it away from money? The attempts teach more than the answers.
      </p>
    </Section>
  );
}

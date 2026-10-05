import { Section } from "@/components/ui/Section";
import { OpenSourceRepo } from "@/components/sections/OpenSourceRepo";
import { repositories, contributionStats } from "@/content/openSource";
import { site } from "@/content/site";

function Arrow() {
  return (
    <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
      &#8599;
    </span>
  );
}

export function OpenSource() {
  return (
    <Section
      id="open-source"
      index="05"
      title="Open source"
      meta={`${contributionStats.merged} merged · ${contributionStats.repos} repositories`}
    >
      <p className="statement max-w-3xl">
        I don&apos;t only build from scratch. I contribute to{" "}
        <span className="marker-hover">software other people maintain</span>.
      </p>

      <ul className="mt-9 border-t border-rule">
        {repositories.map((repo) => (
          <OpenSourceRepo key={repo.repo} repo={repo} />
        ))}
      </ul>

      <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
        <a
          href={site.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 border border-rule px-4 py-2.5 tag-mono text-mute transition-colors hover:border-ink hover:text-ink"
        >
          view github
          <Arrow />
        </a>
      </div>
    </Section>
  );
}

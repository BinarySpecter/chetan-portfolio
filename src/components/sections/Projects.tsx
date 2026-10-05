import { Section } from "@/components/ui/Section";
import { FeaturedProjects, type FeaturedProject } from "@/components/sections/FeaturedProjects";
import { projects } from "@/content/projects";

export function Projects() {
  const featured = projects.filter(
    (project): project is FeaturedProject => Boolean(project.screenshot),
  );

  return (
    <Section
      id="projects"
      index="04"
      title="Selected projects"
      meta={`${featured.length} builds`}
    >
      <p className="statement max-w-3xl">
        A few things I&apos;ve built properly, rather than many I&apos;ve started.
      </p>

      <FeaturedProjects projects={featured} />
    </Section>
  );
}

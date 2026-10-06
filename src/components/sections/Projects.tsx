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
      <FeaturedProjects projects={featured} />
    </Section>
  );
}

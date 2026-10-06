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
        Shipped projects with live demos and source code.
      </p>

      <FeaturedProjects projects={featured} />
    </Section>
  );
}

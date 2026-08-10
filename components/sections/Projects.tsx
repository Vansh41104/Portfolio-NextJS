import { Reveal } from "@/components/motion/Reveal"
import { Section } from "./Section"
import { ProjectCard } from "./ProjectCard"
import { projects } from "@/content"

export function Projects() {
  return (
    <Section id="projects" label="Selected work" title="What I've built" meta={`${projects.length} projects`}>
      <div className="grid gap-5 lg:grid-cols-2">
        {projects.map((project, index) => (
          <Reveal key={project.id} index={index} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

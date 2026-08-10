import { Reveal } from "@/components/motion/Reveal"
import { TechTag } from "@/components/interactive/TechTag"
import { Section } from "./Section"
import { skills } from "@/content"

export function Skills() {
  return (
    <Section id="skills" label="Capabilities" title="What I work with">
      <div className="divide-y divide-border">
        {skills.map((group, index) => (
          <Reveal key={group.id} index={index}>
            <div data-entry={group.id} className="grid gap-4 py-7 lg:grid-cols-12 lg:gap-8">
              <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground lg:col-span-3">
                {group.label}
              </h3>
              <ul className="flex flex-wrap gap-1.5 lg:col-span-9">
                {group.skills.map((skill) => (
                  <li key={skill}>
                    <TechTag label={skill} variant="pill" />
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

import { Reveal } from "@/components/motion/Reveal"
import { Section } from "./Section"
import { education } from "@/content"

export function EducationSection() {
  return (
    <Section id="education" label="Education" title="Where I studied">
      <Reveal>
        <div data-entry={education.id} className="grid gap-4 lg:grid-cols-12 lg:gap-8">
          <p className="font-mono text-xs text-muted-foreground lg:col-span-3">{education.period}</p>

          <div className="space-y-3 lg:col-span-6">
            <div>
              <h3 className="text-lg font-normal">{education.degree}</h3>
              <p className="text-muted-foreground">
                {education.institution} · {education.location}
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              Relevant coursework: {education.coursework.join(", ")}
            </p>
          </div>

          <p className="font-mono text-sm text-signal lg:col-span-3 lg:text-right">{education.grade}</p>
        </div>
      </Reveal>
    </Section>
  )
}

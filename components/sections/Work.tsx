import { Reveal } from "@/components/motion/Reveal"
import { CountUp } from "@/components/interactive/CountUp"
import { TechTag } from "@/components/interactive/TechTag"
import { Section } from "./Section"
import { experience } from "@/content"
import { techAttr } from "@/lib/tech"

export function Work() {
  return (
    <Section id="work" label="Experience" title="Where I've worked" meta="2025 — Present">
      <div className="divide-y divide-border">
        {experience.map((role, index) => (
          <Reveal key={role.id} index={index}>
            <article
              data-entry={role.id}
              data-techs={techAttr(role.tech)}
              data-kind="role"
              className="grid gap-4 py-8 transition-colors lg:grid-cols-12 lg:gap-8"
            >
              <div className="lg:col-span-3">
                <p className="font-mono text-xs text-muted-foreground">
                  {role.start === role.end ? role.start : `${role.start} — ${role.end}`}
                </p>
                {role.current && (
                  <p className="mt-1.5 inline-flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-wider text-signal">
                    <span className="h-1 w-1 rounded-full bg-signal" aria-hidden="true" />
                    Current
                  </p>
                )}
              </div>

              <div className="space-y-4 lg:col-span-6">
                <div>
                  <h3 className="text-lg font-normal">{role.title}</h3>
                  <p className="text-muted-foreground">{role.company}</p>
                </div>

                {role.metrics && (
                  <dl className="flex flex-wrap gap-x-8 gap-y-3 border-y border-border py-3.5">
                    {role.metrics.map((metric) => (
                      // Reversed so the figure sits above its label while the
                      // <dt> still precedes its <dd> in the source order.
                      <div key={metric.label} className="flex flex-col-reverse gap-0.5">
                        <dt className="text-xs text-muted-foreground">{metric.label}</dt>
                        <dd>
                          <CountUp value={metric.value} className="font-mono text-xl text-signal" />
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}

                <ul className="space-y-2.5">
                  {role.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                      <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-border" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>

              <ul className="flex flex-wrap content-start gap-1.5 lg:col-span-3 lg:justify-end">
                {role.tech.map((tech) => (
                  <li key={tech}>
                    <TechTag label={tech} />
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

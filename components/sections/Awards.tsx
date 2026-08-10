import { Reveal } from "@/components/motion/Reveal"
import { GlowCard } from "@/components/interactive/GlowCard"
import { Section } from "./Section"
import { awards } from "@/content"

export function Awards() {
  return (
    <Section id="awards" label="Recognition" title="Awards & honours">
      <div className="grid gap-5 lg:grid-cols-3">
        {awards.map((award, index) => (
          <Reveal key={award.id} index={index} className="h-full">
            <GlowCard className="h-full">
              <article
                data-entry={award.id}
                className="flex h-full flex-col gap-4 rounded-lg border border-border p-6 transition-colors duration-300 hover:border-signal-line/50"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full border border-signal-line/50 bg-signal-soft px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-foreground/80">
                    {award.badge}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground/60">{award.year}</span>
                </div>
                <h3 className="text-base font-normal leading-snug">{award.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{award.description}</p>
              </article>
            </GlowCard>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

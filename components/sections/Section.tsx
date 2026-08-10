import type { ReactNode } from "react"
import { Reveal } from "@/components/motion/Reveal"
import { ScrambleText } from "@/components/interactive/ScrambleText"

type SectionProps = {
  id: string
  label: string
  title: string
  meta?: string
  children: ReactNode
}

/** Shared section shell: mono eyebrow, display heading, hairline rule. */
export function Section({ id, label, title, meta, children }: SectionProps) {
  return (
    <section id={id} className="py-20 sm:py-28">
      <Reveal>
        <div className="flex items-baseline justify-between gap-6 border-b border-border pb-5">
          <div className="space-y-2">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
            <h2 className="text-3xl font-light tracking-tight sm:text-4xl">
              <ScrambleText text={title} />
            </h2>
          </div>
          {meta && <p className="hidden font-mono text-xs text-muted-foreground sm:block">{meta}</p>}
        </div>
      </Reveal>

      <div className="pt-10 sm:pt-12">{children}</div>
    </section>
  )
}

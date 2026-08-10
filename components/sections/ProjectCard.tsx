"use client"

import { useId, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight, ChevronDown, Github } from "lucide-react"
import { GlowCard } from "@/components/interactive/GlowCard"
import { TechTag } from "@/components/interactive/TechTag"
import { CountUp } from "@/components/interactive/CountUp"
import { techAttr } from "@/lib/tech"
import type { Project } from "@/content/types"

/** Splits "1,500+ findings" into the number and its unit so only the number counts up. */
function splitMetric(metric: string): { value: string; label: string } {
  const match = /^([\d,.]+\+?%?)\s*(.*)$/.exec(metric)
  return match ? { value: match[1], label: match[2] } : { value: metric, label: "" }
}

export function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false)
  const reduced = useReducedMotion()
  const panelId = useId()

  const metric = project.metric ? splitMetric(project.metric) : null

  return (
    <GlowCard className="h-full">
      <article
        data-entry={project.id}
        data-techs={techAttr(project.tech)}
        data-kind="project"
        className="flex h-full flex-col gap-5 rounded-lg border border-border p-6 transition-colors duration-300 hover:border-signal-line/50"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <h3 className="text-lg font-normal leading-snug">{project.title}</h3>
            <p className="font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground">
              {project.highlight}
            </p>
          </div>
          <span className="shrink-0 font-mono text-xs text-muted-foreground/60">{project.year}</span>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">{project.description}</p>

        {metric && (
          <p className="font-mono text-sm text-signal">
            <CountUp value={metric.value} />
            {metric.label && <span className="text-muted-foreground"> {metric.label}</span>}
          </p>
        )}

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-fit items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronDown
            className={`h-3 w-3 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
          {open ? "less" : "details"}
        </button>

        {/* Never unmounted — collapsed with height so the copy stays in the HTML. */}
        <motion.div
          id={panelId}
          aria-hidden={!open}
          initial={false}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={reduced ? { duration: 0 } : { duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <ul className="space-y-2.5">
            {project.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-border" />
                {bullet}
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="mt-auto flex items-end justify-between gap-4 pt-2">
          <ul className="flex flex-wrap gap-1.5">
            {project.tech.map((tech) => (
              <li key={tech}>
                <TechTag label={tech} />
              </li>
            ))}
          </ul>

          {/* Links render only when a real URL exists — no dead affordances. */}
          {(project.repo || project.demo) && (
            <div className="flex shrink-0 items-center gap-3">
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${project.title} source on GitHub`}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${project.title} live demo`}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              )}
            </div>
          )}
        </div>
      </article>
    </GlowCard>
  )
}

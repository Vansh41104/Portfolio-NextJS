"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Check } from "lucide-react"
import type { TraceStep as TraceStepData } from "./types"

type Status = "pending" | "running" | "done"

/**
 * One tool-call row in the pipeline trace. Decorative by design — the whole
 * trace is aria-hidden so screen readers get the answer, not spinner noise.
 */
export function TraceStep({ step, status, index }: { step: TraceStepData; status: Status; index: number }) {
  const reduced = useReducedMotion()

  if (status === "pending") return null

  const running = status === "running"

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1], delay: reduced ? 0 : index * 0.02 }}
      className="flex items-baseline gap-2.5 font-mono text-[0.7rem] leading-6"
    >
      <span className={running ? "text-signal animate-trace-pulse" : "text-signal"}>
        {running ? "▸" : <Check className="inline h-3 w-3 translate-y-[1px]" />}
      </span>

      <span className="text-muted-foreground">
        {step.label}
        <span className="text-muted-foreground/50">({step.target})</span>
      </span>

      <span className="flex-1 truncate text-muted-foreground/70">{running ? "…" : step.detail}</span>

      {!running && <span className="tabular-nums text-muted-foreground/40">{step.ms}ms</span>}
    </motion.div>
  )
}

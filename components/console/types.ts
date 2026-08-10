import type { Answer } from "@/content/types"

export type TraceStep = {
  /** Tool name, e.g. "retrieve". */
  label: string
  /** Rendered inside the parens, e.g. "chroma". */
  target: string
  /** Result summary shown once the step settles. */
  detail: string
  /** Scheduled duration — also what's displayed as the step's latency. */
  ms: number
}

export type Phase = "tracing" | "streaming" | "done"

/** A question routed through the retrieval pipeline. Traces, then streams. */
export type AnswerExchange = {
  kind: "answer"
  id: number
  query: string
  answer: Answer
  /** False when the query fell through to `fallbackAnswer`. */
  matched: boolean
  steps: TraceStep[]
  phase: Phase
  /** Number of completed steps. */
  activeStep: number
}

/** A slash command. Prints instantly — no trace, no streaming. */
export type CommandExchange = {
  kind: "command"
  id: number
  query: string
  output: string[]
}

export type Exchange = AnswerExchange | CommandExchange

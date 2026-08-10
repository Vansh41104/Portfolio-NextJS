"use client"

import { useCallback, useRef, useState } from "react"
import { useReducedMotion } from "framer-motion"
import { useTheme } from "next-themes"
import { fallbackAnswer, retrieve } from "@/lib/retrieval"
import type { Answer } from "@/content/types"
import { isCommand, runCommand } from "./commands"
import type { Exchange, TraceStep } from "./types"

const wait = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms))

/**
 * Builds the pipeline trace shown above each answer.
 *
 * The durations are the real elapsed time of each step — the console waits
 * exactly this long before advancing — so the latencies displayed are honest
 * even though the pipeline itself is local.
 */
function buildTrace(answer: Answer, candidates: number, matched: boolean): TraceStep[] {
  const model = answer.trace?.model ?? "llama-3.3-70b"
  const chunks = answer.trace?.chunks ?? 0

  if (!matched) {
    return [
      { label: "route", target: "model", detail: model, ms: 180 },
      { label: "retrieve", target: "chroma", detail: "0 chunks above threshold", ms: 300 },
      { label: "rank", target: "reranker", detail: "no candidate cleared cutoff", ms: 160 },
    ]
  }

  return [
    { label: "route", target: "model", detail: model, ms: 200 },
    { label: "retrieve", target: "chroma", detail: `${chunks} chunks`, ms: 340 },
    { label: "rank", target: "reranker", detail: `${candidates} candidate${candidates === 1 ? "" : "s"}`, ms: 220 },
    { label: "synthesize", target: "", detail: "streaming", ms: 160 },
  ]
}

export function useAgentQuery() {
  const [exchanges, setExchanges] = useState<Exchange[]>([])
  const idRef = useRef(0)
  const runRef = useRef(0)
  const reduced = useReducedMotion()
  const { resolvedTheme, setTheme } = useTheme()

  const patch = useCallback((id: number, next: Partial<Exchange>) => {
    setExchanges((prev) =>
      prev.map((e) => (e.id === id ? ({ ...e, ...next } as Exchange) : e)),
    )
  }, [])

  const clear = useCallback(() => {
    runRef.current += 1
    setExchanges([])
  }, [])

  const askQuestion = useCallback(
    (query: string) => {
      const result = retrieve(query)
      const matched = result.answer !== null
      const answer = result.answer ?? fallbackAnswer
      const steps = buildTrace(answer, result.candidates, matched)

      const id = (idRef.current += 1)
      const run = (runRef.current += 1)

      setExchanges((prev) => [
        ...prev,
        {
          kind: "answer",
          id,
          query,
          answer,
          matched,
          steps,
          // Under reduced motion there is no trace or stream to watch — land on
          // the finished state directly.
          phase: reduced ? "done" : "tracing",
          activeStep: reduced ? steps.length : 0,
        },
      ])

      if (reduced) return

      void (async () => {
        for (let i = 0; i < steps.length; i += 1) {
          await wait(steps[i].ms)
          // A newer query superseded this run.
          if (runRef.current !== run) return
          patch(id, { activeStep: i + 1 })
        }
        if (runRef.current !== run) return
        patch(id, { phase: "streaming" })
      })()
    },
    [patch, reduced],
  )

  const submit = useCallback(
    (rawQuery: string) => {
      const query = rawQuery.trim()
      if (!query) return

      if (!isCommand(query)) {
        askQuestion(query)
        return
      }

      const result = runCommand(query, {
        clear,
        setTheme,
        resolvedTheme,
      })

      // A command may delegate to the retrieval pipeline (e.g. /whoami).
      if (result.ask) {
        askQuestion(result.ask)
        return
      }

      if (result.output) {
        const id = (idRef.current += 1)
        setExchanges((prev) => [...prev, { kind: "command", id, query, output: result.output ?? [] }])
      }

      // Run after the print is queued so /clear doesn't wipe its own output.
      result.effect?.()
    },
    [askQuestion, clear, resolvedTheme, setTheme],
  )

  const finishStream = useCallback((id: number) => patch(id, { phase: "done" }), [patch])

  const isBusy = exchanges.some((e) => e.kind === "answer" && e.phase !== "done")
  const queryHistory = exchanges.map((e) => e.query)

  return { exchanges, submit, finishStream, clear, isBusy, queryHistory }
}

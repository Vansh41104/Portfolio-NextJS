"use client"

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { Check, ChevronDown, Copy, CornerDownLeft, Square } from "lucide-react"
import { suggestedAnswers } from "@/lib/retrieval"
import { scrollToSection } from "@/lib/scroll"
import { registerConsole } from "@/lib/console-bus"
import { GhostInput } from "./GhostInput"
import { StreamingText, toPlainText } from "./StreamingText"
import { TraceStep } from "./TraceStep"
import { useAgentQuery } from "./useAgentQuery"
import type { AnswerExchange, CommandExchange, Exchange } from "./types"

export function AgentConsole() {
  const { exchanges, submit, finishStream, clear, isBusy, queryHistory } = useAgentQuery()
  const [input, setInput] = useState("")
  const [historyCursor, setHistoryCursor] = useState<number | null>(null)
  const [modKey, setModKey] = useState("Ctrl")

  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (navigator.platform.toLowerCase().includes("mac")) setModKey("⌘")
  }, [])

  const focusInput = useCallback(() => {
    inputRef.current?.focus()
    inputRef.current?.scrollIntoView({ block: "center", behavior: reduced ? "auto" : "smooth" })
  }, [reduced])

  const run = useCallback(
    (query: string) => {
      submit(query)
      setInput("")
      setHistoryCursor(null)
    },
    [submit],
  )

  // Lets KeyboardNav's "/" shortcut reach the console without prop drilling
  // through the server-rendered section tree.
  useEffect(() => {
    registerConsole({ focus: focusInput, submit: run })
    return () => registerConsole(null)
  }, [focusInput, run])

  useEffect(() => {
    const onKeyDown = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        focusInput()
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [focusInput])

  const stickToBottom = useCallback(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [])

  useEffect(stickToBottom, [exchanges.length, stickToBottom])

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setInput("")
      setHistoryCursor(null)
      inputRef.current?.blur()
      return
    }

    if (e.key === "ArrowUp" && queryHistory.length > 0) {
      e.preventDefault()
      const next = historyCursor === null ? queryHistory.length - 1 : Math.max(0, historyCursor - 1)
      setHistoryCursor(next)
      setInput(queryHistory[next])
      return
    }

    if (e.key === "ArrowDown" && historyCursor !== null) {
      e.preventDefault()
      const next = historyCursor + 1
      if (next >= queryHistory.length) {
        setHistoryCursor(null)
        setInput("")
      } else {
        setHistoryCursor(next)
        setInput(queryHistory[next])
      }
    }
  }

  const hasHistory = exchanges.length > 0

  return (
    <div className="console-glow overflow-hidden rounded-xl border border-console-border bg-console">
      <header className="flex items-center gap-3 border-b border-console-border/70 px-4 py-2.5 sm:px-5">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-signal" />
          <span className="font-mono text-xs tracking-tight text-foreground">ask-vansh</span>
        </div>

        <div className="ml-auto flex items-center gap-3">
          {hasHistory && (
            <button
              type="button"
              onClick={() => {
                clear()
                setHistoryCursor(null)
              }}
              className="font-mono text-[0.65rem] text-muted-foreground/60 transition-colors hover:text-foreground"
            >
              clear
            </button>
          )}
          <button
            type="button"
            onClick={() => run("/help")}
            className="font-mono text-[0.65rem] text-muted-foreground/60 transition-colors hover:text-foreground"
          >
            /help
          </button>
          <kbd className="hidden rounded border border-border px-1.5 py-0.5 font-mono text-[0.65rem] text-muted-foreground/60 sm:inline-block">
            {modKey}K
          </kbd>
        </div>
      </header>

      <div
        ref={scrollRef}
        className={`overflow-y-auto px-4 sm:px-5 ${hasHistory ? "mask-fade-y max-h-[min(50vh,24rem)] py-4" : ""}`}
      >
        {!hasHistory ? (
          <p className="py-5 text-sm leading-relaxed text-muted-foreground">
            Ask about my work — the agentic system I shipped at 9AI, how I build RAG pipelines, or why you
            should hire me. It retrieves over my own writing, so it only knows what I&apos;ve actually done.
          </p>
        ) : (
          <div className="space-y-7">
            <AnimatePresence initial={false}>
              {exchanges.map((exchange) => (
                <ExchangeBlock
                  key={exchange.id}
                  exchange={exchange}
                  onStreamDone={() => finishStream(exchange.id)}
                  onStreamTick={stickToBottom}
                  onAsk={run}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          run(input)
        }}
        className="flex items-center gap-2.5 border-t border-console-border/70 px-4 py-3 sm:px-5"
      >
        <span aria-hidden="true" className="font-mono text-xs text-signal">
          ~ %
        </span>
        <GhostInput value={input} onChange={setInput} onKeyDown={onKeyDown} inputRef={inputRef} />
        <button
          type="submit"
          disabled={!input.trim() || isBusy}
          aria-label="Submit"
          className="inline-flex items-center gap-1.5 rounded-md border border-border px-2 py-1 font-mono text-[0.65rem] text-muted-foreground transition-colors hover:border-signal-line hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
        >
          <CornerDownLeft className="h-3 w-3" aria-hidden="true" />
        </button>
      </form>

      <div className="flex flex-wrap gap-1.5 border-t border-console-border/70 px-4 py-3 sm:px-5">
        {suggestedAnswers.map((answer) => (
          <button
            key={answer.id}
            type="button"
            onClick={() => run(answer.question)}
            className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground transition-colors duration-300 hover:border-signal-line hover:text-foreground"
          >
            {answer.question}
          </button>
        ))}
      </div>
    </div>
  )
}

function ExchangeBlock({
  exchange,
  onStreamDone,
  onStreamTick,
  onAsk,
}: {
  exchange: Exchange
  onStreamDone: () => void
  onStreamTick: () => void
  onAsk: (query: string) => void
}) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-3"
    >
      <p className="flex gap-2.5 font-mono text-xs">
        <span aria-hidden="true" className="text-signal">
          ~ %
        </span>
        <span className="text-foreground">{exchange.query}</span>
      </p>

      {exchange.kind === "command" ? (
        <CommandOutput exchange={exchange} />
      ) : (
        <AnswerBody
          exchange={exchange}
          onStreamDone={onStreamDone}
          onStreamTick={onStreamTick}
          onAsk={onAsk}
        />
      )}
    </motion.div>
  )
}

/** Commands print instantly — no trace, no stream. */
function CommandOutput({ exchange }: { exchange: CommandExchange }) {
  return (
    <pre className="whitespace-pre-wrap font-mono text-xs leading-6 text-muted-foreground">
      {exchange.output.join("\n")}
    </pre>
  )
}

function AnswerBody({
  exchange,
  onStreamDone,
  onStreamTick,
  onAsk,
}: {
  exchange: AnswerExchange
  onStreamDone: () => void
  onStreamTick: () => void
  onAsk: (query: string) => void
}) {
  const [traceOpen, setTraceOpen] = useState(true)
  const [stopped, setStopped] = useState(false)
  const [copied, setCopied] = useState(false)
  const [rate, setRate] = useState(0)
  const startedAt = useRef<number | null>(null)

  const streaming = exchange.phase === "streaming" && !stopped
  const showAnswer = exchange.phase === "streaming" || exchange.phase === "done"

  const handleTick = useCallback(
    (words: number) => {
      if (startedAt.current === null) startedAt.current = performance.now()
      const elapsed = (performance.now() - startedAt.current) / 1000
      if (elapsed > 0.2) setRate(words / elapsed)
      onStreamTick()
    },
    [onStreamTick],
  )

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(toPlainText(exchange.answer.answer))
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      // Clipboard can be blocked by permissions; failing silently is fine here.
    }
  }

  return (
    <>
      <div className="space-y-0.5">
        <button
          type="button"
          onClick={() => setTraceOpen((v) => !v)}
          aria-expanded={traceOpen}
          className="flex items-center gap-1 font-mono text-[0.65rem] text-muted-foreground/50 transition-colors hover:text-foreground"
        >
          <ChevronDown
            className={`h-3 w-3 transition-transform duration-300 ${traceOpen ? "" : "-rotate-90"}`}
            aria-hidden="true"
          />
          trace
        </button>

        {traceOpen && (
          <div aria-hidden="true">
            {exchange.steps.map((step, i) => (
              <TraceStep
                key={step.label}
                step={step}
                index={i}
                status={
                  exchange.phase !== "tracing" || i < exchange.activeStep
                    ? "done"
                    : i === exchange.activeStep
                      ? "running"
                      : "pending"
                }
              />
            ))}
          </div>
        )}
      </div>

      {showAnswer && (
        <>
          <div role="log" aria-live="polite" aria-atomic="false">
            <StreamingText
              text={exchange.answer.answer}
              stream={exchange.phase === "streaming"}
              forceComplete={stopped}
              onDone={onStreamDone}
              onTick={handleTick}
            />
          </div>

          {streaming && (
            <div className="flex items-center gap-3 font-mono text-[0.65rem] text-muted-foreground/50">
              <span className="tabular-nums">{rate > 0 ? `${rate.toFixed(0)} tok/s` : "…"}</span>
              <button
                type="button"
                onClick={() => setStopped(true)}
                className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
              >
                <Square className="h-2.5 w-2.5 fill-current" aria-hidden="true" />
                stop
              </button>
            </div>
          )}
        </>
      )}

      {exchange.phase === "done" && (
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {exchange.answer.sources.map((source) => (
            <button
              key={`${source.section}-${source.entry ?? "all"}`}
              type="button"
              onClick={() => scrollToSection(source.section, source.entry)}
              className="rounded-full border border-signal-line/60 bg-signal-soft px-2.5 py-1 font-mono text-[0.65rem] text-foreground/80 transition-colors hover:text-foreground"
            >
              ↓ {source.label}
            </button>
          ))}

          {exchange.answer.followUp?.map((question) => (
            <button
              key={question}
              type="button"
              onClick={() => onAsk(question)}
              className="rounded-full border border-border px-2.5 py-1 font-mono text-[0.65rem] text-muted-foreground transition-colors hover:border-signal-line hover:text-foreground"
            >
              {question}
            </button>
          ))}

          <button
            type="button"
            onClick={copy}
            aria-label="Copy answer"
            className="ml-auto inline-flex items-center gap-1 font-mono text-[0.65rem] text-muted-foreground/50 transition-colors hover:text-foreground"
          >
            {copied ? (
              <Check className="h-3 w-3" aria-hidden="true" />
            ) : (
              <Copy className="h-3 w-3" aria-hidden="true" />
            )}
            {copied ? "copied" : "copy"}
          </button>
        </div>
      )}
    </>
  )
}

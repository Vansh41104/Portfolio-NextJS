"use client"

import { useMemo, type KeyboardEvent, type RefObject } from "react"
import { useReducedMotion } from "framer-motion"
import { suggestCompletion } from "@/lib/retrieval"
import { PLACEHOLDER_QUERIES, isCommand, suggestCommand } from "./commands"
import { useTypewriter } from "./useTypewriter"

const STATIC_PLACEHOLDER = "ask me something — or /help"

type GhostInputProps = {
  value: string
  onChange: (next: string) => void
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void
  inputRef: RefObject<HTMLInputElement | null>
}

/**
 * The console input with two affordances layered under it:
 *
 * - **Ghost completion** — when the best match extends what's typed, the rest
 *   appears inline in dim text. `Tab` / `→` accepts it.
 * - **Idle typewriter** — when empty, cycles example queries so a visitor can
 *   see what the console actually answers.
 *
 * Both render into one mirror `<div>` sitting behind a transparent input; the
 * two share font and metrics so the glyphs line up exactly.
 */
export function GhostInput({ value, onChange, onKeyDown, inputRef }: GhostInputProps) {
  const reduced = useReducedMotion()

  const completion = useMemo(() => {
    if (!value.trim()) return null
    return isCommand(value) ? suggestCommand(value) : suggestCompletion(value)
  }, [value])

  // Only render inline when the suggestion literally extends what's typed —
  // a fuzzy match shown inline would misrepresent what Tab is about to insert.
  const inlineGhost =
    completion && completion.toLowerCase().startsWith(value.trimStart().toLowerCase())
      ? completion.slice(value.trimStart().length)
      : null

  const hint = completion && !inlineGhost ? completion : null

  const typed = useTypewriter(PLACEHOLDER_QUERIES, !reduced && value.length === 0)
  const placeholder = reduced ? STATIC_PLACEHOLDER : typed

  const accept = () => {
    if (!completion) return false
    onChange(completion)
    return true
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const atEnd = e.currentTarget.selectionStart === value.length

    if (e.key === "Tab" && completion) {
      e.preventDefault()
      accept()
      return
    }

    if (e.key === "ArrowRight" && atEnd && completion) {
      e.preventDefault()
      accept()
      return
    }

    onKeyDown(e)
  }

  return (
    <div className="relative min-w-0 flex-1">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center overflow-hidden whitespace-pre font-mono text-sm"
      >
        {value.length > 0 ? (
          <>
            <span className="invisible">{value}</span>
            {inlineGhost && <span className="text-muted-foreground/35">{inlineGhost}</span>}
          </>
        ) : (
          <span className="text-muted-foreground/40">
            {placeholder}
            {!reduced && <span className="animate-caret">▌</span>}
          </span>
        )}
      </div>

      <input
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        aria-label="Ask a question about Vansh's work, or type a slash command"
        aria-autocomplete="inline"
        autoComplete="off"
        spellCheck={false}
        className="relative w-full bg-transparent font-mono text-sm text-foreground focus:outline-none"
      />

      {hint && (
        <p className="pointer-events-none absolute left-0 top-full mt-1.5 truncate font-mono text-[0.65rem] text-muted-foreground/50">
          <span className="text-muted-foreground/70">Tab ↹</span> {hint}
        </p>
      )}
    </div>
  )
}

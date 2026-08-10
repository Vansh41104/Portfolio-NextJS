"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useReducedMotion } from "framer-motion"
import { parseRich, totalLength, wordBoundaries, type Paragraph } from "./richText"

type StreamingTextProps = {
  text: string
  /** When false the text renders complete immediately (history entries). */
  stream: boolean
  /** Reveals everything at once — used by the Stop button. */
  forceComplete?: boolean
  onDone?: () => void
  /** Called with the number of words revealed so far. */
  onTick?: (words: number) => void
}

const MIN_TICK_MS = 26
const JITTER_MS = 34

export function StreamingText({ text, stream, forceComplete, onDone, onTick }: StreamingTextProps) {
  const reduced = useReducedMotion()
  const paragraphs = useMemo(() => parseRich(text), [text])
  const total = useMemo(() => totalLength(paragraphs), [paragraphs])
  const bounds = useMemo(() => wordBoundaries(paragraphs), [paragraphs])

  const animate = stream && !reduced && !forceComplete
  const [visible, setVisible] = useState(animate ? 0 : total)

  // Kept in refs so the parent re-creating these callbacks each render doesn't
  // restart the stream.
  const onDoneRef = useRef(onDone)
  const onTickRef = useRef(onTick)
  onDoneRef.current = onDone
  onTickRef.current = onTick

  useEffect(() => {
    if (!animate) {
      setVisible(total)
      onDoneRef.current?.()
      return
    }

    let cancelled = false
    let timer: number
    let wordIndex = 0

    const step = () => {
      if (cancelled) return

      if (wordIndex >= bounds.length) {
        setVisible(total)
        onDoneRef.current?.()
        return
      }

      setVisible(bounds[wordIndex])
      wordIndex += 1
      onTickRef.current?.(wordIndex)
      timer = window.setTimeout(step, MIN_TICK_MS + Math.random() * JITTER_MS)
    }

    timer = window.setTimeout(step, MIN_TICK_MS)

    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [animate, bounds, total])

  return (
    <div className="space-y-4 text-[0.95rem] leading-relaxed text-foreground/90">
      {renderParagraphs(paragraphs, visible)}
      {animate && visible < total && (
        <span
          className="ml-0.5 inline-block h-[1.05em] w-[0.5ch] translate-y-[0.15em] bg-signal align-middle animate-caret"
          aria-hidden="true"
        />
      )}
    </div>
  )
}

function renderParagraphs(paragraphs: Paragraph[], visible: number) {
  let budget = visible

  return paragraphs.map((para, pIndex) => {
    const parts = para.map((seg, sIndex) => {
      if (budget <= 0) return null
      const slice = seg.text.slice(0, budget)
      budget -= slice.length
      if (!slice) return null

      return seg.bold ? (
        <strong key={sIndex} className="font-medium text-foreground">
          {slice}
        </strong>
      ) : (
        <span key={sIndex}>{slice}</span>
      )
    })

    if (parts.every((p) => p === null)) return null

    return <p key={pIndex}>{parts}</p>
  })
}

/** Plain text for the clipboard — no `**` markers, paragraphs preserved. */
export function toPlainText(text: string): string {
  return parseRich(text)
    .map((para) => para.map((seg) => seg.text).join(""))
    .join("\n\n")
}

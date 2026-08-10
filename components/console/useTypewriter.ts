"use client"

import { useEffect, useState } from "react"

const TYPE_MS = 55
const DELETE_MS = 26
const HOLD_MS = 2200
const BETWEEN_MS = 420
const START_MS = 700

/**
 * Types and deletes through `phrases` on a loop. Returns "" when disabled, so
 * callers can fall back to a static placeholder under reduced motion.
 *
 * `phrases` must be a stable reference — pass a module-level constant.
 */
export function useTypewriter(phrases: readonly string[], enabled: boolean): string {
  const [text, setText] = useState("")

  useEffect(() => {
    if (!enabled || phrases.length === 0) {
      setText("")
      return
    }

    let phraseIndex = 0
    let charCount = 0
    let deleting = false
    let timer: number

    const tick = () => {
      const phrase = phrases[phraseIndex % phrases.length]

      if (deleting) {
        charCount -= 1
        setText(phrase.slice(0, charCount))
        if (charCount <= 0) {
          deleting = false
          phraseIndex += 1
          timer = window.setTimeout(tick, BETWEEN_MS)
          return
        }
        timer = window.setTimeout(tick, DELETE_MS)
        return
      }

      charCount += 1
      setText(phrase.slice(0, charCount))
      if (charCount >= phrase.length) {
        deleting = true
        timer = window.setTimeout(tick, HOLD_MS)
        return
      }
      timer = window.setTimeout(tick, TYPE_MS)
    }

    timer = window.setTimeout(tick, START_MS)
    return () => window.clearTimeout(timer)
  }, [phrases, enabled])

  return text
}

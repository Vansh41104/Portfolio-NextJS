"use client"

import { useEffect, useRef, useState } from "react"
import { useInView, useReducedMotion } from "framer-motion"

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ/\\<>[]{}=+*#$%"
const FRAME_MS = 34
/** Frames each character stays scrambled before locking, per index. */
const STAGGER = 2

/**
 * Decodes text into place when it scrolls into view.
 *
 * State-driven on purpose. An earlier version wrote `el.textContent` directly
 * to avoid renders, but that destroys the text node React created — the
 * reconciler then appends instead of updating and the heading renders twice.
 * Never mutate the children of an element React owns. The animation is a
 * one-shot ~30 frames, so the renders are cheap.
 *
 * Initial state is the real string, so SSR, no-JS and screen readers get the
 * finished text.
 */
export function ScrambleText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const reduced = useReducedMotion()
  const [display, setDisplay] = useState(text)

  useEffect(() => {
    if (reduced || !inView) {
      setDisplay(text)
      return
    }

    let frame = 0
    let timer: number

    const tick = () => {
      let out = ""
      let settled = 0

      for (let i = 0; i < text.length; i += 1) {
        const char = text[i]
        if (char === " ") {
          out += " "
          settled += 1
          continue
        }

        if (frame >= i * STAGGER) {
          out += char
          settled += 1
        } else {
          out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        }
      }

      setDisplay(out)
      frame += 1

      if (settled < text.length) {
        timer = window.setTimeout(tick, FRAME_MS)
      } else {
        setDisplay(text)
      }
    }

    tick()

    return () => {
      window.clearTimeout(timer)
      setDisplay(text)
    }
  }, [inView, reduced, text])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}

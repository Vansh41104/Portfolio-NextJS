"use client"

import { useEffect, useRef, useState } from "react"
import { useInView, useReducedMotion } from "framer-motion"

const DURATION_MS = 900

type Parsed = {
  prefix: string
  target: number
  suffix: string
  decimals: number
  grouped: boolean
}

/** Splits "1,500+" into prefix "", 1500, suffix "+", so formatting survives. */
function parse(value: string): Parsed | null {
  const match = /^(\D*)([\d,]+(?:\.\d+)?)(.*)$/.exec(value)
  if (!match) return null

  const [, prefix, digits, suffix] = match
  const target = Number(digits.replace(/,/g, ""))
  if (!Number.isFinite(target)) return null

  return {
    prefix,
    target,
    suffix,
    decimals: digits.includes(".") ? digits.split(".")[1].length : 0,
    grouped: digits.includes(","),
  }
}

function format(n: number, p: Parsed): string {
  const fixed = n.toFixed(p.decimals)
  const grouped = p.grouped ? Number(fixed).toLocaleString("en-US", { minimumFractionDigits: p.decimals }) : fixed
  return `${p.prefix}${grouped}${p.suffix}`
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

/**
 * Counts a number up when it scrolls into view.
 *
 * State-driven for the same reason as ScrambleText: writing `textContent` on a
 * span React owns destroys its text node, and the reconciler then appends
 * instead of updating — rendering the figure twice.
 *
 * Initial state is the real value so the figure is always in the SSR HTML.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const reduced = useReducedMotion()
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    const parsed = parse(value)
    if (reduced || !inView || !parsed) {
      setDisplay(value)
      return
    }

    let frame: number
    const start = performance.now()

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION_MS)
      if (t < 1) {
        setDisplay(format(easeOut(t) * parsed.target, parsed))
        frame = requestAnimationFrame(tick)
      } else {
        setDisplay(value)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      setDisplay(value)
    }
  }, [inView, reduced, value])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}

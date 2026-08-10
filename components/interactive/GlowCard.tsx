"use client"

import { useEffect, useRef, type ReactNode } from "react"

/**
 * Tracks the pointer across a card and exposes its position as `--mx` / `--my`
 * for the `.glow-surface` gradient in globals.css.
 *
 * Writes CSS variables from a rAF-throttled handler rather than React state —
 * moving the cursor must not trigger a render. Only attaches on fine pointers;
 * on touch the card is a plain div.
 */
export function GlowCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!window.matchMedia("(pointer: fine)").matches) return

    let frame = 0
    let x = 0
    let y = 0

    const apply = () => {
      frame = 0
      el.style.setProperty("--mx", `${x}px`)
      el.style.setProperty("--my", `${y}px`)
    }

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      x = e.clientX - rect.left
      y = e.clientY - rect.top
      if (!frame) frame = requestAnimationFrame(apply)
    }

    const onLeave = () => {
      if (frame) cancelAnimationFrame(frame)
      frame = 0
      el.style.removeProperty("--mx")
      el.style.removeProperty("--my")
    }

    el.addEventListener("pointermove", onMove)
    el.addEventListener("pointerleave", onLeave)

    return () => {
      if (frame) cancelAnimationFrame(frame)
      el.removeEventListener("pointermove", onMove)
      el.removeEventListener("pointerleave", onLeave)
    }
  }, [])

  return (
    <div ref={ref} className={`glow-surface ${className}`}>
      {children}
    </div>
  )
}

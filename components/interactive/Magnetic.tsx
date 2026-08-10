"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion"

const STRENGTH = 0.28
const SPRING = { stiffness: 220, damping: 18, mass: 0.4 }

/**
 * Pulls its child slightly toward the cursor while hovered.
 *
 * Uses motion values rather than state, so the pull costs no renders. Inert
 * under reduced motion and on coarse pointers — the child keeps its own hit
 * area either way, so nothing becomes harder to click.
 */
export function Magnetic({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, SPRING)
  const y = useSpring(rawY, SPRING)

  useEffect(() => {
    const el = ref.current
    if (!el || reduced) return
    if (!window.matchMedia("(pointer: fine)").matches) return

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      rawX.set((e.clientX - (rect.left + rect.width / 2)) * STRENGTH)
      rawY.set((e.clientY - (rect.top + rect.height / 2)) * STRENGTH)
    }

    const reset = () => {
      rawX.set(0)
      rawY.set(0)
    }

    el.addEventListener("pointermove", onMove)
    el.addEventListener("pointerleave", reset)

    return () => {
      el.removeEventListener("pointermove", onMove)
      el.removeEventListener("pointerleave", reset)
      reset()
    }
  }, [rawX, rawY, reduced])

  return (
    <motion.div ref={ref} style={{ x, y }} className={className}>
      {children}
    </motion.div>
  )
}

"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import { registerLenis, prefersReducedMotion } from "@/lib/scroll"

/**
 * Mounts Lenis smooth scrolling and registers it for `scrollToSection`.
 * Disabled entirely under `prefers-reduced-motion` — scroll hijacking is a
 * common trigger, so the native scroll must stay untouched there.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      gestureOrientation: "vertical",
    })

    registerLenis(lenis)

    let frame = requestAnimationFrame(function raf(time: number) {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    })

    return () => {
      cancelAnimationFrame(frame)
      registerLenis(null)
      lenis.destroy()
    }
  }, [])

  return null
}

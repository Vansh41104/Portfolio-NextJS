"use client"

import { useState, useEffect, useRef } from "react"

interface ScrollTriggerOptions {
  threshold?: number // Percentage of element that needs to be visible (0-1)
  rootMargin?: string // Margin around the root
  once?: boolean // Whether to trigger only once
}

export function useScrollTrigger({ threshold = 0.1, rootMargin = "0px", once = false }: ScrollTriggerOptions = {}) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!ref.current) return

    const currentRef = ref.current

    const observer = new IntersectionObserver(
      ([entry]) => {
        // If we only want to trigger once and have already triggered, do nothing
        if (once && hasTriggered) return

        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) setHasTriggered(true)
        } else {
          if (!once) setIsVisible(false)
        }
      },
      {
        threshold,
        rootMargin,
      },
    )

    observer.observe(currentRef)

    return () => {
      if (currentRef) observer.unobserve(currentRef)
    }
  }, [threshold, rootMargin, once, hasTriggered])

  return { ref, isVisible }
}


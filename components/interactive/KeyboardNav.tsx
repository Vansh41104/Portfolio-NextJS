"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { focusConsole } from "@/lib/console-bus"
import { scrollToSection } from "@/lib/scroll"
import type { NavSection } from "@/components/nav/SectionRail"
import { ShortcutsOverlay } from "./ShortcutsOverlay"

/** `g` then one of these jumps straight to that section. */
const GOTO_KEYS: Record<string, string> = {
  h: "intro",
  w: "work",
  p: "projects",
  s: "skills",
  e: "education",
  a: "awards",
  c: "connect",
}

const GOTO_TIMEOUT_MS = 900

function isTyping(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null
  if (!el) return false
  const tag = el.tagName
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || el.isContentEditable
}

/**
 * Page-wide keyboard control. Every handler bails while a field has focus, so
 * typing `/help` in the console never triggers navigation.
 */
export function KeyboardNav({ sections }: { sections: NavSection[] }) {
  const [showShortcuts, setShowShortcuts] = useState(false)
  const pendingGoto = useRef(false)
  const gotoTimer = useRef<number | undefined>(undefined)

  /** Nearest section to the top of the viewport — where "next" counts from. */
  const currentIndex = useCallback(() => {
    let best = 0
    let bestDistance = Number.POSITIVE_INFINITY

    sections.forEach((section, i) => {
      const el = document.getElementById(section.id)
      if (!el) return
      const distance = Math.abs(el.getBoundingClientRect().top)
      if (distance < bestDistance) {
        bestDistance = distance
        best = i
      }
    })

    return best
  }, [sections])

  const step = useCallback(
    (delta: number) => {
      const next = Math.min(sections.length - 1, Math.max(0, currentIndex() + delta))
      scrollToSection(sections[next].id)
    },
    [currentIndex, sections],
  )

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return

      if (e.key === "Escape" && showShortcuts) {
        setShowShortcuts(false)
        return
      }

      if (isTyping(e.target)) return

      // Second key of a `g`-prefixed jump.
      if (pendingGoto.current) {
        pendingGoto.current = false
        window.clearTimeout(gotoTimer.current)
        const target = GOTO_KEYS[e.key.toLowerCase()]
        if (target) {
          e.preventDefault()
          scrollToSection(target)
          return
        }
      }

      switch (e.key) {
        case "j":
          e.preventDefault()
          step(1)
          break
        case "k":
          e.preventDefault()
          step(-1)
          break
        case "g":
          e.preventDefault()
          pendingGoto.current = true
          gotoTimer.current = window.setTimeout(() => {
            pendingGoto.current = false
          }, GOTO_TIMEOUT_MS)
          break
        case "/":
          e.preventDefault()
          focusConsole()
          break
        case "?":
          e.preventDefault()
          setShowShortcuts(true)
          break
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => {
      window.removeEventListener("keydown", onKeyDown)
      window.clearTimeout(gotoTimer.current)
    }
  }, [showShortcuts, step])

  return <ShortcutsOverlay open={showShortcuts} onOpenChange={setShowShortcuts} sections={sections} />
}

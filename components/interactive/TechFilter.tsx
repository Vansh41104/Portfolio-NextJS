"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { X } from "lucide-react"
import { techSlug } from "@/lib/tech"

type ActiveTech = { slug: string; label: string } | null

type TechFilterValue = {
  active: ActiveTech
  toggle: (label: string) => void
  clear: () => void
}

const TechFilterContext = createContext<TechFilterValue>({
  active: null,
  toggle: () => {},
  clear: () => {},
})

export const useTechFilter = () => useContext(TechFilterContext)

type Counts = { roles: number; projects: number }

/**
 * Cross-links the résumé: selecting a technology highlights every role and
 * project that uses it and dims the rest.
 *
 * Context carries the selection to the (client) tags, while the dimming itself
 * is applied by toggling `data-dimmed` on the server-rendered `[data-techs]`
 * nodes — the same DOM approach `highlightEntry` in lib/scroll.ts already uses.
 * That keeps every section a server component.
 */
export function TechFilterProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<ActiveTech>(null)
  const [counts, setCounts] = useState<Counts>({ roles: 0, projects: 0 })
  const reduced = useReducedMotion()

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-techs]")
    let roles = 0
    let projects = 0

    nodes.forEach((node) => {
      if (!active) {
        node.removeAttribute("data-dimmed")
        return
      }

      const hit = (node.dataset.techs ?? "").split("|").includes(active.slug)
      if (hit) {
        node.removeAttribute("data-dimmed")
        if (node.dataset.kind === "role") roles += 1
        if (node.dataset.kind === "project") projects += 1
      } else {
        node.setAttribute("data-dimmed", "true")
      }
    })

    setCounts({ roles, projects })
  }, [active])

  // Leaving the filter on while navigating away would strand dimmed content.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const toggle = useCallback((label: string) => {
    const slug = techSlug(label)
    setActive((prev) => (prev?.slug === slug ? null : { slug, label }))
  }, [])

  const clear = useCallback(() => setActive(null), [])

  const value = useMemo(() => ({ active, toggle, clear }), [active, toggle, clear])

  const total = counts.roles + counts.projects

  return (
    <TechFilterContext.Provider value={value}>
      {children}

      <AnimatePresence>
        {active && (
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 bottom-6 z-40 flex justify-center px-6"
          >
            <div
              role="status"
              className="flex items-center gap-3 rounded-full border border-signal-line/60 bg-console/95 px-4 py-2 text-sm shadow-lg backdrop-blur"
            >
              <span className="font-mono text-xs text-signal">{active.label}</span>
              <span className="text-muted-foreground">
                {total === 0
                  ? "no matches"
                  : [
                      counts.roles > 0 && `${counts.roles} role${counts.roles === 1 ? "" : "s"}`,
                      counts.projects > 0 && `${counts.projects} project${counts.projects === 1 ? "" : "s"}`,
                    ]
                      .filter(Boolean)
                      .join(" · ")}
              </span>
              <button
                type="button"
                onClick={clear}
                className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                clear
                <X className="h-3 w-3" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </TechFilterContext.Provider>
  )
}

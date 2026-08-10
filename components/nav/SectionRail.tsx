"use client"

import { useEffect, useState } from "react"
import { scrollToSection } from "@/lib/scroll"

export type NavSection = { id: string; label: string }

/**
 * Fixed scroll-spy rail. Hidden below lg — on narrow viewports the page is
 * short enough to scroll and the rail would crowd the content.
 */
export function SectionRail({ sections }: { sections: NavSection[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? "")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry nearest the top of the viewport among those visible,
        // so fast scrolling can't leave a stale section marked active.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible[0]) setActive(visible[0].target.id)
      },
      { threshold: 0.15, rootMargin: "-10% 0px -55% 0px" },
    )

    for (const section of sections) {
      const el = document.getElementById(section.id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [sections])

  return (
    <nav
      aria-label="Section navigation"
      className="fixed left-8 top-1/2 z-30 hidden -translate-y-1/2 lg:block"
    >
      <ul className="space-y-1">
        {sections.map((section) => {
          const isActive = active === section.id
          return (
            <li key={section.id}>
              <button
                type="button"
                onClick={() => scrollToSection(section.id)}
                aria-current={isActive ? "true" : undefined}
                className="group flex items-center gap-3 py-1.5"
              >
                <span
                  className={`h-px transition-all duration-500 ${
                    isActive ? "w-8 bg-signal" : "w-4 bg-muted-foreground/30 group-hover:w-6 group-hover:bg-muted-foreground/60"
                  }`}
                />
                <span
                  className={`font-mono text-[0.65rem] uppercase tracking-[0.14em] transition-all duration-500 ${
                    isActive
                      ? "text-foreground opacity-100"
                      : "text-muted-foreground opacity-0 group-hover:opacity-100"
                  }`}
                >
                  {section.label}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

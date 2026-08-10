"use client"

import { ChevronDown } from "lucide-react"
import { scrollToSection } from "@/lib/scroll"

/** Quick links to what's actually below, so the row carries information. */
const JUMP_LINKS = [
  { id: "work", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "awards", label: "Awards" },
]

/**
 * Closes out the hero: a scroll affordance plus direct jumps into the résumé.
 *
 * Goes through `scrollToSection` rather than a bare `#work` anchor — a raw
 * anchor hard-jumps and bypasses Lenis, which is why this was the only
 * navigation on the page that didn't scroll smoothly.
 */
export function ScrollCue() {
  return (
    <div className="mt-14 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-border pt-5">
      <button
        type="button"
        onClick={() => scrollToSection("work")}
        className="group inline-flex items-center gap-2.5 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
      >
        <ChevronDown className="h-3.5 w-3.5 animate-hint-down" aria-hidden="true" />
        Read the full résumé
      </button>

      <nav aria-label="Jump to section" className="flex flex-wrap items-center gap-x-5 gap-y-2">
        {JUMP_LINKS.map((link) => (
          <button
            key={link.id}
            type="button"
            onClick={() => scrollToSection(link.id)}
            className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground/60 transition-colors hover:text-foreground"
          >
            {link.label}
          </button>
        ))}
      </nav>
    </div>
  )
}

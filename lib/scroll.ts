/**
 * Scroll helpers shared by the section rail and the console's source chips.
 *
 * Lenis hijacks the scroll position, so native `scrollIntoView({behavior:
 * "smooth"})` fights it. When Lenis is mounted we delegate to it; otherwise
 * (reduced motion, or before hydration) we fall back to the native call.
 */

type LenisLike = {
  scrollTo: (target: string | number | HTMLElement, options?: { offset?: number; duration?: number }) => void
}

let lenis: LenisLike | null = null

export function registerLenis(instance: LenisLike | null) {
  lenis = instance
}

const HEADER_OFFSET = -88

export function scrollToSection(sectionId: string, entryId?: string) {
  const el = document.getElementById(sectionId)
  if (!el) return

  if (lenis) {
    lenis.scrollTo(el, { offset: HEADER_OFFSET })
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  if (entryId) highlightEntry(entryId)
}

/** Briefly flashes the deep-linked entry so the jump is legible. */
export function highlightEntry(entryId: string) {
  const target = document.querySelector<HTMLElement>(`[data-entry="${entryId}"]`)
  if (!target) return

  target.classList.remove("is-target-highlight")
  // Force a reflow so re-triggering the animation on the same element works.
  void target.offsetWidth
  target.classList.add("is-target-highlight")

  window.setTimeout(() => target.classList.remove("is-target-highlight"), 2000)
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

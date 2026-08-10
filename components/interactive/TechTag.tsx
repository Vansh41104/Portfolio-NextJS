"use client"

import { techSlug } from "@/lib/tech"
import { useTechFilter } from "./TechFilter"

type TechTagProps = {
  label: string
  /** "pill" is the larger skills variant; "tag" is the compact card variant. */
  variant?: "tag" | "pill"
}

/**
 * A clickable technology. Selecting one filters the rest of the page; selecting
 * it again clears. Rendered as a real button so it's keyboard-reachable.
 */
export function TechTag({ label, variant = "tag" }: TechTagProps) {
  const { active, toggle } = useTechFilter()
  const isActive = active?.slug === techSlug(label)

  const base =
    variant === "pill"
      ? "rounded-full border px-3 py-1.5 text-sm"
      : "rounded-full border px-2.5 py-1 font-mono text-[0.65rem]"

  return (
    <button
      type="button"
      onClick={() => toggle(label)}
      aria-pressed={isActive}
      className={`${base} transition-colors duration-300 ${
        isActive
          ? "border-signal-line bg-signal-soft text-foreground"
          : "border-border text-muted-foreground hover:border-signal-line/60 hover:text-foreground"
      }`}
    >
      {label}
    </button>
  )
}

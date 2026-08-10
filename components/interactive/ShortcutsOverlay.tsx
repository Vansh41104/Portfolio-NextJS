"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { NavSection } from "@/components/nav/SectionRail"

const GENERAL: { keys: string[]; action: string }[] = [
  { keys: ["j"], action: "Next section" },
  { keys: ["k"], action: "Previous section" },
  { keys: ["/"], action: "Focus the console" },
  { keys: ["⌘", "K"], action: "Focus the console" },
  { keys: ["?"], action: "This dialog" },
  { keys: ["Esc"], action: "Close / clear filter" },
]

const CONSOLE: { keys: string[]; action: string }[] = [
  { keys: ["Tab"], action: "Accept the suggested question" },
  { keys: ["↑", "↓"], action: "Previous / next query" },
  { keys: ["/help"], action: "List every command" },
]

const GOTO_LETTER: Record<string, string> = {
  intro: "h",
  work: "w",
  projects: "p",
  skills: "s",
  education: "e",
  awards: "a",
  connect: "c",
}

export function ShortcutsOverlay({
  open,
  onOpenChange,
  sections,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  sections: NavSection[]
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-mono text-sm font-normal">Keyboard shortcuts</DialogTitle>
          <DialogDescription className="text-xs">
            This site is fully keyboard-drivable.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 pt-2 sm:grid-cols-2">
          <Group title="General" rows={GENERAL} />
          <Group title="Console" rows={CONSOLE} />
          <Group
            title="Go to"
            rows={sections
              .filter((s) => GOTO_LETTER[s.id])
              .map((s) => ({ keys: ["g", GOTO_LETTER[s.id]], action: s.label }))}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

function Group({ title, rows }: { title: string; rows: { keys: string[]; action: string }[] }) {
  return (
    <section className="space-y-2.5">
      <h3 className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">{title}</h3>
      <ul className="space-y-2">
        {rows.map((row) => (
          <li key={`${row.keys.join("")}-${row.action}`} className="flex items-center justify-between gap-4">
            <span className="text-sm text-muted-foreground">{row.action}</span>
            <span className="flex shrink-0 items-center gap-1">
              {row.keys.map((key) => (
                <kbd
                  key={key}
                  className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.65rem] text-foreground"
                >
                  {key}
                </kbd>
              ))}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}

import { profile } from "@/content"
import { scrollToSection } from "@/lib/scroll"

/**
 * Slash commands for the console.
 *
 * Commands print instantly; questions stream. That contrast is deliberate — it
 * shows the visitor which half is a local tool and which half is the (simulated)
 * retrieval pipeline.
 */

export type CommandResult = {
  /** Printed immediately, monospaced. */
  output?: string[]
  /** Side effect to run after the output is queued. */
  effect?: () => void
  /** Delegate to the retrieval pipeline instead — this answer will stream. */
  ask?: string
}

export type CommandContext = {
  clear: () => void
  setTheme: (theme: "dark" | "light") => void
  resolvedTheme: string | undefined
}

type CommandSpec = {
  name: string
  args?: string
  description: string
  run: (args: string[], ctx: CommandContext) => CommandResult
}

const SECTION_COMMANDS: Record<string, { section: string; label: string }> = {
  work: { section: "work", label: "experience" },
  projects: { section: "projects", label: "projects" },
  skills: { section: "skills", label: "skills" },
  education: { section: "education", label: "education" },
  awards: { section: "awards", label: "awards" },
  contact: { section: "connect", label: "contact" },
}

const OPEN_TARGETS: Record<string, string> = {
  github: "GitHub",
  linkedin: "LinkedIn",
  x: "X",
  twitter: "X",
  site: "Site",
}

function socialUrl(key: string): { name: string; url: string } | null {
  const wanted = OPEN_TARGETS[key]
  if (!wanted) return null
  const match = profile.socials.find((s) => s.name === wanted)
  return match ? { name: match.name, url: match.url } : null
}

export const COMMANDS: CommandSpec[] = [
  {
    name: "help",
    description: "List commands and example questions",
    run: () => ({
      output: [
        "COMMANDS",
        ...COMMANDS.map((c) => `  /${[c.name, c.args].filter(Boolean).join(" ")}`.padEnd(26) + c.description),
        "",
        "TRY ASKING",
        "  What did you ship at 9AI?",
        "  How do you build RAG pipelines?",
        "  Why should I hire you?",
        "",
        "Tab completes · ↑↓ history · ? for shortcuts",
        "This console runs deterministic keyword retrieval over my own writing —",
        "no model is called and nothing leaves your browser.",
      ],
    }),
  },
  ...Object.entries(SECTION_COMMANDS).map(([name, { section, label }]) => ({
    name,
    description: `Jump to ${label}`,
    run: () => ({
      output: [`→ ${label}`],
      effect: () => scrollToSection(section),
    }),
  })),
  {
    name: "open",
    args: "<github|linkedin|x|site>",
    description: "Open a profile in a new tab",
    run: (args) => {
      const key = (args[0] ?? "").toLowerCase()
      if (!key) return { output: ["usage: /open <github|linkedin|x|site>"] }

      const target = socialUrl(key)
      if (!target) {
        return { output: [`unknown target "${key}" — try github, linkedin, x or site`] }
      }

      return {
        output: [`→ opening ${target.url}`],
        effect: () => window.open(target.url, "_blank", "noopener,noreferrer"),
      }
    },
  },
  {
    name: "resume",
    description: "Download the résumé PDF",
    run: () => ({
      output: ["→ downloading résumé"],
      effect: () => {
        const link = document.createElement("a")
        link.href = profile.resumeUrl
        link.download = ""
        document.body.appendChild(link)
        link.click()
        link.remove()
      },
    }),
  },
  {
    name: "theme",
    args: "[dark|light]",
    description: "Switch colour theme",
    run: (args, ctx) => {
      const requested = (args[0] ?? "").toLowerCase()
      if (requested && requested !== "dark" && requested !== "light") {
        return { output: [`unknown theme "${requested}" — try dark or light`] }
      }

      const next = (requested || (ctx.resolvedTheme === "dark" ? "light" : "dark")) as "dark" | "light"
      return {
        output: [`→ ${next}`],
        effect: () => ctx.setTheme(next),
      }
    },
  },
  {
    name: "whoami",
    description: "The short version",
    run: () => ({ ask: "Who are you?" }),
  },
  {
    name: "clear",
    description: "Clear the console",
    run: (_args, ctx) => ({ effect: ctx.clear }),
  },
]

export function isCommand(input: string): boolean {
  return input.trimStart().startsWith("/")
}

export function runCommand(input: string, ctx: CommandContext): CommandResult {
  const [name, ...args] = input.trim().slice(1).split(/\s+/)
  const spec = COMMANDS.find((c) => c.name === name.toLowerCase())

  if (!spec) {
    return { output: [`"/${name}" is not a command — try /help`] }
  }

  return spec.run(args, ctx)
}

/** Completions for slash input, so Tab works on commands as well as questions. */
export function suggestCommand(input: string): string | null {
  const typed = input.trimStart()
  if (!typed.startsWith("/")) return null

  const partial = typed.slice(1).toLowerCase()
  if (partial.includes(" ")) return null

  const match = COMMANDS.filter((c) => c.name.startsWith(partial)).sort(
    (a, b) => a.name.length - b.name.length,
  )[0]

  return match && match.name !== partial ? `/${match.name}` : null
}

/** Example questions cycled by the idle typewriter placeholder. */
export const PLACEHOLDER_QUERIES = [
  "what did you ship at 9AI?",
  "how do you build RAG pipelines?",
  "why should I hire you?",
  "/help",
]

import { Download } from "lucide-react"
import { ThemeToggle } from "@/components/ThemeToggle"
import { profile } from "@/content"

export function SiteHeader() {
  return (
    <div className="fixed inset-x-0 top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3 sm:px-8 lg:px-16">
        <a href="#intro" className="font-mono text-xs tracking-tight text-foreground">
          {profile.firstName.toLowerCase()}
          <span className="text-muted-foreground">.{profile.lastName.toLowerCase()}</span>
        </a>

        <div className="flex items-center gap-2.5">
          <a
            href={profile.resumeUrl}
            download
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground transition-colors duration-300 hover:border-signal-line hover:text-foreground"
          >
            <Download className="h-3 w-3" aria-hidden="true" />
            Résumé
          </a>
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}

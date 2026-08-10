import { Download } from "lucide-react"
import { AgentConsole } from "@/components/console/AgentConsole"
import { Magnetic } from "@/components/interactive/Magnetic"
import { ScrollCue } from "@/components/nav/ScrollCue"
import { profile } from "@/content"

export function Hero() {
  return (
    <header id="intro" className="flex min-h-screen flex-col justify-center pb-20 pt-28 sm:pt-32">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="space-y-7 lg:col-span-5">
          <div className="space-y-4">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
              {profile.title} / {profile.location.split(",")[0]}
            </p>
            <h1 className="text-5xl font-light leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              {profile.firstName}
              <br />
              <span className="text-muted-foreground">{profile.lastName}</span>
            </h1>
          </div>

          <p className="max-w-md text-lg leading-relaxed text-muted-foreground sm:text-xl">
            I build production <span className="text-foreground">agentic AI systems</span> —{" "}
            <span className="text-foreground">LangGraph</span> orchestration,{" "}
            <span className="text-foreground">MCP</span> tool calling and{" "}
            <span className="text-foreground">RAG</span> pipelines that survive real traffic.
          </p>

          <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
            <span className="relative inline-flex h-2 w-2 shrink-0">
              <span className="animate-ping-soft absolute inset-0 rounded-full" />
              <span className="relative h-2 w-2 rounded-full bg-signal" />
            </span>
            {profile.availability}
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Magnetic>
              <a
                href={profile.resumeUrl}
                download
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-foreground transition-colors duration-300 hover:border-signal-line"
              >
                <Download className="h-3.5 w-3.5" aria-hidden="true" />
                Résumé
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm text-background transition-opacity duration-300 hover:opacity-85"
              >
                Get in touch
              </a>
            </Magnetic>
          </div>
        </div>

        <div className="lg:col-span-7">
          <AgentConsole />
        </div>
      </div>

      <ScrollCue />
    </header>
  )
}

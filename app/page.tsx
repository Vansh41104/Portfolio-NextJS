import { SiteHeader } from "@/components/nav/SiteHeader"
import { SectionRail, type NavSection } from "@/components/nav/SectionRail"
import { KeyboardNav } from "@/components/interactive/KeyboardNav"
import { TechFilterProvider } from "@/components/interactive/TechFilter"
import { Hero } from "@/components/sections/Hero"
import { Work } from "@/components/sections/Work"
import { Projects } from "@/components/sections/Projects"
import { Skills } from "@/components/sections/Skills"
import { EducationSection } from "@/components/sections/EducationSection"
import { Awards } from "@/components/sections/Awards"
import { Connect } from "@/components/sections/Connect"
import { profile } from "@/content"

const SECTIONS: NavSection[] = [
  { id: "intro", label: "Intro" },
  { id: "work", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "awards", label: "Awards" },
  { id: "connect", label: "Contact" },
]

/**
 * Server component by design: every section below renders to static HTML so the
 * whole résumé is crawlable. Only the console, rail and theme toggle hydrate.
 */
export default function Home() {
  return (
    <TechFilterProvider>
      <div className="relative min-h-screen bg-background text-foreground">
        <SiteHeader />
        <SectionRail sections={SECTIONS} />
        <KeyboardNav sections={SECTIONS} />

        <main className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-16">
          <Hero />
          <Work />
          <Projects />
          <Skills />
          <EducationSection />
          <Awards />
          <Connect />
        </main>

        <footer className="border-t border-border">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-16">
            <p className="font-mono text-xs text-muted-foreground">
              © {new Date().getFullYear()} {profile.firstName} {profile.lastName}
            </p>
            <p className="font-mono text-xs text-muted-foreground">
              {profile.specialty} · press <kbd className="font-mono">?</kbd> for shortcuts
            </p>
          </div>
        </footer>
      </div>
    </TechFilterProvider>
  )
}

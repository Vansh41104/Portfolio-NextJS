import { ArrowUpRight, Download } from "lucide-react"
import { Reveal } from "@/components/motion/Reveal"
import { Section } from "./Section"
import { profile } from "@/content"

export function Connect() {
  return (
    <Section id="connect" label="Contact" title="Let's talk">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="space-y-8 lg:col-span-6">
          <Reveal>
            <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
              I&apos;m open to roles building production agentic AI — and to conversations about LLM systems
              generally, whether or not there&apos;s a job attached.
            </p>
          </Reveal>

          <Reveal index={1}>
            <div className="space-y-3">
              <a
                href={`mailto:${profile.email}`}
                className="group flex items-center gap-2 text-lg text-foreground transition-colors"
              >
                {profile.email}
                <ArrowUpRight
                  className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
              <a
                href={`tel:${profile.phoneHref}`}
                className="block text-muted-foreground transition-colors hover:text-foreground"
              >
                {profile.phone}
              </a>
              <p className="text-sm text-muted-foreground">
                {profile.location} · {profile.availability}
              </p>
            </div>
          </Reveal>

          <Reveal index={2}>
            <a
              href={profile.resumeUrl}
              download
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm transition-colors duration-300 hover:border-signal-line"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              Download résumé
            </a>
          </Reveal>
        </div>

        <div className="lg:col-span-6">
          <Reveal index={1}>
            <p className="mb-5 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
              Elsewhere
            </p>
            <ul className="divide-y divide-border border-y border-border">
              {profile.socials.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between gap-4 py-4 transition-colors"
                  >
                    <span className="text-foreground">{social.name}</span>
                    <span className="flex items-center gap-2 font-mono text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                      {social.handle}
                      <ArrowUpRight
                        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}

"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export default function Home() {
  const [isDark, setIsDark] = useState(true)
  const [activeSection, setActiveSection] = useState("")
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: "0px 0px -20% 0px" },
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Side Navigation */}
      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <div className="flex flex-col gap-4">
          {["intro", "work", "projects", "skills", "achievements", "connect"].map((section) => (
            <button
              key={section}
              onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })}
              className={`w-2 h-8 rounded-full transition-all duration-500 ${
                activeSection === section ? "bg-foreground" : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              aria-label={`Navigate to ${section}`}
            />
          ))}
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-16">
        {/* Hero Section */}
        <header
          id="intro"
          ref={(el) => {
            sectionsRef.current[0] = el
          }}
          className="min-h-screen flex items-center opacity-0"
        >
          <div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full">
            <div className="lg:col-span-3 space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-2">
                <div className="text-sm text-muted-foreground font-mono tracking-wider">AI ENGINEER / 2026</div>
                <h1 className="text-6xl sm:text-7xl lg:text-8xl font-light tracking-tight">
                  Vansh
                  <br />
                  <span className="text-muted-foreground">Bhatnagar</span>
                </h1>
              </div>

              <div className="space-y-6 max-w-md">
                <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed">
                  AI Backend Engineer building <span className="text-foreground">intelligent systems</span> at the
                  intersection of
                  <span className="text-foreground"> machine learning</span>,
                  <span className="text-foreground"> cloud infrastructure</span>, and
                  <span className="text-foreground"> scalable backends</span>.
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-base text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="text-lg w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    Open for opportunities all over India
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-8 lg:mt-0">
              <div className="space-y-4">
                <div className="text-base text-muted-foreground font-mono">CURRENTLY</div>
                <div className="space-y-2">
                  <div className="text-lg text-foreground">SDE Intern (AI)</div>
                  <div className="text-base text-muted-foreground">@ 9AI</div>
                  <div className="text-sm text-muted-foreground">2025 — Present</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-base text-muted-foreground font-mono">FOCUS</div>
                <div className="flex flex-wrap gap-2">
                  {["PyTorch", "LLMs", "MLOps", "FastAPI", "Cloud"].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-sm border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Work Experience Section */}
        <section
          id="work"
          ref={(el) => {
            sectionsRef.current[1] = el
          }}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-4xl sm:text-5xl font-light">Work Experience</h2>
              <div className="text-sm text-muted-foreground font-mono">2024 — 2026</div>
            </div>

            <div className="space-y-8 sm:space-y-12">
              {[
                {
                  year: "2025",
                  role: "SDE Intern (AI)",
                  company: "9AI",
                  description:
                    "Building AI systems and implementing ML infrastructure. Developing agent-based solutions and optimizing model deployment pipelines.",
                  tech: ["Python", "PyTorch", "FastAPI", "AWS"],
                },
                {
                  year: "2025",
                  role: "AI/ML Intern",
                  company: "NJR I3 Labs",
                  description:
                    "Developed interactive 3D learning interface using Three.js that increased user engagement by 35%. Improved knowledge retention rates by 20% through immersive visualization of complex educational concepts. Implemented AI-driven content personalization algorithms with Gemini AI, achieving 85% recommendation accuracy. Reduced average learning completion time by 30% through intelligent learning path optimization.",
                  tech: ["Three.js", "Gemini AI", "Python", "Machine Learning"],
                },
              ].map((job, index) => (
                <div
                  key={index}
                  className="group grid lg:grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 border-b border-border/50 hover:border-border transition-colors duration-500"
                >
                  <div className="lg:col-span-2">
                    <div className="text-2xl sm:text-3xl font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                      {job.year}
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-3">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-medium">{job.role}</h3>
                      <div className="text-muted-foreground">{job.company}</div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed max-w-lg">{job.description}</p>
                  </div>

                  <div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end mt-2 lg:mt-0">
                    {job.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs text-muted-foreground rounded group-hover:border-muted-foreground/50 transition-colors duration-500"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          ref={(el) => {
            sectionsRef.current[2] = el
          }}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <h2 className="text-4xl sm:text-5xl font-light">Selected Projects</h2>

            <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
              {[
                {
                  title: "Lang Graph Cybersecurity Agent",
                  description:
                    "AI-powered multi-agent system for cybersecurity threat detection and response. Implemented graph-based reasoning with LLMs.",
                  tech: ["LangGraph", "Python", "ML"],
                  highlight: "Advanced agent orchestration",
                },
                {
                  title: "SaleSpeak - A Conversational Agent",
                  description:
                    "A sophisticated conversational agent that helps users make better decisions while buying products online through natural voice interactions and intelligent product recommendations.",
                  tech: ["LangChain", "Retrieval Augmented Generation", "Conversational AI"],
                  highlight: "RAG-powered conversations",
                },
                {
                  title: "AI-Tutor",
                  description:
                    "An educational platform that leverages web scraping and AI to provide curated learning resources. Uses LangChain to scrape educational content from various sources, processes it with Gemini AI, and delivers personalized learning paths.",
                  tech: ["Gemini", "Educational AI", "Python", "LangChain"],
                  highlight: "Web scraping & AI",
                },
                {
                  title: "AI Based Grass and Milk Production Predictor",
                  description:
                    "Improved a ML-based computer vision system to scan farm photos to evaluate the quality of the grass and forecast yield. The solution uses image processing algorithms to scan important features such as colour, texture, and density of grass to predict milk production levels.",
                  tech: ["Computer Vision", "Machine Learning", "Image Processing"],
                  highlight: "Agriculture AI",
                },
              ].map((project, index) => (
                <article
                  key={index}
                  className="group p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg cursor-pointer"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-xl sm:text-2xl font-medium flex-1 group-hover:text-muted-foreground transition-colors duration-300">
                        {project.title}
                      </h3>
                      <span className="text-xs text-muted-foreground font-mono whitespace-nowrap">
                        {project.highlight}
                      </span>
                    </div>

                    <p className="text-muted-foreground leading-relaxed">{project.description}</p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tech.map((tech) => (
                        <span key={tech} className="px-2 py-1 text-xs bg-muted/50 rounded-full text-muted-foreground">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300 pt-2">
                      <span>View details</span>
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section
          id="skills"
          ref={(el) => {
            sectionsRef.current[3] = el
          }}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <h2 className="text-4xl sm:text-5xl font-light">Technical Skills</h2>

            <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
              {[
                {
                  category: "Python / ML Frameworks",
                  skills: ["PyTorch", "TensorFlow", "LangChain", "LangGraph", "NLP", "Computer Vision", "TTS/STT"],
                },
                {
                  category: "MLOps & Infrastructure",
                  skills: ["AWS", "GCP", "Azure", "Docker", "Kubernetes", "Terraform", "Jenkins"],
                },
                {
                  category: "Backend Integrations",
                  skills: ["FastAPI", "Flask", "Django", "GraphQL", "WebRTC"],
                },
                {
                  category: "Database Management",
                  skills: ["PostgreSQL", "MongoDB", "ER/Studio"],
                },
              ].map((skillGroup, index) => (
                <div key={index} className="space-y-6">
                  <h3 className="text-2xl font-medium">{skillGroup.category}</h3>
                  <div className="flex flex-wrap gap-3">
                    {skillGroup.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-4 py-2 text-sm border border-border rounded-full hover:border-foreground hover:text-foreground transition-all duration-300 cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section
          id="achievements"
          ref={(el) => {
            sectionsRef.current[4] = el
          }}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <h2 className="text-4xl sm:text-5xl font-light">Achievements & Recognition</h2>
            <div className="grid gap-6 sm:gap-8">
              {[
                {
                  title: "WHO Recognition",
                  description:
                    "Received a Letter of Recognition from the WHO for developing an interactive monitoring platform for unvaccinated children, including a geo-tagged, real-time dashboard.",
                  year: "2024",
                  badge: "International",
                },
                {
                  title: "OxGenignite Hackathon - 1st Place",
                  description:
                    "Led a team in creating a Fiat-to-Fiat Crypto Swap Platform using the Stellar chain, leveraging Soroban Smart Contracts and Stellar DEX for cross-border payments. Reduced transaction cost by 5%-15% through full fee transparency.",
                  year: "2024",
                  badge: "Hackathon",
                },
                {
                  title: "CodeRed 4.0 Hackathon - 2nd Place",
                  description:
                    "Led a team in creating an AI-driven medical diagnostic system for rural societies, leveraging Deep Learning CNN to analyse over 10,000 X-ray and CT scans to identify medical conditions.",
                  year: "2024",
                  badge: "Hackathon",
                },
              ].map((achievement, index) => (
                <div
                  key={index}
                  className="group p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl sm:text-2xl font-medium">{achievement.title}</h3>
                        <span className="text-xs px-2 py-1 bg-muted/50 rounded-full text-muted-foreground whitespace-nowrap">
                          {achievement.badge}
                        </span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{achievement.description}</p>
                    </div>
                    <div className="text-sm text-muted-foreground font-mono whitespace-nowrap">{achievement.year}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="connect" ref={(el) => {
          sectionsRef.current[5] = el
        }} className="py-20 sm:py-32 opacity-0">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-4xl sm:text-5xl font-light">Let's Connect</h2>

              <div className="space-y-6">
                <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed">
                  Always interested in new opportunities, collaborations, and conversations about AI, machine learning,
                  and building intelligent systems.
                </p>

                <div className="space-y-4">
                  <Link
                    href="mailto:vanshbhatnagar445@gmail.com"
                    className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300"
                  >
                    <span className="text-lg sm:text-xl">vanshbhatnagar445@gmail.com</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>

                  <Link
                    href="tel:+919785366298"
                    className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300"
                  >
                    <span className="text-lg sm:text-xl">+91 9785366298</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="text-sm text-muted-foreground font-mono">CONNECT ELSEWHERE</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "GitHub", handle: "Vansh41104", url: "https://github.com/Vansh41104" },
                  {
                    name: "LinkedIn",
                    handle: "vansh-bhatnagar-66465225b",
                    url: "https://www.linkedin.com/in/vansh-bhatnagar-66465225b/",
                  },
                  { name: "Twitter", handle: "@vanshbh041", url: "https://x.com/vanshbh041" },
                  { name: "Portfolio", handle: "vanshbhatnagar.space", url: "https://vanshbhatnagar.space" },
                ].map((social) => (
                  <Link
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
                  >
                    <div className="space-y-2">
                      <div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                        {social.name}
                      </div>
                      <div className="text-sm text-muted-foreground">{social.handle}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="py-12 sm:py-16 border-t border-border">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">© 2025 Vansh Bhatnagar. All rights reserved.</div>
              <div className="text-xs text-muted-foreground">AI Backend Engineer • ML Systems Developer</div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </footer>
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  )
}

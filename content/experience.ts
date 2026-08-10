import type { Role } from "./types"

export const experience: Role[] = [
  {
    id: "ninjahire",
    company: "NinjaHire",
    title: "Junior Software Developer",
    start: "Jun 2026",
    end: "Present",
    current: true,
    bullets: [
      "Ship platform features end-to-end — the backend service and the workflow built on top of it — and own them past the merge: design, review, deploy, then watch them run.",
      "Work client-reported production defects, chasing the ones that keep recurring instead of patching each symptom as it lands.",
      "Turn vague pain points from product and support into scoped work that actually ships.",
    ],
    tech: ["Python", "FastAPI", "PostgreSQL", "Docker", "AWS"],
  },
  {
    id: "9ai",
    company: "9AI",
    title: "SDE Intern — AI",
    start: "Sep 2025",
    end: "Jun 2026",
    current: false,
    metrics: [
      { value: "40%", label: "lower response latency" },
      { value: "3+", label: "downstream systems served" },
      { value: "30%", label: "less manual review" },
    ],
    bullets: [
      "Architected and shipped an end-to-end agentic AI system using LangGraph orchestration, Model Context Protocol tool calling and RAG pipelines backed by Pinecone and Chroma — automating sales lead qualification and cutting response latency by 40%.",
      "Built and deployed AI/LLM backend services as REST APIs in Python (FastAPI), containerized with Docker and released through CI/CD, serving 3+ downstream business systems and enabling real-time lead scoring.",
      "Applied chain-of-thought, few-shot and role-based prompt engineering across multi-agent workflows, reducing manual review overhead by ~30% while improving output consistency at scale.",
      "Integrated commercial LLM provider APIs into existing business systems, applying retry, rate-limiting and observability patterns to keep AI workflows reliable in production.",
    ],
    tech: ["LangGraph", "MCP", "Pinecone", "Chroma", "FastAPI", "Docker", "CI/CD"],
  },
  {
    id: "njr-i3-labs",
    company: "NJR I3 Labs",
    title: "AI/ML Intern",
    start: "2025",
    end: "2025",
    current: false,
    metrics: [
      { value: "35%", label: "more engagement" },
      { value: "20%", label: "better retention" },
      { value: "85%", label: "recommendation accuracy" },
    ],
    bullets: [
      "Developed an interactive 3D learning interface with Three.js that increased user engagement by 35% and improved knowledge retention by 20% through immersive visualization of complex concepts.",
      "Implemented AI-driven content personalization with Gemini, reaching 85% recommendation accuracy.",
      "Cut average learning completion time by 30% through intelligent learning-path optimization.",
    ],
    tech: ["Three.js", "Gemini", "Python", "Machine Learning"],
  },
]

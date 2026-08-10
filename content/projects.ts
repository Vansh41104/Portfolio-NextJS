import type { Project } from "./types"

/**
 * `repo`, `demo` and `image` are intentionally absent until real URLs/assets
 * exist — the cards render link-free rather than showing dead affordances.
 */
export const projects: Project[] = [
  {
    id: "cybersec-platform",
    title: "LangGraph Multi-Agent Cybersecurity Platform",
    highlight: "Multi-agent orchestration",
    year: "2026",
    metric: "1,500+ findings",
    description:
      "A multi-agent system that runs offensive-security tooling in parallel, grounding each agent in retrieved context so scans stay targeted instead of exhaustive.",
    bullets: [
      "Engineered a multi-agent system with LangGraph and Meta Llama, implementing model routing and selection, async worker orchestration and concurrency controls for parallel vulnerability detection across distributed systems.",
      "Integrated modular security tools — Nmap, Gobuster, FFUF, SQLMap — as agent-callable tools with RAG-backed context grounding via Chroma and the Cognee Knowledge Graph, load-balancing across agents to scale scanning and surface 1,500+ findings.",
    ],
    tech: ["LangGraph", "Meta Llama", "Chroma", "Cognee KG", "Python"],
  },
  {
    id: "salespeak",
    title: "SaleSpeak",
    highlight: "RAG-powered conversation",
    year: "2025",
    description:
      "A conversational agent that helps people make better purchasing decisions through natural voice interaction and retrieval-grounded product recommendations.",
    bullets: [
      "Built a retrieval-augmented conversation loop so recommendations cite real product data instead of model recall.",
      "Wrapped speech-to-text and text-to-speech around that loop, so the whole exchange stays spoken end to end.",
    ],
    tech: ["LangChain", "RAG", "Conversational AI", "TTS/STT"],
  },
  {
    id: "ai-tutor",
    title: "AI-Tutor",
    highlight: "Retrieval + curriculum",
    year: "2025",
    description:
      "An educational platform that scrapes learning material from across the web, processes it with Gemini, and assembles personalized learning paths.",
    bullets: [
      "Used LangChain to scrape and normalize educational material from scattered sources into one searchable corpus.",
      "Assembled a path per learner out of that corpus instead of serving everyone the same fixed syllabus.",
    ],
    tech: ["LangChain", "Gemini", "Python", "Web Scraping"],
  },
  {
    id: "grass-milk-predictor",
    title: "Grass & Milk Production Predictor",
    highlight: "Applied computer vision",
    year: "2024",
    description:
      "A computer-vision system that reads farm photographs to grade pasture quality and forecast downstream milk yield.",
    bullets: [
      "Extracted colour, texture and density features from field photographs to grade pasture quality.",
      "Turned those grades into a predicted milk yield, so photographing a field returns a number rather than a rating.",
    ],
    tech: ["Computer Vision", "Image Processing", "Machine Learning"],
  },
]

import type { Answer } from "./types"

/**
 * Knowledge base for the Agent Console.
 *
 * This is a deterministic retrieval demo — `lib/retrieval.ts` scores an
 * incoming query against `keywords` and streams the winning entry. No model is
 * called, which is disclosed in the console header. Keep answers in Vansh's
 * voice, first person, and grounded in numbers that appear on the résumé.
 */
export const answers: Answer[] = [
  {
    id: "whoami",
    question: "Who are you?",
    keywords: ["who", "yourself", "intro", "whoami", "bio", "summary", "background"],
    answer:
      "I'm Vansh — an AI software engineer in Bengaluru. I build production agentic systems: LangGraph orchestration, MCP tool calling, RAG pipelines over Pinecone and Chroma, shipped as FastAPI services on AWS behind Docker and CI/CD.\n\nThe part I actually care about is the unglamorous half — retries, rate limits, observability. A demo that works once is easy. A system that keeps working under load, with a provider rate-limiting you mid-request, is the job.",
    sources: [
      { label: "Experience", section: "work" },
      { label: "Skills", section: "skills" },
    ],
    trace: { chunks: 4, model: "llama-3.3-70b" },
    followUp: ["What did you ship at 9AI?", "What's your stack?"],
  },
  {
    id: "9ai",
    question: "What did you ship at 9AI?",
    keywords: ["9ai", "nine", "intern", "internship", "sde", "latency", "qualification", "pinecone", "mcp"],
    answer:
      "I architected an end-to-end agentic system for sales lead qualification — LangGraph for orchestration, Model Context Protocol for tool calling, and RAG pipelines backed by Pinecone and Chroma. It cut response latency by **40%**.\n\nI shipped it as REST APIs in FastAPI, containerized with Docker and released through CI/CD. It ended up serving **3+ downstream business systems** and driving real-time lead scoring.\n\nOn the prompting side, chain-of-thought, few-shot and role-based techniques across the multi-agent workflow reduced manual review overhead by roughly **30%** while making output noticeably more consistent.",
    sources: [{ label: "9AI · SDE Intern", section: "work", entry: "9ai" }],
    trace: { chunks: 6, model: "llama-3.3-70b" },
    followUp: ["How do you build RAG pipelines?", "Tell me about the cybersecurity platform"],
  },
  {
    id: "ninjahire",
    question: "What are you working on now?",
    keywords: ["now", "current", "currently", "ninjahire", "ninja", "hire", "today", "present", "latest", "job"],
    answer:
      "I'm a Junior Software Developer at **NinjaHire**, since June 2026.\n\nI ship platform features end-to-end — backend services through to user-facing workflows — and I own them past the merge: technical design, code review, deployment, then post-release monitoring. A good chunk of the work is diagnosing client-reported production defects and killing the recurring ones properly rather than patching symptoms.\n\nThe rest is translation: turning what stakeholders describe as a pain point into something prioritized and actually shipped.",
    sources: [{ label: "NinjaHire · Current", section: "work", entry: "ninjahire" }],
    trace: { chunks: 3, model: "llama-3.3-70b" },
    followUp: ["Are you open to new roles?", "What did you ship at 9AI?"],
  },
  {
    id: "cybersec",
    question: "Tell me about the cybersecurity platform",
    keywords: [
      "cybersecurity",
      "cyber",
      "security",
      "cybersec",
      "langgraph",
      "platform",
      "nmap",
      "sqlmap",
      "pentest",
      "vulnerability",
      "scanning",
      "findings",
    ],
    answer:
      "A multi-agent system for parallel vulnerability detection, built on LangGraph with Meta Llama. I implemented model routing and selection, async worker orchestration and concurrency controls so scans run across distributed systems in parallel instead of serially.\n\nThe interesting part is tool integration: Nmap, Gobuster, FFUF and SQLMap are exposed as agent-callable tools, with RAG-backed context grounding through Chroma and the Cognee Knowledge Graph. Grounding matters here — it's what keeps agents targeting plausible attack surface instead of brute-forcing everything.\n\nLoad-balanced across agents, it surfaced **1,500+ findings**.",
    sources: [{ label: "Cybersecurity Platform", section: "projects", entry: "cybersec-platform" }],
    trace: { chunks: 5, model: "llama-3.3-70b" },
    followUp: ["What else have you built?", "How do you build RAG pipelines?"],
  },
  {
    id: "stack",
    question: "What's your stack?",
    keywords: ["stack", "tech", "technologies", "tools", "skills", "languages", "framework", "frameworks"],
    answer:
      "Python first — FastAPI, Flask, Django, REST and GraphQL. Some JavaScript/Node, and Java when it's called for.\n\nFor agentic work: **LangGraph**, LangChain, MCP, multi-agent orchestration, tool calling, model routing, and prompt and context engineering. For retrieval: RAG over **Pinecone**, **Chroma** and FAISS, plus the Cognee Knowledge Graph, embeddings and re-rankers. Providers: OpenAI, Google Gemini, Meta Llama, Hugging Face.\n\nInfrastructure: AWS, Docker, Kubernetes, Terraform, GitHub Actions, async workers and Redis queues — with rate limiting, retries, load balancing and observability treated as part of the feature, not an afterthought.\n\nAnd the ML foundation underneath: PyTorch, TensorFlow, NLP, computer vision, PostgreSQL, MongoDB, Redis.",
    sources: [{ label: "Full skill breakdown", section: "skills" }],
    trace: { chunks: 5, model: "llama-3.3-70b" },
    followUp: ["How do you build RAG pipelines?", "Who are you?"],
  },
  {
    id: "rag",
    question: "How do you build RAG pipelines?",
    keywords: [
      "rag",
      "retrieval",
      "vector",
      "embedding",
      "embeddings",
      "pinecone",
      "chroma",
      "faiss",
      "chunk",
      "chunking",
      "rerank",
      "reranker",
      "grounding",
    ],
    answer:
      "Retrieval quality is mostly decided before the model is ever involved — in chunking and in what you attach as metadata. Get that wrong and no amount of prompt tuning saves you.\n\nIn practice: **Pinecone** or **Chroma** for the vector store, FAISS when it should stay local, embeddings chosen for the domain rather than by default, then a **re-ranker** over the top-k because raw vector similarity alone returns confidently irrelevant chunks more often than people admit.\n\nFor the cybersecurity platform I went further and grounded agents in the **Cognee Knowledge Graph** alongside Chroma — relationships between findings mattered as much as their text.\n\nThen evaluation. LLM output evaluation is the difference between believing a pipeline works and knowing it does.",
    sources: [
      { label: "RAG & Vector DBs", section: "skills", entry: "rag" },
      { label: "9AI · RAG in production", section: "work", entry: "9ai" },
    ],
    trace: { chunks: 7, model: "llama-3.3-70b" },
    followUp: ["Tell me about the cybersecurity platform", "What did you ship at 9AI?"],
  },
  {
    id: "agents",
    question: "How do you think about agents?",
    keywords: ["agent", "agents", "agentic", "mcp", "orchestration", "multi-agent", "graph", "tool", "autonomy"],
    answer:
      "An agent is a control-flow problem wearing a trench coat. The model is one node in a graph — most of the engineering is in everything around it.\n\nThat's why I reach for **LangGraph**: explicit state, explicit edges, and a topology you can reason about and debug. Free-form agent loops are impressive in a demo and miserable in production.\n\n**MCP** for tool calling, because a documented tool boundary beats bespoke glue per integration. Model routing so cheap models handle the easy hops and you only pay for the hard ones. Concurrency controls and async workers so parallel work is actually parallel.\n\nAnd the reliability layer — retries, rate limiting, observability. When an agent fails at 3am you need to know *which node* failed, not that \"the agent broke\".",
    sources: [
      { label: "Agentic AI & LLM", section: "skills", entry: "agentic" },
      { label: "Cybersecurity Platform", section: "projects", entry: "cybersec-platform" },
    ],
    trace: { chunks: 6, model: "llama-3.3-70b" },
    followUp: ["Tell me about the cybersecurity platform", "What did you ship at 9AI?"],
  },
  {
    id: "projects",
    question: "What have you built?",
    keywords: ["project", "projects", "built", "build", "made", "portfolio", "work", "shipped", "side"],
    answer:
      "Four worth showing:\n\n**LangGraph Multi-Agent Cybersecurity Platform** — parallel vulnerability detection with agent-callable security tooling, RAG-grounded. Surfaced **1,500+ findings**.\n\n**SaleSpeak** — a voice conversational agent that grounds product recommendations in retrieval instead of model recall.\n\n**AI-Tutor** — scrapes learning material across the web with LangChain, processes it with Gemini, and assembles per-learner paths.\n\n**Grass & Milk Production Predictor** — computer vision reading farm photographs to grade pasture quality and forecast milk yield. Colour, texture, density in; a forward-looking signal out.",
    sources: [{ label: "All projects", section: "projects" }],
    trace: { chunks: 8, model: "llama-3.3-70b" },
    followUp: ["Tell me about the cybersecurity platform", "What's your stack?"],
  },
  {
    id: "awards",
    question: "What recognition have you had?",
    keywords: ["award", "awards", "recognition", "hackathon", "who", "win", "won", "prize", "achievement", "honor"],
    answer:
      "A **WHO Letter of Recognition** for a real-time, geo-tagged monitoring platform for tracking unvaccinated children.\n\n**1st place at OxGenIgnite** (NIT Goa) — I led the team that built a fiat-to-fiat crypto swap on Stellar with Soroban smart contracts, cutting cross-border transaction cost 5–15% through full fee transparency.\n\n**2nd place at CodeRed 4.0** — led a team building an AI diagnostic system for rural healthcare, training a CNN on a 10,000+ image X-ray and CT dataset.",
    sources: [{ label: "Awards & Recognition", section: "awards" }],
    trace: { chunks: 3, model: "llama-3.3-70b" },
    followUp: ["What have you built?", "Where did you study?"],
  },
  {
    id: "education",
    question: "Where did you study?",
    keywords: ["education", "study", "studied", "degree", "college", "university", "school", "btech", "cgpa", "grade"],
    answer:
      "**B.Tech in Computer Science** from Techno India NJR Institute of Technology, Udaipur — September 2022 to May 2026, graduating with a **CGPA of 8.65/10**.\n\nThe coursework that actually shows up in my work: Machine Learning, Distributed Systems and Software Engineering.",
    sources: [{ label: "Education", section: "education" }],
    trace: { chunks: 2, model: "llama-3.3-70b" },
    followUp: ["What recognition have you had?", "Who are you?"],
  },
  {
    id: "hire",
    question: "Why should I hire you?",
    keywords: ["hire", "why", "good", "fit", "value", "bring", "strength", "recruit", "candidate"],
    answer:
      "Because I've already shipped the thing most teams are still prototyping. The agentic system at 9AI wasn't a notebook — it went to production, served **3+ downstream systems**, and cut latency **40%**.\n\nI'm a generalist across backend, AI integration and cloud infrastructure, which means I don't need three people to get an AI feature live. I can design the graph, write the FastAPI service, containerize it, wire the CI/CD, and stay on it after release.\n\nAnd I've done the debugging that only happens after launch — retries, rate limits, observability, the failure modes you can't anticipate from a demo. That's usually the gap between an AI feature that ships and one that quietly gets rolled back.",
    sources: [
      { label: "Experience", section: "work" },
      { label: "Get in touch", section: "connect" },
    ],
    trace: { chunks: 6, model: "llama-3.3-70b" },
    followUp: ["Are you open to new roles?", "What did you ship at 9AI?"],
  },
  {
    id: "availability",
    question: "Are you open to new roles?",
    keywords: [
      "available",
      "availability",
      "open",
      "hiring",
      "role",
      "roles",
      "opportunity",
      "remote",
      "relocate",
      "relocation",
      "where",
      "location",
      "based",
      "bengaluru",
    ],
    answer:
      "Yes. I'm based in **Bengaluru** and open to both **relocation and remote**.\n\nThe work I'm most interested in is production agentic AI — systems that have to survive real traffic, real providers and real failure, not proofs of concept.\n\nEasiest way to reach me is email: **vanshbhatnagar445@gmail.com**.",
    sources: [{ label: "Get in touch", section: "connect" }],
    trace: { chunks: 2, model: "llama-3.3-70b" },
    followUp: ["Why should I hire you?", "Can I see your résumé?"],
  },
  {
    id: "contact",
    question: "How do I reach you?",
    keywords: ["contact", "reach", "email", "phone", "call", "message", "linkedin", "github", "connect", "talk", "dm"],
    answer:
      "Email is best — **vanshbhatnagar445@gmail.com**. Phone: +91 97853 66298.\n\nOtherwise: **github.com/Vansh41104** for code, **linkedin.com/in/vanshbhatnagarr** for the formal route, and **@vanshbh041** on X.",
    sources: [{ label: "All contact details", section: "connect" }],
    trace: { chunks: 2, model: "llama-3.3-70b" },
    followUp: ["Can I see your résumé?", "Are you open to new roles?"],
  },
  {
    id: "resume",
    question: "Can I see your résumé?",
    keywords: ["resume", "cv", "download", "pdf", "curriculum", "vitae"],
    answer:
      "Yes — there's a download link in the header and again at the bottom of the page. It's the same content you're querying right now, just in a form you can forward to someone else.",
    sources: [{ label: "Get in touch", section: "connect" }],
    trace: { chunks: 1, model: "llama-3.3-70b" },
    followUp: ["Why should I hire you?", "How do I reach you?"],
  },
]

/** Ids surfaced as starter chips under the console input. */
export const suggestedIds = ["9ai", "cybersec", "stack", "hire", "availability"] as const

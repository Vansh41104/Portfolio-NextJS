/**
 * Shared content types.
 *
 * Everything the site renders comes from `content/*` — no copy is hardcoded in
 * components. The résumé (public/Vansh_Bhatnagar_Resume.pdf) is the source of
 * truth for dates, metrics and titles; keep them in sync here.
 */

export type Social = {
  name: string
  handle: string
  url: string
}

export type Profile = {
  firstName: string
  lastName: string
  title: string
  specialty: string
  location: string
  availability: string
  email: string
  phone: string
  phoneHref: string
  summary: string
  resumeUrl: string
  socials: Social[]
}

/** A headline number worth skimming. `value` leads with the numeral so it can animate. */
export type Metric = {
  value: string
  label: string
}

export type Role = {
  id: string
  company: string
  title: string
  /** Surfaced as a stat row — these are buried mid-bullet otherwise. */
  metrics?: Metric[]
  /** Rendered as "start — end" in the timeline. Keep in sync with the résumé. */
  start: string
  end: string
  current: boolean
  bullets: string[]
  tech: string[]
}

export type Project = {
  id: string
  title: string
  /** Short mono label in the card corner. */
  highlight: string
  year: string
  description: string
  bullets: string[]
  tech: string[]
  /** Headline number, e.g. "1,500+ findings". Omitted when there isn't a real one. */
  metric?: string
  /** All optional — cards degrade to link-free rather than showing dead affordances. */
  repo?: string
  demo?: string
  image?: string
}

export type SkillGroup = {
  id: string
  label: string
  skills: string[]
}

export type Award = {
  id: string
  title: string
  badge: string
  year: string
  description: string
}

export type Education = {
  id: string
  degree: string
  institution: string
  location: string
  period: string
  grade: string
  coursework: string[]
}

/** A deep link rendered as a source chip beneath a console answer. */
export type AnswerSource = {
  label: string
  /** Section id to scroll to, e.g. "work". */
  section: string
  /** Optional entry id within that section to briefly highlight. */
  entry?: string
}

/**
 * One entry in the console's knowledge base.
 *
 * The console is a deterministic retrieval demo: `lib/retrieval.ts` scores a
 * visitor's query against `keywords` and streams back the best match. There is
 * no model call — see the disclosure in the console header.
 */
export type Answer = {
  id: string
  /** Canonical phrasing, shown in history and on suggestion chips. */
  question: string
  /** Lowercase tokens that route a query here. */
  keywords: string[]
  /** Streamed body. `**spans**` render with accent emphasis. */
  answer: string
  sources: AnswerSource[]
  /** Retrieval metadata surfaced in the trace, for texture. */
  trace?: {
    chunks?: number
    model?: string
  }
  /** Offered as next queries once the answer settles. */
  followUp?: string[]
}

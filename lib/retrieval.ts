import { answers, suggestedIds } from "@/content/answers"
import { skills } from "@/content/skills"
import type { Answer } from "@/content/types"

/**
 * Deterministic retrieval for the Agent Console.
 *
 * No model is involved: a query is tokenized and scored against the keyword
 * sets in `content/answers.ts`. Tokens that appear across most of the corpus
 * are down-weighted (a crude IDF) so common words like "work" don't decide the
 * match on their own.
 */

/** Pure function words. Question words are deliberately kept — "who", "where"
 *  and "why" are genuinely discriminative against these keyword sets. */
const STOP_WORDS = new Set([
  "a", "an", "the", "of", "to", "for", "in", "on", "at", "by", "with", "and", "or", "but",
  "is", "are", "was", "were", "be", "been", "am", "do", "does", "did", "have", "has", "had",
  "i", "me", "my", "it", "its", "that", "this", "there", "here", "s", "t", "re", "ve", "ll",
  "any", "some", "please", "just", "give", "show", "about", "tell", "know", "like", "want",
])

/** A single solid keyword hit. Below this we fall back rather than guess. */
const SCORE_THRESHOLD = 3

const EXACT_KEYWORD = 3
const PARTIAL_KEYWORD = 2
const QUESTION_TEXT = 1

/** The answer that absorbs the whole skills taxonomy (see `skillTokens`). */
const STACK_ANSWER_ID = "stack"

/**
 * Every technology named in `content/skills.ts`, so a query like "do you use
 * kubernetes" routes to the stack answer without anyone hand-maintaining a
 * parallel keyword list. Dedicated entries still win: they match on their own
 * keywords and accumulate more tokens.
 */
const skillTokens = new Set(
  skills.flatMap((group) =>
    group.skills.flatMap((skill) =>
      skill
        .toLowerCase()
        .split(/[^a-z0-9]+/)
        .filter((t) => t.length > 2),
    ),
  ),
)

export function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/[\s-]+/)
    .filter((t) => t.length > 1 && !STOP_WORDS.has(t))
}

function normalizeQuestion(input: string): string {
  return input.toLowerCase().replace(/[^a-z0-9]/g, "")
}

/**
 * Crude IDF. A token matching exactly one entry is a strong signal and gets
 * boosted; one matching most of the corpus carries none and gets damped.
 */
function tokenWeight(token: string): number {
  const hits = answers.filter(
    (a) => a.keywords.includes(token) || a.question.toLowerCase().includes(token),
  ).length
  if (hits === 0) return 1
  if (hits === 1) return 1.5
  return hits > answers.length / 2 ? 0.3 : 1
}

/** Prefix-tolerant so "postgres" still finds "PostgreSQL". */
function matchesSkill(token: string): boolean {
  if (skillTokens.has(token)) return true
  if (token.length < 4) return false
  for (const skill of skillTokens) {
    if (skill.startsWith(token) || (skill.length >= 4 && token.startsWith(skill))) return true
  }
  return false
}

function scoreAnswer(answer: Answer, tokens: string[]): number {
  let score = 0

  for (const token of tokens) {
    const weight = tokenWeight(token)
    let best = 0

    if (answer.keywords.includes(token)) {
      best = EXACT_KEYWORD
    } else if (answer.id === STACK_ANSWER_ID && matchesSkill(token)) {
      best = EXACT_KEYWORD
    } else if (
      answer.keywords.some(
        (k) => (token.length >= 4 && k.startsWith(token)) || (k.length >= 4 && token.startsWith(k)),
      )
    ) {
      best = PARTIAL_KEYWORD
    } else if (answer.question.toLowerCase().includes(token)) {
      best = QUESTION_TEXT
    }

    score += best * weight
  }

  return score
}

export type RetrievalResult = {
  answer: Answer | null
  score: number
  /** Number of matched knowledge-base entries, surfaced in the trace. */
  candidates: number
}

export function retrieve(query: string): RetrievalResult {
  const trimmed = query.trim()
  if (!trimmed) return { answer: null, score: 0, candidates: 0 }

  // An exact match on a suggestion chip should never be out-scored.
  const normalized = normalizeQuestion(trimmed)
  const exact = answers.find((a) => normalizeQuestion(a.question) === normalized)
  if (exact) return { answer: exact, score: 100, candidates: 1 }

  const tokens = tokenize(trimmed)
  if (tokens.length === 0) return { answer: null, score: 0, candidates: 0 }

  const scored = answers
    .map((answer) => ({ answer, score: scoreAnswer(answer, tokens) }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)

  const top = scored[0]
  if (!top || top.score < SCORE_THRESHOLD) {
    return { answer: null, score: top?.score ?? 0, candidates: scored.length }
  }

  return { answer: top.answer, score: top.score, candidates: scored.length }
}

export function getAnswerById(id: string): Answer | undefined {
  return answers.find((a) => a.id === id)
}

/**
 * Inline autocomplete for the console input.
 *
 * Returns the full question the visitor is most likely typing, or null. Prefix
 * matches win outright; otherwise it falls back to the same scorer `retrieve`
 * uses, so the suggestion always agrees with what pressing Enter would answer.
 *
 * Deliberately conservative: a wrong ghost completion that gets Tab-accepted is
 * worse than no completion, so a fuzzy match must clear the score threshold.
 */
export function suggestCompletion(input: string): string | null {
  const raw = input.trimStart()
  if (raw.length < 2) return null

  const lower = raw.toLowerCase()
  const questions = answers.map((a) => a.question)

  // Straight prefix match, shortest first so the completion is the least
  // presumptuous option available.
  const prefix = questions
    .filter((q) => q.toLowerCase().startsWith(lower) && q.length > raw.length)
    .sort((a, b) => a.length - b.length)
  if (prefix[0]) return prefix[0]

  // Otherwise defer to the scorer, but only once the query is substantive.
  if (raw.length < 4) return null
  const { answer, score } = retrieve(raw)
  if (!answer || score < SCORE_THRESHOLD) return null
  return answer.question.toLowerCase() === lower ? null : answer.question
}

export const suggestedAnswers: Answer[] = suggestedIds
  .map((id) => getAnswerById(id))
  .filter((a): a is Answer => Boolean(a))

/** Shown when nothing clears the threshold — never a dead end. */
export const fallbackAnswer: Answer = {
  id: "fallback",
  question: "No match",
  keywords: [],
  answer:
    "Nothing in my index covers that one — this console only retrieves over my own work, so it's genuinely limited rather than being coy.\n\nTry one of the questions below, or scroll on: everything the console knows is written out in full further down the page.",
  sources: [],
  trace: { chunks: 0, model: "llama-3.3-70b" },
  followUp: ["Who are you?", "What have you built?", "What's your stack?"],
}

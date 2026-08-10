export type Segment = { text: string; bold: boolean }
export type Paragraph = Segment[]

/**
 * Parses the lightweight `**bold**` + blank-line-paragraph format used by
 * `content/answers.ts`. Parsing up front (rather than per animation frame) also
 * gives the streamer a stable character count to reveal against — the `**`
 * markers are stripped, so they never consume stream time.
 */
export function parseRich(text: string): Paragraph[] {
  return text.split("\n\n").map((para) =>
    para
      .split(/(\*\*[^*]+\*\*)/g)
      .filter(Boolean)
      .map((part) =>
        part.startsWith("**") && part.endsWith("**")
          ? { text: part.slice(2, -2), bold: true }
          : { text: part, bold: false },
      ),
  )
}

export function totalLength(paragraphs: Paragraph[]): number {
  return paragraphs.reduce(
    (sum, para) => sum + para.reduce((s, seg) => s + seg.text.length, 0),
    0,
  )
}

/**
 * Character offsets at which each word ends, so the streamer can advance a word
 * at a time while still measuring progress in characters.
 */
export function wordBoundaries(paragraphs: Paragraph[]): number[] {
  const bounds: number[] = []
  let offset = 0

  for (const para of paragraphs) {
    const text = para.map((s) => s.text).join("")
    const re = /\S+\s*/g
    let m: RegExpExecArray | null
    while ((m = re.exec(text)) !== null) {
      bounds.push(offset + m.index + m[0].length)
    }
    offset += text.length
  }

  return bounds.length > 0 ? bounds : [totalLength(paragraphs)]
}

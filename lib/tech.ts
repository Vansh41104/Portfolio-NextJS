/**
 * Normalizes a technology label into a stable slug used by the tech filter.
 *
 * "Model Context Protocol" → "model-context-protocol". Applied on both sides —
 * the `data-techs` attributes rendered by the sections and the tags a visitor
 * clicks — so the two always agree.
 */
export function techSlug(label: string): string {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

/** Serializes a tech list into the `data-techs` attribute format. */
export function techAttr(labels: string[]): string {
  return labels.map(techSlug).join("|")
}

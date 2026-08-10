/**
 * Lets code outside the console reach into it — the `/` keyboard shortcut in
 * `KeyboardNav`, and the source chips that jump back to the input.
 *
 * Same module-level registry pattern as `registerLenis` in `lib/scroll.ts`,
 * which avoids threading a ref through the server-rendered section tree.
 */

type ConsoleHandle = {
  focus: () => void
  submit: (query: string) => void
}

let handle: ConsoleHandle | null = null

export function registerConsole(next: ConsoleHandle | null) {
  handle = next
}

/** Focuses the console input and scrolls it into view. No-op before mount. */
export function focusConsole() {
  handle?.focus()
}

/** Runs a query as if it had been typed. */
export function askConsole(query: string) {
  handle?.submit(query)
}

export function isConsoleReady() {
  return handle !== null
}

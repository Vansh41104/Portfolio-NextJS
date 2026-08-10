# vansh.bhatnagar — portfolio

Personal site for Vansh Bhatnagar, AI Software Engineer. Built around an **Agent Console**: a
deterministic retrieval REPL that answers questions about the work, with a full editorial résumé
rendered underneath it.

**Live:** [vansh410.vercel.app](https://vansh410.vercel.app)

## Stack

- **Next.js 16** (App Router) · React 19 · TypeScript (strict)
- **Tailwind CSS v4** — CSS-first config, no `tailwind.config.*`; tokens live in [`app/globals.css`](app/globals.css)
- **Framer Motion** for reveals and trace animation · **Lenis** for smooth scroll
- **next-themes** for light/dark

## How it's put together

```
content/          Typed content modules — the single source of truth
  answers.ts      Knowledge base the console retrieves over
lib/retrieval.ts  Deterministic keyword scorer (no model call)
components/
  console/        The Agent Console island
  sections/       Server-rendered résumé sections
  nav/            Scroll-spy rail + fixed header
app/page.tsx      Server component composing the sections
```

### The console is not an LLM

`lib/retrieval.ts` tokenizes the query, scores it against the keyword sets in
`content/answers.ts`, and streams the winning entry. Nothing leaves the browser and no API key is
needed. The pipeline trace (`route → retrieve → rank → synthesize`) shows the genuine elapsed time
of each local step.

Technology names are pulled automatically from `content/skills.ts`, so a question like
_"do you use Kubernetes?"_ routes correctly without maintaining a parallel keyword list.

To wire up a real model later, add an `app/api/ask/route.ts` that passes `content/*` as context and
swap the call site in `components/console/useAgentQuery.ts`.

### Content lives in one place

Every string on the page comes from `content/*`. The résumé PDF at
[`public/Vansh_Bhatnagar_Resume.pdf`](public/Vansh_Bhatnagar_Resume.pdf) is the source of truth for
dates, titles and metrics — update `content/` whenever it changes so the two can't drift.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # type-checked production build
```

Type errors fail the build (`next.config.mjs`). Keep it that way.

## Accessibility notes

- Answers stream inside an `aria-live="polite"` region; the trace is `aria-hidden` so screen readers
  get the content, not spinner noise.
- `prefers-reduced-motion` disables Lenis, skips the trace animation and renders answers instantly.
- The console is a progressive enhancement — the full résumé is server-rendered below it.

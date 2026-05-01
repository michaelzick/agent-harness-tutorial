# Agentic Automation Tutor

A frontend-only tutorial app for learning agentic automation through five harness examples:

- Codex
- Claude Cowork
- OpenClaw
- NemoClaw
- Hermes

The app uses Vite, React, TypeScript, React Router, React Flow, and localStorage progress tracking. There is no backend, auth, database, or server-side course state.

## Commands

```bash
npm install
npm run dev
npm run check
npm run lint
npm test
npm run build
```

## Progress Storage

Progress is stored in browser localStorage under:

```txt
agenticAutomationTutorProgress
```

The parser is defensive: empty, stale, or malformed storage falls back to safe defaults.

## Design Notes

The UI is intentionally dark-ish: slate and charcoal surfaces, subtle borders, restrained accents, no decorative effects, and no color gradients.

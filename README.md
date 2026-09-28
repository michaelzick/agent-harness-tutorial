# Agent Harness Tutorial

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

## Hosting

Cloudflare Worker `zickonezero-aht` serves https://aht.zickonezero.com from `dist/`.
`wrangler.jsonc` preserves SPA deep links. Workers Builds deploys GitHub `main`
with Node 24, `npm run build`, and `npx wrangler@4.133.0 deploy`.

### Branch previews

Workers Builds builds every non-production branch with Node 24 and `npm run build`,
then runs `npx wrangler@4.135.0 preview` (Wrangler 4.135.0 or later). The empty
`previews` block in `wrangler.jsonc` enables isolated branch previews; static assets
and routing settings remain at the top level. Each branch has a stable preview URL
that updates on subsequent pushes. Production continues to deploy from `main`.

For branches created before this configuration was added, merge current `main`
before pushing to get a working preview build.

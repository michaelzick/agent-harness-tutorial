# Agent Harness Tutorial — Agent Orientation (Codex / AGENTS.md)

This document is the canonical project brief for AI coding agents. Read it at the start of every session instead of re-exploring the repo. Keep it current: see [Maintaining this file](#maintaining-this-file).

Sibling files [CLAUDE.md](CLAUDE.md) (Claude Code) and [GEMINI.md](GEMINI.md) (Gemini CLI) mirror this content for other harnesses. Update all three together when code structure changes.

---

## 1. Project overview

**Agent Harness Tutorial** is a frontend-only interactive tutorial course that teaches agentic automation design through five practical harness examples: Codex, Claude Cowork, OpenClaw, NemoClaw, and Hermes. There is no backend, auth, database, or server-side state — all progress is stored in browser `localStorage`.

Primary flows:
- Dashboard: progress overview with resume-lesson shortcut and key stats.
- Course browser: module/lesson tree with difficulty and time estimates.
- Lesson reader: structured content sections, diagrams, checkpoints, and next-lesson navigation.
- Harness explorer: per-harness deep dives, skill recipes, and workflow guides.
- CTO view: executive-level summary content.
- Diagram gallery: React Flow–rendered visual concepts.

## 2. Tech stack

- **Build tool:** Vite 8.0 + `@vitejs/plugin-react`
- **UI framework:** React 19.2 + React DOM
- **Language:** TypeScript 6 (strict mode)
- **Routing:** React Router DOM 7.14
- **Diagrams:** XYFlow React 12.10 (`@xyflow/react`)
- **Icons:** Lucide React 1.14
- **Testing:** Vitest 4.1 + Testing Library React 16.3 + Testing Library User Event 14.6 + jsdom 29
- **Code quality:** ESLint 10 + typescript-eslint 8 + eslint-plugin-react-hooks + eslint-plugin-react-refresh
- **Runtime:** Node ≥ 24; package manager: npm (not pnpm)
- **Dev server:** 127.0.0.1:5173; preview server: 127.0.0.1:4173

## 3. Project layout

Single-package SPA (no monorepo, no backend):

```
agent-harness-tutorial/
├── src/
│   ├── assets/              # Static images (hero.png, react.svg, vite.svg)
│   ├── components/          # 27 reusable content + layout components
│   ├── data/                # Course content as typed TypeScript modules
│   ├── hooks/               # useProgress — localStorage progress state
│   ├── lib/                 # courseNavigation, progress, slug utilities
│   ├── pages/               # 9 page components
│   ├── types/               # course.ts — all core TypeScript types
│   ├── App.tsx              # Root router with all route definitions
│   ├── main.tsx             # React DOM entry point
│   └── index.css            # Global styles
├── tests/                   # 11 test files (Vitest + Testing Library)
├── public/                  # Favicons, og-image, site.webmanifest
├── skills/
│   ├── coding-standards/    # Portable production coding standards
│   └── sync-agent-briefs/   # Skill + scripts for keeping agent briefs in sync
├── index.html               # Vite HTML entry
├── vite.config.ts           # Build + test config (jsdom environment)
├── tsconfig.json            # References app + node configs
├── tsconfig.app.json        # App TS config (strict, ES2020+)
├── tsconfig.node.json       # Node/Vite config TS settings
├── eslint.config.js         # ESLint flat config
├── .nvmrc                   # Node version pin
└── package.json             # Scripts, dependencies
```

## 4. Pages & routes

All routes defined in `src/App.tsx`. Unknown paths redirect to `/`.

| Route | Page | Purpose |
|---|---|---|
| `/` | `DashboardPage` | Progress overview, resume-lesson button, key stats |
| `/lessons` | `LessonsPage` | Full module/lesson browser |
| `/harnesses` | `HarnessesPage` | Index of all 5 harnesses |
| `/harnesses/:harnessSlug` | `HarnessDetailPage` | Deep dive on one harness |
| `/skills` | `SkillsPage` | Harness-specific skill recipes |
| `/workflows` | `WorkflowsPage` | Workflow guides (all harnesses) |
| `/workflows/:harnessSlug` | `WorkflowsPage` | Workflow guides filtered by harness |
| `/cto` | `CtoPage` | Executive-level summary |
| `/diagrams` | `DiagramGalleryPage` | React Flow diagram gallery |
| `/learn/:moduleSlug/:lessonSlug` | `LessonPage` | Full lesson content + navigation |

## 5. Data model

Course hierarchy: `Course → Module[] → Lesson[] → Section[]`.

All TypeScript types live in `src/types/course.ts`. The full course object is assembled by `src/data/courseBuilder.ts` from domain content modules.

**Content data files:**
- `src/data/foundations.ts` — Foundation module lessons
- `src/data/harnessModules.ts` — One module per harness (CDX, CWK, OPN, NMO, HRM)
- `src/data/contextModules.ts` — Cross-cutting context topics (agent files, skills, workflows)
- `src/data/workflows.ts` — Workflow module content
- `src/data/capstones.ts` — Capstone project lessons
- `src/data/harnessMeta.ts` — Canonical harness IDs, slugs, names, descriptions, and subtitles
- `src/data/diagrams.ts` — React Flow diagram definitions (`DiagramDefinition[]`)
- `src/data/sharedSections.ts` — Section content reused across lessons
- `src/data/course.ts` — Re-exports assembled course modules

**Section kinds** (from `src/types/course.ts`):
`text`, `callout`, `comparison`, `goodBad`, `prompt`, `capstone`, `setupGuide`, `featureMatrix`, `skillRecipe`, `interviewRubric`, `implementationLab`, `fileTemplate`, `decisionChecklist`, `workflowGuide`

**Progress state** (`src/lib/progress.ts`): serialized to `localStorage` under key `agenticAutomationTutorProgress`. Defensive parser — stale or malformed storage falls back to safe defaults.

## 6. The 5 harnesses

Defined in `src/data/harnessMeta.ts`:

| ID | Name | Focus |
|---|---|---|
| CDX | Codex | Repository-grounded engineering automation with diffs, tests, and review |
| CWK | Claude Cowork | Collaborative reasoning and knowledge-work execution across files, documents, and tools |
| OPN | OpenClaw | Local, message-driven, tool-using agents with browser, file, shell, and workspace skills |
| NMO | NemoClaw | Guarded OpenClaw-style execution with sandbox, policy, routed inference, and logs |
| HRM | Hermes | Workflow-oriented automation with skills, memory, gateways, and scheduled tasks |

## 7. Commands

```bash
npm run dev              # Vite dev server on 127.0.0.1:5173 (HMR enabled)
npm run build            # tsc -b && vite build (production bundle)
npm run check            # tsc -b --noEmit (type-check only)
npm run lint             # ESLint across all source files
npm test                 # vitest --run (single-pass test suite)
npm run preview          # Serve production build on 127.0.0.1:4173
npm run agent-briefs:sync   # Regenerate CLAUDE.md + GEMINI.md from AGENTS.md
npm run agent-briefs:check  # Fail if CLAUDE.md or GEMINI.md drift from AGENTS.md
```

No change is done until `npm run lint` and `npm run check` pass. When structural or meaningful project facts change, update `AGENTS.md`, run `npm run agent-briefs:sync`, and keep `CLAUDE.md` / `GEMINI.md` in lockstep.

## 8. Conventions & code style

- **File naming:** PascalCase for React component files (`LessonCard.tsx`, `CourseLayout.tsx`); camelCase for data, utility, and hook files (`courseNavigation.ts`, `useProgress.ts`).
- **Component exports:** named exports preferred over default exports on components.
- **Testing:** test files live in `tests/` (not co-located), using Vitest + Testing Library. File names mirror the module under test (`progress.test.ts` → `src/lib/progress.ts`).
- **State:** `localStorage` only — no server state, no React context for global state. Prefer local component state; lift only when necessary.
- **No max-lines enforcement** (unlike some projects) — but components should stay focused on a single responsibility.
- **Coding standards:** use `skills/coding-standards/SKILL.md` before implementation, refactors, state handling, error handling, performance work, tests, and reviews.
- **Completion gate:** never mark work done while `npm run check` or `npm run lint` fail.
- **Agent brief sync:** when structural or meaningful project facts change, update `AGENTS.md` first, then run `npm run agent-briefs:sync`.

## 9. Key files map

| Path | What lives here |
|---|---|
| [`src/App.tsx`](src/App.tsx) | Root router, all 10 route definitions |
| [`src/main.tsx`](src/main.tsx) | React DOM entry point |
| [`src/types/course.ts`](src/types/course.ts) | All TypeScript types: Course, Module, Lesson, Section variants, ProgressState, DiagramDefinition |
| [`src/data/courseBuilder.ts`](src/data/courseBuilder.ts) | Assembles full Course from domain content modules |
| [`src/data/harnessMeta.ts`](src/data/harnessMeta.ts) | Canonical 5-harness metadata (IDs, slugs, names, descriptions) |
| [`src/data/foundations.ts`](src/data/foundations.ts) | Foundation module lesson content |
| [`src/data/diagrams.ts`](src/data/diagrams.ts) | React Flow diagram definitions |
| [`src/lib/courseNavigation.ts`](src/lib/courseNavigation.ts) | Route lookup, lesson/module queries, prev/next navigation |
| [`src/lib/progress.ts`](src/lib/progress.ts) | Progress calculation, completion tracking, localStorage serialization |
| [`src/lib/slug.ts`](src/lib/slug.ts) | URL slug generation from titles |
| [`src/hooks/useProgress.ts`](src/hooks/useProgress.ts) | localStorage progress state hook |
| [`src/components/CourseLayout.tsx`](src/components/CourseLayout.tsx) | Main layout wrapper with sidebar navigation |
| [`src/components/Checkpoint.tsx`](src/components/Checkpoint.tsx) | Quiz component with multiple-choice + explanations |
| [`src/components/ReactFlowDiagram.tsx`](src/components/ReactFlowDiagram.tsx) | XYFlow React diagram renderer |
| [`src/pages/LessonPage.tsx`](src/pages/LessonPage.tsx) | Full lesson content rendering + prev/next navigation |
| [`src/pages/DashboardPage.tsx`](src/pages/DashboardPage.tsx) | Progress overview and resume-lesson entry point |
| [`skills/coding-standards/SKILL.md`](skills/coding-standards/SKILL.md) | Portable production coding standards for React + TypeScript |
| [`skills/sync-agent-briefs/SKILL.md`](skills/sync-agent-briefs/SKILL.md) | When + how to sync agent orientation files |
| [`vite.config.ts`](vite.config.ts) | Build config, dev server settings, test environment (jsdom) |
| [`eslint.config.js`](eslint.config.js) | ESLint flat config |

---

## Maintaining this file

**Whenever you change the codebase in a way this document describes, update it in the same change.** Examples that require an update:

- Adding, removing, renaming, or moving a file listed in [Key files map](#9-key-files-map).
- Adding a new route or page component.
- Adding a new section kind to `src/types/course.ts`.
- Adding or renaming a harness in `src/data/harnessMeta.ts`.
- Changing `package.json` scripts.
- Changing the `localStorage` key or progress schema in `src/lib/progress.ts`.
- Adding a top-level directory (e.g., a new `skills/` entry or `src/` subdirectory).

Treat `AGENTS.md` as the canonical source for the mirrored harness briefs. After updating it, run `npm run agent-briefs:sync` and `npm run agent-briefs:check` so [CLAUDE.md](CLAUDE.md) and [GEMINI.md](GEMINI.md) stay aligned.

Do **not** use this file for ephemeral notes (in-flight TODOs, session state, debugging logs). It is a map, not a journal.
 
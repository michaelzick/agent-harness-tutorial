---
name: sync-agent-briefs
description: Keep AGENTS.md, CLAUDE.md, and GEMINI.md in sync after structural or meaningful changes to the agent-harness-tutorial codebase. Use after any change that affects project layout, routes, data model, commands, conventions, or key files.
---

# Sync Agent Briefs

## Purpose

`AGENTS.md`, `CLAUDE.md`, and `GEMINI.md` are the three harness-specific agent orientation files for this repo. They share identical content — only the H1 title and the sibling-files intro paragraph differ. When the codebase changes in ways the orientation files describe, all three must be updated together to stay accurate.

`AGENTS.md` is the **canonical source**. `CLAUDE.md` and `GEMINI.md` are generated from it.

## When to invoke this skill

Use this skill whenever you make a change that affects what the orientation files describe:

- Adding, removing, renaming, or moving a file listed in the Key files map (§9 of AGENTS.md)
- Adding a new route or page component
- Adding a new section kind to `src/types/course.ts`
- Adding or renaming a harness in `src/data/harnessMeta.ts`
- Changing `package.json` scripts
- Changing the `localStorage` key or progress schema in `src/lib/progress.ts`
- Adding a top-level directory (e.g., a new `skills/` entry or `src/` subdirectory)
- Changing dev server ports, runtime requirements, or tooling versions

## Workflow

1. **Assess the change.** Compare what changed against the current content of `AGENTS.md`. Identify every section that is now out of date.

2. **Edit `AGENTS.md`.** Update all affected sections — layout, routes, data model, commands, conventions, key files map, or the "Maintaining this file" triggers list. `AGENTS.md` is the only file you edit by hand.

3. **Regenerate the mirror files.**
   ```bash
   npm run agent-briefs:sync
   ```
   This rewrites `CLAUDE.md` and `GEMINI.md` from `AGENTS.md`, substituting the harness-specific title and sibling-files paragraph.

4. **Verify alignment.**
   ```bash
   npm run agent-briefs:check
   ```
   Exits 0 if the files match. Exits 1 with a diff hint if they have drifted.

5. **Run the completion gate.**
   ```bash
   npm run check && npm run lint
   ```
   Never mark work done while either command fails.

## Constraints

- Only harness labels (H1 title, sibling-files paragraph) may differ between `AGENTS.md`, `CLAUDE.md`, and `GEMINI.md`. Every other line must be identical.
- Do not add in-flight TODOs, session notes, or debugging artifacts to any of the three files. They are maps, not journals.
- `AGENTS.md` must not reference `CLAUDE.md` or `GEMINI.md` as sibling sources — those files are derived, never authoritative.

## Scripts

| Script | File |
|---|---|
| `npm run agent-briefs:sync` | `skills/sync-agent-briefs/scripts/sync.mjs` |
| `npm run agent-briefs:check` | `skills/sync-agent-briefs/scripts/check.mjs` |

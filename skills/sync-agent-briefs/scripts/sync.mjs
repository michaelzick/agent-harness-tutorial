#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '../../..');

const source = readFileSync(resolve(root, 'AGENTS.md'), 'utf8');

const AGENTS_TITLE = '# Agent Harness Tutorial — Agent Orientation (Codex / AGENTS.md)';
const AGENTS_SIBLING =
  'Sibling files [CLAUDE.md](CLAUDE.md) (Claude Code) and [GEMINI.md](GEMINI.md) (Gemini CLI) mirror this content for other harnesses. Update all three together when code structure changes.';

const CLAUDE_TITLE = '# Agent Harness Tutorial — Agent Orientation (Claude Code)';
const CLAUDE_SIBLING =
  'Sibling files [AGENTS.md](AGENTS.md) (Codex) and [GEMINI.md](GEMINI.md) (Gemini CLI) mirror this content for other harnesses. Update all three together when code structure changes.';

const GEMINI_TITLE = '# Agent Harness Tutorial — Agent Orientation (Gemini CLI)';
const GEMINI_SIBLING =
  'Sibling files [CLAUDE.md](CLAUDE.md) (Claude Code) and [AGENTS.md](AGENTS.md) (Codex) mirror this content for other harnesses. Update all three together when code structure changes.';

function transform(text, newTitle, newSibling) {
  return text.replace(AGENTS_TITLE, newTitle).replace(AGENTS_SIBLING, newSibling);
}

writeFileSync(resolve(root, 'CLAUDE.md'), transform(source, CLAUDE_TITLE, CLAUDE_SIBLING));
writeFileSync(resolve(root, 'GEMINI.md'), transform(source, GEMINI_TITLE, GEMINI_SIBLING));

console.log('✓ CLAUDE.md and GEMINI.md regenerated from AGENTS.md');

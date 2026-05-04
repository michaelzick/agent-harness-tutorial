#!/usr/bin/env node
import { readFileSync } from 'fs';
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

const expectedClaude = transform(source, CLAUDE_TITLE, CLAUDE_SIBLING);
const expectedGemini = transform(source, GEMINI_TITLE, GEMINI_SIBLING);

let failed = false;

try {
  const actualClaude = readFileSync(resolve(root, 'CLAUDE.md'), 'utf8');
  if (actualClaude !== expectedClaude) {
    console.error('✗ CLAUDE.md has drifted from AGENTS.md');
    failed = true;
  }
} catch {
  console.error('✗ CLAUDE.md is missing');
  failed = true;
}

try {
  const actualGemini = readFileSync(resolve(root, 'GEMINI.md'), 'utf8');
  if (actualGemini !== expectedGemini) {
    console.error('✗ GEMINI.md has drifted from AGENTS.md');
    failed = true;
  }
} catch {
  console.error('✗ GEMINI.md is missing');
  failed = true;
}

if (failed) {
  console.error('Run: npm run agent-briefs:sync');
  process.exit(1);
}

console.log('✓ CLAUDE.md and GEMINI.md are in sync with AGENTS.md');

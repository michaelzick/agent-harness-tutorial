import type { HarnessId } from '../types/course'

export const harnessOrder: HarnessId[] = ['codex', 'claude-cowork', 'openclaw', 'nemoclaw', 'hermes']

export const harnessMarks: Record<HarnessId, string> = {
  codex: 'CDX',
  'claude-cowork': 'CWK',
  openclaw: 'OPN',
  nemoclaw: 'NMO',
  hermes: 'HRM',
}

export const harnessMeta: Record<HarnessId, { title: string; slug: string; summary: string; bestFor: string }> = {
  codex: {
    title: 'Codex',
    slug: 'codex',
    summary: 'Repository-grounded engineering automation with diffs, tests, and review.',
    bestFor: 'Codebase tasks, debugging, tests, refactors, implementation from specs.',
  },
  'claude-cowork': {
    title: 'Claude Cowork',
    slug: 'claude-cowork',
    summary: 'Collaborative reasoning and knowledge-work execution across files, documents, and tools.',
    bestFor: 'PRDs, research synthesis, planning, documents, spreadsheets, and plugin-driven work.',
  },
  openclaw: {
    title: 'OpenClaw',
    slug: 'openclaw',
    summary: 'Local, message-driven, tool-using agents with browser, file, shell, and workspace skills.',
    bestFor: 'Personal automation, dashboard checks, local tools, browser tasks, and reusable skills.',
  },
  nemoclaw: {
    title: 'NemoClaw',
    slug: 'nemoclaw',
    summary: 'Guarded OpenClaw-style execution with sandbox, policy, routed inference, and logs.',
    bestFor: 'Higher-risk local or enterprise workflows that need stronger boundaries and auditability.',
  },
  hermes: {
    title: 'Hermes',
    slug: 'hermes',
    summary: 'Workflow-oriented automation with skills, memory, gateways, and scheduled tasks.',
    bestFor: 'Business workflows, marketing funnels, recurring reports, and personal operators.',
  },
}

import { ComparisonTable } from './ComparisonTable'

const columns = ['Harness', 'Strengths', 'Weaknesses', 'Best use cases', 'Autonomy']

const rows = [
  [
    'Codex',
    'Repo inspection, file edits, tests, refactors',
    'Weak when the task is not grounded in a codebase',
    'Feature work, bug fixes, tests, docs, PR preparation',
    'Medium to high with review',
  ],
  [
    'Claude Cowork',
    'Reasoning, planning, writing, critique',
    'Needs handoff to an execution tool for code or local actions',
    'PRDs, specs, prompts, strategy, course design',
    'Medium with collaborative review',
  ],
  [
    'OpenClaw',
    'Local tools, browser, files, shell, messaging',
    'Risk grows quickly with broad credentials and tools',
    'Personal automation, browser checks, local tasks, skills',
    'High when configured carefully',
  ],
  [
    'NemoClaw',
    'Policy, sandboxing, approvals, auditability',
    'More setup and operational discipline',
    'Guarded agents, deployments, long-running workflows',
    'High inside stricter boundaries',
  ],
  [
    'Hermes',
    'Structured workflows, markdown skills, business artifacts',
    'Can become verbose or rigid if skill files are bloated',
    'Funnels, strategy, content systems, repeatable planning',
    'Medium to high by workflow stage',
  ],
]

export function HarnessComparison() {
  return (
    <ComparisonTable
      title="Five-harness comparison"
      columns={columns}
      rows={rows}
      note="Use this as a starting point, not a permanent ranking. The best harness is the one with the right verification loop for the work."
    />
  )
}

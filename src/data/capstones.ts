import type { ModuleInput } from './courseBuilder'

export const capstoneModules: ModuleInput[] = [
  {
    id: 'module-capstones',
    slug: 'capstones',
    title: 'Capstones',
    summary: 'Build practical automations across the five harnesses and a multi-harness enterprise stack.',
    track: 'capstone',
    lessons: [
      {
        title: 'Build a Codex Repo-Editing Workflow',
        summary: 'Create a repeatable repo automation with `AGENTS.md`, scoped prompts, tests, and review handoff.',
        diagramId: 'codex-loop',
        objectives: ['Design a Codex task packet.', 'Add repo instruction files.', 'Define verification and review gates.'],
        keyConcepts: [
          'The Codex capstone should produce a scoped repo workflow with clear instructions and review boundaries.',
          'The repo workflow needs a task packet, context files, implementation steps, and a handoff artifact.',
          'Tests and diff review are the acceptance gate before the workflow is considered complete.',
        ],
        sections: [
          {
            kind: 'capstone',
            goal: 'Build a Codex repo-editing workflow',
            scenario: 'A team wants Codex to implement small product requirements safely in an existing repository.',
            requiredContext: ['Repo root', '`AGENTS.md` or `CLAUDE.md`', 'Build/test commands', 'Non-goals and approval rules'],
            instructions: [
              'Create or revise a short repo instruction file.',
              'Write a task prompt that asks Codex to inspect before editing.',
              'Require a small patch, relevant checks, and a final diff summary.',
            ],
            expectedOutput: ['Task prompt', 'Instruction file draft', 'Verification checklist', 'Human review rubric'],
            evaluationChecklist: [
              'The task is scoped.',
              'Codex has enough repo context.',
              'Checks are relevant.',
              'Reviewer can understand the diff and residual risk.',
            ],
            commonFailureModes: ['Instruction file is bloated', 'Task mixes planning and broad implementation', 'No test command'],
            suggestedImprovements: ['Add golden tasks for evals', 'Add a code review skill', 'Track accepted vs rejected Codex diffs'],
          },
        ],
        practicalExample:
          'Use a small UI bug as the first run, not a broad architecture migration.',
        harnessRelevance: 'Codex owns implementation when the workflow is grounded in repo truth.',
        commonMistakes: ['Skipping inspection', 'Accepting broad edits', 'Not checking tests.'],
      },
      {
        title: 'Build a Claude Cowork Product Spec Workflow',
        summary: 'Create a Cowork project that turns messy product input into a PRD, risks, and execution prompts.',
        diagramId: 'claude-cowork-loop',
        objectives: ['Set up a Cowork project folder.', 'Write project instructions.', 'Produce reviewable planning artifacts.'],
        keyConcepts: [
          'The Cowork capstone turns messy product input into structured planning artifacts.',
          'A strong PRD should capture goals, constraints, risks, open questions, and execution prompts.',
          'Planning output should be reviewable before it drives implementation or downstream automation.',
        ],
        sections: [
          {
            kind: 'capstone',
            goal: 'Build a Claude Cowork product spec workflow',
            scenario: 'A product lead has messy notes, customer quotes, and design sketches that need to become an implementation-ready PRD.',
            requiredContext: ['Source folder', 'Project instructions', 'Output format', 'Decision owner'],
            instructions: [
              'Create folder structure: source, drafts, deliverables.',
              'Write project instructions for assumptions, citations, and output format.',
              'Ask Cowork to produce a PRD, risks, open questions, and Codex-ready implementation prompt.',
            ],
            expectedOutput: ['PRD', 'Assumption log', 'Risk register', 'Codex prompt'],
            evaluationChecklist: ['Sources cited', 'Risks explicit', 'Open questions not hidden', 'Execution prompt is scoped'],
            commonFailureModes: ['Reads unrelated files', 'Invents product requirements', 'No decision criteria'],
            suggestedImprovements: ['Add a research synthesis skill', 'Create a PRD template', 'Add stakeholder review checklist'],
          },
        ],
        practicalExample:
          'Use Cowork to create the PRD, then hand only the approved implementation section to Codex.',
        harnessRelevance: 'Cowork owns the structured thinking layer.',
        commonMistakes: ['Skipping source citations', 'Letting Cowork directly execute code changes', 'Using global instructions for project details.'],
      },
      {
        title: 'Build an OpenClaw Browser Automation Skill',
        summary: 'Create a read-only browser skill that checks a dashboard and reports failures.',
        diagramId: 'openclaw-clawhub-flow',
        objectives: ['Write a workspace skill.', 'Define browser boundaries.', 'Create a report and stop rule.'],
        keyConcepts: [
          'The OpenClaw capstone should package a browser automation as a reviewed workspace skill.',
          'Browser automation must name the page, evidence to collect, and actions that are out of bounds.',
          'Read-only mode is the safe default until reporting quality and stop rules are proven.',
        ],
        sections: [
          {
            kind: 'capstone',
            goal: 'Build an OpenClaw browser automation skill',
            scenario: 'An operator wants a daily read-only dashboard check for failed jobs.',
            requiredContext: ['Dashboard URL', 'Read-only account', 'Failure definition', 'Report location', 'Policy file'],
            instructions: [
              'Write `skills/dashboard-audit/SKILL.md`.',
              'Define evidence to capture.',
              'Block retries, deletes, sends, and settings changes.',
              'Run against test or staging first.',
            ],
            expectedOutput: ['Skill file', 'Policy file', 'Sample report', 'Failure-mode checklist'],
            evaluationChecklist: ['Skill has narrow trigger', 'Evidence is captured', 'Stop conditions are explicit', 'No write actions happen'],
            commonFailureModes: ['Agent clicks remediation buttons', 'Page prompt injection', 'Skill trigger too broad'],
            suggestedImprovements: ['Add screenshot capture', 'Add structured JSON output', 'Move risky remediation to NemoClaw-style policy'],
          },
        ],
        practicalExample:
          'Start with a staging dashboard that has fake failed jobs.',
        harnessRelevance: 'OpenClaw owns the local browser/tool execution loop.',
        commonMistakes: ['Using admin credentials first', 'No prompt injection rule', 'No evidence capture.'],
      },
      {
        title: 'Build a NemoClaw-Style Guardrailed Agent Flow',
        summary: 'Move a risky OpenClaw-style workflow behind sandbox, policy, approval, and logs.',
        diagramId: 'nemoclaw-sandbox-policy',
        objectives: ['Define sandbox prerequisites.', 'Write policy and approval gates.', 'Validate logging and denial paths.'],
        keyConcepts: [
          'The NemoClaw-style capstone moves a risky flow behind sandbox, policy, approval, and logs.',
          'The sandbox should make denied actions and allowed actions visible during validation.',
          'Policy should define tool scope, network limits, approval packets, and audit requirements.',
        ],
        sections: [
          {
            kind: 'capstone',
            goal: 'Build a guardrailed agent flow',
            scenario: 'A read-only dashboard agent is ready to propose remediation, but retries must be approval-gated.',
            requiredContext: ['Sandbox setup notes', 'Policy draft', 'Approved hosts', 'Test workflow', 'Log retrieval command'],
            instructions: [
              'Define allowed, approval-required, and denied actions.',
              'Run hello-world sandbox validation.',
              'Run a read-only workflow.',
              'Test a denied action and an approval-required action.',
            ],
            expectedOutput: ['Policy map', 'Sandbox validation note', 'Approval flow', 'Log evidence'],
            evaluationChecklist: ['Denied actions are denied', 'Approval path pauses', 'Logs are inspectable', 'Rollback is documented'],
            commonFailureModes: ['Policy not enforced', 'Logs unavailable', 'Early-preview behavior changes'],
            suggestedImprovements: ['Pin versions', 'Add eval cases', 'Create incident playbook'],
          },
        ],
        practicalExample:
          'Test that the agent cannot retry a production job without approval.',
        harnessRelevance: 'NemoClaw owns the guarded execution layer.',
        commonMistakes: ['Assuming sandbox equals safety', 'No test for denial path', 'Production credentials too early.'],
      },
      {
        title: 'Build a Hermes Marketing Funnel Workflow',
        summary: 'Create a repeatable Hermes skill and workflow for business planning with approval gates.',
        diagramId: 'hermes-skill-memory-loop',
        objectives: ['Write a Hermes skill.', 'Define workflow inputs and outputs.', 'Add review gates before publication.'],
        keyConcepts: [
          'The Hermes capstone turns a marketing funnel into a repeatable workflow skill.',
          'The workflow skill should define inputs, stages, outputs, memory use, and weekly improvement.',
          'A review gate keeps drafts from becoming external business actions without approval.',
        ],
        sections: [
          {
            kind: 'capstone',
            goal: 'Build a Hermes marketing funnel workflow',
            scenario: 'A founder wants a repeatable workflow that turns offer inputs into a funnel plan and content drafts.',
            requiredContext: ['Offer', 'Audience', 'Pain points', 'Channels', 'KPIs', 'Brand constraints'],
            instructions: [
              'Create `~/.hermes/skills/marketing-funnel/SKILL.md`.',
              'Define input questions.',
              'Generate funnel stages, assets, KPIs, and review gates.',
              'Stop before publishing or spending money.',
            ],
            expectedOutput: ['Skill file', 'Funnel plan', 'Content draft inventory', 'Approval checklist'],
            evaluationChecklist: ['Assumptions visible', 'KPIs tied to stages', 'Review gate blocks publishing', 'Workflow is repeatable'],
            commonFailureModes: ['Generic marketing copy', 'No KPI discipline', 'Unapproved external action'],
            suggestedImprovements: ['Add brand voice references', 'Add post-run retrospective', 'Archive weak generated skills'],
          },
        ],
        practicalExample:
          'Run the workflow on a test offer and score whether outputs are specific enough for a human marketer to edit.',
        harnessRelevance: 'Hermes owns repeatable business workflow orchestration.',
        commonMistakes: ['No input quality gate', 'Publishing directly', 'Skill grows too broad.'],
      },
      {
        title: 'Build a Multi-Harness Agentic Automation System',
        summary: 'Combine all five harnesses into a CTO-level architecture with clear ownership and risk controls.',
        diagramId: 'multi-harness-stack',
        objectives: ['Assign harness ownership by workflow stage.', 'Create handoff artifacts.', 'Define enterprise controls and metrics.'],
        keyConcepts: [
          'The final capstone assigns each harness to the workflow stage where it has the strongest operating loop.',
          'Handoff artifacts connect planning, code, workflow execution, dashboard checks, and governance.',
          'Enterprise controls define identity, policy, observability, approvals, and rollout ownership.',
        ],
        sections: [
          {
            kind: 'capstone',
            goal: 'Build a multi-harness agentic automation system',
            scenario:
              'A CTO wants a stack that supports engineering automation, product planning, local operators, guarded execution, and business workflows.',
            requiredContext: ['Workflow inventory', 'Data classification', 'Tool catalog', 'Skill catalog', 'Approval policy', 'Metrics plan'],
            instructions: [
              'Use Cowork for planning artifacts.',
              'Use Codex for repo-grounded implementation.',
              'Use OpenClaw for local read-only operators.',
              'Use NemoClaw-style controls for risky execution.',
              'Use Hermes for repeatable business workflows.',
              'Define logs, evals, approvals, rollout, and incident response.',
            ],
            expectedOutput: ['Architecture diagram', 'Harness responsibility matrix', 'Policy map', 'Rollout plan', 'Eval plan'],
            evaluationChecklist: [
              'Each harness has one clear job.',
              'Handoffs are concrete artifacts.',
              'Risky actions are gated.',
              'Marketplace policy exists.',
              'Reliability and cost are measured.',
            ],
            commonFailureModes: ['Harness sprawl', 'No governance owner', 'No evals', 'Uncontrolled connectors'],
            suggestedImprovements: ['Add internal marketplace', 'Add quarterly skill review', 'Add incident drills'],
          },
        ],
        practicalExample:
          'Present the architecture as a CTO interview answer, then map it to the first 90 days of rollout.',
        harnessRelevance: 'This is the course synthesis across all five harnesses.',
        commonMistakes: ['No handoff artifacts', 'No stop conditions', 'No enterprise rollout plan.'],
      },
    ],
  },
]

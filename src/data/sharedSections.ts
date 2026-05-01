import type { FeatureMatrixRow, LessonSection, SetupStep } from '../types/course'

export const harnessFeatureRows: FeatureMatrixRow[] = [
  {
    feature: 'Primary work surface',
    codex: 'Repositories, worktrees, diffs, tests, local commands',
    claudeCowork: 'Desktop projects, local folders, documents, spreadsheets, connected tools',
    openclaw: 'Local workstation or server runtime with messages, browser, shell, files, and skills',
    nemoclaw: 'Sandboxed OpenClaw-style runtime with policy and managed inference paths',
    hermes: 'CLI and gateway workflows with memory, tools, scheduled automations, and skills',
  },
  {
    feature: 'Best use case',
    codex: 'Feature work, bug fixes, refactors, tests, docs, PR preparation',
    claudeCowork: 'Product strategy, research synthesis, reports, planning, document and data work',
    openclaw: 'Personal automation, browser checks, local file tasks, message-driven agents',
    nemoclaw: 'Higher-risk automation that needs sandboxing, logs, egress control, and approvals',
    hermes: 'Repeatable business workflows, personal operators, content systems, recurring tasks',
  },
  {
    feature: 'Installation complexity',
    codex: 'Low: npm package, first-run sign-in, then repo-level setup',
    claudeCowork: 'Low to medium: desktop app, project folders, connectors, and instructions',
    openclaw: 'Medium: installer/onboarding, daemon/gateway, workspace setup, tool permissions',
    nemoclaw: 'High: container runtime, hardware/resources, sandbox onboarding, policy review',
    hermes: 'Medium: one-line installer, provider setup, tool and gateway configuration',
  },
  {
    feature: 'Skill model',
    codex: 'Codex skills and repo instructions; `AGENTS.md` acts as a short map to deeper docs',
    claudeCowork: 'Skills through Claude/Claude Code; personal, project, enterprise, and plugin sources',
    openclaw: 'Workspace `skills` folders and ClawHub-installed `SKILL.md` packages',
    nemoclaw: 'OpenClaw skills running behind sandbox, policy, and network boundaries',
    hermes: 'Local `~/.hermes/skills`, shared external dirs, and agent-managed skill updates',
  },
  {
    feature: 'Marketplace support',
    codex: 'Use repo-local instructions and available Codex/plugin ecosystem where enabled',
    claudeCowork: 'Claude plugins bundle skills, connectors, and sub-agents; org marketplaces can distribute them',
    openclaw: 'ClawHub provides public skill search, install, update, publish, and sync flows',
    nemoclaw: 'Enterprise should prefer curated internal registries or verified skill sources',
    hermes: 'Skills can be local, shared, migrated, or curated through Hermes workflows',
  },
  {
    feature: 'Security model',
    codex: 'Sandboxing, approval modes, diff review, command checks, and least-privilege repo access',
    claudeCowork: 'Connected folders, permission modes, VM isolation for execution, connector/network controls',
    openclaw: 'Configured tool permissions, workspace scoping, skill review, and operator supervision',
    nemoclaw: 'Sandbox hardening, policy layers, routed inference, state management, and audit-minded operation',
    hermes: 'Tool configuration, gateway scoping, skill review, memory hygiene, and scheduled task boundaries',
  },
  {
    feature: 'Enterprise fit',
    codex: 'Strong for engineering teams when CI, review, docs, and ownership are mature',
    claudeCowork: 'Strong for knowledge work with managed folders, plugins, and clear data policies',
    openclaw: 'Useful for experiments and internal operators, but needs extra governance before broad rollout',
    nemoclaw: 'Designed for stronger governance and private deployment experiments; early-preview caveats apply',
    hermes: 'Useful for team workflows if skills, memory, tools, and gateway access are curated',
  },
]

export function featureMatrixSection(title = 'Five-harness feature comparison'): LessonSection {
  return {
    kind: 'featureMatrix',
    title,
    rows: harnessFeatureRows,
    note:
      'This matrix is a working decision aid. Validate current installation and enterprise availability against the vendor docs before deploying.',
  }
}

export const codexSetupSteps: SetupStep[] = [
  {
    title: 'Install the CLI',
    body:
      'Install Codex as a local terminal agent. The official setup path lists npm first, and the CLI runs in the selected directory.',
    commands: ['npm i -g @openai/codex'],
    verify: ['Run `codex` from a repository or empty test folder.', 'Confirm the first-run sign-in flow appears.'],
  },
  {
    title: 'Authenticate and choose the repo',
    body:
      'Sign in with a ChatGPT account or API key, then start Codex from the repository root so file search, instructions, tests, and diffs share the same working directory.',
    commands: ['cd /path/to/repo', 'codex'],
    verify: ['Ask Codex to summarize the repo structure without editing files.', 'Confirm it sees the expected package manager and test commands.'],
  },
  {
    title: 'Add a short `AGENTS.md` map',
    body:
      'Use `AGENTS.md` as a table of contents, not a giant manual. Point Codex to source-of-truth docs, build commands, test expectations, and approval rules.',
    verify: ['The file is short enough to scan.', 'It links to deeper docs instead of copying every convention inline.'],
    warnings: ['Do not store secrets or temporary task notes in `AGENTS.md`.', 'Do not bury critical test commands in stale prose.'],
  },
]

export const claudeCoworkSetupSteps: SetupStep[] = [
  {
    title: 'Install and open Claude Desktop',
    body:
      'Claude Cowork is accessed through the Claude desktop app on paid plans. Start with a contained project folder before connecting broad workspace data.',
    verify: ['The Cowork tab is available.', 'A test project folder can be selected and read.'],
  },
  {
    title: 'Connect folders and tools deliberately',
    body:
      'Cowork can read and write inside connected folders and can use connected tools such as Drive, Gmail, Slack, Calendar, or browser access where enabled.',
    verify: ['The project folder contains only safe starter files.', 'Connectors needed for the task are enabled and unrelated connectors are disabled.'],
    warnings: ['Do not point Cowork at broad home directories or sensitive client folders during first setup.'],
  },
  {
    title: 'Set instructions at the right level',
    body:
      'Use global instructions for stable preferences, project instructions for project-specific rules, and skills for repeatable processes that should load only when relevant.',
    verify: ['Ask Cowork what it knows about the project context.', 'Confirm it distinguishes standing instructions from task-specific files.'],
  },
  {
    title: 'Choose a permission mode',
    body:
      'Use ask-before-acting for unfamiliar files, external sends, destructive changes, or anything you are still calibrating.',
    verify: ['A test task pauses before sensitive actions.', 'The user can stop or delete tasks from the desktop task list.'],
  },
]

export const openClawSetupSteps: SetupStep[] = [
  {
    title: 'Check runtime requirements',
    body:
      'OpenClaw expects Node 22+ and supports macOS, Linux, and Windows, with WSL2 recommended on Windows.',
    commands: ['node --version'],
    verify: ['Node reports v22 or newer, or the installer is allowed to install it.'],
  },
  {
    title: 'Run the installer and onboarding wizard',
    body:
      'The recommended installer handles Node detection, global CLI installation, and onboarding.',
    commands: ['curl -fsSL https://openclaw.ai/install.sh | bash'],
    verify: ['OpenClaw launches onboarding.', 'The daemon/gateway setup completes without port or dependency errors.'],
  },
  {
    title: 'Install ClawHub only when you need shared skills',
    body:
      'ClawHub is the public OpenClaw skills registry. Treat every third-party skill as untrusted code until reviewed.',
    commands: ['npm i -g clawhub', 'clawhub search "calendar"', 'clawhub install <skill-slug>'],
    verify: ['The installed skill appears in the workspace `skills` directory.', 'A new OpenClaw session can see the skill.'],
    warnings: ['Review `SKILL.md` and supporting files before enabling broad tools or credentials.'],
  },
]

export const nemoClawSetupSteps: SetupStep[] = [
  {
    title: 'Confirm prerequisites and early-preview status',
    body:
      'NemoClaw is documented as early-preview software. Treat it as an experimentation and evaluation stack unless your organization has validated the current release.',
    commands: ['docker --version', 'node --version'],
    verify: ['Docker or a supported container runtime is running.', 'The machine has enough CPU, RAM, disk, and network access for sandbox image setup.'],
    warnings: ['Interfaces and behavior may change.', 'Docker permission problems are common on first setup.'],
  },
  {
    title: 'Install and onboard the sandboxed agent',
    body:
      'The installer creates a sandbox, configures inference, and applies default security policies around the OpenClaw instance.',
    commands: ['curl -fsSL https://www.nvidia.com/nemoclaw.sh | bash'],
    verify: ['The installer reports sandbox, model, status, and log commands.', 'Run `nemoclaw my-assistant status` after onboarding.'],
  },
  {
    title: 'Connect and inspect logs before real work',
    body:
      'Use a harmless hello-world task before giving the sandbox credentials, tools, or real workflows.',
    commands: [
      'nemoclaw my-assistant connect',
      'openclaw agent --agent main --local -m "hello" --session-id test',
      'nemoclaw my-assistant logs --follow',
    ],
    verify: ['The sandbox responds to a trivial request.', 'Logs show the request path and any policy decisions.'],
  },
]

export const hermesSetupSteps: SetupStep[] = [
  {
    title: 'Run the installer',
    body:
      'Hermes provides a one-line installer for Linux, macOS, WSL2, and Termux. Native Windows users should use WSL2.',
    commands: ['curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash'],
    verify: ['The installer creates the `hermes` command.', 'Reload the shell and run the CLI.'],
  },
  {
    title: 'Configure model, tools, and gateway',
    body:
      'Run the setup wizard first, then adjust model providers, enabled tools, and message gateways based on the workflow.',
    commands: ['source ~/.zshrc', 'hermes setup', 'hermes model', 'hermes tools', 'hermes gateway setup'],
    verify: ['`hermes doctor` reports a usable configuration.', 'Only tools needed for the starter workflow are enabled.'],
  },
  {
    title: 'Set up skills and memory deliberately',
    body:
      'Hermes uses local skills in `~/.hermes/skills` and can scan external skill directories as read-only shared sources.',
    commands: ['mkdir -p ~/.hermes/skills/dashboard-audit', 'hermes doctor'],
    verify: ['Skills appear in the skill index or slash-command list.', 'Shared skill dirs are read-only if multiple users depend on them.'],
  },
]

export function setupGuideSection(title: string, intro: string, steps: SetupStep[], sourceNote: string): LessonSection {
  return {
    kind: 'setupGuide',
    title,
    intro,
    steps,
    sourceNote,
  }
}

export function ctoRubricSection(title: string, prompt: string): LessonSection {
  return {
    kind: 'interviewRubric',
    title,
    prompt,
    strongSignals: [
      'Separates personal workstation automation from enterprise-controlled deployment.',
      'Defines tool permissions, data boundaries, approval gates, logs, and rollback paths before scaling.',
      'Uses harnesses for their verification loops instead of treating every model interface as equivalent.',
      'Describes measurable reliability: evals, regression cases, incident reviews, and cost telemetry.',
    ],
    weakSignals: [
      'Speaks only in productivity slogans or vendor enthusiasm.',
      'Skips identity, data privacy, policy enforcement, and audit requirements.',
      'Cannot explain where agents must stop or how failures are detected.',
      'Treats public skills and plugins as safe because they are convenient.',
    ],
    followUps: [
      'Which actions require human approval in your first 90 days?',
      'How would you measure whether agents are improving engineering throughput without increasing risk?',
      'What is your policy for third-party skills, plugins, and MCP servers?',
      'How do you make local workstation wins portable to enterprise governance?',
    ],
  }
}

export function decisionChecklist(title: string, intro: string, items: string[]): LessonSection {
  return { kind: 'decisionChecklist', title, intro, items }
}

export function fileTemplate(title: string, path: string, purpose: string, template: string, notes: string[]): LessonSection {
  return { kind: 'fileTemplate', title, path, purpose, template, notes }
}

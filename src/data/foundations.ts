import type { ModuleInput } from './courseBuilder'
import { decisionChecklist, featureMatrixSection } from './sharedSections'

export const foundationModules: ModuleInput[] = [
  {
    id: 'module-foundations',
    slug: 'foundations',
    title: 'Foundations',
    summary: 'The core mental model for agentic automation before choosing a harness.',
    track: 'foundations',
    lessons: [
      {
        title: 'What Agentic Automation Actually Is',
        summary: 'A practical definition of agents as delegated systems with tools, feedback, and boundaries.',
        diagramId: 'basic-agent-loop',
        objectives: [
          'Define agentic automation without marketing language.',
          'Explain why tool use and feedback matter more than chat quality alone.',
          'Name the boundary where an agent must stop or escalate.',
        ],
        keyConcepts: ['agent loop', 'delegation', 'feedback', 'stop condition'],
        sections: [
          {
            kind: 'text',
            heading: 'The useful definition',
            body:
              'An automation becomes agentic when it can observe changing state, choose a next step, use tools, check the result, and decide whether to continue, retry, remember, or stop.',
            bullets: [
              'The agent is not valuable because it speaks fluently. It is valuable because it can move work forward through uncertainty.',
              'The harness is the runtime around the model: context, tools, memory, permissions, and reporting.',
              'The human still owns the outcome, especially when money, identity, customer data, or production systems are involved.',
            ],
          },
          {
            kind: 'callout',
            variant: 'concept',
            title: 'Practical test',
            body:
              'If the system cannot inspect state, take an action, compare the result to expectations, and stop at a boundary, it is probably a chatbot, script, or workflow rather than an agentic automation.',
          },
          decisionChecklist('Agentic readiness checklist', 'Use this before handing a workflow to any harness.', [
            'The desired outcome is concrete enough to inspect.',
            'The agent has the minimum context needed to act.',
            'Allowed tools are explicit and scoped.',
            'The first run can be done in dry-run or low-risk mode.',
            'There is a clear approval gate for destructive or external actions.',
            'The result can be checked by tests, logs, review, comparison, or a human rubric.',
          ]),
        ],
        practicalExample:
          'Instead of “organize my business,” delegate “read this folder of invoices, create a dated expense workbook, flag missing vendor names, and stop before sending anything externally.”',
        harnessRelevance:
          'Codex, Claude Cowork, OpenClaw, NemoClaw, and Hermes all wrap the same basic loop, but they expose different tools, memory, and permission boundaries.',
        commonMistakes: [
          'Calling any multi-step prompt an agent.',
          'Confusing confidence with verified progress.',
          'Skipping the stop condition because the demo works once.',
        ],
      },
      {
        title: 'Chatbot vs Copilot vs Workflow vs Agent',
        summary: 'Learn the operational difference between conversation, assistance, fixed automation, and delegated execution.',
        diagramId: 'chatbot-workflow-agent',
        objectives: [
          'Classify an automation by how it decides the next step.',
          'Identify when deterministic scripts are preferable.',
          'Explain why copilots and agents need different safety expectations.',
        ],
        keyConcepts: ['chatbot', 'copilot', 'workflow', 'agent'],
        sections: [
          {
            kind: 'comparison',
            title: 'Automation types',
            columns: ['Type', 'What it does', 'Good for', 'Failure mode'],
            rows: [
              ['Chatbot', 'Responds to a prompt in text', 'Questions, drafts, explanations', 'Sounds right without acting or checking'],
              ['Copilot', 'Assists while a human drives', 'Inline coding, writing, analysis', 'Human assumes it checked more than it did'],
              ['Workflow', 'Runs predefined steps', 'Predictable inputs and repeatable systems', 'Breaks when state changes outside the script'],
              ['Agent', 'Chooses actions from state and feedback', 'Ambiguous work with tool use and review', 'Overreaches when boundaries are vague'],
            ],
            note:
              'The model can be identical across these categories. The difference is the control loop and who decides the next step.',
          },
          {
            kind: 'text',
            heading: 'The CTO-level distinction',
            body:
              'A CTO should not “add agents” as a blanket category. They should classify work by determinism, risk, and verifiability, then choose the lightest system that handles the job.',
            bullets: [
              'Use scripts when the path is fixed and inputs are structured.',
              'Use copilots when the human should remain continuously in control.',
              'Use agents when useful progress requires decisions between tool calls.',
              'Use guardrailed runtimes when the agent can touch sensitive systems.',
            ],
          },
        ],
        practicalExample:
          'A monthly report with stable SQL queries can be a workflow. A report that must find relevant files, reconcile missing context, draft a narrative, and ask before emailing is an agentic workflow.',
        harnessRelevance:
          'Harness selection should start from this distinction. Codex is not better because it is “more agentic”; it is better when code changes and tests are the right feedback loop.',
        commonMistakes: [
          'Using an agent when a cron job and SQL query would be safer.',
          'Using a chatbot for work that needs file access and durable outputs.',
          'Treating “autonomous” as a product requirement instead of a risk level.',
        ],
      },
      {
        title: 'The Agent Loop: Observe, Plan, Act, Check, Remember',
        summary: 'Break the loop into inspectable stages that can be tested and governed.',
        diagramId: 'basic-agent-loop',
        objectives: [
          'Describe each stage of the agent loop.',
          'Decide what should be logged at each stage.',
          'Design retries and memory updates without creating runaway behavior.',
        ],
        keyConcepts: ['observe', 'plan', 'act', 'check', 'memory'],
        sections: [
          {
            kind: 'text',
            heading: 'What each stage owns',
            body:
              'The loop is simple, but reliable execution depends on making each stage explicit. Hidden observations and unlogged assumptions are where agent systems become impossible to debug.',
            bullets: [
              'Observe: load the request, relevant files, current state, and constraints.',
              'Plan: choose a small next action and state the expected result.',
              'Act: use a permitted tool with validated inputs.',
              'Check: compare output against the expected result and decide whether to continue.',
              'Remember: persist only reusable facts, decisions, procedures, or preferences.',
            ],
          },
          {
            kind: 'implementationLab',
            title: 'Design a loop for a dashboard audit',
            scenario:
              'A personal agent checks a SaaS dashboard every morning and reports failed jobs without changing production state.',
            steps: [
              'Define the exact dashboard, account, and read-only permissions.',
              'List what counts as a failure and what evidence must be captured.',
              'Require the agent to stop before retrying jobs, deleting records, or sending customer messages.',
              'Write the report format and log location.',
            ],
            deliverables: ['Agent prompt', 'Read-only tool policy', 'Failure summary template', 'Escalation rule'],
            verification: ['Run on a test account', 'Compare agent summary against manual dashboard inspection'],
            failureModes: ['Agent clicks remediation buttons', 'Agent misses paginated failures', 'Agent summarizes without evidence'],
          },
        ],
        practicalExample:
          'A Codex loop might inspect files, plan a patch, edit, run tests, and review the diff. An OpenClaw loop might receive a message, open a browser, inspect a page, save a report, and reply.',
        harnessRelevance:
          'Every harness should expose enough loop state that a human can tell what happened and why.',
        commonMistakes: [
          'Letting the agent retry indefinitely.',
          'Writing memory before verifying the result.',
          'Treating the plan as decoration instead of a control surface.',
        ],
      },
      {
        title: 'Context, Memory, Tools, and Permissions',
        summary: 'Understand the four resources that determine what an agent can do safely.',
        diagramId: 'tool-call-lifecycle',
        objectives: [
          'Separate temporary context from durable memory.',
          'Explain why tool permissions are product design, not just security settings.',
          'Choose where a harness should store workspace rules.',
        ],
        keyConcepts: ['context', 'memory', 'tools', 'permissions'],
        sections: [
          {
            kind: 'text',
            heading: 'Four levers',
            body:
              'Agent behavior is shaped less by a clever prompt than by what the harness loads, what it remembers, what it can touch, and what it must ask before doing.',
            bullets: [
              'Context is what the agent sees right now.',
              'Memory is what survives into future work.',
              'Tools are how the agent changes the world.',
              'Permissions define the parts of the world the agent is not allowed to change alone.',
            ],
          },
          {
            kind: 'callout',
            variant: 'mistake',
            title: 'The common architecture bug',
            body:
              'Teams often build tool access first and policy later. That reverses the order. Start by deciding what the agent must never do without approval, then expose only the tools that fit that boundary.',
          },
          decisionChecklist('Permission boundary checklist', 'A boundary is useful only if it is specific enough to enforce.', [
            'Read-only vs write access is explicit.',
            'External sends require approval.',
            'Deletes, payments, database writes, and production deploys require approval.',
            'Secrets are stored outside prompt and skill files.',
            'Tool logs record the actor, action, input summary, output summary, and decision.',
          ]),
        ],
        practicalExample:
          'Give a browser automation agent read-only dashboard credentials first. Add write access only after you have logs, dry-run behavior, and approval prompts.',
        harnessRelevance:
          'Codex permissions focus on file and command access. Cowork permissions focus on folders, connectors, and actions. OpenClaw and Hermes need explicit tool and skill governance. NemoClaw adds a stronger runtime boundary.',
        commonMistakes: [
          'Putting secrets in instruction files.',
          'Giving every skill every tool.',
          'Letting durable memory accumulate stale facts without review.',
        ],
      },
    ],
  },
  {
    id: 'module-harness-selection',
    slug: 'harness-selection-and-feature-comparison',
    title: 'Harness Selection and Feature Comparison',
    summary: 'Choose between Codex, Claude Cowork, OpenClaw, NemoClaw, and Hermes by fit, risk, and verification method.',
    track: 'comparison',
    lessons: [
      {
        title: 'The Five Harnesses at a Glance',
        summary: 'Compare the five systems by work surface, setup, skill model, security, and enterprise fit.',
        diagramId: 'multi-harness-stack',
        objectives: [
          'Explain what each harness is best suited to own.',
          'Use feature comparison instead of vendor preference.',
          'Identify when harnesses should be combined rather than forced into one tool.',
        ],
        keyConcepts: ['harness comparison', 'tool surface', 'verification loop', 'governance'],
        sections: [
          featureMatrixSection(),
          {
            kind: 'text',
            heading: 'How to read the matrix',
            body:
              'The right harness is the one whose operating surface and verification loop match the work. If a task produces a diff, Codex has a strong loop. If it produces a strategy memo, Cowork may be the better front end. If it touches local tools or messaging, OpenClaw or Hermes may own execution. If risk rises, move the action behind NemoClaw-style policy and sandboxing.',
            bullets: [
              'Do not compare only model quality.',
              'Compare how the harness loads context, uses tools, handles permissions, and reports work.',
              'Prefer one owner per workflow stage.',
            ],
          },
        ],
        practicalExample:
          'A product launch workflow might use Cowork for the brief, Codex for code changes, Hermes for the marketing checklist, OpenClaw for dashboard checks, and NemoClaw-style controls for risky production actions.',
        harnessRelevance:
          'This lesson is the navigation layer for all five dedicated harness sections.',
        commonMistakes: [
          'Trying to make every harness do every task.',
          'Ignoring the verification loop.',
          'Skipping enterprise controls because the personal workflow worked once.',
        ],
      },
      {
        title: 'Choosing the Right Harness for the Job',
        summary: 'Use a decision tree based on work surface, autonomy, risk, and expected artifact.',
        diagramId: 'harness-selection-tree',
        objectives: [
          'Choose a harness from task characteristics.',
          'Split planning, execution, and governance into separate stages.',
          'Define when a task should not use an agent.',
        ],
        keyConcepts: ['decision tree', 'artifact', 'risk', 'handoff'],
        sections: [
          {
            kind: 'text',
            heading: 'Start with the artifact',
            body:
              'The easiest way to choose a harness is to ask what the finished artifact should be and how it will be checked.',
            bullets: [
              'Diff, tests, or repo docs: start with Codex.',
              'PRD, strategy, critique, research synthesis, or document: start with Claude Cowork.',
              'Browser state, local files, shell, messages, or recurring workstation tasks: evaluate OpenClaw or Hermes.',
              'Sensitive actions, long-running tasks, or organizational deployment: evaluate NemoClaw-style governance.',
            ],
          },
          decisionChecklist('Harness choice questions', 'Answer these before choosing the harness.', [
            'Where does the work happen?',
            'What should the agent produce?',
            'What tools must it use?',
            'What can be verified automatically?',
            'Which actions require approval?',
            'What context must be durable across runs?',
            'Who owns the workflow after the prototype works?',
          ]),
        ],
        practicalExample:
          'For “automate job applications,” Cowork can structure positioning, Hermes can run a repeatable workflow, OpenClaw can inspect pages, and the agent must stop before submitting.',
        harnessRelevance:
          'Harness choice is a system-design decision. The same business outcome may need multiple harnesses at different stages.',
        commonMistakes: [
          'Choosing based on familiarity instead of task surface.',
          'Skipping handoff artifacts.',
          'Treating high autonomy as a goal instead of a risk to earn.',
        ],
      },
      {
        title: 'How Harnesses Work Together',
        summary: 'Design a multi-harness stack with clean ownership and handoff artifacts.',
        diagramId: 'multi-harness-stack',
        objectives: [
          'Assign planning, execution, guardrails, and review to separate layers.',
          'Define handoff artifacts between harnesses.',
          'Avoid mixing responsibilities inside one prompt.',
        ],
        keyConcepts: ['multi-harness stack', 'handoff', 'orchestration', 'review'],
        sections: [
          {
            kind: 'text',
            heading: 'One harness, one job',
            body:
              'Multi-harness automation fails when every layer tries to own the whole workflow. It works when each layer produces a concrete artifact that the next layer can inspect.',
            bullets: [
              'Cowork can produce a brief or PRD.',
              'Codex can implement repo changes from a brief.',
              'Hermes can encode the repeatable business workflow.',
              'OpenClaw can operate local tools or messaging surfaces.',
              'NemoClaw can enforce sandbox, policy, and approval boundaries for risky execution.',
            ],
          },
          {
            kind: 'implementationLab',
            title: 'Design a multi-harness launch workflow',
            scenario:
              'A CTO wants an agentic workflow that turns a product idea into implementation, QA, docs, and launch messaging.',
            steps: [
              'Use Cowork to produce the PRD, assumptions, and open questions.',
              'Use Codex to implement the smallest repo change with tests.',
              'Use Hermes to generate launch assets from approved positioning.',
              'Use OpenClaw to check staging dashboards and report readiness.',
              'Put destructive deploy or customer-message actions behind approval gates.',
            ],
            deliverables: ['PRD', 'Implementation diff', 'Launch checklist', 'Dashboard readiness report', 'Approval log'],
            verification: ['Tests pass', 'Artifacts cite inputs', 'Risky actions are blocked until approved'],
            failureModes: ['No clear owner', 'Handoff artifact is vague', 'Agent sends external messages before review'],
          },
        ],
        practicalExample:
          'A human approves the Cowork PRD before Codex edits code, then approves the Codex diff before Hermes or OpenClaw trigger downstream work.',
        harnessRelevance:
          'This is the pattern a CTO should use when moving from personal productivity experiments to team-level operations.',
        commonMistakes: [
          'Letting a planning harness directly execute risky work.',
          'Failing to version the handoff artifact.',
          'Building a chain that cannot be debugged when a downstream step fails.',
        ],
      },
    ],
  },
]

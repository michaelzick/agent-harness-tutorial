import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CapstoneProject } from '../src/components/CapstoneProject'
import { DecisionChecklist } from '../src/components/DecisionChecklist'
import { FeatureMatrix } from '../src/components/FeatureMatrix'
import { FileTemplate } from '../src/components/FileTemplate'
import { ImplementationLab } from '../src/components/ImplementationLab'
import { InterviewRubric } from '../src/components/InterviewRubric'
import { SetupGuide } from '../src/components/SetupGuide'
import { SkillRecipe } from '../src/components/SkillRecipe'
import { WorkflowGuide } from '../src/components/WorkflowGuide'
import type { FeatureMatrixRow, WorkflowMetric, WorkflowStep } from '../src/types/course'

describe('CapstoneProject', () => {
  const section = {
    kind: 'capstone' as const,
    goal: 'Build a multi-harness system',
    scenario: 'You are designing an agent for a real estate firm.',
    requiredContext: ['CRM export', 'Lead database'],
    instructions: ['Set up the harness.', 'Connect the CRM.'],
    expectedOutput: ['Agent summary', 'Lead report'],
    evaluationChecklist: ['Did the agent run?', 'Were guardrails respected?'],
    commonFailureModes: ['No approval gate', 'Overly broad access'],
    suggestedImprovements: ['Add rate limiting', 'Narrow tool permissions'],
  }

  it('renders the goal as a heading and the scenario as body text', () => {
    render(<CapstoneProject section={section} />)
    expect(screen.getByRole('heading', { level: 2, name: section.goal })).toBeInTheDocument()
    expect(screen.getByText(section.scenario)).toBeInTheDocument()
  })

  it('renders required context and instructions list items', () => {
    render(<CapstoneProject section={section} />)
    expect(screen.getByText('Required context')).toBeInTheDocument()
    expect(screen.getByText('CRM export')).toBeInTheDocument()
    expect(screen.getByText('Instructions')).toBeInTheDocument()
    expect(screen.getByText('Connect the CRM.')).toBeInTheDocument()
  })

  it('renders evaluation checklist and common failure modes', () => {
    render(<CapstoneProject section={section} />)
    expect(screen.getByText('Evaluation checklist')).toBeInTheDocument()
    expect(screen.getByText('Were guardrails respected?')).toBeInTheDocument()
    expect(screen.getByText('Common failure modes')).toBeInTheDocument()
    expect(screen.getByText('No approval gate')).toBeInTheDocument()
  })
})

describe('ImplementationLab', () => {
  it('renders the title, scenario, all panels, and their items', () => {
    render(
      <ImplementationLab
        title="Codex setup lab"
        scenario="Install and configure Codex for a new repo."
        steps={['Clone the repo.', 'Run npm install.']}
        deliverables={['Working Codex config', 'AGENTS.md draft']}
        verification={['Codex runs without errors.', 'Tests pass.']}
        failureModes={['Missing API key', 'Wrong Node version']}
      />,
    )
    expect(screen.getByRole('heading', { level: 2, name: 'Codex setup lab' })).toBeInTheDocument()
    expect(screen.getByText('Install and configure Codex for a new repo.')).toBeInTheDocument()
    expect(screen.getByText('Steps')).toBeInTheDocument()
    expect(screen.getByText('Clone the repo.')).toBeInTheDocument()
    expect(screen.getByText('Deliverables')).toBeInTheDocument()
    expect(screen.getByText('Working Codex config')).toBeInTheDocument()
    expect(screen.getByText('Verification')).toBeInTheDocument()
    expect(screen.getByText('Tests pass.')).toBeInTheDocument()
    expect(screen.getByText('Failure modes')).toBeInTheDocument()
    expect(screen.getByText('Missing API key')).toBeInTheDocument()
  })
})

describe('SetupGuide', () => {
  it('renders the title, intro, and step titles', () => {
    render(
      <SetupGuide
        title="Codex setup guide"
        intro="Follow these steps to get started."
        steps={[
          { title: 'Install the CLI', body: 'Run the installer.' },
          { title: 'Authenticate', body: 'Set your API key.' },
        ]}
      />,
    )
    expect(screen.getByRole('heading', { level: 2, name: 'Codex setup guide' })).toBeInTheDocument()
    expect(screen.getByText('Follow these steps to get started.')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Install the CLI' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Authenticate' })).toBeInTheDocument()
  })

  it('renders commands inside code blocks when provided', () => {
    render(
      <SetupGuide
        title="T"
        intro="I"
        steps={[{ title: 'Install', body: 'Install it.', commands: ['npm i -g @openai/codex'] }]}
      />,
    )
    expect(screen.getByText('npm i -g @openai/codex')).toBeInTheDocument()
  })

  it('renders the optional sourceNote when provided', () => {
    render(
      <SetupGuide
        title="T"
        intro="I"
        steps={[{ title: 'Step', body: 'Body.' }]}
        sourceNote="See official docs for the latest version."
      />,
    )
    expect(screen.getByText('See official docs for the latest version.')).toBeInTheDocument()
  })

  it('renders no sourceNote when omitted', () => {
    render(<SetupGuide title="T" intro="I" steps={[{ title: 'Step', body: 'Body.' }]} />)
    expect(screen.queryByText('See official docs for the latest version.')).toBeNull()
  })
})

describe('SkillRecipe', () => {
  it('renders the title, use case, trigger, and file path', () => {
    render(
      <SkillRecipe
        title="PR review recipe"
        useCase="Automate standard PR review feedback."
        trigger="When a new PR is opened."
        filePath=".claude/skills/pr-review.md"
        template="# PR Review\nReview the diff for issues."
        reviewChecklist={['Check for security issues.', 'Verify test coverage.']}
        safetyNotes={['Do not auto-merge.', 'Always request human approval.']}
      />,
    )
    expect(screen.getByRole('heading', { level: 2, name: 'PR review recipe' })).toBeInTheDocument()
    expect(screen.getByText('Automate standard PR review feedback.')).toBeInTheDocument()
    expect(screen.getByText('When a new PR is opened.')).toBeInTheDocument()
    expect(screen.getByText('.claude/skills/pr-review.md')).toBeInTheDocument()
  })

  it('renders the template code and checklist items', () => {
    render(
      <SkillRecipe
        title="T"
        useCase="U"
        trigger="Tr"
        filePath="path.md"
        template="## My Template"
        reviewChecklist={['Item A']}
        safetyNotes={['Note B']}
      />,
    )
    expect(screen.getByText('## My Template')).toBeInTheDocument()
    expect(screen.getByText('Item A')).toBeInTheDocument()
    expect(screen.getByText('Note B')).toBeInTheDocument()
  })
})

describe('FeatureMatrix', () => {
  const row: FeatureMatrixRow = {
    feature: 'Code editing',
    codex: 'Yes',
    claudeCowork: 'No',
    openclaw: 'Yes',
    nemoclaw: 'Partial',
    hermes: 'No',
  }

  it('renders the title and all five harness column headers', () => {
    render(<FeatureMatrix title="Capability comparison" rows={[row]} />)
    expect(screen.getByRole('heading', { name: 'Capability comparison' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Codex' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Claude Cowork' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'OpenClaw' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'NemoClaw' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Hermes' })).toBeInTheDocument()
  })

  it('renders feature row data across all harness columns', () => {
    render(<FeatureMatrix title="T" rows={[row]} />)
    expect(screen.getByRole('rowheader', { name: 'Code editing' })).toBeInTheDocument()
    expect(screen.getAllByText('Yes').length).toBeGreaterThan(0)
    expect(screen.getByText('Partial')).toBeInTheDocument()
  })

  it('renders the optional note when provided', () => {
    render(<FeatureMatrix title="T" rows={[row]} note="Subject to change." />)
    expect(screen.getByText('Subject to change.')).toBeInTheDocument()
  })
})

describe('InterviewRubric', () => {
  it('renders the title, prompt, and signal sections', () => {
    render(
      <InterviewRubric
        title="Autonomy question"
        prompt="How would you design guardrails for a new agent?"
        strongSignals={['Defines scope before launch.', 'Builds a stopping rule.']}
        weakSignals={['Says they would just try it.', 'No mention of approval gates.']}
        followUps={['What is your escalation policy?', 'How do you define done?']}
      />,
    )
    expect(screen.getByRole('heading', { level: 2, name: 'Autonomy question' })).toBeInTheDocument()
    expect(screen.getByText('How would you design guardrails for a new agent?')).toBeInTheDocument()
    expect(screen.getByText('Strong signals')).toBeInTheDocument()
    expect(screen.getByText('Defines scope before launch.')).toBeInTheDocument()
    expect(screen.getByText('Weak signals')).toBeInTheDocument()
    expect(screen.getByText('No mention of approval gates.')).toBeInTheDocument()
    expect(screen.getByText('Follow-up questions')).toBeInTheDocument()
    expect(screen.getByText('What is your escalation policy?')).toBeInTheDocument()
  })
})

describe('FileTemplate', () => {
  it('renders the title, path, purpose, template code, and notes', () => {
    render(
      <FileTemplate
        title="AGENTS.md starter"
        path="AGENTS.md"
        purpose="Defines agent permissions and constraints."
        template="# Agent rules — no prod writes without approval."
        notes={['Keep it under 200 lines.', 'Review after each sprint.']}
      />,
    )
    expect(screen.getByRole('heading', { level: 2, name: 'AGENTS.md starter' })).toBeInTheDocument()
    expect(screen.getByText('AGENTS.md')).toBeInTheDocument()
    expect(screen.getByText('Defines agent permissions and constraints.')).toBeInTheDocument()
    expect(screen.getByText('# Agent rules — no prod writes without approval.')).toBeInTheDocument()
    expect(screen.getByText('Keep it under 200 lines.')).toBeInTheDocument()
    expect(screen.getByText('Review after each sprint.')).toBeInTheDocument()
  })
})

describe('DecisionChecklist', () => {
  it('renders the title, intro, and all checklist items', () => {
    render(
      <DecisionChecklist
        title="Pre-launch checklist"
        intro="Complete before granting autonomy."
        items={['Define the stopping rule.', 'Set approval gates.', 'Write the AGENTS.md.']}
      />,
    )
    expect(screen.getByRole('heading', { level: 2, name: 'Pre-launch checklist' })).toBeInTheDocument()
    expect(screen.getByText('Complete before granting autonomy.')).toBeInTheDocument()
    expect(screen.getByText('Define the stopping rule.')).toBeInTheDocument()
    expect(screen.getByText('Set approval gates.')).toBeInTheDocument()
    expect(screen.getByText('Write the AGENTS.md.')).toBeInTheDocument()
  })
})

describe('WorkflowGuide', () => {
  const step: WorkflowStep = {
    title: 'Capture leads',
    plainEnglish: 'Pull open leads from the CRM.',
    examplePrompt: 'List all open leads from Q1.',
    harnessAction: 'Run the CRM query tool.',
  }

  const metric: WorkflowMetric = {
    label: 'Response rate',
    target: '>30%',
  }

  it('renders the harness name, outcome, and required inputs header', () => {
    render(
      <WorkflowGuide
        title="Real estate funnel"
        harnessName="Hermes"
        audience="Marketing leads at small agencies"
        outcome="Book 5 calls per week from inbound leads"
        requiredInputs={['CRM export', 'Email templates']}
        steps={[step]}
        operatingGuidance={['Review outputs daily.']}
        safetyGates={['Require approval before sending.']}
        followUpCadence={['Check every 48 hours.']}
        successMetrics={[metric]}
        technicalDeepDive={['Use rate-limited API calls.']}
      />,
    )
    expect(screen.getByText('Hermes is the only harness used in this guide.')).toBeInTheDocument()
    expect(screen.getByText('Book 5 calls per week from inbound leads')).toBeInTheDocument()
    expect(screen.getByText('Inputs to collect before using agents')).toBeInTheDocument()
    expect(screen.getByText('CRM export')).toBeInTheDocument()
  })

  it('renders step titles and harness action labels', () => {
    render(
      <WorkflowGuide
        title="T"
        harnessName="Hermes"
        audience="A"
        outcome="O"
        requiredInputs={['Input 1']}
        steps={[step]}
        operatingGuidance={['Guidance.']}
        safetyGates={['Gate.']}
        followUpCadence={['Cadence.']}
        successMetrics={[metric]}
        technicalDeepDive={['Deep dive item.']}
      />,
    )
    expect(screen.getByRole('heading', { name: 'Capture leads' })).toBeInTheDocument()
    expect(screen.getByText('Pull open leads from the CRM.')).toBeInTheDocument()
    expect(screen.getByText('Use Hermes for this step:')).toBeInTheDocument()
  })

  it('renders the technical deep-dive section', () => {
    render(
      <WorkflowGuide
        title="T"
        harnessName="Hermes"
        audience="A"
        outcome="O"
        requiredInputs={['Input 1']}
        steps={[step]}
        operatingGuidance={['Guidance.']}
        safetyGates={['Gate.']}
        followUpCadence={['Cadence.']}
        successMetrics={[metric]}
        technicalDeepDive={['Use rate-limited API calls.']}
      />,
    )
    expect(screen.getByText('Go deeper for technical operators')).toBeInTheDocument()
    expect(screen.getByText('Use rate-limited API calls.')).toBeInTheDocument()
  })

  it('renders the optional sourceNote when provided', () => {
    render(
      <WorkflowGuide
        title="T"
        harnessName="Hermes"
        audience="A"
        outcome="O"
        requiredInputs={['Input 1']}
        steps={[step]}
        operatingGuidance={['Guidance.']}
        safetyGates={['Gate.']}
        followUpCadence={['Cadence.']}
        successMetrics={[metric]}
        technicalDeepDive={['Deep dive.']}
        sourceNote="Adapted from the official Hermes playbook."
      />,
    )
    expect(screen.getByText('Adapted from the official Hermes playbook.')).toBeInTheDocument()
  })
})

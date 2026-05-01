import type { WorkflowMetric, WorkflowStep } from '../types/course'

export function WorkflowGuide({
  title,
  audience,
  outcome,
  requiredInputs,
  steps,
  harnessRoles,
  safetyGates,
  followUpCadence,
  successMetrics,
  technicalDeepDive,
  sourceNote,
}: {
  title: string
  audience: string
  outcome: string
  requiredInputs: string[]
  steps: WorkflowStep[]
  harnessRoles: string[]
  safetyGates: string[]
  followUpCadence: string[]
  successMetrics: WorkflowMetric[]
  technicalDeepDive: string[]
  sourceNote?: string
}) {
  return (
    <section className="lesson-section workflow-guide">
      <div>
        <span className="eyebrow">Example workflow</span>
        <h2>{title}</h2>
      </div>

      <div className="workflow-brief">
        <div className="mini-panel">
          <strong>Who this is for</strong>
          <p>{audience}</p>
        </div>
        <div className="mini-panel">
          <strong>Outcome</strong>
          <p>{outcome}</p>
        </div>
      </div>

      <div className="mini-panel">
        <strong>Inputs to collect before using agents</strong>
        <ul>
          {requiredInputs.map((input) => (
            <li key={input}>{input}</li>
          ))}
        </ul>
      </div>

      <div className="workflow-step-list">
        {steps.map((step, index) => (
          <article className="workflow-step" key={step.title}>
            <span className="workflow-step-index">Step {index + 1}</span>
            <div className="workflow-step-body">
              <h3>{step.title}</h3>
              <p>{step.plainEnglish}</p>
              <div className="mini-panel">
                <strong>Example prompt</strong>
                <pre className="prompt-block">{step.examplePrompt}</pre>
              </div>
              <div className="workflow-harness">
                <strong>Best harness:</strong>
                <span>{step.bestHarness}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="workflow-detail-grid">
        <WorkflowList title="Harness roles" items={harnessRoles} />
        <WorkflowList title="Safety gates" items={safetyGates} />
        <WorkflowList title="Follow-up cadence" items={followUpCadence} />
        <div className="mini-panel">
          <strong>Success metrics</strong>
          <dl className="metric-list">
            {successMetrics.map((metric) => (
              <div key={metric.label}>
                <dt>{metric.label}</dt>
                <dd>{metric.target}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="mini-panel technical-deepener">
        <strong>Go deeper for technical operators</strong>
        <ul>
          {technicalDeepDive.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      {sourceNote && <p className="quiet">{sourceNote}</p>}
    </section>
  )
}

function WorkflowList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mini-panel">
      <strong>{title}</strong>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

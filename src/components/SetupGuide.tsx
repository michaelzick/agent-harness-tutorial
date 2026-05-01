import { TerminalSquare } from 'lucide-react'
import type { SetupStep } from '../types/course'

export function SetupGuide({
  title,
  intro,
  steps,
  sourceNote,
}: {
  title: string
  intro: string
  steps: SetupStep[]
  sourceNote?: string
}) {
  return (
    <section className="lesson-section setup-guide">
      <div>
        <h2>{title}</h2>
        <p>{intro}</p>
      </div>
      <div className="setup-step-list">
        {steps.map((step, index) => (
          <article className="setup-step" key={step.title}>
            <div className="setup-step-index">{index + 1}</div>
            <div className="setup-step-body">
              <h3>{step.title}</h3>
              <p>{step.body}</p>
              {step.commands && (
                <div className="command-stack">
                  {step.commands.map((command) => (
                    <pre className="prompt-block command-block" key={command}>
                      <TerminalSquare className="icon" />
                      <code>{command}</code>
                    </pre>
                  ))}
                </div>
              )}
              {step.verify && (
                <div className="mini-panel">
                  <strong>Verify</strong>
                  <ul>
                    {step.verify.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              {step.warnings && (
                <div className="mini-panel warning-panel">
                  <strong>Watch for</strong>
                  <ul>
                    {step.warnings.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
      {sourceNote && <p className="quiet">{sourceNote}</p>}
    </section>
  )
}

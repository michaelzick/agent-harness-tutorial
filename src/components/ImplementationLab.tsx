export function ImplementationLab({
  title,
  scenario,
  steps,
  deliverables,
  verification,
  failureModes,
}: {
  title: string
  scenario: string
  steps: string[]
  deliverables: string[]
  verification: string[]
  failureModes: string[]
}) {
  return (
    <section className="lesson-section implementation-lab">
      <div>
        <span className="eyebrow">Implementation lab</span>
        <h2>{title}</h2>
        <p>{scenario}</p>
      </div>
      <div className="capstone-grid">
        <div className="mini-panel">
          <strong>Steps</strong>
          <ol>
            {steps.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>
        <div className="mini-panel">
          <strong>Deliverables</strong>
          <ul>
            {deliverables.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="mini-panel signal-panel">
          <strong>Verification</strong>
          <ul>
            {verification.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="mini-panel warning-panel">
          <strong>Failure modes</strong>
          <ul>
            {failureModes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

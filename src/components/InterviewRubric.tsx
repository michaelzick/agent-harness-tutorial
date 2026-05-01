export function InterviewRubric({
  title,
  prompt,
  strongSignals,
  weakSignals,
  followUps,
}: {
  title: string
  prompt: string
  strongSignals: string[]
  weakSignals: string[]
  followUps: string[]
}) {
  return (
    <section className="lesson-section interview-rubric">
      <div>
        <h2>{title}</h2>
        <p>{prompt}</p>
      </div>
      <div className="capstone-grid">
        <div className="mini-panel signal-panel">
          <strong>Strong signals</strong>
          <ul>
            {strongSignals.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="mini-panel warning-panel">
          <strong>Weak signals</strong>
          <ul>
            {weakSignals.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mini-panel">
        <strong>Follow-up questions</strong>
        <ul>
          {followUps.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

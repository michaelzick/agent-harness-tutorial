export function SkillRecipe({
  title,
  useCase,
  trigger,
  filePath,
  template,
  reviewChecklist,
  safetyNotes,
}: {
  title: string
  useCase: string
  trigger: string
  filePath: string
  template: string
  reviewChecklist: string[]
  safetyNotes: string[]
}) {
  return (
    <section className="lesson-section skill-recipe">
      <div>
        <h2>{title}</h2>
        <p>{useCase}</p>
      </div>
      <div className="meta-grid">
        <div className="mini-panel">
          <strong>Trigger</strong>
          <p>{trigger}</p>
        </div>
        <div className="mini-panel">
          <strong>File path</strong>
          <code>{filePath}</code>
        </div>
      </div>
      <pre className="prompt-block">
        <code>{template}</code>
      </pre>
      <div className="capstone-grid">
        <div className="mini-panel">
          <strong>Review checklist</strong>
          <ul>
            {reviewChecklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="mini-panel warning-panel">
          <strong>Safety notes</strong>
          <ul>
            {safetyNotes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

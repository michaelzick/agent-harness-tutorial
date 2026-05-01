import type { LessonSection } from '../types/course'

type CapstoneSection = Extract<LessonSection, { kind: 'capstone' }>

export function CapstoneProject({ section }: { section: CapstoneSection }) {
  return (
    <section className="lesson-section capstone-panel">
      <span className="eyebrow">Capstone</span>
      <h2>{section.goal}</h2>
      <p>{section.scenario}</p>
      <div className="capstone-grid">
        <ListBlock title="Required context" items={section.requiredContext} />
        <ListBlock title="Instructions" items={section.instructions} />
        <ListBlock title="Expected output" items={section.expectedOutput} />
        <ListBlock title="Evaluation checklist" items={section.evaluationChecklist} />
        <ListBlock title="Common failure modes" items={section.commonFailureModes} />
        <ListBlock title="Suggested improvements" items={section.suggestedImprovements} />
      </div>
    </section>
  )
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mini-panel">
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

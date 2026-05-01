export function DecisionChecklist({
  title,
  intro,
  items,
}: {
  title: string
  intro: string
  items: string[]
}) {
  return (
    <section className="lesson-section decision-checklist">
      <div>
        <h2>{title}</h2>
        <p>{intro}</p>
      </div>
      <div className="checklist-grid">
        {items.map((item) => (
          <div className="checklist-item" key={item}>
            <span />
            <p>{item}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

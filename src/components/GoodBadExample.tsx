export function GoodBadExample({
  title,
  badTitle,
  bad,
  goodTitle,
  good,
  takeaways,
}: {
  title: string
  badTitle: string
  bad: string
  goodTitle: string
  good: string
  takeaways: string[]
}) {
  return (
    <section className="lesson-section">
      <h2>{title}</h2>
      <div className="good-bad-grid">
        <article className="example-card weak">
          <span>Weak</span>
          <h3>{badTitle}</h3>
          <pre>{bad}</pre>
        </article>
        <article className="example-card strong">
          <span>Better</span>
          <h3>{goodTitle}</h3>
          <pre>{good}</pre>
        </article>
      </div>
      <ul className="compact-list">
        {takeaways.map((takeaway) => (
          <li key={takeaway}>{takeaway}</li>
        ))}
      </ul>
    </section>
  )
}

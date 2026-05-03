export function KeyConceptCallout({ title, body, bullets }: { title: string; body: string; bullets?: string[] }) {
  return (
    <section className="callout concept-callout">
      <div className="callout-title">
        <h3>{title}</h3>
      </div>
      <p>{body}</p>
      {bullets && (
        <ul>
          {bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      )}
    </section>
  )
}

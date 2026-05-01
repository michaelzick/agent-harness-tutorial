export function FileTemplate({
  title,
  path,
  purpose,
  template,
  notes,
}: {
  title: string
  path: string
  purpose: string
  template: string
  notes: string[]
}) {
  return (
    <section className="lesson-section file-template">
      <div className="template-header">
        <div>
          <h2>{title}</h2>
          <p>{purpose}</p>
        </div>
        <code>{path}</code>
      </div>
      <pre className="prompt-block">
        <code>{template}</code>
      </pre>
      <ul>
        {notes.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  )
}

import { AlertTriangle } from 'lucide-react'

export function MistakeCallout({ title, body, bullets }: { title: string; body: string; bullets?: string[] }) {
  return (
    <section className="callout mistake-callout">
      <div className="callout-title">
        <AlertTriangle className="icon" />
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

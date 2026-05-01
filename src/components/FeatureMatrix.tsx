import type { FeatureMatrixRow } from '../types/course'

const columns = ['Feature', 'Codex', 'Claude Cowork', 'OpenClaw', 'NemoClaw', 'Hermes']

export function FeatureMatrix({
  title,
  rows,
  note,
}: {
  title: string
  rows: FeatureMatrixRow[]
  note?: string
}) {
  return (
    <section className="lesson-section table-section">
      <h2>{title}</h2>
      <div className="table-scroll feature-matrix">
        <table>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.feature}>
                <th scope="row">{row.feature}</th>
                <td>{row.codex}</td>
                <td>{row.claudeCowork}</td>
                <td>{row.openclaw}</td>
                <td>{row.nemoclaw}</td>
                <td>{row.hermes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {note && <p className="quiet">{note}</p>}
    </section>
  )
}

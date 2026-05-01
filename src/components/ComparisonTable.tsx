export function ComparisonTable({
  title,
  columns,
  rows,
  note,
}: {
  title: string
  columns: string[]
  rows: string[][]
  note?: string
}) {
  return (
    <section className="lesson-section table-section">
      <h2>{title}</h2>
      <div className="table-scroll">
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
              <tr key={row.join('|')}>
                {row.map((cell) => (
                  <td key={cell}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {note && <p className="quiet">{note}</p>}
    </section>
  )
}

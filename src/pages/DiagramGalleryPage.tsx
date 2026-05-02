import { diagrams } from '../data/diagrams'
import { ReactFlowDiagram } from '../components/ReactFlowDiagram'

export function DiagramGalleryPage() {
  return (
    <div className="page-stack">
      <div className="top-bar">
        <span className="crumbs">Course / Diagrams</span>
        <span className="top-meta">{diagrams.length} DIAGRAMS</span>
      </div>

      <header className="page-header single-col">
        <span className="eyebrow">React Flow diagrams</span>
        <h1>Automation flow library</h1>
        <p>
          These diagrams replace static system maps with agentic automation flows: loops, permission gates,
          collaboration paths, and multi-harness stacks.
        </p>
      </header>
      {diagrams.map((diagram) => (
        <ReactFlowDiagram key={diagram.id} diagram={diagram} />
      ))}
    </div>
  )
}

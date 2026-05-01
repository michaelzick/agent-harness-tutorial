import { Background, Controls, ReactFlow } from '@xyflow/react'
import type { DiagramDefinition } from '../types/course'

export function ReactFlowDiagram({ diagram }: { diagram: DiagramDefinition }) {
  return (
    <section className="diagram-panel" aria-label={diagram.title}>
      <div className="diagram-header">
        <div>
          <span className="eyebrow">Diagram</span>
          <h2>{diagram.title}</h2>
        </div>
        <p>{diagram.summary}</p>
      </div>
      <div className="flow-canvas">
        <ReactFlow
          nodes={diagram.nodes}
          edges={diagram.edges}
          fitView
          fitViewOptions={{ padding: 0.18 }}
          minZoom={0.1}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          zoomOnScroll={false}
          panOnScroll
        >
          <Controls showInteractive={false} />
          <Background color="#3b4655" gap={18} size={1} />
        </ReactFlow>
      </div>
    </section>
  )
}

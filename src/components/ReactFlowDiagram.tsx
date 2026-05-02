import {
  Background,
  Controls,
  MarkerType,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
  type Edge,
  type Node,
} from '@xyflow/react'
import { useEffect, useMemo, useState } from 'react'
import type { DiagramDefinition } from '../types/course'

const FALLBACK_ACCENT = '#6cc1d2'
const NODE_BG = '#0c1320'

export function ReactFlowDiagram({ diagram }: { diagram: DiagramDefinition }) {
  return <DiagramView key={diagram.id} diagram={diagram} />
}

function DiagramView({ diagram }: { diagram: DiagramDefinition }) {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)
  const [selectedEdgeId, setSelectedEdgeId] = useState<string | null>(null)
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([])

  const connected = useMemo(() => {
    const edgeIds = new Set<string>()
    const nodeIds = new Set<string>()
    if (selectedNodeId) {
      nodeIds.add(selectedNodeId)
      diagram.edges.forEach((edge) => {
        if (edge.source === selectedNodeId || edge.target === selectedNodeId) {
          edgeIds.add(edge.id)
          nodeIds.add(edge.source)
          nodeIds.add(edge.target)
        }
      })
    }
    if (selectedEdgeId) {
      const edge = diagram.edges.find((candidate) => candidate.id === selectedEdgeId)
      if (edge) {
        edgeIds.add(edge.id)
        nodeIds.add(edge.source)
        nodeIds.add(edge.target)
      }
    }
    return { edgeIds, nodeIds }
  }, [diagram.edges, selectedEdgeId, selectedNodeId])

  useEffect(() => {
    setNodes((current) => {
      const positions = new Map(current.map((existing) => [existing.id, existing.position]))
      return buildNodes(diagram, selectedNodeId, connected.nodeIds, positions)
    })
    setEdges(buildEdges(diagram, selectedEdgeId, connected.edgeIds))
  }, [diagram, selectedNodeId, selectedEdgeId, connected.edgeIds, connected.nodeIds, setNodes, setEdges])

  return (
    <section className="diagram-panel" aria-label={diagram.title}>
      <div className="diagram-header">
        <div>
          <span className="eyebrow">Diagram</span>
          <h2>{diagram.title}</h2>
        </div>
        <p>{diagram.summary}</p>
      </div>
      <div className="flow-canvas interactive-canvas">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={(_, node) => {
            setSelectedNodeId((prev) => (prev === node.id ? null : node.id))
            setSelectedEdgeId(null)
          }}
          onEdgeClick={(_, edge) => {
            setSelectedEdgeId((prev) => (prev === edge.id ? null : edge.id))
            setSelectedNodeId(null)
          }}
          onPaneClick={() => {
            setSelectedNodeId(null)
            setSelectedEdgeId(null)
          }}
          fitView
          fitViewOptions={{ padding: 0.18 }}
          minZoom={0.28}
          maxZoom={1.35}
          nodesDraggable
          nodesConnectable={false}
          elementsSelectable
          panOnScroll
        >
          <MiniMap pannable zoomable maskColor="rgba(8, 17, 31, 0.6)" />
          <Controls showInteractive={false} />
          <Background color="#2a3445" gap={22} size={1} />
        </ReactFlow>
      </div>
    </section>
  )
}

function buildNodes(
  diagram: DiagramDefinition,
  selectedNodeId: string | null,
  connectedNodeIds: Set<string>,
  positions: Map<string, { x: number; y: number }>,
): Node[] {
  const hasSelection = selectedNodeId !== null || connectedNodeIds.size > 0
  return diagram.nodes.map((source) => {
    const accent = readAccent(source) ?? FALLBACK_ACCENT
    const isSelected = selectedNodeId === source.id
    const isConnected = connectedNodeIds.has(source.id)
    const isHighlighted = hasSelection ? isSelected || isConnected : false
    const isDimmed = hasSelection && !isHighlighted
    return {
      ...source,
      position: positions.get(source.id) ?? source.position,
      style: {
        ...(source.style ?? {}),
        borderStyle: 'solid',
        borderColor: accent,
        borderWidth: isSelected ? 3 : 2,
        background: isHighlighted ? `${accent}1f` : NODE_BG,
        color: '#edf1f5',
        opacity: isDimmed ? 0.34 : 1,
        boxShadow: isHighlighted
          ? `0 14px 28px ${accent}24`
          : '0 1px 2px rgba(0, 0, 0, 0.45)',
        padding: 12,
        transition:
          'opacity 160ms ease, background 160ms ease, box-shadow 160ms ease, border-color 160ms ease',
      },
      draggable: true,
      selectable: true,
    }
  })
}

function buildEdges(
  diagram: DiagramDefinition,
  selectedEdgeId: string | null,
  connectedEdgeIds: Set<string>,
): Edge[] {
  const hasSelection = selectedEdgeId !== null || connectedEdgeIds.size > 0
  return diagram.edges.map((source) => {
    const isSelected = selectedEdgeId === source.id
    const isConnected = connectedEdgeIds.has(source.id)
    const isHighlighted = hasSelection ? isSelected || isConnected : false
    const stroke = isHighlighted ? '#a4e3eb' : '#7e8da0'
    return {
      ...source,
      animated: isHighlighted,
      markerEnd: { type: MarkerType.ArrowClosed, color: stroke },
      style: {
        stroke,
        strokeWidth: isHighlighted ? 2.8 : 1.6,
        opacity: hasSelection ? (isHighlighted ? 1 : 0.2) : 0.85,
        transition:
          'opacity 160ms ease, stroke-width 160ms ease, stroke 160ms ease',
      },
      labelStyle: {
        fill: '#d7dee7',
        fontSize: 11,
        fontWeight: isHighlighted ? 800 : 600,
        opacity: hasSelection ? (isHighlighted ? 1 : 0.4) : 1,
      },
      labelBgStyle: { fill: '#0c1320', fillOpacity: 0.92 },
    }
  })
}

function readAccent(node: Node): string | null {
  const data = node.data
  if (data && typeof data === 'object' && 'accent' in data) {
    const value = (data as Record<string, unknown>).accent
    if (typeof value === 'string') {
      return value
    }
  }
  return null
}

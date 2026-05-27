"use client";
import { useMemo } from "react";
import ReactFlow, {
  Background, Controls, MiniMap, Handle, Position, type Node, type Edge,
} from "reactflow";
import { iconForType, labelForType, colorForType } from "@/lib/nodeMeta";

type AINode = {
  id?: string;
  name: string;
  type: string;
  parameters?: Record<string, any>;
  position?: [number, number];
};
type AIWorkflow = {
  name?: string;
  nodes?: AINode[];
  connections?: Record<string, { main: { node: string; type: string; index: number }[][] }>;
};

function NodeCard({ data }: { data: any }) {
  const Icon = data.icon;
  return (
    <div className="rounded-2xl card min-w-[230px] overflow-hidden animate-slide-up">
      <Handle type="target" position={Position.Left} />
      <div className="px-4 py-3 flex items-center gap-3" style={{ background: data.color + "12" }}>
        <div className="size-8 rounded-lg grid place-items-center" style={{ background: data.color + "22" }}>
          <Icon className="size-4" style={{ color: data.color }} />
        </div>
        <div className="min-w-0">
          <div className="text-[10px] uppercase tracking-widest text-subtle truncate">{data.kind}</div>
          <div className="text-sm font-medium truncate">{data.label}</div>
        </div>
      </div>
      {data.params && Object.keys(data.params).length > 0 && (
        <div className="px-4 py-2 text-xs border-t border-border space-y-1 max-h-32 overflow-auto">
          {Object.entries(data.params).slice(0, 4).map(([k, v]) => (
            <div key={k} className="flex justify-between gap-2">
              <span className="text-subtle">{k}</span>
              <span className="text-text/80 truncate max-w-[120px]" title={String(v)}>{
                typeof v === "string" ? v : JSON.stringify(v)
              }</span>
            </div>
          ))}
        </div>
      )}
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

const nodeTypes = { ai: NodeCard };

export default function FlowCanvas({ workflow }: { workflow: AIWorkflow | null }) {
  const { nodes, edges } = useMemo(() => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    if (!workflow?.nodes) return { nodes, edges };

    workflow.nodes.forEach((n, i) => {
      const id = n.id || n.name || `n-${i}`;
      const pos = n.position && Array.isArray(n.position)
        ? { x: n.position[0], y: n.position[1] }
        : { x: 100 + i * 280, y: 200 };
      nodes.push({
        id,
        type: "ai",
        position: pos,
        data: {
          label: n.name,
          kind: labelForType(n.type),
          icon: iconForType(n.type),
          color: colorForType(n.type),
          params: n.parameters || {},
        },
      });
    });

    if (workflow.connections) {
      Object.entries(workflow.connections).forEach(([from, def]) => {
        const arms = (def?.main || []) as { node: string; type: string; index: number }[][];
        arms.forEach((arm) => {
          arm.forEach((c) => {
            edges.push({
              id: `${from}->${c.node}`,
              source: from,
              target: c.node,
              animated: true,
              type: "smoothstep",
            });
          });
        });
      });
    }

    return { nodes, edges };
  }, [workflow]);

  if (!workflow?.nodes?.length) {
    return (
      <div className="h-full grid place-items-center text-muted bg-bg">
        <div className="text-center">
          <div className="size-16 mx-auto mb-4 rounded-2xl bg-grad-brand-soft grid place-items-center shadow-soft">
            <span className="text-3xl">✨</span>
          </div>
          <p className="font-medium text-text">Your workflow will appear here</p>
          <p className="text-xs mt-1.5">Describe an automation in the chat →</p>
        </div>
      </div>
    );
  }

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      fitView
      fitViewOptions={{ padding: 0.3 }}
      proOptions={{ hideAttribution: true }}
    >
      <Background gap={24} size={1} color="#dad8d3" />
      <Controls />
      <MiniMap
        nodeColor={(n: any) => n.data?.color || "#ff4d6d"}
        maskColor="rgba(253,250,246,0.7)"
        style={{ background: "#ffffff", border: "1px solid #ececea", borderRadius: 12 }}
      />
    </ReactFlow>
  );
}

"use client";
import { useMemo } from "react";
import ReactFlow, {
  Background, BackgroundVariant, Controls, MiniMap, Handle, Position,
  type Node, type Edge,
} from "reactflow";
import { Workflow as WorkflowIcon, Play, AlertCircle } from "lucide-react";
import { iconForType, labelForType, colorForType } from "@/lib/nodeMeta";

type AINode = {
  id?: string;
  name: string;
  type: string;
  parameters?: Record<string, any>;
  position?: [number, number];
  disabled?: boolean;
};
type AIWorkflow = {
  name?: string;
  nodes?: AINode[];
  connections?: Record<string, { main: { node: string; type: string; index: number }[][] }>;
};

/**
 * n8n-style node card.
 * Layout: [colored icon block] | [name + type subtitle]
 * Width: 240px (matches n8n proportions)
 */
function NodeCard({ data, selected }: { data: any; selected?: boolean }) {
  const Icon = data.icon;
  const color: string = data.color;
  const isTrigger: boolean = data.isTrigger;

  return (
    <div
      className={`group n8n-node ${selected ? "n8n-node-selected" : ""} ${data.disabled ? "n8n-node-disabled" : ""}`}
      style={{ ["--node-color" as any]: color }}
    >
      {/* Trigger nodes have only source handle (right). Others have both. */}
      {!isTrigger && (
        <Handle type="target" position={Position.Left} className="n8n-handle" />
      )}

      {/* Colored icon block (n8n hallmark) */}
      <div className="n8n-node-icon" style={{ background: color }}>
        <Icon className="size-6 icon-thin text-white" strokeWidth={1.6} />
        {data.error && (
          <div className="absolute -top-1 -right-1 size-4 rounded-full bg-danger grid place-items-center ring-2 ring-bg">
            <AlertCircle className="size-2.5 text-white" />
          </div>
        )}
      </div>

      {/* Body: name + type */}
      <div className="n8n-node-body">
        <div className="n8n-node-name" title={data.label}>{data.label}</div>
        <div className="n8n-node-type">{data.kind}</div>
      </div>

      {/* Hover-reveal execute button (n8n style) */}
      <button
        type="button"
        className="n8n-node-play"
        aria-label="Execute node"
        onClick={(e) => e.stopPropagation()}
      >
        <Play className="size-3 fill-current" />
      </button>

      <Handle type="source" position={Position.Right} className="n8n-handle" />
    </div>
  );
}

const nodeTypes = { n8n: NodeCard };

const TRIGGER_TYPES = new Set([
  "n8n-nodes-base.scheduleTrigger",
  "n8n-nodes-base.cron",
  "n8n-nodes-base.webhook",
  "n8n-nodes-base.manualTrigger",
  "n8n-nodes-base.emailTrigger",
  "n8n-nodes-base.formTrigger",
]);

export default function FlowCanvas({ workflow }: { workflow: AIWorkflow | null }) {
  const { nodes, edges } = useMemo(() => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    if (!workflow?.nodes) return { nodes, edges };

    workflow.nodes.forEach((n, i) => {
      const id = n.id || n.name || `n-${i}`;
      const pos = n.position && Array.isArray(n.position)
        ? { x: n.position[0], y: n.position[1] }
        : { x: 80 + i * 260, y: 180 };
      nodes.push({
        id,
        type: "n8n",
        position: pos,
        data: {
          label: n.name,
          kind: labelForType(n.type),
          icon: iconForType(n.type),
          color: colorForType(n.type),
          isTrigger: TRIGGER_TYPES.has(n.type) || n.type.toLowerCase().includes("trigger"),
          disabled: n.disabled,
          params: n.parameters || {},
        },
        // Use the node `name` as the id for connection lookup (n8n's connections use names)
      });
    });

    // Build a name→id map (since n8n connections key by name)
    const nameToId = new Map<string, string>();
    workflow.nodes.forEach((n, i) => {
      const id = n.id || n.name || `n-${i}`;
      nameToId.set(n.name, id);
    });

    if (workflow.connections) {
      Object.entries(workflow.connections).forEach(([from, def]) => {
        const arms = (def?.main || []) as { node: string; type: string; index: number }[][];
        const sourceId = nameToId.get(from) ?? from;
        arms.forEach((arm) => {
          arm.forEach((c) => {
            const targetId = nameToId.get(c.node) ?? c.node;
            edges.push({
              id: `${sourceId}->${targetId}`,
              source: sourceId,
              target: targetId,
              animated: true,
              type: "default", // bezier — n8n look
            });
          });
        });
      });
    }

    return { nodes, edges };
  }, [workflow]);

  if (!workflow?.nodes?.length) {
    return (
      <div className="h-full grid place-items-center text-muted n8n-canvas-bg">
        <div className="text-center max-w-xs sm:max-w-sm px-4 sm:px-6">
          <div className="size-12 sm:size-14 mx-auto mb-4 rounded-2xl bg-grad-brand-soft border border-primary/20 grid place-items-center shadow-glow">
            <WorkflowIcon className="size-5 sm:size-6 icon-thin text-primary" />
          </div>
          <p className="font-display text-lg sm:text-xl font-medium tracking-tight text-text text-balance">
            Your canvas is ready.
          </p>
          <p className="text-xs sm:text-sm mt-1.5 sm:mt-2 text-pretty">
            Describe an automation in the chat. Nodes will appear here as the AI builds your n8n workflow.
          </p>
        </div>
      </div>
    );
  }

  return (
    <ReactFlow
      className="n8n-canvas-bg"
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      fitView
      fitViewOptions={{ padding: 0.3, duration: 400 }}
      proOptions={{ hideAttribution: true }}
      minZoom={0.2}
      maxZoom={2.5}
      defaultEdgeOptions={{
        animated: true,
        style: { stroke: "rgba(255,255,255,0.25)", strokeWidth: 1.5 },
      }}
    >
      <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="rgba(255,255,255,0.08)" />
      <Controls
        position="bottom-left"
        showInteractive={false}
        className="n8n-controls"
      />
      <MiniMap
        nodeColor={(n: any) => n.data?.color || "#ff5a7a"}
        nodeStrokeColor="rgba(0,0,0,0.4)"
        nodeBorderRadius={6}
        maskColor="rgba(9,9,11,0.7)"
        pannable
        zoomable
        className="n8n-minimap"
      />
    </ReactFlow>
  );
}

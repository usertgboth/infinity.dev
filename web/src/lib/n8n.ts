/**
 * Thin client for n8n REST API. Run n8n separately on N8N_BASE_URL.
 * Generate API key in n8n UI: Settings → n8n API.
 * Docs: https://docs.n8n.io/api/
 */
const BASE = process.env.N8N_BASE_URL || "http://localhost:5678";
const KEY = process.env.N8N_API_KEY || "";

async function n8nFetch<T = any>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE}/api/v1${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      "X-N8N-API-KEY": KEY,
      ...(init.headers || {}),
    },
    cache: "no-store",
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`n8n ${res.status}: ${txt}`);
  }
  return res.json() as Promise<T>;
}

export type N8nNode = {
  id?: string;
  name: string;
  type: string;
  typeVersion: number;
  position: [number, number];
  parameters: Record<string, any>;
  credentials?: Record<string, any>;
};

export type N8nWorkflow = {
  id?: string;
  name: string;
  nodes: N8nNode[];
  connections: Record<string, any>;
  settings?: Record<string, any>;
  active?: boolean;
};

export const n8n = {
  async listWorkflows() {
    return n8nFetch<{ data: N8nWorkflow[] }>("/workflows");
  },
  async createWorkflow(wf: N8nWorkflow) {
    return n8nFetch<N8nWorkflow>("/workflows", {
      method: "POST",
      body: JSON.stringify({
        name: wf.name,
        nodes: wf.nodes,
        connections: wf.connections,
        settings: wf.settings || {},
      }),
    });
  },
  async updateWorkflow(id: string, wf: Partial<N8nWorkflow>) {
    return n8nFetch<N8nWorkflow>(`/workflows/${id}`, {
      method: "PUT",
      body: JSON.stringify(wf),
    });
  },
  async deleteWorkflow(id: string) {
    return n8nFetch(`/workflows/${id}`, { method: "DELETE" });
  },
  async activate(id: string) {
    return n8nFetch(`/workflows/${id}/activate`, { method: "POST" });
  },
  async deactivate(id: string) {
    return n8nFetch(`/workflows/${id}/deactivate`, { method: "POST" });
  },
  async executions() {
    return n8nFetch<{ data: any[] }>("/executions");
  },
};

export function isN8nConfigured() {
  return Boolean(BASE && KEY);
}

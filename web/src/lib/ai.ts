import OpenAI from "openai";
import type { N8nWorkflow } from "./n8n";

export const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "sk-missing" });
export const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

export const SYSTEM_PROMPT = `You are Infinity, an AI that turns plain-English requests into n8n workflow JSON.

Output ONLY a valid JSON object that matches this TypeScript shape:
{
  "name": string,
  "description": string,
  "nodes": [
    { "id": string, "name": string, "type": string, "typeVersion": number,
      "position": [number, number], "parameters": object }
  ],
  "connections": { [fromNodeName: string]: { "main": [ [ { "node": string, "type": "main", "index": 0 } ] ] } }
}

Rules:
- Use real n8n node types like:
  n8n-nodes-base.scheduleTrigger, n8n-nodes-base.webhook, n8n-nodes-base.cron,
  n8n-nodes-base.httpRequest, n8n-nodes-base.set, n8n-nodes-base.if,
  n8n-nodes-base.gmail, n8n-nodes-base.slack, n8n-nodes-base.telegram,
  n8n-nodes-base.googleSheets, n8n-nodes-base.notion, n8n-nodes-base.airtable,
  n8n-nodes-base.openAi, @n8n/n8n-nodes-langchain.agent
- Always start with a trigger node.
- Position nodes left-to-right, 250px apart, y=300.
- typeVersion: pick the latest stable (e.g. 1, 2, 3).
- DO NOT include credentials objects (the user wires those in n8n).
- Connections key is the source node NAME (not id).
- Output JSON only. No markdown fences. No commentary.`;

export type AIWorkflowDraft = N8nWorkflow & { description?: string };

export async function generateWorkflow(userPrompt: string, history: { role: "user" | "assistant"; content: string }[] = []) {
  const resp = await openai.chat.completions.create({
    model: MODEL,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      ...history.map((m) => ({ role: m.role, content: m.content })),
      { role: "user", content: userPrompt },
    ],
    temperature: 0.4,
  });
  const text = resp.choices[0]?.message?.content || "{}";
  return JSON.parse(text) as AIWorkflowDraft;
}

export async function streamWorkflow(userPrompt: string, history: { role: "user" | "assistant"; content: string }[] = []) {
  return openai.chat.completions.create({
    model: MODEL,
    response_format: { type: "json_object" },
    stream: true,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      ...history.map((m) => ({ role: m.role, content: m.content })),
      { role: "user", content: userPrompt },
    ],
    temperature: 0.4,
  });
}

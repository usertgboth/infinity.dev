import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateWorkflow } from "@/lib/ai";
import { n8n, isN8nConfigured } from "@/lib/n8n";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { prompt, chatId } = await req.json();
  if (!prompt || typeof prompt !== "string") {
    return NextResponse.json({ error: "prompt required" }, { status: 400 });
  }

  // get/create chat
  let chat = chatId
    ? await prisma.chat.findFirst({ where: { id: chatId, userId: session.user.id }, include: { messages: true } })
    : null;
  if (!chat) {
    chat = await prisma.chat.create({
      data: { userId: session.user.id, title: prompt.slice(0, 60) },
      include: { messages: true },
    });
  }

  await prisma.message.create({ data: { chatId: chat.id, role: "user", content: prompt } });

  const history = chat.messages.map((m) => ({
    role: (m.role === "assistant" ? "assistant" : "user") as "user" | "assistant",
    content: m.content,
  }));

  let draft;
  try {
    draft = await generateWorkflow(prompt, history);
  } catch (e: any) {
    return NextResponse.json({ error: `AI failed: ${e?.message}` }, { status: 500 });
  }

  // Save workflow locally
  const wf = await prisma.workflow.create({
    data: {
      userId: session.user.id,
      name: draft.name || "Untitled automation",
      description: (draft as any).description || null,
      graph: JSON.stringify({ nodes: draft.nodes, connections: draft.connections }),
    },
  });

  await prisma.chat.update({ where: { id: chat.id }, data: { workflowId: wf.id } });

  // Try to push to n8n if configured
  let n8nId: string | null = null;
  if (isN8nConfigured()) {
    try {
      const created = await n8n.createWorkflow({
        name: draft.name,
        nodes: draft.nodes,
        connections: draft.connections,
      });
      n8nId = (created as any).id ?? null;
      if (n8nId) await prisma.workflow.update({ where: { id: wf.id }, data: { n8nId } });
    } catch (e) {
      console.warn("n8n push failed:", e);
    }
  }

  const replyText = `I built **${draft.name}** for you. ${draft.nodes.length} nodes wired up.${
    n8nId ? " Live in production." : ""
  }`;
  await prisma.message.create({ data: { chatId: chat.id, role: "assistant", content: replyText } });

  return NextResponse.json({
    chatId: chat.id,
    workflowId: wf.id,
    n8nId,
    workflow: draft,
    reply: replyText,
  });
}

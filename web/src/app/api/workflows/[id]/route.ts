import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { n8n, isN8nConfigured } from "@/lib/n8n";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { id } = await params;
  const wf = await prisma.workflow.findFirst({
    where: { id, userId: session.user.id },
  });
  if (!wf) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json({ ...wf, graph: JSON.parse(wf.graph) });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { id } = await params;
  const wf = await prisma.workflow.findFirst({ where: { id, userId: session.user.id } });
  if (!wf) return NextResponse.json({ error: "not found" }, { status: 404 });
  if (wf.n8nId && isN8nConfigured()) {
    try { await n8n.deleteWorkflow(wf.n8nId); } catch {}
  }
  await prisma.workflow.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await req.json();
  const wf = await prisma.workflow.findFirst({ where: { id, userId: session.user.id } });
  if (!wf) return NextResponse.json({ error: "not found" }, { status: 404 });

  const updated = await prisma.workflow.update({
    where: { id },
    data: {
      name: body.name ?? wf.name,
      description: body.description ?? wf.description,
      active: typeof body.active === "boolean" ? body.active : wf.active,
      graph: body.graph ? JSON.stringify(body.graph) : wf.graph,
    },
  });

  if (wf.n8nId && isN8nConfigured() && typeof body.active === "boolean") {
    try {
      if (body.active) await n8n.activate(wf.n8nId);
      else await n8n.deactivate(wf.n8nId);
    } catch (e) { console.warn(e); }
  }

  return NextResponse.json({ ...updated, graph: JSON.parse(updated.graph) });
}

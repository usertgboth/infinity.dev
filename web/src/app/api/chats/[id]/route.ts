import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { id } = await params;
  const chat = await prisma.chat.findFirst({
    where: { id, userId: session.user.id },
    include: { messages: { orderBy: { createdAt: "asc" } }, workflow: true },
  });
  if (!chat) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json({
    ...chat,
    workflow: chat.workflow ? { ...chat.workflow, graph: JSON.parse(chat.workflow.graph) } : null,
  });
}

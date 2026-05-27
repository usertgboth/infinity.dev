import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const s = await getServerSession(authOptions);
  if (!s?.user || (s.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  const [users, workflows, chats, messages, activeFlows] = await Promise.all([
    prisma.user.count(),
    prisma.workflow.count(),
    prisma.chat.count(),
    prisma.message.count(),
    prisma.workflow.count({ where: { active: true } }),
  ]);
  return NextResponse.json({ users, workflows, chats, messages, activeFlows });
}

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const s = await getServerSession(authOptions);
  if (!s?.user || (s.user as any).role !== "ADMIN") return null;
  return s;
}

export async function GET() {
  const s = await requireAdmin();
  if (!s) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true, email: true, name: true, image: true, role: true, createdAt: true,
      _count: { select: { workflows: true, chats: true } },
    },
  });
  return NextResponse.json({ users });
}

export async function PATCH(req: Request) {
  const s = await requireAdmin();
  if (!s) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const { id, role } = await req.json();
  if (!id || !["USER", "ADMIN"].includes(role)) {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }
  const u = await prisma.user.update({ where: { id }, data: { role }, select: { id: true, role: true } });
  return NextResponse.json(u);
}

export async function DELETE(req: Request) {
  const s = await requireAdmin();
  if (!s) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  await prisma.user.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}

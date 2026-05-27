import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const Body = z.object({
  name: z.string().min(1).max(60),
  email: z.string().email(),
  password: z.string().min(6).max(100),
});

export async function POST(req: Request) {
  try {
    const data = Body.parse(await req.json());
    const exists = await prisma.user.findUnique({ where: { email: data.email } });
    if (exists) return NextResponse.json({ error: "Email already in use" }, { status: 400 });

    const hashed = await bcrypt.hash(data.password, 10);
    const isAdmin = data.email === process.env.ADMIN_EMAIL;
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashed,
        role: isAdmin ? "ADMIN" : "USER",
      },
      select: { id: true, email: true, name: true, role: true },
    });
    return NextResponse.json({ user });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "bad request" }, { status: 400 });
  }
}

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const s = await getServerSession(authOptions);
  if (!s?.user || (s.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const checks: Record<string, { status: string; detail: string; model?: string }> = {
    database: { status: "unknown", detail: "" },
    n8n: { status: "unknown", detail: "" },
    openai: { status: "unknown", detail: "" },
    auth: { status: "unknown", detail: "" },
  };

  try {
    await prisma.$queryRaw`SELECT 1`;
    checks.database = { status: "healthy", detail: "Postgres connected" };
  } catch (e: any) {
    checks.database = { status: "error", detail: e.message };
  }

  const n8nUrl = process.env.N8N_BASE_URL || "";
  const n8nKey = process.env.N8N_API_KEY || "";
  if (!n8nUrl || !n8nKey) {
    checks.n8n = { status: "disabled", detail: "N8N_BASE_URL or N8N_API_KEY not set" };
  } else {
    try {
      const res = await fetch(`${n8nUrl}/api/v1/workflows`, {
        headers: { "X-N8N-API-KEY": n8nKey },
        cache: "no-store",
      });
      if (res.ok) {
        checks.n8n = { status: "healthy", detail: `n8n reachable at ${n8nUrl}` };
      } else {
        checks.n8n = { status: "error", detail: `n8n returned ${res.status}` };
      }
    } catch (e: any) {
      checks.n8n = { status: "error", detail: `Cannot reach ${n8nUrl}: ${e.message}` };
    }
  }

  const openaiKey = process.env.OPENAI_API_KEY || "";
  if (!openaiKey) {
    checks.openai = { status: "disabled", detail: "OPENAI_API_KEY not set" };
  } else {
    try {
      const openaiCheck = await fetch("https://api.openai.com/v1/models", {
        headers: { Authorization: `Bearer ${openaiKey}` },
        cache: "no-store",
      });
      if (openaiCheck.ok) {
        const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
        checks.openai = { status: "healthy", detail: `API key valid`, model };
      } else {
        checks.openai = { status: "error", detail: `OpenAI returned ${openaiCheck.status}` };
      }
    } catch (e: any) {
      checks.openai = { status: "error", detail: e.message };
    }
  }

  const hasGoogle = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
  const hasSecret = Boolean(process.env.NEXTAUTH_SECRET);
  checks.auth = {
    status: hasGoogle ? "ready" : "partial",
    detail: hasGoogle ? "Google OAuth + credentials" : hasSecret ? "Email/password only" : "NEXTAUTH_SECRET missing",
  };

  return NextResponse.json({ checks });
}

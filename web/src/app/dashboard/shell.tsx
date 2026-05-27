"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { Sparkles, Plus, ShieldCheck, Workflow as WorkflowIcon, LogOut, History, Home } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

type Session = { user: { id: string; name?: string; email?: string; image?: string; role: "USER" | "ADMIN" } };
type Chat = { id: string; title: string; createdAt: string };

export default function DashShell({ children, session }: { children: React.ReactNode; session: Session }) {
  const router = useRouter();
  const pathname = usePathname();
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    fetch("/api/chats").then((r) => r.json()).then((j) => setChats(j.items || []));
  }, [pathname]);

  return (
    <div className="h-screen flex bg-bg overflow-hidden">
      <aside className="w-64 shrink-0 bg-surface border-r border-border flex flex-col">
        <Link href="/dashboard" className="flex items-center gap-2 px-5 py-4 border-b border-border">
          <div className="size-8 rounded-xl bg-grad-brand grid place-items-center shadow-glow">
            <Sparkles className="size-4 text-white" />
          </div>
          <span className="font-semibold tracking-tight">Infinity</span>
        </Link>

        <div className="p-3">
          <button
            onClick={() => router.push("/dashboard")}
            className="btn-primary w-full rounded-xl py-2.5 px-3 text-sm flex items-center justify-center gap-2"
          >
            <Plus className="size-4" /> New automation
          </button>
        </div>

        <nav className="px-3 pb-3 flex-1 overflow-auto">
          <NavItem href="/dashboard" active={pathname === "/dashboard"} icon={Home} label="Builder" />
          <NavItem href="/dashboard/workflows" active={pathname?.startsWith("/dashboard/workflows")} icon={WorkflowIcon} label="My workflows" />
          {session.user.role === "ADMIN" && (
            <NavItem href="/admin" active={false} icon={ShieldCheck} label="Admin panel" />
          )}

          <div className="mt-6 px-2 text-[10px] uppercase tracking-widest text-subtle flex items-center gap-1.5">
            <History className="size-3" /> Recent
          </div>
          <div className="mt-2 space-y-0.5">
            {chats.slice(0, 12).map((c) => {
              const active = pathname === `/dashboard/c/${c.id}`;
              return (
                <Link
                  key={c.id}
                  href={`/dashboard/c/${c.id}`}
                  className={`block text-sm truncate px-3 py-2 rounded-lg transition ${
                    active ? "bg-grad-brand-soft text-text" : "text-muted hover:bg-bg hover:text-text"
                  }`}
                >
                  {c.title}
                </Link>
              );
            })}
            {chats.length === 0 && <p className="text-xs text-subtle px-3 py-2">No chats yet</p>}
          </div>
        </nav>

        <div className="border-t border-border p-3 flex items-center gap-3">
          <div className="size-8 rounded-full bg-grad-brand grid place-items-center text-white text-xs font-semibold">
            {(session.user.name || session.user.email || "U")[0]?.toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm truncate">{session.user.name || session.user.email}</div>
            <div className="text-xs text-muted">{session.user.role === "ADMIN" ? "Admin" : "Free plan"}</div>
          </div>
          <button onClick={() => signOut({ callbackUrl: "/" })} className="size-8 grid place-items-center rounded-lg hover:bg-bg transition text-muted hover:text-text">
            <LogOut className="size-4" />
          </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0 overflow-hidden">{children}</main>
    </div>
  );
}

function NavItem({ href, active, icon: Icon, label }: { href: string; active: boolean; icon: any; label: string }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
        active ? "bg-grad-brand-soft text-text" : "text-muted hover:bg-bg hover:text-text"
      }`}
    >
      <Icon className="size-4" />
      {label}
    </Link>
  );
}

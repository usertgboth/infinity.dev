"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import {
  Sparkles, Plus, ShieldCheck, Workflow as WorkflowIcon, LogOut,
  History, Home, Menu, X,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

type Session = { user: { id: string; name?: string; email?: string; image?: string; role: "USER" | "ADMIN" } };
type Chat = { id: string; title: string; createdAt: string };

export default function DashShell({ children, session }: { children: React.ReactNode; session: Session }) {
  const router = useRouter();
  const pathname = usePathname();
  const [chats, setChats] = useState<Chat[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch("/api/chats").then((r) => r.json()).then((j) => setChats(j.items || []));
  }, [pathname]);

  // close drawer on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  // lock scroll when drawer open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <div className="h-[100dvh] flex bg-bg overflow-hidden">
      {/* Mobile top bar */}
      <header className="md:hidden fixed top-0 inset-x-0 z-[var(--z-sticky)] h-14 bg-bg/85 backdrop-blur-xl border-b border-border flex items-center px-3 gap-2">
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="size-9 rounded-xl border border-border bg-white/[0.03] grid place-items-center press"
        >
          <Menu className="size-4 icon-thin" />
        </button>
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="size-7 rounded-xl bg-grad-brand grid place-items-center shadow-glow">
            <Sparkles className="size-3.5 text-white icon-thin" />
          </div>
          <span className="font-semibold tracking-tight text-sm">Infinity</span>
        </Link>
        <button
          onClick={() => router.push("/dashboard")}
          className="ml-auto btn-primary text-sm rounded-full pl-3 pr-1.5 py-1.5 inline-flex items-center gap-1.5"
        >
          <span>New</span>
          <span className="size-6 rounded-full bg-white/15 grid place-items-center">
            <Plus className="size-3 icon-thin" />
          </span>
        </button>
      </header>

      {/* Drawer scrim (mobile) */}
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 z-[var(--z-modal)] bg-bg/60 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* Sidebar — drawer on mobile, fixed on desktop */}
      <aside
        className={`fixed md:relative z-[calc(var(--z-modal)+1)] inset-y-0 left-0 w-[80vw] max-w-[300px] md:w-64 shrink-0 bg-surface border-r border-border flex flex-col transform transition-transform duration-300 ease-out-expo ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="flex items-center justify-between gap-2 px-4 md:px-5 py-4 border-b border-border">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="size-8 rounded-xl bg-grad-brand grid place-items-center shadow-glow">
              <Sparkles className="size-4 text-white icon-thin" />
            </div>
            <span className="font-semibold tracking-tight">Infinity</span>
          </Link>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="md:hidden size-8 rounded-lg grid place-items-center hover:bg-white/[0.04] press"
          >
            <X className="size-4 icon-thin" />
          </button>
        </div>

        <div className="p-3">
          <button
            onClick={() => router.push("/dashboard")}
            className="btn-primary w-full rounded-xl py-2.5 px-3 text-sm flex items-center justify-center gap-2"
          >
            <Plus className="size-4 icon-thin" /> New automation
          </button>
        </div>

        <nav className="px-3 pb-3 flex-1 overflow-auto">
          <NavItem href="/dashboard" active={pathname === "/dashboard"} icon={Home} label="Builder" />
          <NavItem href="/dashboard/workflows" active={pathname?.startsWith("/dashboard/workflows") ?? false} icon={WorkflowIcon} label="My workflows" />
          {session.user.role === "ADMIN" && (
            <NavItem href="/admin" active={false} icon={ShieldCheck} label="Admin panel" />
          )}

          <div className="mt-6 px-2 text-[10px] uppercase tracking-widest text-subtle flex items-center gap-1.5">
            <History className="size-3 icon-thin" /> Recent
          </div>
          <div className="mt-2 space-y-0.5">
            {chats.slice(0, 12).map((c) => {
              const active = pathname === `/dashboard/c/${c.id}`;
              return (
                <Link
                  key={c.id}
                  href={`/dashboard/c/${c.id}`}
                  className={`block text-sm truncate px-3 py-2 rounded-lg transition-colors ${
                    active ? "bg-grad-brand-soft text-text" : "text-muted hover:bg-white/[0.04] hover:text-text"
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
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            aria-label="Sign out"
            className="size-8 grid place-items-center rounded-lg hover:bg-white/[0.04] transition-colors text-muted hover:text-text press"
          >
            <LogOut className="size-4 icon-thin" />
          </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0 overflow-hidden pt-14 md:pt-0">{children}</main>
    </div>
  );
}

function NavItem({ href, active, icon: Icon, label }: { href: string; active: boolean; icon: any; label: string }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
        active ? "bg-grad-brand-soft text-text" : "text-muted hover:bg-white/[0.04] hover:text-text"
      }`}
    >
      <Icon className="size-4 icon-thin" />
      {label}
    </Link>
  );
}

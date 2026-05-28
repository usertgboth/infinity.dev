"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles, Users, BarChart3, Workflow, Server, ArrowLeft, Menu, X } from "lucide-react";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <div className="h-[100dvh] flex bg-bg overflow-hidden">
      <header className="md:hidden fixed top-0 inset-x-0 z-[var(--z-sticky)] h-14 bg-bg/85 backdrop-blur-xl border-b border-border flex items-center px-3 gap-2">
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="size-9 rounded-xl border border-border bg-white/[0.03] grid place-items-center press"
        >
          <Menu className="size-4 icon-thin" />
        </button>
        <Link href="/admin" className="flex items-center gap-2">
          <div className="size-7 rounded-xl bg-grad-brand grid place-items-center shadow-glow">
            <Sparkles className="size-3.5 text-white icon-thin" />
          </div>
          <span className="font-semibold tracking-tight text-sm">Admin</span>
        </Link>
      </header>

      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 z-[var(--z-modal)] bg-bg/60 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      <aside className={`fixed md:relative z-[calc(var(--z-modal)+1)] inset-y-0 left-0 w-[80vw] max-w-[300px] md:w-60 shrink-0 bg-surface border-r border-border flex flex-col transform transition-transform duration-300 ease-out-expo ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <div className="flex items-center justify-between gap-2 px-4 md:px-5 py-4 border-b border-border">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="size-8 rounded-xl bg-grad-brand grid place-items-center shadow-glow">
              <Sparkles className="size-4 text-white icon-thin" />
            </div>
            <span className="font-semibold tracking-tight">Admin</span>
          </Link>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="md:hidden size-8 rounded-lg grid place-items-center hover:bg-white/[0.04] press"
          >
            <X className="size-4 icon-thin" />
          </button>
        </div>
        <nav className="p-3 space-y-0.5">
          <AdminLink href="/admin" active={pathname === "/admin"} icon={BarChart3} label="Overview" />
          <AdminLink href="/admin/workflows" active={pathname === "/admin/workflows"} icon={Workflow} label="Workflows" />
          <AdminLink href="/admin/users" active={pathname === "/admin/users"} icon={Users} label="Users" />
          <AdminLink href="/admin/system" active={pathname === "/admin/system"} icon={Server} label="System" />
        </nav>
        <div className="mt-auto p-3">
          <Link href="/dashboard" className="flex items-center gap-2 text-sm text-muted hover:text-text px-3 py-2 rounded-lg hover:bg-bg transition">
            <ArrowLeft className="size-4" /> Back to app
          </Link>
        </div>
      </aside>

      <main className="flex-1 min-w-0 overflow-auto pt-14 md:pt-0">{children}</main>
    </div>
  );
}

function AdminLink({ href, active, icon: Icon, label }: { href: string; active: boolean; icon: any; label: string }) {
  return (
    <Link href={href} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${active ? "bg-grad-brand-soft text-text" : "text-muted hover:bg-bg hover:text-text"}`}>
      <Icon className="size-4 icon-thin" />
      {label}
    </Link>
  );
}

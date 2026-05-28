"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Workflow, Trash2, Power, PowerOff, Plus, Loader2 } from "lucide-react";
import { relativeTime } from "@/lib/utils";

type Item = {
  id: string; name: string; description: string | null;
  active: boolean; updatedAt: string; n8nId: string | null;
};

export default function WorkflowsList() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const r = await fetch("/api/workflows");
    const j = await r.json();
    setItems(j.items || []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function toggle(id: string, active: boolean) {
    await fetch(`/api/workflows/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !active }),
    });
    load();
  }
  async function remove(id: string) {
    if (!confirm("Delete this workflow?")) return;
    await fetch(`/api/workflows/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="h-full overflow-auto p-4 sm:p-6 md:p-8 max-w-5xl mx-auto">
      <div className="flex items-start justify-between gap-3 mb-5 sm:mb-6 md:mb-8">
        <div className="min-w-0">
          <h1 className="font-display text-xl sm:text-2xl md:text-3xl font-semibold tracking-tightest-2">My workflows</h1>
          <p className="text-muted text-xs sm:text-sm mt-1">Everything you've built with Infinity.</p>
        </div>
        <Link href="/dashboard" className="btn-primary px-3 sm:px-3.5 md:px-4 py-2 md:py-2.5 rounded-full text-xs sm:text-sm flex items-center gap-1.5 md:gap-2 whitespace-nowrap shrink-0">
          <Plus className="size-3.5 sm:size-4 icon-thin" />
          <span className="hidden sm:inline">New automation</span>
          <span className="sm:hidden">New</span>
        </Link>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="size-6 animate-spin text-primary icon-thin" />
        </div>
      )}

      {!loading && items.length === 0 && (
        <div className="card rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-center">
          <div className="size-12 sm:size-14 mx-auto rounded-xl sm:rounded-2xl bg-grad-brand-soft border border-primary/20 grid place-items-center mb-3">
            <Workflow className="size-5 sm:size-6 icon-thin text-primary" />
          </div>
          <p className="font-medium text-sm sm:text-base">You haven't built any workflows yet.</p>
          <p className="text-xs sm:text-sm text-muted mt-1">Describe an automation and watch it come to life.</p>
          <Link href="/dashboard" className="mt-4 inline-flex items-center gap-2 btn-primary px-4 py-2 rounded-full text-sm">
            Build your first <Plus className="size-3.5 icon-thin" />
          </Link>
        </div>
      )}

      <div className="space-y-2">
        {items.map((w) => (
          <div key={w.id} className="card rounded-xl sm:rounded-2xl p-3 sm:p-3.5 md:p-4 flex items-center gap-2.5 sm:gap-3 md:gap-4 hover:border-borderStrong transition-colors">
            <div className="size-8 sm:size-9 md:size-10 rounded-lg sm:rounded-xl bg-grad-brand-soft border border-primary/20 grid place-items-center shrink-0">
              <Workflow className="size-3.5 sm:size-4 md:size-5 icon-thin text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-medium truncate text-xs sm:text-sm md:text-base">{w.name}</div>
              <div className="text-[10px] sm:text-xs text-muted truncate">
                <span className="hidden sm:inline">{w.description || "—"} · </span>
                updated {relativeTime(w.updatedAt)}
                {w.n8nId && <span className="ml-1 text-success">· synced</span>}
              </div>
            </div>
            <button
              onClick={() => toggle(w.id, w.active)}
              aria-label={w.active ? "Deactivate" : "Activate"}
              className={`px-2 sm:px-2.5 md:px-3 py-1 md:py-1.5 rounded-full text-[10px] sm:text-xs flex items-center gap-1 md:gap-1.5 transition-colors border press shrink-0 ${
                w.active
                  ? "bg-success/10 text-success border-success/30"
                  : "bg-white/[0.03] text-muted border-border hover:text-text"
              }`}
            >
              {w.active ? <Power className="size-3 sm:size-3.5 icon-thin" /> : <PowerOff className="size-3 sm:size-3.5 icon-thin" />}
              <span className="hidden sm:inline">{w.active ? "Active" : "Off"}</span>
            </button>
            <button
              onClick={() => remove(w.id)}
              aria-label="Delete"
              className="size-7 sm:size-8 grid place-items-center rounded-lg hover:bg-danger/10 text-muted hover:text-danger transition-colors press shrink-0"
            >
              <Trash2 className="size-3.5 sm:size-4 icon-thin" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

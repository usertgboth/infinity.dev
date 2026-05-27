"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Workflow, Trash2, Power, PowerOff } from "lucide-react";
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
    <div className="h-full overflow-auto p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">My workflows</h1>
          <p className="text-muted text-sm mt-1">Everything you've built with Infinity.</p>
        </div>
        <Link href="/dashboard" className="bg-grad-primary text-white px-4 py-2 rounded-xl text-sm font-medium shadow-glow hover:opacity-95 transition">
          + New automation
        </Link>
      </div>

      {loading && <p className="text-muted">Loading…</p>}
      {!loading && items.length === 0 && (
        <div className="glass rounded-2xl p-12 text-center">
          <Workflow className="size-10 mx-auto text-muted mb-3" />
          <p className="text-muted">You haven't built any workflows yet.</p>
          <Link href="/dashboard" className="mt-4 inline-block text-primary hover:underline">Build your first →</Link>
        </div>
      )}

      <div className="space-y-2">
        {items.map((w) => (
          <div key={w.id} className="glass rounded-xl p-4 flex items-center gap-4 hover:bg-card transition">
            <div className="size-10 rounded-lg bg-grad-primary/20 grid place-items-center shrink-0">
              <Workflow className="size-5 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-medium truncate">{w.name}</div>
              <div className="text-xs text-muted truncate">
                {w.description || "—"} · updated {relativeTime(w.updatedAt)}
                {w.n8nId && <span className="ml-2 text-success">· synced</span>}
              </div>
            </div>
            <button
              onClick={() => toggle(w.id, w.active)}
              className={`px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition ${
                w.active ? "bg-success/20 text-success" : "bg-card text-muted hover:text-text"
              }`}
            >
              {w.active ? <Power className="size-3.5" /> : <PowerOff className="size-3.5" />}
              {w.active ? "Active" : "Inactive"}
            </button>
            <button onClick={() => remove(w.id)} className="size-8 grid place-items-center rounded-lg hover:bg-danger/20 text-muted hover:text-danger transition">
              <Trash2 className="size-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

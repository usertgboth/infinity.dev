"use client";
import { useEffect, useState } from "react";
import { Workflow, Trash2, Loader2, Power, PowerOff, Search, X } from "lucide-react";
import { relativeTime } from "@/lib/utils";

type WorkflowItem = {
  id: string; name: string; description: string | null;
  active: boolean; n8nId: string | null;
  createdAt: string; updatedAt: string;
  user: { id: string; name: string | null; email: string };
};

export default function AdminWorkflows() {
  const [items, setItems] = useState<WorkflowItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "inactive">("all");

  async function load() {
    setLoading(true);
    const params = new URLSearchParams();
    if (filter === "active") params.set("active", "true");
    if (filter === "inactive") params.set("active", "false");
    if (search.trim()) params.set("search", search.trim());
    const r = await fetch(`/api/admin/workflows?${params}`);
    const j = await r.json();
    setItems(j.workflows || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, [filter]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this workflow?")) return;
    await fetch(`/api/workflows/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-6xl mx-auto">
      <h1 className="font-display text-xl sm:text-2xl md:text-3xl font-semibold tracking-tightest-2">All workflows</h1>
      <p className="text-muted text-xs sm:text-sm mt-1">Every workflow across all users.</p>

      <div className="mt-5 flex flex-col sm:flex-row gap-3">
        <form onSubmit={handleSearch} className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-subtle icon-thin" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search workflows..."
            className="w-full bg-white/[0.04] border border-borderStrong/40 rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-subtle"
          />
          {search && (
            <button type="button" onClick={() => { setSearch(""); load(); }} className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-subtle hover:text-text">
              <X className="size-4 icon-thin" />
            </button>
          )}
        </form>
        <div className="flex gap-1.5">
          {(["all", "active", "inactive"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-colors border press ${
                filter === f
                  ? "bg-primary/10 text-primary border-primary/20"
                  : "bg-white/[0.03] text-muted border-border hover:text-text"
              }`}
            >
              {f === "all" ? "All" : f === "active" ? "Active" : "Inactive"}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="size-6 animate-spin text-primary icon-thin" />
        </div>
      ) : items.length === 0 ? (
        <div className="card rounded-2xl p-10 text-center mt-6">
          <Workflow className="size-10 mx-auto text-subtle icon-thin" />
          <p className="mt-3 text-sm text-muted">No workflows found.</p>
        </div>
      ) : (
        <div className="mt-4 space-y-2">
          {items.map((w) => (
            <div key={w.id} className="card rounded-xl sm:rounded-2xl p-3 sm:p-4 flex items-center gap-3 hover:border-borderStrong transition-colors">
              <div className="size-9 rounded-lg bg-grad-brand-soft border border-primary/20 grid place-items-center shrink-0">
                <Workflow className="size-4 icon-thin text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-medium truncate text-sm">{w.name}</div>
                <div className="text-xs text-muted truncate">
                  <span className="text-primary/80">{w.user.name || w.user.email}</span>
                  {" · "}updated {relativeTime(w.updatedAt)}
                  {w.n8nId && <span className="ml-1.5 text-success">· synced</span>}
                </div>
              </div>
              <div className={`text-xs px-2 py-1 rounded-md flex items-center gap-1 ${
                w.active ? "bg-success/10 text-success" : "bg-white/[0.03] text-muted"
              }`}>
                {w.active ? <Power className="size-3 icon-thin" /> : <PowerOff className="size-3 icon-thin" />}
                {w.active ? "Active" : "Off"}
              </div>
              <button
                onClick={() => remove(w.id)}
                aria-label="Delete"
                className="size-7 grid place-items-center rounded-lg hover:bg-danger/10 text-muted hover:text-danger transition-colors press shrink-0"
              >
                <Trash2 className="size-3.5 icon-thin" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

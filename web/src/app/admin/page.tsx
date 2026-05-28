"use client";
import { useEffect, useState } from "react";
import { BarChart3, Users, Workflow, MessageSquare, Zap, Loader2 } from "lucide-react";

export default function AdminOverview() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("/api/admin/stats").then((r) => r.json()).then((j) => { setStats(j); setLoading(false); });
  }, []);

  const cards = [
    { label: "Users", icon: Users, key: "users", color: "#ff4d6d" },
    { label: "Workflows", icon: Workflow, key: "workflows", color: "#ff6f47" },
    { label: "Active", icon: Zap, key: "activeFlows", color: "#16a34a" },
    { label: "Chats", icon: MessageSquare, key: "chats", color: "#3b82f6" },
    { label: "Messages", icon: BarChart3, key: "messages", color: "#f59e0b" },
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-6xl mx-auto">
      <h1 className="font-display text-xl sm:text-2xl md:text-3xl font-semibold tracking-tightest-2">Overview</h1>
      <p className="text-muted text-xs sm:text-sm mt-1">Platform health at a glance.</p>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="size-6 animate-spin text-primary icon-thin" />
        </div>
      ) : (
        <div className="mt-5 sm:mt-6 md:mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 sm:gap-3 md:gap-4">
          {cards.map((c) => (
            <div key={c.key} className="card rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5">
              <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 text-muted text-[10px] sm:text-xs md:text-sm">
                <div className="size-7 sm:size-8 md:size-9 rounded-lg sm:rounded-xl grid place-items-center shrink-0" style={{ background: c.color + "22" }}>
                  <c.icon className="size-3.5 sm:size-4 icon-thin" style={{ color: c.color }} />
                </div>
                <span className="truncate">{c.label}</span>
              </div>
              <div className="mt-2 sm:mt-3 text-xl sm:text-2xl md:text-3xl font-semibold tracking-tightest-2 tabular-nums">{stats?.[c.key] ?? "—"}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import { BarChart3, Users, Workflow, MessageSquare, Zap } from "lucide-react";

export default function AdminOverview() {
  const [stats, setStats] = useState<any>(null);
  useEffect(() => {
    fetch("/api/admin/stats").then((r) => r.json()).then(setStats);
  }, []);

  const cards = [
    { label: "Users", icon: Users, key: "users", color: "#ff4d6d" },
    { label: "Workflows", icon: Workflow, key: "workflows", color: "#ff6f47" },
    { label: "Active workflows", icon: Zap, key: "activeFlows", color: "#16a34a" },
    { label: "Chats", icon: MessageSquare, key: "chats", color: "#3b82f6" },
    { label: "Messages", icon: BarChart3, key: "messages", color: "#f59e0b" },
  ];

  return (
    <div className="p-8 max-w-6xl">
      <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
      <p className="text-muted text-sm mt-1">Platform health at a glance.</p>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
        {cards.map((c) => (
          <div key={c.key} className="card rounded-2xl p-5">
            <div className="flex items-center gap-3 text-muted text-sm">
              <div className="size-9 rounded-xl grid place-items-center" style={{ background: c.color + "1a" }}>
                <c.icon className="size-4" style={{ color: c.color }} />
              </div>
              {c.label}
            </div>
            <div className="mt-3 text-3xl font-bold tracking-tight">{stats?.[c.key] ?? "—"}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

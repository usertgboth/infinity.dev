"use client";
import { useEffect, useState } from "react";
import { Trash2, ShieldCheck, User } from "lucide-react";
import { relativeTime } from "@/lib/utils";

type U = {
  id: string; email: string; name: string | null; image: string | null; role: "USER" | "ADMIN";
  createdAt: string; _count: { workflows: number; chats: number };
};

export default function AdminUsers() {
  const [users, setUsers] = useState<U[]>([]);
  async function load() {
    const r = await fetch("/api/admin/users");
    const j = await r.json();
    setUsers(j.users || []);
  }
  useEffect(() => { load(); }, []);

  async function toggleRole(u: U) {
    await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: u.id, role: u.role === "ADMIN" ? "USER" : "ADMIN" }),
    });
    load();
  }
  async function remove(u: U) {
    if (!confirm(`Delete ${u.email}?`)) return;
    await fetch("/api/admin/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: u.id }),
    });
    load();
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <h1 className="font-display text-2xl md:text-3xl font-semibold tracking-tightest-2">Users</h1>
      <p className="text-muted text-sm mt-1">{users.length} total</p>

      <div className="md:hidden mt-6 space-y-2">
        {users.map((u) => (
          <div key={u.id} className="card rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <div className="size-9 rounded-full bg-grad-brand grid place-items-center text-xs font-semibold text-white shrink-0">
                {(u.name || u.email)[0]?.toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-medium truncate">{u.name || "—"}</div>
                <div className="text-xs text-muted truncate">{u.email}</div>
                <div className="mt-2 text-xs text-muted">
                  {u._count.workflows} workflows · joined {relativeTime(u.createdAt)}
                </div>
              </div>
              <button onClick={() => remove(u)} className="size-8 grid place-items-center rounded-lg hover:bg-danger/10 text-muted hover:text-danger transition-colors press shrink-0">
                <Trash2 className="size-4 icon-thin" />
              </button>
            </div>
            <button
              onClick={() => toggleRole(u)}
              className={`mt-3 text-xs px-2.5 py-1.5 rounded-full inline-flex items-center gap-1.5 transition-colors border press ${
                u.role === "ADMIN" ? "bg-primary/10 text-primary border-primary/20" : "bg-white/[0.03] text-muted border-border hover:text-text"
              }`}
            >
              {u.role === "ADMIN" ? <ShieldCheck className="size-3.5 icon-thin" /> : <User className="size-3.5 icon-thin" />}
              {u.role}
            </button>
          </div>
        ))}
        {users.length === 0 && <div className="card rounded-2xl p-8 text-center text-muted text-sm">No users yet.</div>}
      </div>

      <div className="hidden md:block mt-6 card rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-bg/50">
            <tr className="text-left text-muted">
              <th className="px-4 py-3 font-medium">User</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Workflows</th>
              <th className="px-4 py-3 font-medium">Joined</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t border-border hover:bg-bg/40 transition">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-grad-brand grid place-items-center text-xs font-semibold text-white">
                      {(u.name || u.email)[0]?.toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium">{u.name || "—"}</div>
                      <div className="text-xs text-muted">{u.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleRole(u)}
                    className={`text-xs px-2 py-1 rounded-md flex items-center gap-1.5 transition border ${
                      u.role === "ADMIN" ? "bg-primary/10 text-primary border-primary/20" : "bg-white/[0.03] text-muted border-border hover:text-text"
                    }`}
                  >
                    {u.role === "ADMIN" ? <ShieldCheck className="size-3.5 icon-thin" /> : <User className="size-3.5 icon-thin" />}
                    {u.role}
                  </button>
                </td>
                <td className="px-4 py-3 text-muted">{u._count.workflows}</td>
                <td className="px-4 py-3 text-muted">{relativeTime(u.createdAt)}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => remove(u)} className="size-8 grid place-items-center rounded-lg hover:bg-danger/10 text-muted hover:text-danger transition-colors press">
                    <Trash2 className="size-4 icon-thin" />
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-muted">No users yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

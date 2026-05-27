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
    <div className="p-8 max-w-6xl">
      <h1 className="text-2xl font-bold">Users</h1>
      <p className="text-muted text-sm mt-1">{users.length} total</p>

      <div className="mt-6 glass rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-card/50">
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
              <tr key={u.id} className="border-t border-border hover:bg-card/30 transition">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-grad-primary grid place-items-center text-xs font-semibold text-white">
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
                    className={`text-xs px-2 py-1 rounded-md flex items-center gap-1.5 transition ${
                      u.role === "ADMIN" ? "bg-primary/20 text-primary" : "bg-card text-muted hover:text-text"
                    }`}
                  >
                    {u.role === "ADMIN" ? <ShieldCheck className="size-3.5" /> : <User className="size-3.5" />}
                    {u.role}
                  </button>
                </td>
                <td className="px-4 py-3 text-muted">{u._count.workflows}</td>
                <td className="px-4 py-3 text-muted">{relativeTime(u.createdAt)}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => remove(u)} className="size-8 grid place-items-center rounded-lg hover:bg-danger/20 text-muted hover:text-danger transition">
                    <Trash2 className="size-4" />
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

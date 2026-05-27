import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Sparkles, Users, Workflow, BarChart3, ArrowLeft } from "lucide-react";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login?callbackUrl=/admin");
  if ((session.user as any).role !== "ADMIN") redirect("/dashboard");

  return (
    <div className="h-screen flex bg-bg overflow-hidden">
      <aside className="w-60 shrink-0 bg-surface border-r border-border flex flex-col">
        <Link href="/admin" className="flex items-center gap-2 px-5 py-4 border-b border-border">
          <div className="size-8 rounded-xl bg-grad-brand grid place-items-center shadow-glow">
            <Sparkles className="size-4 text-white" />
          </div>
          <span className="font-semibold tracking-tight">Admin</span>
        </Link>
        <nav className="p-3 space-y-0.5">
          <AdminLink href="/admin" icon={BarChart3} label="Overview" />
          <AdminLink href="/admin/users" icon={Users} label="Users" />
        </nav>
        <div className="mt-auto p-3">
          <Link href="/dashboard" className="flex items-center gap-2 text-sm text-muted hover:text-text px-3 py-2 rounded-lg hover:bg-bg transition">
            <ArrowLeft className="size-4" /> Back to app
          </Link>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}

function AdminLink({ href, icon: Icon, label }: { href: string; icon: any; label: string }) {
  return (
    <Link href={href} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted hover:bg-bg hover:text-text transition">
      <Icon className="size-4" />
      {label}
    </Link>
  );
}

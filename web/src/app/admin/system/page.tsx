"use client";
import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, AlertTriangle, Loader2, RefreshCw } from "lucide-react";

type Check = { status: string; detail: string; model?: string };
type SystemData = { checks: Record<string, Check> };

export default function AdminSystem() {
  const [data, setData] = useState<SystemData | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const r = await fetch("/api/admin/system");
    const j = await r.json();
    setData(j);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  const labels: Record<string, string> = {
    database: "Database",
    n8n: "Workflow Engine",
    openai: "AI Provider",
    auth: "Authentication",
  };

  const icons: Record<string, any> = {
    healthy: CheckCircle2,
    ready: CheckCircle2,
    disabled: AlertTriangle,
    partial: AlertTriangle,
    error: XCircle,
  };

  const colors: Record<string, string> = {
    healthy: "text-success",
    ready: "text-success",
    disabled: "text-yellow-400",
    partial: "text-yellow-400",
    error: "text-danger",
    unknown: "text-muted",
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between gap-3 mb-1">
        <h1 className="font-display text-xl sm:text-2xl md:text-3xl font-semibold tracking-tightest-2">System</h1>
        <button
          onClick={load}
          disabled={loading}
          className="btn-ghost px-3 py-2 rounded-xl text-sm flex items-center gap-2 press"
        >
          <RefreshCw className={`size-3.5 icon-thin ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>
      <p className="text-muted text-xs sm:text-sm">Service health and configuration status.</p>

      {loading && !data ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="size-6 animate-spin text-primary icon-thin" />
        </div>
      ) : (
        <div className="mt-6 space-y-2">
          {data && Object.entries(data.checks).map(([key, check]) => {
            const StatusIcon = icons[check.status] || AlertTriangle;
            const color = colors[check.status] || "text-muted";

            return (
              <div key={key} className="card rounded-xl sm:rounded-2xl p-4 sm:p-5 flex items-start gap-3 sm:gap-4">
                <StatusIcon className={`size-5 sm:size-6 icon-thin shrink-0 mt-0.5 ${color}`} />
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-sm sm:text-base">{labels[key] || key}</div>
                  <div className="text-xs sm:text-sm text-muted mt-0.5">{check.detail}</div>
                  {check.model && (
                    <div className="text-xs text-subtle mt-1 font-mono">Model: {check.model}</div>
                  )}
                </div>
                <span className={`text-[10px] sm:text-xs font-medium px-2 py-1 rounded-md border capitalize ${color} border-current/20 bg-current/5 shrink-0`}>
                  {check.status}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

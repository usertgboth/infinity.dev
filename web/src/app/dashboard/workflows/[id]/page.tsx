"use client";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, Loader2, Play, PowerOff, Trash2, Copy, Check,
  LayoutGrid, Braces, Workflow as WorkflowIcon, Download, CheckCircle2,
} from "lucide-react";
import FlowCanvas from "@/components/FlowCanvas";
import { relativeTime } from "@/lib/utils";

type WorkflowDetail = {
  id: string;
  name: string;
  description: string | null;
  active: boolean;
  n8nId: string | null;
  createdAt: string;
  updatedAt: string;
  graph: { nodes: any[]; connections: Record<string, any> };
};

type Tab = "canvas" | "code";

export default function WorkflowDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [data, setData] = useState<WorkflowDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("canvas");
  const [copied, setCopied] = useState(false);
  const [acting, setActing] = useState(false);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const r = await fetch(`/api/workflows/${id}`);
      if (!r.ok) throw new Error((await r.json()).error || "Failed to load");
      setData(await r.json());
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => { if (id) load(); }, [id]);

  async function toggleActive() {
    if (!data) return;
    setActing(true);
    try {
      await fetch(`/api/workflows/${data.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !data.active }),
      });
      await load();
    } finally {
      setActing(false);
    }
  }

  async function remove() {
    if (!data) return;
    if (!confirm(`Delete "${data.name}"? This cannot be undone.`)) return;
    await fetch(`/api/workflows/${data.id}`, { method: "DELETE" });
    router.push("/dashboard/workflows");
  }

  const jsonString = useMemo(() => {
    if (!data) return "";
    return JSON.stringify(
      { name: data.name, nodes: data.graph?.nodes ?? [], connections: data.graph?.connections ?? {} },
      null,
      2,
    );
  }, [data]);

  async function copyJson() {
    await navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function downloadJson() {
    if (!data) return;
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${data.name.toLowerCase().replace(/\s+/g, "-")}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (loading) {
    return (
      <div className="h-full grid place-items-center bg-bg">
        <Loader2 className="size-6 animate-spin text-primary icon-thin" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="h-full grid place-items-center p-6">
        <div className="card rounded-2xl p-8 max-w-md text-center">
          <p className="font-medium">Couldn't load this workflow.</p>
          <p className="text-muted text-sm mt-1">{error || "It may have been deleted."}</p>
          <Link href="/dashboard/workflows" className="mt-4 inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
            <ArrowLeft className="size-3.5 icon-thin" /> Back to workflows
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-bg">
      {/* Toolbar */}
      <div className="border-b border-border bg-surface">
        <div className="max-w-6xl mx-auto px-3 sm:px-5 md:px-6 h-14 flex items-center gap-2 sm:gap-3">
          <Link
            href="/dashboard/workflows"
            aria-label="Back"
            className="size-8 grid place-items-center rounded-lg hover:bg-white/[0.04] transition-colors press shrink-0"
          >
            <ArrowLeft className="size-4 icon-thin" />
          </Link>
          <div className="size-8 rounded-lg bg-grad-brand-soft border border-primary/20 grid place-items-center shrink-0">
            <WorkflowIcon className="size-3.5 icon-thin text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="font-medium tracking-tight truncate text-sm md:text-base">{data.name}</h1>
            <p className="text-[10px] sm:text-[11px] text-subtle truncate">
              {data.graph?.nodes?.length ?? 0} nodes
              <span className="mx-1.5 text-borderStrong">·</span>
              updated {relativeTime(data.updatedAt)}
              {data.n8nId && (
                <span className="ml-1.5 text-success inline-flex items-center gap-1 align-middle">
                  <CheckCircle2 className="size-2.5 icon-thin" /> Live
                </span>
              )}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={toggleActive}
              disabled={acting}
              className={`text-xs md:text-sm px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 transition-all duration-200 press disabled:opacity-50 ${
                data.active
                  ? "bg-success/10 text-success border border-success/30"
                  : "btn-primary"
              }`}
            >
              {acting ? (
                <Loader2 className="size-3.5 animate-spin icon-thin" />
              ) : data.active ? (
                <PowerOff className="size-3.5 icon-thin" />
              ) : (
                <Play className="size-3.5 icon-thin" />
              )}
              <span className="hidden sm:inline">{data.active ? "Active" : "Activate"}</span>
            </button>
            <button
              onClick={remove}
              aria-label="Delete"
              className="size-8 grid place-items-center rounded-lg hover:bg-danger/10 text-muted hover:text-danger transition-colors press"
            >
              <Trash2 className="size-3.5 icon-thin" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-6xl mx-auto px-3 sm:px-5 md:px-6 flex items-center gap-1">
          <TabButton active={tab === "canvas"} onClick={() => setTab("canvas")} icon={LayoutGrid} label="Canvas" />
          <TabButton active={tab === "code"} onClick={() => setTab("code")} icon={Braces} label="Code" />

          {tab === "code" && (
            <div className="ml-auto flex items-center gap-1.5 pb-1.5">
              <button
                onClick={copyJson}
                className="text-xs px-2.5 py-1.5 rounded-lg bg-white/[0.04] border border-border text-muted hover:text-text hover:bg-white/[0.07] transition-colors inline-flex items-center gap-1.5 press"
              >
                {copied ? <Check className="size-3.5 icon-thin text-success" /> : <Copy className="size-3.5 icon-thin" />}
                <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
              </button>
              <button
                onClick={downloadJson}
                className="text-xs px-2.5 py-1.5 rounded-lg bg-white/[0.04] border border-border text-muted hover:text-text hover:bg-white/[0.07] transition-colors inline-flex items-center gap-1.5 press"
              >
                <Download className="size-3.5 icon-thin" />
                <span className="hidden sm:inline">Download</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 min-h-0 relative">
        {tab === "canvas" ? (
          <FlowCanvas workflow={{ name: data.name, nodes: data.graph?.nodes ?? [], connections: data.graph?.connections ?? {} }} />
        ) : (
          <CodeView json={jsonString} />
        )}
      </div>
    </div>
  );
}

function TabButton({
  active, onClick, icon: Icon, label,
}: {
  active: boolean;
  onClick: () => void;
  icon: any;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative -mb-px px-3 sm:px-4 py-2.5 inline-flex items-center gap-2 text-xs sm:text-sm font-medium border-b-2 transition-colors ${
        active
          ? "text-text border-primary"
          : "text-muted border-transparent hover:text-text"
      }`}
    >
      <Icon className="size-3.5 sm:size-4 icon-thin" />
      {label}
    </button>
  );
}

/** Pretty-printed JSON with simple syntax coloring. No external deps. */
function CodeView({ json }: { json: string }) {
  const lines = json.split("\n");
  return (
    <div className="absolute inset-0 overflow-auto bg-[#0a0a0c]">
      <pre className="text-[12.5px] sm:text-[13px] leading-relaxed font-mono p-4 sm:p-6 md:p-8">
        <code className="block">
          {lines.map((line, i) => (
            <div key={i} className="flex gap-4 hover:bg-white/[0.02] px-2 -mx-2 rounded">
              <span className="text-subtle/70 select-none w-8 text-right shrink-0 tabular-nums">{i + 1}</span>
              <span className="flex-1 whitespace-pre" dangerouslySetInnerHTML={{ __html: highlight(line) }} />
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}

/** Tiny JSON syntax highlighter — keys, strings, numbers, booleans, null. */
function highlight(line: string): string {
  // Escape HTML first
  const escaped = line
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return escaped
    // keys (string followed by colon): "key":
    .replace(
      /("(?:\\.|[^"\\])*")(\s*:)/g,
      '<span style="color:#ff7a59">$1</span>$2',
    )
    // string values
    .replace(
      /:\s*("(?:\\.|[^"\\])*")/g,
      ': <span style="color:#a3e635">$1</span>',
    )
    // numbers
    .replace(
      /\b(-?\d+(?:\.\d+)?)\b/g,
      '<span style="color:#ff5a7a">$1</span>',
    )
    // booleans + null
    .replace(
      /\b(true|false|null)\b/g,
      '<span style="color:#7c5cff">$1</span>',
    );
}

"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Chat, { type ChatMsg } from "@/components/Chat";
import FlowCanvas from "@/components/FlowCanvas";
import BuilderSplit from "@/components/BuilderSplit";
import { Sparkles, Play, Save, CheckCircle2 } from "lucide-react";

export default function DashboardHome() {
  return (
    <Suspense fallback={<div className="h-full bg-bg" />}>
      <DashboardInner />
    </Suspense>
  );
}

function DashboardInner() {
  const sp = useSearchParams();
  const initialPrompt = sp.get("prompt") || "";
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [workflow, setWorkflow] = useState<any>(null);
  const [busy, setBusy] = useState(false);
  const [chatId, setChatId] = useState<string | null>(null);
  const [workflowId, setWorkflowId] = useState<string | null>(null);
  const [n8nId, setN8nId] = useState<string | null>(null);
  const [autoSent, setAutoSent] = useState(false);
  const [activated, setActivated] = useState(false);

  async function send(text: string) {
    setMessages((m) => [...m, { role: "user", content: text }]);
    setBusy(true);
    try {
      const r = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text, chatId }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || "Failed");
      setMessages((m) => [...m, { role: "assistant", content: j.reply }]);
      setWorkflow(j.workflow);
      setChatId(j.chatId);
      setWorkflowId(j.workflowId);
      setN8nId(j.n8nId || null);
      setActivated(false);
    } catch (e: any) {
      setMessages((m) => [...m, { role: "assistant", content: `⚠️ ${e.message}` }]);
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    if (initialPrompt && !autoSent) {
      setAutoSent(true);
      send(initialPrompt);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPrompt]);

  async function activate() {
    if (!workflowId) return;
    await fetch(`/api/workflows/${workflowId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: true }),
    });
    setActivated(true);
  }

  return (
    <BuilderSplit
      chat={<Chat messages={messages} onSend={send} busy={busy} />}
      canvas={<FlowCanvas workflow={workflow} />}
      toolbar={
        <div className="h-14 border-b border-border px-3 md:px-5 flex items-center gap-2 md:gap-3 bg-surface">
          <Sparkles className="size-4 icon-thin text-primary shrink-0" />
          <h3 className="font-medium tracking-tight truncate text-sm md:text-base">
            {workflow?.name || "Live canvas"}
          </h3>
          {n8nId && (
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-success font-mono shrink-0">
              <CheckCircle2 className="size-3 icon-thin" /> Live
            </span>
          )}
          <div className="ml-auto flex items-center gap-1.5 md:gap-2">
            {workflowId && (
              <>
                <button
                  onClick={activate}
                  className={`text-xs md:text-sm px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 md:gap-2 transition-all duration-200 press ${
                    activated
                      ? "bg-success/10 text-success border border-success/30"
                      : "btn-primary"
                  }`}
                >
                  <Play className="size-3.5 icon-thin" />
                  <span>{activated ? "Activated" : "Activate"}</span>
                </button>
                <button className="hidden sm:inline-flex text-xs md:text-sm btn-ghost px-3 py-1.5 rounded-full items-center gap-2 press">
                  <Save className="size-3.5 icon-thin" /> Saved
                </button>
              </>
            )}
          </div>
        </div>
      }
    />
  );
}

"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Chat, { type ChatMsg } from "@/components/Chat";
import FlowCanvas from "@/components/FlowCanvas";
import { Sparkles, Play, Save } from "lucide-react";

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
    <div className="grid grid-cols-[440px_1fr] h-full">
      <Chat messages={messages} onSend={send} busy={busy} />
      <div className="flex flex-col">
        <div className="h-14 border-b border-border px-5 flex items-center gap-3 bg-surface">
          <Sparkles className="size-4 text-primary" />
          <h3 className="font-medium truncate">{workflow?.name || "Live canvas"}</h3>
          <div className="ml-auto flex items-center gap-2">
            {workflowId && (
              <>
                <button onClick={activate}
                  className={`text-sm px-3 py-1.5 rounded-full flex items-center gap-2 transition ${
                    activated ? "bg-success/10 text-success border border-success/20" : "btn-primary"
                  }`}>
                  <Play className="size-3.5" /> {activated ? "Activated" : "Activate"}
                </button>
                <button className="text-sm btn-ghost px-3 py-1.5 rounded-full flex items-center gap-2">
                  <Save className="size-3.5" /> Saved
                </button>
              </>
            )}
          </div>
        </div>
        <div className="flex-1">
          <FlowCanvas workflow={workflow} />
        </div>
      </div>
    </div>
  );
}

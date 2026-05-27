"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Chat, { type ChatMsg } from "@/components/Chat";
import FlowCanvas from "@/components/FlowCanvas";
import { Sparkles, Play, Save } from "lucide-react";

export default function DashboardHome() {
  const sp = useSearchParams();
  const initialPrompt = sp.get("prompt") || "";
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [workflow, setWorkflow] = useState<any>(null);
  const [busy, setBusy] = useState(false);
  const [chatId, setChatId] = useState<string | null>(null);
  const [workflowId, setWorkflowId] = useState<string | null>(null);
  const [autoSent, setAutoSent] = useState(false);

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

  return (
    <div className="grid grid-cols-[420px_1fr] h-full">
      <Chat messages={messages} onSend={send} busy={busy} />
      <div className="flex flex-col">
        <div className="h-14 border-b border-border px-5 flex items-center gap-3 bg-surface/60">
          <Sparkles className="size-4 text-primary" />
          <h3 className="font-medium">{workflow?.name || "Live canvas"}</h3>
          <div className="ml-auto flex items-center gap-2">
            {workflowId && (
              <>
                <button
                  onClick={async () => {
                    await fetch(`/api/workflows/${workflowId}`, {
                      method: "PATCH",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ active: true }),
                    });
                    alert("Activated");
                  }}
                  className="text-sm bg-grad-primary text-white px-3 py-1.5 rounded-lg flex items-center gap-2 hover:opacity-95 transition"
                >
                  <Play className="size-3.5" /> Activate
                </button>
                <button className="text-sm glass px-3 py-1.5 rounded-lg flex items-center gap-2 hover:bg-card transition">
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

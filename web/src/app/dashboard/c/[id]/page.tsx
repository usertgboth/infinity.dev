"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Chat, { type ChatMsg } from "@/components/Chat";
import FlowCanvas from "@/components/FlowCanvas";
import { Sparkles } from "lucide-react";

export default function ChatPage() {
  const { id } = useParams<{ id: string }>();
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [workflow, setWorkflow] = useState<any>(null);
  const [workflowId, setWorkflowId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const r = await fetch(`/api/chats/${id}`);
      if (!r.ok) return;
      const j = await r.json();
      setMessages((j.messages || []).map((m: any) => ({ role: m.role, content: m.content })));
      if (j.workflow) {
        setWorkflow({
          name: j.workflow.name,
          nodes: j.workflow.graph?.nodes || [],
          connections: j.workflow.graph?.connections || {},
        });
        setWorkflowId(j.workflow.id);
      }
    })();
  }, [id]);

  async function send(text: string) {
    setMessages((m) => [...m, { role: "user", content: text }]);
    setBusy(true);
    try {
      const r = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text, chatId: id }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || "Failed");
      setMessages((m) => [...m, { role: "assistant", content: j.reply }]);
      setWorkflow(j.workflow);
      setWorkflowId(j.workflowId);
    } catch (e: any) {
      setMessages((m) => [...m, { role: "assistant", content: `⚠️ ${e.message}` }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid grid-cols-[420px_1fr] h-full">
      <Chat messages={messages} onSend={send} busy={busy} />
      <div className="flex flex-col">
        <div className="h-14 border-b border-border px-5 flex items-center gap-3 bg-surface/60">
          <Sparkles className="size-4 text-primary" />
          <h3 className="font-medium">{workflow?.name || "Canvas"}</h3>
        </div>
        <div className="flex-1"><FlowCanvas workflow={workflow} /></div>
      </div>
    </div>
  );
}

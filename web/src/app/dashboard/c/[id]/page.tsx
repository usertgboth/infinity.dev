"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Chat, { type ChatMsg } from "@/components/Chat";
import FlowCanvas from "@/components/FlowCanvas";
import BuilderSplit from "@/components/BuilderSplit";
import { Sparkles } from "lucide-react";

export default function ChatPage() {
  const { id } = useParams<{ id: string }>();
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [workflow, setWorkflow] = useState<any>(null);
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
    } catch (e: any) {
      setMessages((m) => [...m, { role: "assistant", content: `⚠️ ${e.message}` }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <BuilderSplit
      chat={<Chat messages={messages} onSend={send} busy={busy} />}
      canvas={<FlowCanvas workflow={workflow} />}
      toolbar={
        <div className="h-14 border-b border-border px-3 md:px-5 flex items-center gap-2 md:gap-3 bg-surface">
          <Sparkles className="size-4 icon-thin text-primary shrink-0" />
          <h3 className="font-medium tracking-tight truncate text-sm md:text-base">{workflow?.name || "Canvas"}</h3>
        </div>
      }
    />
  );
}

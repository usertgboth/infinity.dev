"use client";
import { useEffect, useRef, useState } from "react";
import { Sparkles, Loader2, Send } from "lucide-react";

export type ChatMsg = { role: "user" | "assistant" | "system"; content: string };

export default function Chat({
  messages, onSend, busy,
}: { messages: ChatMsg[]; onSend: (text: string) => void; busy: boolean }) {
  const [text, setText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  function submit(e?: React.FormEvent) {
    e?.preventDefault();
    if (!text.trim() || busy) return;
    onSend(text.trim());
    setText("");
  }

  return (
    <div className="flex flex-col h-full bg-surface border-r border-border">
      <div className="px-5 py-4 border-b border-border flex items-center gap-2">
        <Sparkles className="size-4 text-primary" />
        <h2 className="font-medium">Infinity AI</h2>
        <span className="ml-auto text-xs text-muted">Describe what to automate</span>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-auto p-5 space-y-4">
        {messages.length === 0 && (
          <div className="text-center pt-10 text-muted">
            <div className="size-12 mx-auto rounded-2xl bg-grad-primary/20 grid place-items-center mb-3">
              <Sparkles className="size-5 text-primary" />
            </div>
            <p className="text-sm">Tell me what to build.</p>
            <div className="mt-6 grid gap-2 text-left">
              {[
                "Send my Gmail unread count to Slack each morning",
                "When new Stripe payment, add to Notion + email me",
                "Daily AI summary of HN top stories to Telegram",
              ].map((s) => (
                <button key={s} onClick={() => onSend(s)}
                  className="glass rounded-xl p-3 text-sm text-text/90 hover:bg-card text-left transition">
                  → {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`flex gap-3 animate-fade-in ${m.role === "user" ? "" : ""}`}>
            <div className={`size-8 rounded-lg shrink-0 grid place-items-center ${
              m.role === "user" ? "bg-card border border-border" : "bg-grad-primary"
            }`}>
              {m.role === "user" ? <span className="text-xs">You</span> : <Sparkles className="size-4 text-white" />}
            </div>
            <div className={`flex-1 rounded-2xl px-4 py-3 text-sm ${
              m.role === "user" ? "bg-card border border-border" : "glass"
            }`}>
              <Markdown text={m.content} />
            </div>
          </div>
        ))}

        {busy && (
          <div className="flex gap-3">
            <div className="size-8 rounded-lg bg-grad-primary grid place-items-center">
              <Sparkles className="size-4 text-white" />
            </div>
            <div className="glass rounded-2xl px-4 py-3 text-sm flex items-center gap-2 text-muted">
              <Loader2 className="size-4 animate-spin" />
              <span className="typing">Building your automation</span>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={submit} className="p-4 border-t border-border">
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) submit();
            }}
            placeholder="Describe an automation..."
            rows={2}
            className="w-full resize-none bg-card border border-border rounded-xl px-4 py-3 pr-12 outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition text-sm"
          />
          <button
            type="submit"
            disabled={busy || !text.trim()}
            className="absolute bottom-2.5 right-2.5 size-9 rounded-lg bg-grad-primary text-white grid place-items-center disabled:opacity-50 hover:opacity-90 transition"
          >
            {busy ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
          </button>
        </div>
      </form>
    </div>
  );
}

function Markdown({ text }: { text: string }) {
  // very small md: bold + line breaks
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <p className="whitespace-pre-wrap">
      {parts.map((p, i) =>
        p.startsWith("**") && p.endsWith("**")
          ? <strong key={i}>{p.slice(2, -2)}</strong>
          : <span key={i}>{p}</span>
      )}
    </p>
  );
}

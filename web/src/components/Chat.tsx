"use client";
import { useEffect, useRef, useState } from "react";
import { Sparkles, Loader2, ArrowUp } from "lucide-react";

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
        <div className="size-7 rounded-lg bg-grad-brand grid place-items-center shadow-glow">
          <Sparkles className="size-3.5 text-white" />
        </div>
        <h2 className="font-medium">Infinity</h2>
        <span className="ml-auto text-xs text-muted">Describe what to automate</span>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-auto p-5 space-y-4">
        {messages.length === 0 && (
          <div className="text-center pt-10 text-muted">
            <div className="size-12 mx-auto rounded-2xl bg-grad-brand-soft grid place-items-center mb-3">
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
                  className="card rounded-xl p-3 text-sm text-text/90 text-left hover:border-primary/30 hover:shadow-soft transition">
                  → {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className="flex gap-3 animate-fade-in">
            <div className={`size-8 rounded-lg shrink-0 grid place-items-center ${
              m.role === "user" ? "bg-bg border border-border" : "bg-grad-brand shadow-glow"
            }`}>
              {m.role === "user" ? (
                <span className="text-xs font-medium text-muted">You</span>
              ) : (
                <Sparkles className="size-4 text-white" />
              )}
            </div>
            <div className={`flex-1 rounded-2xl px-4 py-3 text-sm ${
              m.role === "user" ? "bg-bg border border-border" : "card"
            }`}>
              <Markdown text={m.content} />
            </div>
          </div>
        ))}

        {busy && (
          <div className="flex gap-3">
            <div className="size-8 rounded-lg bg-grad-brand grid place-items-center shadow-glow">
              <Sparkles className="size-4 text-white" />
            </div>
            <div className="card rounded-2xl px-4 py-3 text-sm flex items-center gap-2 text-muted">
              <Loader2 className="size-4 animate-spin text-primary" />
              <span className="typing">Building your automation</span>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={submit} className="p-4 border-t border-border bg-bg/40">
        <div className="relative bg-white rounded-2xl border border-border focus-within:border-primary/40 focus-within:ring-4 focus-within:ring-primary/10 transition shadow-soft">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) submit();
            }}
            placeholder="Describe an automation..."
            rows={2}
            className="w-full resize-none bg-transparent rounded-2xl px-4 py-3 pr-14 outline-none text-sm placeholder:text-subtle"
          />
          <button
            type="submit"
            disabled={busy || !text.trim()}
            className="absolute bottom-2.5 right-2.5 size-9 rounded-xl btn-primary grid place-items-center"
          >
            {busy ? <Loader2 className="size-4 animate-spin" /> : <ArrowUp className="size-4" />}
          </button>
        </div>
      </form>
    </div>
  );
}

function Markdown({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <p className="whitespace-pre-wrap leading-relaxed">
      {parts.map((p, i) =>
        p.startsWith("**") && p.endsWith("**")
          ? <strong key={i} className="font-semibold">{p.slice(2, -2)}</strong>
          : <span key={i}>{p}</span>
      )}
    </p>
  );
}

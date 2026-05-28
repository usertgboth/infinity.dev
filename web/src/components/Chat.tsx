"use client";
import { useEffect, useRef, useState } from "react";
import { Sparkles, Loader2, ArrowUp } from "lucide-react";

export type ChatMsg = { role: "user" | "assistant" | "system"; content: string };

const SUGGESTIONS = [
  "Send my Gmail unread count to Slack each morning at 9am",
  "When a new Stripe payment lands, add the customer to Notion and email me",
  "Daily AI summary of Hacker News top stories to Telegram",
];

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
      <div className="px-3 sm:px-4 md:px-5 py-3 sm:py-4 border-b border-border flex items-center gap-2 sm:gap-2.5">
        <div className="size-6 sm:size-7 rounded-lg sm:rounded-xl bg-grad-brand grid place-items-center shadow-glow">
          <Sparkles className="size-3 sm:size-3.5 text-white icon-thin" />
        </div>
        <h2 className="font-medium tracking-tight text-sm sm:text-base">Infinity</h2>
        <span className="ml-auto font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-subtle">Builder</span>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-auto p-3 sm:p-4 md:p-5 space-y-3 sm:space-y-4">
        {messages.length === 0 && (
          <div className="pt-4 sm:pt-6">
            <span className="eyebrow !text-[9px] sm:!text-[10px]">Start here</span>
            <h3 className="mt-3 sm:mt-4 font-display text-xl sm:text-2xl font-semibold tracking-tightest-2 leading-tight text-balance">
              Tell me what to build,<br /><span className="gradient-text">in one sentence.</span>
            </h3>
            <div className="mt-5 sm:mt-7 grid gap-2 sm:gap-2.5">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => onSend(s)}
                  className="press card rounded-xl sm:rounded-2xl px-3 sm:px-4 py-3 sm:py-3.5 text-[12px] sm:text-[13.5px] text-left text-text/90 leading-relaxed hover:border-borderStrong hover:-translate-y-px transition-all duration-500 ease-out-expo group"
                >
                  <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-subtle group-hover:text-primary transition-colors">Try</span>
                  <span className="block mt-1 text-pretty">{s}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className="flex gap-2.5 sm:gap-3 animate-fade-in">
            <div className={`size-7 sm:size-8 rounded-lg sm:rounded-xl shrink-0 grid place-items-center ${
              m.role === "user"
                ? "bg-white/[0.04] border border-border"
                : "bg-grad-brand shadow-glow"
            }`}>
              {m.role === "user" ? (
                <span className="font-mono text-[9px] sm:text-[10px] font-medium text-muted">You</span>
              ) : (
                <Sparkles className="size-3.5 sm:size-4 text-white icon-thin" />
              )}
            </div>
            <div className={`flex-1 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 text-[13px] sm:text-[14px] leading-relaxed ${
              m.role === "user" ? "bg-white/[0.03] border border-border" : "card"
            }`}>
              <Markdown text={m.content} />
            </div>
          </div>
        ))}

        {busy && (
          <div className="flex gap-2.5 sm:gap-3 animate-fade-in">
            <div className="size-7 sm:size-8 rounded-lg sm:rounded-xl bg-grad-brand grid place-items-center shadow-glow">
              <Sparkles className="size-3.5 sm:size-4 text-white icon-thin" />
            </div>
            <div className="card rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm flex items-center gap-2 text-muted">
              <Loader2 className="size-3.5 sm:size-4 animate-spin text-primary icon-thin" />
              <span className="typing">Wiring it up</span>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={submit} className="p-3 sm:p-4 border-t border-border bg-bg/30">
        <div className="relative bg-elevated rounded-xl sm:rounded-2xl border border-borderStrong/40 focus-within:border-primary/40 focus-within:ring-4 focus-within:ring-primary/10 transition-all duration-300 ease-out-expo shadow-soft">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) submit(); }}
            placeholder="Describe an automation..."
            rows={2}
            className="w-full resize-none bg-transparent rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 pr-12 sm:pr-14 outline-none text-[13px] sm:text-[14px] tracking-tight placeholder:text-subtle text-text"
          />
          <button
            type="submit"
            aria-label="Send"
            disabled={busy || !text.trim()}
            className="absolute bottom-2 sm:bottom-2.5 right-2 sm:right-2.5 size-8 sm:size-9 rounded-lg sm:rounded-xl btn-primary grid place-items-center"
          >
            {busy ? <Loader2 className="size-3.5 sm:size-4 animate-spin icon-thin" /> : <ArrowUp className="size-3.5 sm:size-4 icon-thin" />}
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

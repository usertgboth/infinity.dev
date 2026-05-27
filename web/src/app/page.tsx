"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowRight, ArrowUp, Sparkles, Cable, Workflow, Zap, ShieldCheck, Bot,
  Mail, MessageSquare, Database, Send, Image as ImageIcon, Calendar,
} from "lucide-react";

const examples = [
  "When a customer pays in Stripe, add them to my Mailchimp list and DM me on Telegram",
  "Every morning at 9am, summarize my Gmail unread inbox with GPT and email me back",
  "Watch a Google Sheet for new rows, generate AI image with DALL·E, post to Telegram",
  "Scrape Hacker News top 5 daily, paraphrase with AI, publish to Twitter",
];

const chips = [
  "Schedule daily digest",
  "Slack alerts from Stripe",
  "AI reply to Gmail",
  "New Notion → Telegram",
];

const integrations = [
  { name: "Gmail", Icon: Mail, color: "#ef4444" },
  { name: "Slack", Icon: MessageSquare, color: "#7c5cff" },
  { name: "Sheets", Icon: Database, color: "#0F9D58" },
  { name: "Telegram", Icon: Send, color: "#3b82f6" },
  { name: "OpenAI", Icon: Bot, color: "#10a37f" },
  { name: "DALL·E", Icon: ImageIcon, color: "#10a37f" },
  { name: "Schedule", Icon: Calendar, color: "#f59e0b" },
  { name: "Webhook", Icon: Zap, color: "#22c55e" },
];

export default function Landing() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");

  function go(text?: string) {
    const t = (text ?? prompt).trim();
    if (!t) return router.push("/register");
    router.push(`/register?prompt=${encodeURIComponent(t)}`);
  }

  return (
    <div className="min-h-screen relative">
      {/* Top warm gradient backdrop */}
      <div className="absolute inset-x-0 top-0 h-[800px] bg-grad-hero pointer-events-none" />

      <nav className="relative z-30 max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <span className="font-semibold tracking-tight text-lg">Infinity</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted">
          <a href="#how" className="hover:text-text transition">How it works</a>
          <a href="#integrations" className="hover:text-text transition">Integrations</a>
          <a href="#examples" className="hover:text-text transition">Examples</a>
          <a href="#pricing" className="hover:text-text transition">Pricing</a>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/login" className="text-sm text-muted hover:text-text px-3 py-2 transition">Sign in</Link>
          <Link href="/register" className="btn-primary text-sm px-4 py-2 rounded-full">Get started</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-border shadow-soft text-xs text-muted">
          <Sparkles className="size-3.5 text-primary" />
          <span>Powered by n8n · 400+ integrations</span>
        </div>

        <h1 className="mt-6 text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] text-ink">
          Build automations<br />
          <span className="gradient-text">by chatting with AI.</span>
        </h1>
        <p className="mt-5 max-w-xl mx-auto text-lg text-muted">
          Describe what should happen, when, and where — Infinity wires it up live.
          No code. No node-dragging.
        </p>

        {/* Prompt box — Lovable hero */}
        <div className="mt-10 mx-auto max-w-2xl">
          <form
            onSubmit={(e) => { e.preventDefault(); go(); }}
            className="relative bg-white border border-border rounded-3xl p-2 shadow-prompt"
          >
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); go(); }
              }}
              placeholder="Ask Infinity to build an automation..."
              rows={3}
              className="w-full resize-none bg-transparent rounded-2xl px-4 py-3 text-base outline-none placeholder:text-subtle"
            />
            <div className="flex items-center justify-between gap-2 px-2 pb-1">
              <div className="flex flex-wrap gap-1.5">
                {chips.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setPrompt(c)}
                    className="text-xs px-2.5 py-1 rounded-full border border-border bg-bg/60 text-muted hover:text-text hover:border-borderStrong transition"
                  >
                    {c}
                  </button>
                ))}
              </div>
              <button
                type="submit"
                aria-label="Build"
                className="size-10 rounded-2xl btn-primary grid place-items-center"
              >
                <ArrowUp className="size-4" />
              </button>
            </div>
          </form>
          <p className="mt-3 text-xs text-subtle">Free to start · No credit card · Activate with one click</p>
        </div>

        {/* Floating decoration card */}
        <div className="mt-16 mx-auto max-w-3xl card rounded-3xl overflow-hidden text-left animate-float">
          <div className="flex items-center gap-2 px-5 py-3 border-b border-border">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-xs text-muted">infinity.dev / new automation</span>
          </div>
          <div className="grid md:grid-cols-2">
            <div className="p-5 border-r border-border">
              <p className="text-xs text-muted mb-2">You</p>
              <p className="text-sm">"Send my Gmail unread count to Slack each morning at 9am."</p>
              <p className="text-xs text-muted mt-5 mb-2">Infinity</p>
              <p className="text-sm">Done — wired Schedule → Gmail → Slack. <span className="text-primary">Activate?</span></p>
            </div>
            <div className="p-5 bg-[#fbf8f3] flex items-center gap-3">
              <NodePreview Icon={Calendar} label="Schedule" tone="#f59e0b" />
              <Arrow />
              <NodePreview Icon={Mail} label="Gmail" tone="#ef4444" />
              <Arrow />
              <NodePreview Icon={MessageSquare} label="Slack" tone="#7c5cff" />
            </div>
          </div>
        </div>
      </section>

      {/* INTEGRATIONS marquee */}
      <section id="integrations" className="relative z-10 py-10 fade-mask-x overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-xs uppercase tracking-widest text-subtle mb-6">Connects everything you already use</p>
          <div className="flex flex-wrap justify-center gap-3">
            {integrations.map((i) => (
              <div key={i.name} className="card rounded-2xl px-4 py-2.5 flex items-center gap-2.5">
                <div className="size-7 rounded-lg grid place-items-center" style={{ background: i.color + "1a" }}>
                  <i.Icon className="size-3.5" style={{ color: i.color }} />
                </div>
                <span className="text-sm">{i.name}</span>
              </div>
            ))}
            <div className="card rounded-2xl px-4 py-2.5 flex items-center gap-2 text-sm text-muted">
              + 400 more
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Three steps. <span className="gradient-text">That's it.</span></h2>
          <p className="mt-4 text-muted">From idea to live automation faster than you can write a tweet.</p>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {[
            { n: "01", t: "Describe", d: "Tell Infinity what should happen, when, and where — in plain English.", Icon: Sparkles },
            { n: "02", t: "Watch it build", d: "AI assembles the workflow live on the canvas. Tweak any node by clicking.", Icon: Workflow },
            { n: "03", t: "Activate", d: "One click and your automation runs in production with full logs and retries.", Icon: Zap },
          ].map((s) => (
            <div key={s.n} className="card rounded-3xl p-7 hover:shadow-lifted transition-shadow">
              <div className="flex items-center justify-between">
                <div className="size-11 rounded-2xl bg-grad-brand-soft grid place-items-center">
                  <s.Icon className="size-5 text-primary" />
                </div>
                <span className="text-xs text-subtle font-mono">{s.n}</span>
              </div>
              <h3 className="mt-5 text-xl font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm text-muted">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-5">
        {[
          { Icon: Bot, title: "AI builds it for you", desc: "Type plain English. Infinity assembles the workflow in real time on a canvas you can tweak." },
          { Icon: Cable, title: "400+ integrations", desc: "Gmail, Slack, Notion, Sheets, Stripe, Airtable, Telegram, OpenAI — battle-tested via n8n." },
          { Icon: ShieldCheck, title: "Secure by default", desc: "OAuth, encrypted credentials, audit log. Admin panel built in. Self-host if you want." },
        ].map((f) => (
          <div key={f.title} className="card rounded-3xl p-7">
            <div className="size-11 rounded-2xl bg-grad-brand-soft grid place-items-center">
              <f.Icon className="size-5 text-primary" />
            </div>
            <h3 className="mt-5 font-semibold">{f.title}</h3>
            <p className="mt-1.5 text-sm text-muted">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* EXAMPLES */}
      <section id="examples" className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Just say it.</h2>
          <p className="mt-3 text-muted">Real prompts. Real automations.</p>
        </div>
        <div className="mt-10 grid md:grid-cols-2 gap-4">
          {examples.map((e) => (
            <button
              key={e}
              onClick={() => go(e)}
              className="card rounded-3xl p-5 text-left hover:border-primary/30 hover:shadow-lifted transition group"
            >
              <div className="flex items-start gap-3">
                <div className="size-9 rounded-xl bg-grad-brand-soft grid place-items-center shrink-0">
                  <Sparkles className="size-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm leading-relaxed">"{e}"</p>
                  <p className="mt-3 text-xs text-primary inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                    Build this <ArrowRight className="size-3" />
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="pricing" className="relative z-10 max-w-4xl mx-auto px-6 pb-24">
        <div className="card rounded-[2rem] p-12 text-center bg-grad-brand-soft border-primary/10">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Ready when you are.</h2>
          <p className="mt-3 text-muted">Free to start. Upgrade only when you outgrow the free tier.</p>
          <Link href="/register" className="mt-7 inline-flex items-center gap-2 btn-primary px-6 py-3 rounded-full">
            Start building <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <footer className="relative z-10 border-t border-border py-10 text-center text-sm text-muted">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Logo />
          <span className="font-semibold text-text">Infinity</span>
        </div>
        © {new Date().getFullYear()} · Built on n8n · Made for humans
      </footer>
    </div>
  );
}

function Logo() {
  return (
    <div className="size-8 rounded-xl bg-grad-brand grid place-items-center shadow-glow">
      <Sparkles className="size-4 text-white" />
    </div>
  );
}

function NodePreview({ Icon, label, tone }: { Icon: any; label: string; tone: string }) {
  return (
    <div className="flex-1 card rounded-2xl px-3 py-2.5 flex items-center gap-2">
      <div className="size-7 rounded-lg grid place-items-center" style={{ background: tone + "1a" }}>
        <Icon className="size-3.5" style={{ color: tone }} />
      </div>
      <span className="text-xs font-medium">{label}</span>
    </div>
  );
}

function Arrow() {
  return <div className="text-subtle text-xs">→</div>;
}

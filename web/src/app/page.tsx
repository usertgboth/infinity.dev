"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowUpRight, ArrowRight, ArrowUp, Sparkles, Mail, MessageSquare,
  Database, Send, Bot, Image as ImageIcon, Calendar, Globe, GitBranch,
  Webhook, Settings, Cable, ShieldCheck,
} from "lucide-react";

const examples = [
  "When a Stripe customer pays, add to Mailchimp and DM me on Telegram.",
  "Every weekday at 9am, summarize my unread Gmail with GPT and email it back.",
  "Watch a Google Sheet for new rows, generate an image with DALL E, post to Telegram.",
  "Daily, paraphrase the Hacker News top 5 with AI and publish to a Slack channel.",
];

const chips = [
  "Daily Gmail digest",
  "Stripe to Slack alerts",
  "AI replies for support",
  "Sheet to Telegram",
];

const integrations = [
  { name: "Gmail", Icon: Mail, color: "#ef4444" },
  { name: "Slack", Icon: MessageSquare, color: "#5b5fc7" },
  { name: "Sheets", Icon: Database, color: "#0F9D58" },
  { name: "Telegram", Icon: Send, color: "#229ED9" },
  { name: "OpenAI", Icon: Bot, color: "#10a37f" },
  { name: "Schedule", Icon: Calendar, color: "#f59e0b" },
  { name: "Webhook", Icon: Webhook, color: "#22c55e" },
  { name: "HTTP", Icon: Globe, color: "#3b82f6" },
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
    <div className="relative min-h-[100dvh] overflow-x-hidden">
      <div className="grain-fixed" />
      <div className="absolute inset-x-0 top-0 h-[820px] bg-grad-hero pointer-events-none" />

      {/* Floating glass nav pill */}
      <header className="sticky top-4 md:top-6 z-[var(--z-sticky)] px-4">
        <nav className="mx-auto max-w-3xl flex items-center justify-between gap-2 rounded-full border border-borderStrong/60 bg-white/70 backdrop-blur-xl pr-2 pl-4 py-2 shadow-soft">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
            <span className="font-semibold tracking-tight">Infinity</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm text-muted">
            <a href="#how" className="hover:text-text transition-colors">Process</a>
            <a href="#bento" className="hover:text-text transition-colors">What it does</a>
            <a href="#examples" className="hover:text-text transition-colors">Examples</a>
          </div>
          <div className="flex items-center gap-1">
            <Link href="/login" className="text-sm text-muted hover:text-text px-3 py-1.5 rounded-full transition-colors">Sign in</Link>
            <Link href="/register" className="btn-primary text-sm pl-4 pr-1.5 py-1.5 rounded-full inline-flex items-center gap-2 group">
              Get started
              <span className="size-7 rounded-full bg-white/15 grid place-items-center transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5">
                <ArrowUpRight className="size-3.5 icon-thin" />
              </span>
            </Link>
          </div>
        </nav>
      </header>

      {/* HERO — editorial split */}
      <section className="relative max-w-6xl mx-auto px-4 md:px-8 pt-20 md:pt-28 pb-20">
        <div className="grid md:grid-cols-12 gap-10 md:gap-6 items-end">
          <div className="md:col-span-7 animate-rise">
            <span className="eyebrow">
              <span className="size-1.5 rounded-full bg-primary animate-pulse-soft" />
              Automation × AI · 400 integrations
            </span>
            <h1 className="mt-6 text-balance font-display text-[44px] sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tightest-2 leading-[0.95] text-ink">
              Describe it.<br />
              <span className="serif text-primary">Watch</span> it build itself.
            </h1>
            <p className="mt-6 text-pretty text-lg text-muted max-w-[52ch]">
              Infinity turns plain English into running automations. The AI assembles the
              workflow live, you click activate, it works.
            </p>
          </div>

          {/* Hero double-bezel prompt — sits at lower right */}
          <div className="md:col-span-5 animate-rise" style={{ animationDelay: "150ms" }}>
            <div className="rounded-[28px] bezel-outer">
              <form
                onSubmit={(e) => { e.preventDefault(); go(); }}
                className="rounded-[22px] bezel-inner shadow-prompt p-3"
              >
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); go(); }
                  }}
                  placeholder="Build me an automation that..."
                  rows={3}
                  className="w-full resize-none bg-transparent rounded-2xl px-3 py-2 text-base outline-none placeholder:text-subtle font-medium tracking-tight"
                />
                <div className="flex items-center justify-between gap-2 px-1 pt-1">
                  <div className="flex flex-wrap gap-1.5">
                    {chips.slice(0, 2).map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setPrompt(c)}
                        className="text-[11px] px-2.5 py-1 rounded-full border border-borderStrong/60 bg-bg/70 text-muted hover:text-text hover:border-borderStrong transition-colors"
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                  <button
                    type="submit"
                    aria-label="Build"
                    className="btn-primary size-10 rounded-2xl grid place-items-center"
                  >
                    <ArrowUp className="size-4 icon-thin" />
                  </button>
                </div>
              </form>
            </div>
            <p className="mt-3 text-xs text-subtle pl-1">Free to start · No credit card · Cancel anytime</p>
          </div>
        </div>

        {/* Inline preview row */}
        <div className="mt-16 md:mt-20 rounded-[28px] bezel-outer animate-rise" style={{ animationDelay: "350ms" }}>
          <div className="rounded-[22px] bezel-inner overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-border">
              <span className="size-2 rounded-full bg-[#ff5f57]" />
              <span className="size-2 rounded-full bg-[#febc2e]" />
              <span className="size-2 rounded-full bg-[#28c840]" />
              <span className="ml-3 font-mono text-[11px] text-subtle tracking-widest">infinity.dev / new automation</span>
              <span className="ml-auto eyebrow !py-1 !px-2 !text-[10px]">Live</span>
            </div>
            <div className="grid md:grid-cols-12">
              <div className="md:col-span-5 p-6 border-r border-border">
                <p className="font-mono text-[10px] uppercase tracking-widest text-subtle">You</p>
                <p className="mt-2 text-[15px] leading-relaxed">"Send my Gmail unread count to Slack each morning at 9am."</p>
                <p className="mt-6 font-mono text-[10px] uppercase tracking-widest text-subtle">Infinity</p>
                <p className="mt-2 text-[15px] leading-relaxed">
                  Wired <span className="font-medium">Schedule → Gmail → Slack</span>.<br />
                  <span className="text-primary">Activate?</span>
                </p>
              </div>
              <div className="md:col-span-7 p-6 bg-[#fbf8f3] flex items-center gap-2 overflow-x-auto">
                <NodePreview Icon={Calendar} label="Schedule" tone="#f59e0b" />
                <Arrow />
                <NodePreview Icon={Mail} label="Gmail" tone="#ef4444" />
                <Arrow />
                <NodePreview Icon={MessageSquare} label="Slack" tone="#5b5fc7" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee logos */}
      <section className="relative py-10 fade-mask-x overflow-hidden">
        <p className="text-center font-mono text-[10px] uppercase tracking-[0.24em] text-subtle mb-6">
          Connects everything you already use
        </p>
        <div className="flex animate-marquee gap-3 w-max">
          {[...integrations, ...integrations].map((i, idx) => (
            <div key={`${i.name}-${idx}`} className="card rounded-2xl px-4 py-2.5 flex items-center gap-2.5 shrink-0">
              <div className="size-7 rounded-lg grid place-items-center" style={{ background: i.color + "1a" }}>
                <i.Icon className="size-3.5 icon-thin" style={{ color: i.color }} />
              </div>
              <span className="text-sm font-medium tracking-tight">{i.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS — editorial three steps, asymmetric */}
      <section id="how" className="relative max-w-6xl mx-auto px-4 md:px-8 py-32">
        <div className="grid md:grid-cols-12 gap-8 mb-14">
          <div className="md:col-span-7">
            <span className="eyebrow">Process</span>
            <h2 className="mt-5 text-balance font-display text-4xl md:text-6xl font-semibold tracking-tightest-2 leading-[0.98]">
              Three movements,<br />
              <span className="serif text-primary">no friction.</span>
            </h2>
          </div>
          <p className="md:col-span-5 md:col-start-8 text-pretty text-muted self-end">
            From idea to live automation faster than you can write it down. The AI does
            the wiring while you watch.
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-5">
          {[
            { n: "01", t: "Describe", d: "Tell Infinity what should happen, when, and where, in plain English.", Icon: Sparkles },
            { n: "02", t: "Watch", d: "AI assembles the workflow live on the canvas. Tap any node to tweak.", Icon: Settings },
            { n: "03", t: "Activate", d: "One click and it runs in production with full logs and retries.", Icon: ShieldCheck },
          ].map((s, i) => (
            <article
              key={s.n}
              className={`card rounded-[28px] p-7 md:col-span-4 transition-transform duration-700 ease-out-expo hover:-translate-y-1 ${i === 1 ? "md:translate-y-6" : ""}`}
            >
              <div className="flex items-center justify-between">
                <div className="size-11 rounded-2xl bg-grad-brand-soft grid place-items-center">
                  <s.Icon className="size-5 icon-thin text-primary" />
                </div>
                <span className="font-mono text-xs text-subtle tracking-widest">{s.n}</span>
              </div>
              <h3 className="mt-6 text-2xl font-medium tracking-tight">{s.t}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed text-pretty">{s.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* BENTO — asymmetric grid */}
      <section id="bento" className="relative max-w-6xl mx-auto px-4 md:px-8 pb-32">
        <div className="grid md:grid-cols-12 gap-8 mb-12">
          <div className="md:col-span-6">
            <span className="eyebrow">Capabilities</span>
            <h2 className="mt-5 text-balance font-display text-4xl md:text-6xl font-semibold tracking-tightest-2 leading-[0.98]">
              An <span className="serif text-primary">opinionated</span> toolbox.
            </h2>
          </div>
          <p className="md:col-span-5 md:col-start-8 text-pretty text-muted self-end">
            Everything required to ship a real automation, with none of the fluff. Built
            on the n8n execution engine.
          </p>
        </div>

        <div className="grid md:grid-cols-6 md:grid-rows-2 gap-4 md:gap-5">
          {/* Big card — AI builder */}
          <div className="card rounded-[28px] p-7 md:col-span-4 md:row-span-2 relative overflow-hidden">
            <div className="absolute -right-16 -top-16 size-64 rounded-full bg-grad-brand-soft blur-3xl pointer-events-none" />
            <span className="eyebrow">Live builder</span>
            <h3 className="mt-5 font-display text-3xl md:text-4xl tracking-tight font-medium">
              The canvas <span className="serif text-primary">draws itself</span>.
            </h3>
            <p className="mt-3 text-muted max-w-[44ch]">
              Type a sentence. Watch the AI place nodes, set parameters, and connect
              edges in real time. Every node is editable, none of it is locked.
            </p>
            <div className="mt-6 rounded-2xl bezel-outer">
              <div className="rounded-xl bezel-inner p-4 flex items-center gap-2 overflow-x-auto">
                <NodePreview Icon={Webhook} label="Webhook" tone="#22c55e" />
                <Arrow />
                <NodePreview Icon={GitBranch} label="Branch" tone="#f59e0b" />
                <Arrow />
                <NodePreview Icon={Bot} label="OpenAI" tone="#10a37f" />
                <Arrow />
                <NodePreview Icon={Database} label="Sheets" tone="#0F9D58" />
              </div>
            </div>
          </div>

          {/* 400 integrations */}
          <div className="card rounded-[28px] p-7 md:col-span-2">
            <div className="flex items-center justify-between">
              <span className="eyebrow">Integrations</span>
              <Cable className="size-4 icon-thin text-subtle" />
            </div>
            <p className="mt-5 font-display text-5xl tracking-tightest-2 font-medium tabular-nums">400+</p>
            <p className="mt-2 text-sm text-muted">First-class apps, plus HTTP for everything else.</p>
          </div>

          {/* Secure */}
          <div className="card rounded-[28px] p-7 md:col-span-2">
            <div className="flex items-center justify-between">
              <span className="eyebrow">Security</span>
              <ShieldCheck className="size-4 icon-thin text-subtle" />
            </div>
            <h3 className="mt-5 font-display text-2xl tracking-tight font-medium">
              Encrypted, audited, <span className="serif text-primary">yours</span>.
            </h3>
            <p className="mt-2 text-sm text-muted">OAuth, encrypted credentials, audit log. Self-host if you want.</p>
          </div>
        </div>
      </section>

      {/* EXAMPLES — asymmetric pair */}
      <section id="examples" className="relative max-w-6xl mx-auto px-4 md:px-8 pb-32">
        <div className="mb-12">
          <span className="eyebrow">Examples</span>
          <h2 className="mt-5 text-balance font-display text-4xl md:text-6xl font-semibold tracking-tightest-2 leading-[0.98] max-w-3xl">
            Real prompts.<br /><span className="serif text-primary">Real automations.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4 md:gap-5">
          {examples.map((e, idx) => (
            <button
              key={e}
              onClick={() => go(e)}
              className={`group card rounded-[28px] p-6 text-left transition-all duration-700 ease-out-expo hover:-translate-y-1 hover:border-borderStrong active:scale-[0.99] ${idx % 2 === 0 ? "md:translate-y-2" : ""}`}
            >
              <div className="flex items-start gap-4">
                <div className="size-10 rounded-2xl bg-grad-brand-soft grid place-items-center shrink-0">
                  <Sparkles className="size-4 icon-thin text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-[15px] leading-relaxed text-pretty">{e}</p>
                  <p className="mt-4 text-xs text-primary inline-flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                    Build this
                    <span className="size-5 rounded-full bg-primary/10 grid place-items-center transition-transform duration-500 ease-out-expo group-hover:translate-x-1">
                      <ArrowRight className="size-3 icon-thin" />
                    </span>
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* CTA — final */}
      <section className="relative max-w-5xl mx-auto px-4 md:px-8 pb-32">
        <div className="rounded-[40px] bezel-outer">
          <div className="rounded-[32px] bezel-inner relative overflow-hidden p-12 md:p-20 text-center">
            <div className="absolute inset-0 bg-grad-hero pointer-events-none opacity-90" />
            <div className="relative">
              <span className="eyebrow">Ready when you are</span>
              <h2 className="mt-6 text-balance font-display text-5xl md:text-7xl font-semibold tracking-tightest-2 leading-[0.95]">
                Start with one <span className="serif text-primary">sentence</span>.
              </h2>
              <p className="mt-5 text-muted max-w-md mx-auto">Free tier. Upgrade only when you outgrow it.</p>
              <Link
                href="/register"
                className="btn-primary mt-9 inline-flex items-center gap-2 pl-6 pr-2 py-2 rounded-full group"
              >
                <span className="text-base">Build my first automation</span>
                <span className="size-9 rounded-full bg-white/15 grid place-items-center transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-[1px]">
                  <ArrowUpRight className="size-4 icon-thin" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative border-t border-border py-10 text-center text-sm text-muted">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Logo small />
          <span className="font-medium text-text tracking-tight">Infinity</span>
        </div>
        <p className="text-xs text-subtle">© {new Date().getFullYear()} · Built on n8n · Made for humans</p>
      </footer>
    </div>
  );
}

function Logo({ small = false }: { small?: boolean }) {
  const size = small ? "size-6" : "size-7";
  return (
    <div className={`${size} rounded-xl bg-grad-brand grid place-items-center shadow-soft`}>
      <Sparkles className={`${small ? "size-3" : "size-3.5"} text-white icon-thin`} />
    </div>
  );
}

function NodePreview({ Icon, label, tone }: { Icon: any; label: string; tone: string }) {
  return (
    <div className="shrink-0 rounded-2xl bg-white border border-border px-3 py-2.5 flex items-center gap-2 shadow-soft">
      <div className="size-7 rounded-lg grid place-items-center" style={{ background: tone + "1a" }}>
        <Icon className="size-3.5 icon-thin" style={{ color: tone }} />
      </div>
      <span className="text-xs font-medium tracking-tight">{label}</span>
    </div>
  );
}

function Arrow() {
  return (
    <span className="text-subtle text-xs select-none" aria-hidden="true">
      <svg width="20" height="8" viewBox="0 0 20 8" fill="none">
        <path d="M0 4h18m0 0L14 1m4 3l-4 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    </span>
  );
}

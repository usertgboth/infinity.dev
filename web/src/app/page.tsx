"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowUp, ArrowUpRight, Sparkles, Mail, MessageSquare, Database, Send,
  Bot, Calendar, Webhook, Globe, GitBranch, Github, FileText, ShoppingCart,
} from "lucide-react";

const chips = [
  { label: "Gmail digest", value: "Every weekday at 9am, summarize my unread Gmail with GPT and email it back to me." },
  { label: "Stripe to Slack", value: "When a Stripe payment lands, post a celebration to my #sales Slack channel." },
  { label: "Sheet to Telegram", value: "When a row is added to my Google Sheet, post a formatted message to Telegram." },
  { label: "AI support replies", value: "When a Gmail email arrives with label 'support', draft a reply with GPT and save it as draft." },
  { label: "HN to Twitter", value: "Every morning, fetch Hacker News top 5, paraphrase with AI, post to Twitter." },
];

const community = [
  {
    title: "Daily revenue digest",
    by: "linnea.k",
    builds: 482,
    nodes: ["Schedule", "Stripe", "OpenAI", "Slack"],
    accent: "#22c55e",
  },
  {
    title: "Auto-reply to investor emails",
    by: "marcus.t",
    builds: 213,
    nodes: ["Gmail", "OpenAI", "Gmail"],
    accent: "#7848ff",
  },
  {
    title: "New signup → Notion CRM",
    by: "tomas.w",
    builds: 1184,
    nodes: ["Webhook", "Notion", "Slack"],
    accent: "#ff5a7a",
  },
  {
    title: "Brand mentions monitor",
    by: "ana.s",
    builds: 372,
    nodes: ["Schedule", "HTTP", "OpenAI", "Telegram"],
    accent: "#ff7a59",
  },
  {
    title: "Lead enrichment pipeline",
    by: "kasimir.r",
    builds: 158,
    nodes: ["Webhook", "Apollo", "OpenAI", "Sheets"],
    accent: "#3b82f6",
  },
  {
    title: "Weekly content brief",
    by: "yuna.h",
    builds: 92,
    nodes: ["Schedule", "OpenAI", "Notion"],
    accent: "#f59e0b",
  },
];

const integrations = [
  { name: "Gmail", Icon: Mail, color: "#ef4444" },
  { name: "Slack", Icon: MessageSquare, color: "#7c5cff" },
  { name: "Sheets", Icon: Database, color: "#22c55e" },
  { name: "Telegram", Icon: Send, color: "#229ED9" },
  { name: "OpenAI", Icon: Bot, color: "#10a37f" },
  { name: "GitHub", Icon: Github, color: "#ffffff" },
  { name: "Notion", Icon: FileText, color: "#ffffff" },
  { name: "Stripe", Icon: ShoppingCart, color: "#7c5cff" },
  { name: "HTTP", Icon: Globe, color: "#3b82f6" },
  { name: "Webhook", Icon: Webhook, color: "#22c55e" },
  { name: "Schedule", Icon: Calendar, color: "#f59e0b" },
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
      <div className="aurora-fixed" />
      <div className="grain-fixed" />

      {/* Floating glass-pill nav */}
      <header className="sticky top-3 md:top-6 z-[var(--z-sticky)] px-3 md:px-4">
        <nav className="mx-auto max-w-3xl flex items-center justify-between gap-2 rounded-full border border-borderStrong/40 bg-bg/60 backdrop-blur-xl pr-1.5 pl-3 md:pl-4 py-1.5 md:py-2 shadow-soft">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Logo />
            <span className="font-semibold tracking-tight text-sm md:text-base">Infinity</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm text-muted">
            <a href="#community" className="hover:text-text transition-colors duration-200">Community</a>
            <a href="#how" className="hover:text-text transition-colors duration-200">How it works</a>
            <a href="#integrations" className="hover:text-text transition-colors duration-200">Integrations</a>
          </div>
          <div className="flex items-center gap-1">
            <Link href="/login" className="text-sm text-muted hover:text-text px-2.5 md:px-3 py-1.5 rounded-full transition-colors">
              Sign in
            </Link>
            <Link
              href="/register"
              className="btn-primary text-sm pl-3 md:pl-4 pr-1.5 py-1.5 rounded-full inline-flex items-center gap-1.5 md:gap-2 group whitespace-nowrap"
            >
              <span className="hidden sm:inline">Get started</span>
              <span className="sm:hidden">Start</span>
              <span className="size-6 md:size-7 rounded-full bg-white/15 grid place-items-center transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5">
                <ArrowUpRight className="size-3 md:size-3.5 icon-thin" />
              </span>
            </Link>
          </div>
        </nav>
      </header>

      {/* HERO — prompt-first, centered */}
      <section className="relative z-[var(--z-raised)] max-w-4xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 md:pt-32 pb-12 sm:pb-16 md:pb-20 text-center">
        <div className="animate-rise">
          <span className="eyebrow">
            <span className="size-1.5 rounded-full bg-primary animate-pulse-soft" />
            <span className="hidden sm:inline">Built on n8n · 400+ integrations</span>
            <span className="sm:hidden">400+ integrations</span>
          </span>
          <h1 className="mt-5 sm:mt-6 md:mt-7 text-balance font-display text-[32px] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[88px] font-semibold tracking-tightest-2 leading-[0.95]">
            What should we<br className="hidden sm:block" />
            <span className="gradient-text"> automate today?</span>
          </h1>
          <p className="mt-4 sm:mt-5 md:mt-6 text-pretty text-sm sm:text-base md:text-lg text-muted max-w-xl mx-auto px-2">
            Describe an automation in plain English. Infinity wires the workflow and runs it.
          </p>
        </div>

        {/* Prompt — primary CTA */}
        <div className="mt-7 sm:mt-9 md:mt-12 mx-auto max-w-2xl text-left animate-rise" style={{ animationDelay: "120ms" }}>
          <form
            onSubmit={(e) => { e.preventDefault(); go(); }}
            className="relative rounded-2xl sm:rounded-3xl border border-borderStrong/60 bg-elevated/80 backdrop-blur-xl p-2 sm:p-2.5 md:p-3 shadow-prompt focus-within:border-primary/50 focus-within:shadow-glow transition-all duration-500 ease-out-expo"
          >
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); go(); }
              }}
              placeholder="Build me an automation that..."
              rows={2}
              className="w-full resize-none bg-transparent rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2.5 sm:py-2 text-[14px] sm:text-[15px] md:text-base outline-none placeholder:text-subtle text-text font-medium tracking-tight"
            />
            <div className="flex items-end justify-between gap-2 px-1 sm:px-1.5 md:px-2 pt-1">
              <div className="flex flex-wrap gap-1 sm:gap-1.5 min-w-0 flex-1">
                {chips.slice(0, 2).map((c) => (
                  <button
                    key={c.label}
                    type="button"
                    onClick={() => setPrompt(c.value)}
                    className="press text-[10px] sm:text-[11px] px-2 sm:px-2.5 py-1 rounded-full border border-borderStrong/40 bg-white/[0.03] text-muted hover:text-text hover:bg-white/[0.06] hover:border-borderStrong transition-colors whitespace-nowrap"
                  >
                    {c.label}
                  </button>
                ))}
              </div>
              <button
                type="submit"
                aria-label="Build"
                className="btn-primary size-9 sm:size-10 rounded-xl sm:rounded-2xl grid place-items-center shrink-0"
              >
                <ArrowUp className="size-4 icon-thin" />
              </button>
            </div>
          </form>
          <div className="mt-3 sm:mt-4 flex flex-wrap items-center justify-center gap-1 sm:gap-1.5">
            {chips.slice(2).map((c) => (
              <button
                key={c.label}
                onClick={() => setPrompt(c.value)}
                className="press text-[10px] sm:text-[11px] px-2 sm:px-2.5 py-1 rounded-full border border-borderStrong/40 bg-white/[0.03] text-muted hover:text-text hover:bg-white/[0.06] transition-colors"
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-6 sm:mt-7 md:mt-8 text-[11px] sm:text-xs text-subtle px-2">
          Free to start <span className="mx-1 sm:mx-1.5 md:mx-2 text-borderStrong">·</span> No credit card <span className="mx-1 sm:mx-1.5 md:mx-2 text-borderStrong">·</span> 400+ integrations
        </p>
      </section>

      {/* INTEGRATIONS marquee */}
      <section id="integrations" className="relative z-[var(--z-raised)] py-8 fade-mask-x overflow-hidden">
        <div className="flex animate-marquee gap-3 w-max">
          {[...integrations, ...integrations].map((i, idx) => (
            <div key={`${i.name}-${idx}`} className="card rounded-2xl px-4 py-2.5 flex items-center gap-2.5 shrink-0">
              <div className="size-7 rounded-lg grid place-items-center" style={{ background: i.color + "1f" }}>
                <i.Icon className="size-3.5 icon-thin" style={{ color: i.color }} />
              </div>
              <span className="text-sm font-medium tracking-tight">{i.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* COMMUNITY — gallery of builds */}
      <section id="community" className="relative z-[var(--z-raised)] max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20 md:py-28">
        <div className="flex items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-8 md:mb-10">
          <div>
            <span className="eyebrow">From the community</span>
            <h2 className="mt-3 sm:mt-4 md:mt-5 text-balance font-display text-2xl sm:text-3xl md:text-5xl font-semibold tracking-tightest-2 leading-[1] max-w-2xl">
              Browse what others <span className="serif text-primary">built</span> today.
            </h2>
          </div>
          <Link href="/register" className="hidden sm:inline-flex text-sm text-muted hover:text-text items-center gap-1 transition-colors">
            Explore all <ArrowUpRight className="size-3.5 icon-thin" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {community.map((c, i) => (
            <article
              key={c.title}
              onClick={() => go(`Build me an automation: ${c.title}`)}
              className="press group card rounded-2xl sm:rounded-3xl p-4 sm:p-5 cursor-pointer hover:-translate-y-1 hover:border-borderStrong transition-all duration-500 ease-out-expo animate-rise"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="aspect-[5/3] rounded-xl sm:rounded-2xl border border-border bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-2.5 sm:p-3 relative overflow-hidden">
                <div
                  className="absolute -top-12 -right-10 size-40 rounded-full blur-3xl opacity-50 pointer-events-none"
                  style={{ background: c.accent }}
                />
                <div className="relative h-full flex items-center justify-center gap-1 sm:gap-1.5 flex-wrap">
                  {c.nodes.map((n) => (
                    <span key={n} className="text-[9px] sm:text-[10px] font-mono px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md bg-white/[0.06] border border-white/[0.08] text-muted">
                      {n}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-3 sm:mt-4 flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="font-medium tracking-tight text-sm sm:text-base truncate">{c.title}</h3>
                  <p className="mt-1 text-[11px] sm:text-xs text-muted">
                    by <span className="text-text/80">@{c.by}</span> <span className="text-borderStrong">·</span> {c.builds.toLocaleString()} remixes
                  </p>
                </div>
                <span className="size-6 sm:size-7 rounded-full bg-white/[0.06] grid place-items-center transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight className="size-3 sm:size-3.5 icon-thin text-muted group-hover:text-text" />
                </span>
              </div>
            </article>
          ))}
        </div>

        <Link href="/register" className="sm:hidden mt-6 w-full btn-ghost rounded-2xl py-3 flex items-center justify-center gap-2 text-sm text-muted hover:text-text transition-colors">
          Explore all <ArrowUpRight className="size-3.5 icon-thin" />
        </Link>
      </section>

      {/* HOW IT WORKS — minimal three rows */}
      <section id="how" className="relative z-[var(--z-raised)] max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20 md:py-28">
        <div className="text-center mb-8 sm:mb-10 md:mb-14">
          <span className="eyebrow">Process</span>
          <h2 className="mt-3 sm:mt-4 md:mt-5 text-balance font-display text-2xl sm:text-3xl md:text-5xl font-semibold tracking-tightest-2 leading-[1]">
            From a sentence to <span className="serif text-primary">production</span>.
          </h2>
        </div>

        <div className="space-y-2.5 sm:space-y-3">
          {[
            { n: "01", t: "Describe what should happen", d: "Tell Infinity the trigger, the steps, and where it ends up." },
            { n: "02", t: "Watch the canvas build itself", d: "Nodes appear in real time. Open any one to tweak parameters." },
            { n: "03", t: "Activate when it looks right", d: "One click and your workflow runs in production with logs and retries." },
          ].map((s, i) => (
            <div
              key={s.n}
              className="card rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-7 flex items-center gap-3 sm:gap-4 md:gap-6 hover:border-borderStrong transition-all duration-500 ease-out-expo animate-rise"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <span className="font-mono text-[10px] sm:text-xs text-subtle tracking-widest shrink-0">{s.n}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium tracking-tight text-sm sm:text-base md:text-lg">{s.t}</h3>
                <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-muted text-pretty">{s.d}</p>
              </div>
              <div className="hidden sm:grid size-8 md:size-9 rounded-xl md:rounded-2xl bg-grad-brand-soft border border-primary/20 place-items-center shrink-0">
                <Sparkles className="size-3.5 md:size-4 icon-thin text-primary" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA — final */}
      <section className="relative z-[var(--z-raised)] max-w-3xl mx-auto px-4 sm:px-6 pb-14 sm:pb-20 md:pb-32">
        <div className="rounded-2xl sm:rounded-[24px] md:rounded-[28px] p-6 sm:p-8 md:p-16 text-center relative overflow-hidden card">
          <div className="absolute inset-0 bg-grad-hero pointer-events-none opacity-90" />
          <div className="relative">
            <h2 className="text-balance font-display text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-semibold tracking-tightest-2 leading-[1]">
              Start with <span className="serif text-primary">one sentence</span>.
            </h2>
            <p className="mt-2.5 sm:mt-3 md:mt-4 text-muted text-xs sm:text-sm md:text-base">Free tier. Cancel anytime.</p>
            <Link
              href="/register"
              className="btn-primary mt-5 sm:mt-7 md:mt-9 inline-flex items-center gap-2 pl-4 sm:pl-5 md:pl-6 pr-1.5 sm:pr-1.5 md:pr-2 py-1.5 md:py-2 rounded-full group"
            >
              <span className="text-sm md:text-base">Build my first automation</span>
              <span className="size-7 sm:size-8 md:size-9 rounded-full bg-white/15 grid place-items-center transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-[1px]">
                <ArrowUpRight className="size-3.5 md:size-4 icon-thin" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <footer className="relative z-[var(--z-raised)] border-t border-border py-6 sm:py-8 md:py-10 text-center text-xs sm:text-sm text-muted">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Logo small />
          <span className="font-medium text-text tracking-tight">Infinity</span>
        </div>
        <p className="text-[10px] sm:text-xs text-subtle">© {new Date().getFullYear()} · Built on n8n · Made for humans</p>
      </footer>
    </div>
  );
}

function Logo({ small = false }: { small?: boolean }) {
  const size = small ? "size-6" : "size-7";
  return (
    <div className={`${size} rounded-xl bg-grad-brand grid place-items-center shadow-glow`}>
      <Sparkles className={`${small ? "size-3" : "size-3.5"} text-white icon-thin`} />
    </div>
  );
}

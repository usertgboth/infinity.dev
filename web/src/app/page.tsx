"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowUp, ArrowUpRight, Sparkles, Mail, MessageSquare, Database, Send,
  Bot, Calendar, Webhook, Globe, Github, FileText, ShoppingCart,
  Check, X, Zap, Clock, Shield, Star, Plus, Minus,
} from "lucide-react";

const chips = [
  { label: "Gmail digest", value: "Every weekday at 9am, summarize my unread Gmail with GPT and email it back to me." },
  { label: "Stripe to Slack", value: "When a Stripe payment lands, post a celebration to my #sales Slack channel." },
  { label: "Sheet to Telegram", value: "When a row is added to my Google Sheet, post a formatted message to Telegram." },
  { label: "AI support replies", value: "When a Gmail email arrives with label 'support', draft a reply with GPT and save it as draft." },
  { label: "HN to Twitter", value: "Every morning, fetch Hacker News top 5, paraphrase with AI, post to Twitter." },
];

const stats = [
  { n: "5,200+", l: "Automations shipped" },
  { n: "60s", l: "Average build time" },
  { n: "400+", l: "Native integrations" },
  { n: "99.99%", l: "Uptime" },
];

const testimonials = [
  {
    quote: "I built 12 internal automations in one weekend. Would have taken my team 3 weeks in n8n directly. Now we ship faster than companies 10× our size.",
    name: "Linnea Kessler",
    role: "Founder, Northwind",
    initials: "LK",
    accent: "#ff5a7a",
  },
  {
    quote: "We replaced $480/mo Zapier bill with $19 Infinity. Same automations, but ours can do AI steps Zapier flat out can't.",
    name: "Marcus Tan",
    role: "Head of Ops, Drift Labs",
    initials: "MT",
    accent: "#ff7a59",
  },
  {
    quote: "The chat-to-canvas feel is uncanny. I describe what I want and the workflow just appears. It's the cleanest dev tool I've used in years.",
    name: "Ana Soriano",
    role: "Indie hacker, ana.build",
    initials: "AS",
    accent: "#7848ff",
  },
];

const tiers = [
  {
    name: "Hobby",
    price: 0,
    priceLabel: "Free forever",
    blurb: "Everything to try Infinity on side projects.",
    cta: "Start free",
    highlight: false,
    features: [
      "3 active automations",
      "1,000 runs / month",
      "All 400+ integrations",
      "AI-built workflows",
      "Community support",
    ],
  },
  {
    name: "Pro",
    price: 19,
    priceLabel: "/ month",
    blurb: "For builders who run their business on automation.",
    cta: "Start 14-day Pro trial",
    highlight: true,
    features: [
      "Unlimited automations",
      "50,000 runs / month",
      "GPT-4o + Claude routing",
      "Version history",
      "Priority email support",
      "Custom domains for webhooks",
    ],
  },
  {
    name: "Team",
    price: 49,
    priceLabel: "/ month",
    blurb: "Share automations across a team. SSO + audit logs.",
    cta: "Start team trial",
    highlight: false,
    features: [
      "Everything in Pro",
      "Up to 5 seats",
      "200,000 runs / month",
      "Shared workspaces",
      "Audit logs + role permissions",
      "SSO (Google, Microsoft)",
      "Dedicated Slack support",
    ],
  },
];

const compare: { feature: string; infinity: string | true; zapier: string | true | false; manual: string | true | false }[] = [
  { feature: "Build by chatting in plain English", infinity: true, zapier: false, manual: false },
  { feature: "Visual canvas of every node", infinity: true, zapier: "Limited", manual: true },
  { feature: "AI step inside any workflow", infinity: true, zapier: "Add-on", manual: true },
  { feature: "400+ integrations", infinity: true, zapier: true, manual: true },
  { feature: "Self-host option", infinity: true, zapier: false, manual: true },
  { feature: "Time to first automation", infinity: "60 seconds", zapier: "20 minutes", manual: "2 hours" },
  { feature: "Starting price", infinity: "$0", zapier: "$29.99", manual: "$0 (your time)" },
];

const faq = [
  {
    q: "Do I need to know n8n?",
    a: "No. Infinity is built on top of n8n, but you never have to touch it. Describe what you want in English; we generate the workflow. If you want to tweak something deep, you can — the canvas is fully editable.",
  },
  {
    q: "How is this different from Zapier?",
    a: "Three things. (1) You build by chatting, not by clicking through menus. (2) AI is a first-class step, not an add-on. (3) You can self-host the engine. Most users replace a $30–$500/mo Zapier bill with $19 Infinity.",
  },
  {
    q: "What happens to my workflows if I cancel?",
    a: "You can export every workflow as standard n8n JSON and run it on any n8n instance — including your own self-hosted one. Zero lock-in. We compete by being the best surface, not by trapping your data.",
  },
  {
    q: "How fast can I actually ship something?",
    a: "Most users have a working automation in under 2 minutes. The flow is: describe → review the canvas → click Activate. The AI connects to your accounts (Gmail, Slack, Stripe, etc.) via standard OAuth.",
  },
  {
    q: "Is my data safe?",
    a: "Yes. Credentials are encrypted at rest. Workflow content is isolated per user. We support SSO on Team plans and offer a self-hosted edition for regulated industries. SOC 2 in progress.",
  },
  {
    q: "What if AI builds something wrong?",
    a: "Iterate in chat. Just say 'change the schedule to 6pm' or 'add a Slack notification on failure' and the canvas updates. You always see what's about to run before you activate.",
  },
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
            <a href="#how" className="hover:text-text transition-colors duration-200">How it works</a>
            <a href="#pricing" className="hover:text-text transition-colors duration-200">Pricing</a>
            <a href="#community" className="hover:text-text transition-colors duration-200">Community</a>
            <a href="#faq" className="hover:text-text transition-colors duration-200">FAQ</a>
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
      <section className="relative z-[var(--z-raised)] max-w-4xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 md:pt-28 pb-10 sm:pb-14 md:pb-16 text-center">
        <div className="animate-rise">
          <span className="eyebrow">
            <span className="size-1.5 rounded-full bg-primary animate-pulse-soft" />
            <span className="hidden sm:inline">Founders pricing — 50% off forever for early users</span>
            <span className="sm:hidden">50% off for early users</span>
          </span>
          <h1 className="mt-5 sm:mt-6 md:mt-7 text-balance font-display text-[32px] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[84px] font-semibold tracking-tightest-2 leading-[0.95]">
            Ship n8n automations<br className="hidden sm:block" />
            <span className="gradient-text">in 60 seconds.</span>
          </h1>
          <p className="mt-4 sm:mt-5 md:mt-6 text-pretty text-sm sm:text-base md:text-lg text-muted max-w-xl mx-auto px-2">
            Describe an automation in plain English. Infinity's AI wires the workflow on n8n, you click Activate. That's it.
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

        <p className="mt-5 sm:mt-6 md:mt-7 text-[11px] sm:text-xs text-subtle px-2">
          Free to start <span className="mx-1 sm:mx-1.5 md:mx-2 text-borderStrong">·</span> No credit card <span className="mx-1 sm:mx-1.5 md:mx-2 text-borderStrong">·</span> Cancel anytime
        </p>

        {/* Stats bar — proof signals */}
        <div className="mt-10 sm:mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
          {stats.map((s) => (
            <div key={s.l} className="card rounded-xl sm:rounded-2xl px-3 sm:px-4 py-3 sm:py-4 text-left">
              <div className="font-display text-xl sm:text-2xl md:text-3xl font-semibold tracking-tightest-2 gradient-text">{s.n}</div>
              <div className="text-[10px] sm:text-[11px] text-subtle uppercase tracking-widest mt-0.5 sm:mt-1">{s.l}</div>
            </div>
          ))}
        </div>
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

      {/* PAIN → GAIN — without/with */}
      <section className="relative z-[var(--z-raised)] max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20 md:py-24">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <span className="eyebrow">Why Infinity</span>
          <h2 className="mt-3 sm:mt-4 md:mt-5 text-balance font-display text-2xl sm:text-3xl md:text-5xl font-semibold tracking-tightest-2 leading-[1] max-w-3xl mx-auto">
            Stop wiring. Start <span className="serif text-primary">shipping</span>.
          </h2>
          <p className="mt-3 sm:mt-4 text-muted text-sm sm:text-base max-w-xl mx-auto">
            Most automations die in the configuration step. Infinity ships them while you're still writing the spec.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <div className="card rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8">
            <div className="flex items-center gap-2.5 mb-4 sm:mb-5">
              <div className="size-8 rounded-lg bg-danger/10 border border-danger/20 grid place-items-center">
                <X className="size-4 icon-thin text-danger" strokeWidth={2.2} />
              </div>
              <h3 className="font-medium tracking-tight text-base sm:text-lg">Without Infinity</h3>
            </div>
            <ul className="space-y-2.5 text-sm text-muted">
              {[
                "Open n8n. Browse 400 nodes. Pick one.",
                "Read the docs for OAuth scopes. Copy-paste credentials.",
                "Configure 6 fields per node, hope you got JSON right.",
                "Hit run. Get a 401. Debug for 40 minutes.",
                "Realize you forgot the error branch. Start over.",
                "Two hours later, ship a workflow that breaks at midnight.",
              ].map((t, i) => (
                <li key={i} className="flex gap-2.5">
                  <span className="size-1.5 rounded-full bg-borderStrong shrink-0 mt-1.5" />
                  <span className="text-pretty">{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 relative overflow-hidden border-primary/30">
            <div className="absolute inset-0 bg-grad-brand-soft pointer-events-none opacity-50" />
            <div className="relative">
              <div className="flex items-center gap-2.5 mb-4 sm:mb-5">
                <div className="size-8 rounded-lg bg-grad-brand grid place-items-center shadow-glow">
                  <Sparkles className="size-4 icon-thin text-white" strokeWidth={2} />
                </div>
                <h3 className="font-medium tracking-tight text-base sm:text-lg">With Infinity</h3>
              </div>
              <ul className="space-y-2.5 text-sm text-text/90">
                {[
                  "Type one sentence. We pick the right nodes.",
                  "OAuth handled in two clicks. Credentials encrypted at rest.",
                  "Parameters auto-filled with sensible defaults.",
                  "Errors surfaced visually. Click to fix in chat.",
                  "Retry, schedule, branching wired automatically.",
                  "60 seconds later, your workflow is live in production.",
                ].map((t, i) => (
                  <li key={i} className="flex gap-2.5">
                    <Check className="size-4 icon-thin text-primary shrink-0 mt-0.5" strokeWidth={2.2} />
                    <span className="text-pretty">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
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

      {/* TESTIMONIALS */}
      <section className="relative z-[var(--z-raised)] max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20 md:py-24">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <span className="eyebrow">Loved by builders</span>
          <h2 className="mt-3 sm:mt-4 md:mt-5 text-balance font-display text-2xl sm:text-3xl md:text-5xl font-semibold tracking-tightest-2 leading-[1]">
            Teams ship faster with <span className="serif text-primary">Infinity</span>.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          {testimonials.map((t, i) => (
            <figure
              key={t.name}
              className="card rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-7 flex flex-col animate-rise"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-center gap-1 mb-3 sm:mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="size-3.5 fill-primary text-primary" strokeWidth={0} />
                ))}
              </div>
              <blockquote className="text-sm sm:text-[15px] leading-relaxed text-text/95 text-pretty flex-1">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-4 sm:mt-5 flex items-center gap-3 pt-4 sm:pt-5 border-t border-border">
                <div
                  className="size-9 rounded-full grid place-items-center font-mono text-[11px] font-semibold text-white shadow-glow shrink-0"
                  style={{ background: `linear-gradient(135deg, ${t.accent}, ${t.accent}aa)` }}
                >
                  {t.initials}
                </div>
                <div className="min-w-0">
                  <div className="font-medium text-sm tracking-tight truncate">{t.name}</div>
                  <div className="text-[11px] text-subtle truncate">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="relative z-[var(--z-raised)] max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20 md:py-28">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <span className="eyebrow">
            <span className="size-1.5 rounded-full bg-success animate-pulse-soft" />
            <span>Founders pricing — 50% off forever</span>
          </span>
          <h2 className="mt-3 sm:mt-4 md:mt-5 text-balance font-display text-2xl sm:text-3xl md:text-5xl font-semibold tracking-tightest-2 leading-[1]">
            Simple pricing. <span className="serif text-primary">No surprises</span>.
          </h2>
          <p className="mt-3 sm:mt-4 text-muted text-sm sm:text-base max-w-xl mx-auto">
            Start free, upgrade when you outgrow it. Every plan includes the AI builder and 400+ integrations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          {tiers.map((tier, i) => (
            <div
              key={tier.name}
              className={`relative card rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-7 flex flex-col animate-rise ${
                tier.highlight ? "border-primary/40 shadow-glow" : ""
              }`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {tier.highlight && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest bg-grad-brand text-white shadow-glow whitespace-nowrap">
                  Most popular
                </span>
              )}
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-display text-lg sm:text-xl font-semibold tracking-tight">{tier.name}</h3>
              </div>
              <div className="mt-3 flex items-baseline gap-1.5">
                {tier.price > 0 && <span className="text-xl sm:text-2xl font-medium text-muted">$</span>}
                <span className="font-display text-4xl sm:text-5xl font-semibold tracking-tightest-2">
                  {tier.price === 0 ? "0" : tier.price}
                </span>
                <span className="text-xs sm:text-sm text-muted">{tier.priceLabel}</span>
              </div>
              <p className="mt-2 text-xs sm:text-sm text-muted text-pretty">{tier.blurb}</p>

              <Link
                href="/register"
                className={`mt-5 sm:mt-6 inline-flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-medium press whitespace-nowrap ${
                  tier.highlight ? "btn-primary" : "btn-ghost"
                }`}
              >
                {tier.cta}
                <ArrowUpRight className="size-3.5 icon-thin" />
              </Link>

              <ul className="mt-5 sm:mt-6 space-y-2.5 text-sm">
                {tier.features.map((f) => (
                  <li key={f} className="flex gap-2.5">
                    <Check className="size-4 icon-thin text-primary shrink-0 mt-0.5" strokeWidth={2.2} />
                    <span className="text-text/90 text-pretty">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-6 sm:mt-8 text-center text-[11px] sm:text-xs text-subtle">
          Self-hosted edition available for enterprise <span className="mx-1.5 text-borderStrong">·</span>
          <Link href="mailto:hi@infinity.dev" className="underline-offset-4 hover:underline hover:text-text">Talk to sales</Link>
        </p>
      </section>

      {/* COMPARISON */}
      <section className="relative z-[var(--z-raised)] max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20 md:py-24">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <span className="eyebrow">vs Alternatives</span>
          <h2 className="mt-3 sm:mt-4 md:mt-5 text-balance font-display text-2xl sm:text-3xl md:text-5xl font-semibold tracking-tightest-2 leading-[1] max-w-3xl mx-auto">
            One-third the price. <span className="serif text-primary">Twice</span> the speed.
          </h2>
        </div>
        <div className="card rounded-2xl sm:rounded-3xl overflow-hidden">
          <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] text-[11px] sm:text-xs uppercase tracking-widest text-subtle bg-elevated/50 border-b border-border">
            <div className="px-3 sm:px-5 py-3 sm:py-4">Feature</div>
            <div className="px-2 sm:px-4 py-3 sm:py-4 text-center">
              <span className="hidden sm:inline gradient-text font-semibold">Infinity</span>
              <span className="sm:hidden gradient-text font-semibold">Inf.</span>
            </div>
            <div className="px-2 sm:px-4 py-3 sm:py-4 text-center">Zapier</div>
            <div className="px-2 sm:px-4 py-3 sm:py-4 text-center">
              <span className="hidden sm:inline">Manual n8n</span>
              <span className="sm:hidden">DIY</span>
            </div>
          </div>
          {compare.map((row, i) => (
            <div
              key={row.feature}
              className={`grid grid-cols-[1.4fr_1fr_1fr_1fr] text-xs sm:text-sm ${
                i !== compare.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="px-3 sm:px-5 py-3 sm:py-4 text-text/90 text-pretty">{row.feature}</div>
              <div className="px-2 sm:px-4 py-3 sm:py-4 text-center bg-primary/[0.04] border-x border-primary/10">
                <CompCell value={row.infinity} primary />
              </div>
              <div className="px-2 sm:px-4 py-3 sm:py-4 text-center"><CompCell value={row.zapier} /></div>
              <div className="px-2 sm:px-4 py-3 sm:py-4 text-center"><CompCell value={row.manual} /></div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative z-[var(--z-raised)] max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-20 md:py-24">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <span className="eyebrow">FAQ</span>
          <h2 className="mt-3 sm:mt-4 md:mt-5 text-balance font-display text-2xl sm:text-3xl md:text-5xl font-semibold tracking-tightest-2 leading-[1]">
            Questions, <span className="serif text-primary">answered</span>.
          </h2>
        </div>
        <div className="space-y-2.5 sm:space-y-3">
          {faq.map((item, i) => (
            <FAQItem key={i} q={item.q} a={item.a} defaultOpen={i === 0} />
          ))}
        </div>
        <div className="mt-8 sm:mt-10 text-center text-xs sm:text-sm text-muted">
          Still curious? <Link href="mailto:hi@infinity.dev" className="text-text underline-offset-4 hover:underline">Email us</Link>.
        </div>
      </section>

      {/* CTA — final */}
      <section className="relative z-[var(--z-raised)] max-w-3xl mx-auto px-4 sm:px-6 pb-14 sm:pb-20 md:pb-32">
        <div className="rounded-2xl sm:rounded-[24px] md:rounded-[28px] p-6 sm:p-10 md:p-16 text-center relative overflow-hidden card">
          <div className="absolute inset-0 bg-grad-hero pointer-events-none opacity-90" />
          <div className="relative">
            <span className="eyebrow !bg-bg/40">
              <Clock className="size-3 icon-thin text-primary" />
              <span>2-minute setup</span>
            </span>
            <h2 className="mt-4 sm:mt-5 text-balance font-display text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-semibold tracking-tightest-2 leading-[1]">
              Your first automation is <span className="serif text-primary">one sentence</span> away.
            </h2>
            <p className="mt-3 sm:mt-4 text-muted text-xs sm:text-sm md:text-base max-w-md mx-auto">
              Free forever plan. No credit card. Lock in 50% off forever as a founding user.
            </p>
            <Link
              href="/register"
              className="btn-primary mt-6 sm:mt-7 md:mt-9 inline-flex items-center gap-2 pl-4 sm:pl-5 md:pl-6 pr-1.5 sm:pr-1.5 md:pr-2 py-1.5 md:py-2 rounded-full group"
            >
              <span className="text-sm md:text-base">Build my first automation — free</span>
              <span className="size-7 sm:size-8 md:size-9 rounded-full bg-white/15 grid place-items-center transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-[1px]">
                <ArrowUpRight className="size-3.5 md:size-4 icon-thin" />
              </span>
            </Link>
            <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[10px] sm:text-[11px] text-subtle">
              <span className="inline-flex items-center gap-1.5"><Shield className="size-3 icon-thin" /> SOC 2 in progress</span>
              <span className="inline-flex items-center gap-1.5"><Zap className="size-3 icon-thin" /> 99.99% uptime</span>
              <span className="inline-flex items-center gap-1.5"><Check className="size-3 icon-thin" /> Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-[var(--z-raised)] border-t border-border py-8 sm:py-10 md:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-muted">
          <div className="flex items-center gap-2">
            <Logo small />
            <span className="font-medium text-text tracking-tight">Infinity</span>
            <span className="text-borderStrong">·</span>
            <span className="text-[10px] sm:text-xs text-subtle">© {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-4 sm:gap-6 text-xs">
            <a href="#pricing" className="hover:text-text transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-text transition-colors">FAQ</a>
            <Link href="mailto:hi@infinity.dev" className="hover:text-text transition-colors">Contact</Link>
            <span className="text-subtle hidden sm:inline">Built on n8n</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function CompCell({ value, primary = false }: { value: string | boolean; primary?: boolean }) {
  if (value === true) {
    return <Check className={`size-4 mx-auto icon-thin ${primary ? "text-primary" : "text-success"}`} strokeWidth={2.4} />;
  }
  if (value === false) {
    return <Minus className="size-4 mx-auto icon-thin text-subtle" strokeWidth={2} />;
  }
  return <span className={`text-xs sm:text-sm ${primary ? "text-primary font-medium" : "text-muted"}`}>{value}</span>;
}

function FAQItem({ q, a, defaultOpen = false }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <details
      open={open}
      onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
      className="card rounded-xl sm:rounded-2xl group/faq overflow-hidden"
    >
      <summary className="cursor-pointer list-none px-4 sm:px-5 py-3.5 sm:py-4 flex items-center justify-between gap-3 hover:bg-white/[0.02] transition-colors">
        <span className="font-medium tracking-tight text-sm sm:text-base text-text/95 text-pretty">{q}</span>
        <span className="size-6 sm:size-7 rounded-full bg-white/[0.04] border border-border grid place-items-center shrink-0 transition-transform duration-300 group-open/faq:rotate-45">
          <Plus className="size-3 sm:size-3.5 icon-thin text-muted" />
        </span>
      </summary>
      <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-sm text-muted leading-relaxed text-pretty">{a}</div>
    </details>
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

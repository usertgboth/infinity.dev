import Link from "next/link";
import { ArrowRight, Bot, Cable, Sparkles, Workflow, Zap, ShieldCheck } from "lucide-react";

const examples = [
  "When someone fills my Typeform, send to Notion + ping Slack",
  "Every morning at 9am, summarize my Gmail inbox with GPT and email it back",
  "Watch a Google Sheet for new rows, generate AI image with DALL·E, post to Telegram",
  "Scrape Hacker News top 5 daily, paraphrase with AI, publish to Twitter",
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-bg bg-grad-radial">
      <nav className="sticky top-0 z-30 backdrop-blur-md bg-bg/70 border-b border-border/60">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="size-8 rounded-xl bg-grad-primary shadow-glow grid place-items-center">
              <Sparkles className="size-4 text-white" />
            </div>
            <span className="font-semibold tracking-tight">Infinity</span>
          </Link>
          <div className="hidden md:flex items-center gap-7 text-sm text-muted">
            <a href="#features" className="hover:text-text">Features</a>
            <a href="#how" className="hover:text-text">How it works</a>
            <a href="#examples" className="hover:text-text">Examples</a>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/login" className="text-sm text-muted hover:text-text px-3 py-2">Sign in</Link>
            <Link href="/register" className="text-sm bg-grad-primary text-white px-4 py-2 rounded-lg shadow-glow hover:opacity-95 transition">
              Get started
            </Link>
          </div>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-muted mb-6">
          <span className="size-1.5 rounded-full bg-success animate-pulse" />
          400+ integrations · powered by n8n
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight gradient-text leading-[1.05]">
          Describe it. Watch<br />it build itself.
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-muted">
          Infinity is the simplest way to build AI automations. No code, no node-dragging.
          Type what you want — the AI wires it up live.
        </p>
        <div className="mt-10 flex items-center justify-center gap-3">
          <Link href="/register" className="bg-grad-primary text-white px-6 py-3 rounded-xl shadow-glow font-medium flex items-center gap-2 hover:opacity-95 transition">
            Start building free <ArrowRight className="size-4" />
          </Link>
          <Link href="/login" className="glass px-6 py-3 rounded-xl font-medium hover:bg-card transition">
            Sign in
          </Link>
        </div>

        <div className="mt-16 max-w-4xl mx-auto glass rounded-2xl p-2 shadow-card">
          <div className="rounded-xl bg-bg/80 p-6 text-left">
            <div className="flex items-center gap-2 text-xs text-muted mb-4">
              <span className="size-2 rounded-full bg-danger" />
              <span className="size-2 rounded-full bg-yellow-500" />
              <span className="size-2 rounded-full bg-success" />
              <span className="ml-3">infinity.dev — your automation</span>
            </div>
            <div className="font-mono text-sm">
              <div className="text-muted">$ describe</div>
              <div className="text-text mt-1">When a customer pays in Stripe, add them to my Mailchimp list and DM me on Telegram.</div>
              <div className="mt-4 text-primary">✓ Stripe webhook → Filter → Mailchimp → Telegram</div>
              <div className="text-muted text-xs mt-1">4 nodes wired. Active in 8 seconds.</div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-6">
        {[
          { icon: Bot, title: "AI builds it for you", desc: "Type plain English. Infinity assembles the workflow in real time on a canvas you can tweak." },
          { icon: Cable, title: "400+ integrations", desc: "Gmail, Slack, Notion, Sheets, Stripe, Airtable, Telegram, OpenAI — all from n8n's ecosystem." },
          { icon: Workflow, title: "n8n underneath", desc: "Battle-tested execution engine. Self-host or use ours — your workflows are portable." },
          { icon: Zap, title: "Live preview", desc: "Nodes appear as the AI thinks. Edit any field by clicking — no docs required." },
          { icon: ShieldCheck, title: "Secure by default", desc: "OAuth via Google, encrypted credentials, audit log. Admin panel built in." },
          { icon: Sparkles, title: "Built for non-coders", desc: "If you can describe a task, you can ship it. Templates and one-click examples." },
        ].map((f, i) => (
          <div key={i} className="glass rounded-2xl p-6 hover:bg-card/50 transition">
            <div className="size-10 rounded-xl bg-grad-primary/20 grid place-items-center mb-4">
              <f.icon className="size-5 text-primary" />
            </div>
            <h3 className="font-semibold mb-1">{f.title}</h3>
            <p className="text-sm text-muted">{f.desc}</p>
          </div>
        ))}
      </section>

      <section id="examples" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold gradient-text text-center">Just say what you want</h2>
        <p className="text-center text-muted mt-3">Real prompts that build real automations.</p>
        <div className="mt-10 grid md:grid-cols-2 gap-4">
          {examples.map((e, i) => (
            <Link key={i} href={`/register?prompt=${encodeURIComponent(e)}`}
              className="glass rounded-xl p-5 hover:border-primary/40 hover:bg-card transition block group">
              <div className="flex items-start gap-3">
                <Sparkles className="size-4 text-primary mt-0.5 group-hover:scale-110 transition" />
                <p className="text-sm">"{e}"</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="how" className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold gradient-text">Three steps. That's it.</h2>
        <div className="mt-10 grid md:grid-cols-3 gap-6 text-left">
          {[
            { n: "1", t: "Describe", d: "Tell Infinity what should happen, when, and where." },
            { n: "2", t: "Watch it build", d: "AI drops nodes on the canvas. Edit anything you don't like." },
            { n: "3", t: "Activate", d: "One click — your automation runs in production." },
          ].map((s) => (
            <div key={s.n} className="glass rounded-2xl p-6">
              <div className="size-8 rounded-lg bg-grad-primary text-white grid place-items-center font-bold">{s.n}</div>
              <h3 className="mt-3 font-semibold">{s.t}</h3>
              <p className="text-sm text-muted mt-1">{s.d}</p>
            </div>
          ))}
        </div>
        <Link href="/register" className="inline-flex mt-12 items-center gap-2 bg-grad-primary text-white px-6 py-3 rounded-xl shadow-glow font-medium hover:opacity-95 transition">
          Start now — it's free <ArrowRight className="size-4" />
        </Link>
      </section>

      <footer className="border-t border-border/60 py-10 text-center text-sm text-muted">
        © {new Date().getFullYear()} Infinity. Built on n8n. Made for humans.
      </footer>
    </div>
  );
}

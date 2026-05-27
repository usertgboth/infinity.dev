"use client";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function AuthShell({ title, subtitle, children, footer }: {
  title: string; subtitle: string; children: React.ReactNode; footer?: React.ReactNode;
}) {
  return (
    <div className="min-h-[100dvh] relative grid md:grid-cols-12 bg-bg overflow-hidden">
      <div className="aurora-fixed" />
      <div className="grain-fixed" />

      {/* Left brand panel — dark with aurora */}
      <div className="hidden md:flex md:col-span-5 lg:col-span-6 flex-col justify-between p-12 lg:p-16 relative overflow-hidden border-r border-border">
        <Link href="/" className="flex items-center gap-2 relative z-[var(--z-raised)]">
          <div className="size-7 rounded-xl bg-grad-brand grid place-items-center shadow-glow">
            <Sparkles className="size-3.5 text-white icon-thin" />
          </div>
          <span className="font-semibold tracking-tight">Infinity</span>
        </Link>

        <div className="relative z-[var(--z-raised)]">
          <span className="eyebrow">A new way to automate</span>
          <h2 className="mt-6 text-balance font-display text-5xl lg:text-6xl font-semibold tracking-tightest-2 leading-[0.95]">
            Describe it.<br />
            <span className="gradient-text">It builds itself.</span>
          </h2>
          <p className="mt-5 text-muted max-w-sm text-pretty">
            No code, no node dragging. Free tier. Cancel anytime.
          </p>

          <div className="mt-10 card rounded-3xl p-5 max-w-sm">
            <p className="font-mono text-[10px] uppercase tracking-widest text-subtle">Example prompt</p>
            <p className="mt-2 text-[15px] leading-relaxed">
              "When a Stripe customer pays, add to Mailchimp and DM me on Telegram."
            </p>
            <p className="mt-4 text-xs text-primary">Stripe → Mailchimp → Telegram</p>
          </div>
        </div>

        <p className="text-xs text-subtle relative z-[var(--z-raised)]">© {new Date().getFullYear()} Infinity</p>
      </div>

      {/* Right form */}
      <div className="md:col-span-7 lg:col-span-6 flex items-center justify-center p-6 md:p-12 relative z-[var(--z-raised)]">
        <div className="w-full max-w-md">
          <Link href="/" className="md:hidden flex items-center gap-2 mb-8">
            <div className="size-7 rounded-xl bg-grad-brand grid place-items-center shadow-glow">
              <Sparkles className="size-3.5 text-white icon-thin" />
            </div>
            <span className="font-semibold tracking-tight">Infinity</span>
          </Link>
          <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tightest-2 leading-[1] text-balance">
            {title}
          </h1>
          <p className="mt-3 text-muted text-pretty">{subtitle}</p>
          <div className="mt-9">{children}</div>
          {footer && <div className="mt-7 text-sm text-muted text-center">{footer}</div>}
        </div>
      </div>
    </div>
  );
}

export function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="size-5">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.4 6.5 29.5 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5 43.5 34.8 43.5 24c0-1.2-.1-2.4-.3-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34.4 6.5 29.5 4.5 24 4.5 16.3 4.5 9.6 8.9 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 43.5c5.4 0 10.3-2 14-5.3l-6.5-5.3c-1.9 1.4-4.5 2.3-7.5 2.3-5.3 0-9.7-3.3-11.3-8l-6.5 5C9.5 39 16.2 43.5 24 43.5z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.2-4.1 5.6l6.5 5.3c4.1-3.8 6.7-9.5 6.7-15.4 0-1.2-.1-2.4-.3-3.5z"/>
    </svg>
  );
}

export function Field({
  label, type, value, onChange, placeholder,
}: { label: string; type: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted tracking-tight">{label}</span>
      <input
        type={type}
        value={value}
        required
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full bg-white/[0.04] border border-borderStrong/40 rounded-2xl px-4 py-3 outline-none text-[15px] tracking-tight text-text focus:border-primary/40 focus:ring-4 focus:ring-primary/10 focus:bg-white/[0.06] transition-all duration-300 ease-out-expo placeholder:text-subtle"
      />
    </label>
  );
}

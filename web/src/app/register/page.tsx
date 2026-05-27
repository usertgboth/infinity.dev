"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Sparkles, Loader2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    const r = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    if (!r.ok) {
      const j = await r.json().catch(() => ({}));
      setErr(j.error || "Could not create account");
      setLoading(false);
      return;
    }
    await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    const prompt = sp.get("prompt");
    router.push(prompt ? `/dashboard?prompt=${encodeURIComponent(prompt)}` : "/dashboard");
  }

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-bg">
      <div className="hidden md:flex flex-col justify-between p-12 bg-grad-radial border-r border-border/60">
        <Link href="/" className="flex items-center gap-2">
          <div className="size-8 rounded-xl bg-grad-primary shadow-glow grid place-items-center">
            <Sparkles className="size-4 text-white" />
          </div>
          <span className="font-semibold tracking-tight">Infinity</span>
        </Link>
        <div>
          <h2 className="text-4xl font-bold gradient-text leading-tight">Build automations<br />by describing them.</h2>
          <p className="mt-3 text-muted max-w-sm">Free to start. No credit card. 400+ integrations included.</p>
        </div>
        <p className="text-xs text-muted">© {new Date().getFullYear()} Infinity</p>
      </div>

      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-2">Create your account</h1>
          <p className="text-muted mb-8">Takes 30 seconds.</p>

          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="w-full glass rounded-xl px-4 py-3 flex items-center justify-center gap-3 hover:bg-card transition mb-4"
          >
            <GoogleIcon /> Continue with Google
          </button>

          <div className="flex items-center gap-3 my-6">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted">or</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={onSubmit} className="space-y-3">
            <Field label="Name" type="text" value={name} onChange={setName} placeholder="Alex" />
            <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="you@company.com" />
            <Field label="Password" type="password" value={password} onChange={setPassword} placeholder="At least 6 chars" />
            {err && <p className="text-sm text-danger">{err}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-grad-primary text-white rounded-xl py-3 font-medium shadow-glow hover:opacity-95 transition flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading && <Loader2 className="size-4 animate-spin" />} Create account
            </button>
          </form>

          <p className="text-sm text-muted mt-6 text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({
  label, type, value, onChange, placeholder,
}: { label: string; type: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <label className="block">
      <span className="text-xs text-muted">{label}</span>
      <input
        type={type}
        value={value}
        required
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full bg-card border border-border rounded-xl px-4 py-3 outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition"
      />
    </label>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="size-5">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.4 6.5 29.5 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5 43.5 34.8 43.5 24c0-1.2-.1-2.4-.3-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34.4 6.5 29.5 4.5 24 4.5 16.3 4.5 9.6 8.9 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 43.5c5.4 0 10.3-2 14-5.3l-6.5-5.3c-1.9 1.4-4.5 2.3-7.5 2.3-5.3 0-9.7-3.3-11.3-8l-6.5 5C9.5 39 16.2 43.5 24 43.5z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.2-4.1 5.6l6.5 5.3c4.1-3.8 6.7-9.5 6.7-15.4 0-1.2-.1-2.4-.3-3.5z"/>
    </svg>
  );
}

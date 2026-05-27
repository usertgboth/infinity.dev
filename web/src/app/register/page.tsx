"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import AuthShell, { Field, GoogleIcon } from "@/components/AuthShell";

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg" />}>
      <RegisterInner />
    </Suspense>
  );
}

function RegisterInner() {
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
    <AuthShell
      title="Create your account"
      subtitle="Takes 30 seconds. No credit card."
      footer={<>Already have an account? <Link href="/login" className="text-primary font-medium hover:underline">Sign in</Link></>}
    >
      <button
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        className="btn-ghost w-full rounded-2xl px-4 py-3 flex items-center justify-center gap-3 transition"
      >
        <GoogleIcon /> Continue with Google
      </button>

      <div className="flex items-center gap-3 my-6">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-subtle">or</span>
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
          className="btn-primary w-full rounded-2xl py-3 flex items-center justify-center gap-2"
        >
          {loading && <Loader2 className="size-4 animate-spin" />} Create account
        </button>
      </form>
    </AuthShell>
  );
}

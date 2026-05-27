"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import AuthShell, { Field, GoogleIcon } from "@/components/AuthShell";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg" />}>
      <LoginInner />
    </Suspense>
  );
}

function LoginInner() {
  const router = useRouter();
  const sp = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    const res = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (res?.error) setErr("Wrong email or password");
    else router.push(sp.get("callbackUrl") || "/dashboard");
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to continue building."
      footer={<>No account? <Link href="/register" className="text-primary font-medium hover:underline">Create one</Link></>}
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
        <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="you@company.com" />
        <Field label="Password" type="password" value={password} onChange={setPassword} placeholder="••••••••" />
        {err && <p className="text-sm text-danger">{err}</p>}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full rounded-2xl py-3 flex items-center justify-center gap-2"
        >
          {loading && <Loader2 className="size-4 animate-spin" />} Sign in
        </button>
      </form>
    </AuthShell>
  );
}

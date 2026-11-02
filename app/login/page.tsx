import type { Metadata } from "next";
import Link from "next/link";

import { LoginForm } from "@/components/login-form";
import { resolveNextPath } from "@/lib/redirects";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to view your dashboard.",
  robots: { index: false, follow: false },
};

// Reads `searchParams` (the post-login destination), so the route must be
// allowed to block instead of prerendering a static shell.
export const instant = false;

type LoginPageProps = {
  searchParams: Promise<{ next?: string | string[] }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const candidate = Array.isArray(params.next) ? params.next[0] : params.next;
  const nextPath = resolveNextPath(candidate);

  return (
    <main className="container-page flex min-h-[70vh] items-center justify-center py-12 md:py-16">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8">
          <p className="eyebrow mb-2">Members</p>
          <h1 className="text-3xl">Sign in</h1>

          <p className="mt-2 text-[13px] leading-[1.7] text-muted">
            Enter your details to open the dashboard. The session is stored in a
            signed, HTTP-only cookie, so the browser cannot read or edit it.
          </p>

          <LoginForm nextPath={nextPath} />
        </div>

        <p className="mt-4 text-center text-[12px] leading-[1.7] text-muted">
          This is a demonstration login: any name and valid email address works.
          No password is stored.{" "}
          <Link className="text-green hover:text-green-dark" href="/">
            Return home
          </Link>
        </p>
      </div>
    </main>
  );
}

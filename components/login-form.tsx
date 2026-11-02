"use client";

import { useId, useState } from "react";
import { useRouter } from "next/navigation";

import { useUserContext } from "@/context/UserProvider";
import type { UserDataUsage } from "@/types/users.types";

interface LoginResponseBody {
  user?: UserDataUsage;
  error?: string;
  fieldErrors?: Record<string, string>;
}

interface LoginFormProps {
  nextPath: string;
}

const fieldClasses =
  "mt-1.5 block w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink shadow-sm outline-none transition placeholder:text-[#a4a99f] focus:border-green focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green";

const labelClasses =
  "block text-[12px] font-semibold uppercase tracking-[0.08em] text-ink";

export function LoginForm({ nextPath }: LoginFormProps) {
  const router = useRouter();
  const { setUserData } = useUserContext();
  const nameId = useId();
  const emailId = useId();
  const errorId = useId();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setFormError(null);
    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      const body = (await response.json().catch(() => null)) as
        | LoginResponseBody
        | null;

      if (!response.ok || !body?.user) {
        setFormError(body?.error ?? "Unable to sign in. Please try again.");
        setFieldErrors(body?.fieldErrors ?? {});
        return;
      }

      setUserData(body.user);
      router.push(nextPath);
      router.refresh();
    } catch {
      setFormError("Network error. Check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="mt-6 space-y-5" onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor={nameId} className={labelClasses}>
          Name
        </label>
        <input
          id={nameId}
          name="name"
          type="text"
          autoComplete="name"
          required
          minLength={2}
          maxLength={80}
          placeholder="Your name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          aria-invalid={fieldErrors.name ? true : undefined}
          aria-describedby={fieldErrors.name ? `${nameId}-error` : undefined}
          className={fieldClasses}
        />
        {fieldErrors.name ? (
          <p
            id={`${nameId}-error`}
            className="mt-1.5 text-[12px] text-red-700"
          >
            {fieldErrors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor={emailId} className={labelClasses}>
          Email
        </label>
        <input
          id={emailId}
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={fieldErrors.email ? true : undefined}
          aria-describedby={
            fieldErrors.email ? `${emailId}-error` : undefined
          }
          className={fieldClasses}
        />
        {fieldErrors.email ? (
          <p
            id={`${emailId}-error`}
            className="mt-1.5 text-[12px] text-red-700"
          >
            {fieldErrors.email}
          </p>
        ) : null}
      </div>

      {formError ? (
        <p
          id={errorId}
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-800"
        >
          {formError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn btn-primary w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

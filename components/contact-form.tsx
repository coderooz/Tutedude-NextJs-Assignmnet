"use client";

import { useState, type FormEvent } from "react";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

const fieldClasses =
  "w-full rounded-lg border border-line bg-paper px-3 text-sm text-ink outline-none transition placeholder:text-[#a4a99f] focus:border-green focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green";

const labelClasses =
  "text-[12px] font-semibold uppercase tracking-[0.08em] text-ink";

export default function ContactForm() {
  const [status, setStatus] = useState<SubmitStatus>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      if (!response.ok) {
        throw new Error(
          `Contact request failed with status ${response.status}`,
        );
      }

      form.reset();
      setStatus("success");
    } catch (error) {
      console.error("Contact form submission failed:", error);
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-name" className={labelClasses}>
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            maxLength={80}
            autoComplete="name"
            placeholder="Your name"
            className={`${fieldClasses} h-11`}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="contact-email" className={labelClasses}>
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            maxLength={254}
            autoComplete="email"
            placeholder="example@email.com"
            className={`${fieldClasses} h-11`}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-message" className={labelClasses}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          maxLength={2000}
          rows={6}
          placeholder="Your message"
          className={`${fieldClasses} resize-y py-3`}
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn btn-primary mt-2 w-fit disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>

      {status === "success" && (
        <p role="status" className="text-sm font-medium text-green">
          Thanks! Your message has been sent.
        </p>
      )}

      {status === "error" && (
        <p role="alert" className="text-sm font-medium text-red-700">
          Your message could not be sent. Please try again.
        </p>
      )}
    </form>
  );
}

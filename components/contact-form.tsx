"use client";

import { useState, type FormEvent } from "react";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

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
                    `Contact request failed with status ${response.status}`
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
                    <label
                        htmlFor="name"
                        className="font-bold text-black"
                    >
                        Name
                    </label>

                    <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your name"
                        className="h-10 rounded-xl border-2 p-3 text-black outline-none hover:border-blue-400 focus:border-blue-500"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="email"
                        className="font-bold text-black"
                    >
                        Email
                    </label>

                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="example@email.com"
                        className="h-10 rounded-xl border-2 p-3 text-black outline-none hover:border-blue-400 focus:border-blue-500"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="message"
                    className="font-bold text-black"
                >
                    Message
                </label>

                <textarea
                    id="message"
                    name="message"
                    placeholder="Your message"
                    rows={6}
                    className="resize-y rounded-xl border-2 p-4 text-black outline-none hover:border-blue-400 focus:border-blue-500"
                />
            </div>

            <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-2 w-fit rounded-xl bg-blue-500 px-6 py-3 font-medium text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {status === "submitting" ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && (
                <p role="status" className="text-sm font-medium text-green-700">
                    Thanks! Your message has been sent.
                </p>
            )}

            {status === "error" && (
                <p role="alert" className="text-sm font-medium text-red-600">
                    Your message could not be sent. Please try again.
                </p>
            )}
        </form>
    );
}

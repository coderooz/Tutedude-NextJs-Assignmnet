
import type { Metadata } from "next";
import Link from "next/link";

import ContactForm from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Questions, feedback, or a note about the project — get in touch with Ranit Saha at Coderooz.",
};

export default function ContactPage() {
  return (
    <main className="container-page pb-16">
      <section className="max-w-[680px] py-12 md:py-[65px] md:pb-8">
        <p className="eyebrow">Say hello</p>
        <h1 className="text-[clamp(38px,5vw,54px)] leading-[1.05]">
          Contact us
        </h1>
        <p className="mt-3 leading-[1.75] text-muted">
          Have a question about the project or the assignment? Send a note and
          we will get back to you.
        </p>
      </section>

      <div className="mt-6 grid gap-4 rounded-2xl border border-line bg-white p-5 sm:p-6 md:grid-cols-2 md:p-8">
        <section aria-labelledby="contact-info-heading" className="flex flex-col">
          <h2 id="contact-info-heading" className="text-2xl">
            Contact info
          </h2>

          <dl className="mt-5 space-y-4 text-sm text-muted">
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-ink">
                Email
              </dt>
              <dd className="mt-1">
                <Link
                  href="mailto:contact@coderooz.in"
                  className="text-green hover:text-green-dark"
                >
                  contact@coderooz.in
                </Link>
              </dd>
            </div>

            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-ink">
                Website
              </dt>
              <dd className="mt-1">
                <a
                  href="https://coderooz.in"
                  className="text-green hover:text-green-dark"
                  rel="noreferrer"
                >
                  coderooz.in
                </a>
              </dd>
            </div>

            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-ink">
                Location
              </dt>
              <dd className="mt-1">West Bengal, India</dd>
            </div>

            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-ink">
                Response time
              </dt>
              <dd className="mt-1">Usually within one to two working days.</dd>
            </div>
          </dl>

          <p className="mt-6 rounded-lg bg-wash p-4 text-[12px] leading-[1.7] text-[#4f5c51]">
            This form posts to an API route that echoes the submitted fields. It
            is a demonstration endpoint, not a mailbox.
          </p>
        </section>

        <section aria-labelledby="message-heading">
          <h2 id="message-heading" className="text-2xl">
            Message
          </h2>
          <ContactForm />
        </section>
      </div>
    </main>
  );
}

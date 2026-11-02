
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Fieldnotes is a small Next.js project focused on readable content, clear navigation, and honest rendering choices.",
};

const principles = [
  {
    title: "Made to be clear",
    body: "Every page has one job, and the navigation stays consistent throughout the site. Content comes before decoration.",
  },
  {
    title: "Built for learning",
    body: "The project uses a small, local dataset to demonstrate routing, rendering strategies, and API routes without extra infrastructure.",
  },
  {
    title: "Accessible by default",
    body: "One main landmark per page, labelled controls, visible focus states, and layouts that work at 375, 768, and 1280 pixels.",
  },
  {
    title: "Honest about data",
    body: "When the live product catalogue is unavailable, the bundled fallback is labelled in the interface instead of being presented as live data.",
  },
] as const;

const stack = [
  "Next.js 16 App Router",
  "React 19",
  "Tailwind CSS 4",
  "SWR",
  "Signed HTTP-only cookies",
] as const;

export default function AboutPage() {
  return (
    <main className="container-page pb-16">
      <section className="max-w-170 py-12 md:py-16.25 md:pb-8">
        <p className="eyebrow">A little introduction</p>
        <h1 className="text-[clamp(38px,5vw,54px)] leading-[1.05]">
          Simple by design.
        </h1>
        <p className="mt-4 leading-[1.75] text-muted">
          Fieldnotes is a small demonstration project. It keeps the focus on
          readable content, clear navigation, and the core ideas behind building
          pages with Next.js.
        </p>
      </section>

      <section aria-labelledby="principles-heading" className="mt-6">
        <h2 id="principles-heading" className="text-[30px]">
          What it tries to do
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {principles.map((principle) => (
            <div
              className="rounded-xl border border-line bg-white p-5.5"
              key={principle.title}
            >
              <h3 className="text-[22px]">{principle.title}</h3>
              <p className="mt-2 text-[13px] leading-[1.7] text-muted">
                {principle.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="stack-heading" className="mt-12">
        <h2 id="stack-heading" className="text-[30px]">
          The stack
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {stack.map((item) => (
            <li
              className="rounded-full border border-line bg-white px-3 py-1.5 text-[12px] text-muted"
              key={item}
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="author-heading"
        className="mt-12 rounded-xl border border-line bg-white p-6 md:p-8"
      >
        <p className="eyebrow mb-1.5">Built by</p>
        <h2 id="author-heading" className="text-[26px]">
          Ranit Saha · Coderooz
        </h2>
        <p className="mt-2 max-w-xl text-[13px] leading-[1.7] text-muted">
          A solo developer based in Assam, India. This project is part of
          a Next.js assignment series covering rendering strategies, data
          fetching, and authenticated routes.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link className="btn btn-primary" href="/contact">
            Get in touch
          </Link>
          <a className="btn btn-ghost" href="mailto:contact@coderooz.in">
            contact@coderooz.in
          </a>
        </div>
      </section>
    </main>
  );
}


import Link from "next/link";

import HelloMessage from "@/components/hello-message";
import { getAllPosts, getFeaturedPost } from "@/lib/blog";
import { formatDate } from "@/lib/format";
import { getNewsPreview } from "@/lib/news";

const capabilities = [
  {
    eyebrow: "Static generation",
    title: "Product catalogue",
    description:
      "Prerendered with a one-hour cache and a bundled fallback when the demo API is unreachable.",
    href: "/products",
    cta: "Browse products",
  },
  {
    eyebrow: "Incremental regeneration",
    title: "News feed",
    description:
      "Cached content with a ten-second revalidation window, so announcements refresh without a full rebuild.",
    href: "/news",
    cta: "Read the news",
  },
  {
    eyebrow: "Client-side data",
    title: "Live dashboard",
    description:
      "SWR keeps the protected dashboard fresh every ten seconds while signed-in users read it.",
    href: "/dashboard",
    cta: "Open dashboard",
  },
  {
    eyebrow: "Signed sessions",
    title: "Protected routes",
    description:
      "An HTTP-only, signed cookie guards the dashboard, and every protected layout re-checks it on the server.",
    href: "/login",
    cta: "Sign in",
  },
] as const;

export default function Home() {
  const featured = getFeaturedPost();
  const recent = getAllPosts().slice(1);
  const news = getNewsPreview(3);

  return (
    <main className="container-page pb-16">
      <section className="max-w-[720px] py-16 md:py-[88px]">
        <p className="eyebrow">A small corner of the internet</p>
        <h1 className="max-w-[700px] text-[clamp(43px,6vw,68px)] leading-[1.02]">
          Ideas, notes, and things worth sharing.
        </h1>
        <p className="mt-[22px] max-w-[590px] text-base leading-[1.8] text-muted">
          An editorial Next.js project that demonstrates static generation,
          incremental regeneration, client-side data fetching, API routes, and
          signed cookie sessions — with a clear, readable interface.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Link className="btn btn-primary" href="/blog">
            Explore the blog <span aria-hidden="true">→</span>
          </Link>
          <Link className="btn btn-ghost" href="/news">
            Read the news
          </Link>
        </div>
      </section>

      <section aria-labelledby="featured-heading" className="mt-6">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="eyebrow mb-1.5">Start here</p>
            <h2 id="featured-heading" className="text-[30px]">
              Featured article
            </h2>
          </div>
          <Link className="text-[12px] text-muted hover:text-green" href="/blog">
            All articles <span aria-hidden="true">→</span>
          </Link>
        </div>

        <Link
          className="card grid md:grid-cols-[0.9fr_1.1fr]"
          href={`/blog/${featured.slug}`}
        >
          <div className="art-block min-h-[160px] p-[22px] md:min-h-[230px]">
            <span className="text-[10px] font-bold uppercase tracking-[0.12em]">
              {featured.category}
            </span>
            <strong className="self-end font-serif text-[clamp(64px,10vw,112px)] font-medium leading-[0.8] opacity-50">
              {featured.number}
            </strong>
          </div>
          <div className="self-center p-6 md:p-[34px_38px]">
            <p className="mb-3 text-[10px] uppercase tracking-[0.04em] text-[#92978e]">
              {featured.date} · {featured.readTime}
            </p>
            <h3 className="text-[28px] leading-[1.12] md:text-[32px]">
              {featured.title}
            </h3>
            <p className="mt-3 text-[13px] leading-[1.7] text-muted">
              {featured.description}
            </p>
            <span className="text-link mt-3">Read article →</span>
          </div>
        </Link>
      </section>

      <section aria-labelledby="recent-heading" className="mt-12">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="eyebrow mb-1.5">Freshly published</p>
            <h2 id="recent-heading" className="text-[30px]">
              Recent articles
            </h2>
          </div>
          <span className="text-[12px] text-muted">A few things to read</span>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {recent.map((post) => (
            <Link
              className="card"
              href={`/blog/${post.slug}`}
              key={post.slug}
            >
              <div className="art-block min-h-[155px] p-[22px]">
                <span className="text-[10px] font-bold uppercase tracking-[0.12em]">
                  {post.category}
                </span>
                <strong className="self-end font-serif text-[78px] font-medium leading-[0.8] opacity-50">
                  {post.number}
                </strong>
              </div>
              <div className="p-[22px]">
                <p className="mb-3 text-[10px] uppercase tracking-[0.04em] text-[#92978e]">
                  {post.date} · {post.readTime}
                </p>
                <h3 className="text-2xl leading-[1.15]">{post.title}</h3>
                <p className="mt-2 text-[13px] leading-[1.7] text-muted">
                  {post.description}
                </p>
                <span className="text-link mt-3">Read more →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="news-heading" className="mt-12">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="eyebrow mb-1.5">From the newsroom</p>
            <h2 id="news-heading" className="text-[30px]">
              Latest news
            </h2>
          </div>
          <Link className="text-[12px] text-muted hover:text-green" href="/news">
            All news <span aria-hidden="true">→</span>
          </Link>
        </div>

        <ul className="divide-y divide-line border-y border-line">
          {news.map((item) => (
            <li key={item.slug}>
              <Link
                className="group flex flex-col gap-2 py-5 sm:flex-row sm:items-baseline sm:gap-6"
                href={`/news/${item.slug}`}
              >
                <span className="shrink-0 text-[11px] uppercase tracking-[0.04em] text-[#92978e] sm:w-32">
                  {formatDate(item.publishedAt)}
                </span>
                <span className="flex-1">
                  <span className="block font-serif text-lg leading-snug group-hover:text-green">
                    {item.title}
                  </span>
                  <span className="mt-1 block text-[13px] leading-[1.6] text-muted">
                    {item.excerpt}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="text-sm text-green sm:self-center"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="api-heading" className="mt-12">
        <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
          <div className="card p-6 md:p-8">
            <p className="eyebrow mb-1.5">Client-side data</p>
            <h2 id="api-heading" className="text-[26px]">
              A real API route
            </h2>
            <p className="mt-2 max-w-md text-[13px] leading-[1.7] text-muted">
              The greeting below is fetched in the browser by SWR from a Route
              Handler, not rendered into the static HTML.
            </p>
            <div className="mt-5 rounded-lg border border-line bg-paper p-4">
              <HelloMessage />
            </div>
          </div>

          <div className="art-block rounded-xl border border-line p-6 md:p-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em]">
              Under the hood
            </p>
            <p className="mt-3 font-serif text-2xl leading-snug text-ink">
              One project, several rendering strategies.
            </p>
            <p className="mt-2 text-[13px] leading-[1.7] text-[#5d6a5f]">
              Each route is an opportunity to choose the right trade-off
              between freshness, speed, and personalisation.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="capabilities-heading" className="mt-12">
        <div className="mb-5">
          <p className="eyebrow mb-1.5">How this site is built</p>
          <h2 id="capabilities-heading" className="text-[30px]">
            Four routes, four strategies
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {capabilities.map((capability) => (
            <Link
              className="card flex flex-col p-[22px]"
              href={capability.href}
              key={capability.href}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-green">
                {capability.eyebrow}
              </p>
              <h3 className="mt-2 text-[22px]">{capability.title}</h3>
              <p className="mt-2 flex-1 text-[13px] leading-[1.7] text-muted">
                {capability.description}
              </p>
              <span className="text-link mt-4">{capability.cta} →</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

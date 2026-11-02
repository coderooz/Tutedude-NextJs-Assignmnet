
import type { Metadata } from "next";
import Link from "next/link";

import { formatDate, formatDateTime } from "@/lib/format";
import { getNewsFeed } from "@/lib/news";

export const metadata: Metadata = {
  title: "News",
  description:
    "Project announcements, release notes, and engineering updates from Fieldnotes.",
};

export default async function NewsPage() {
  const feed = await getNewsFeed();
  const [featured, ...rest] = feed.items;

  return (
    <main className="container-page pb-16">
      <section className="max-w-[680px] py-12 md:py-[65px] md:pb-8">
        <p className="eyebrow">The newsroom</p>
        <h1 className="text-[clamp(38px,5vw,54px)] leading-[1.05]">
          Project news
        </h1>
        <p className="mt-3 leading-[1.75] text-muted">
          Release notes, engineering updates, and small announcements. This page
          is incrementally regenerated, so new entries appear without a full
          rebuild.
        </p>
        <p className="mt-4 inline-flex flex-wrap items-center gap-2 rounded-md border border-line bg-white px-3 py-2 text-[11px] uppercase tracking-[0.08em] text-muted">
          <span
            aria-hidden="true"
            className="inline-block size-1.5 rounded-full bg-green"
          />
          Last updated{" "}
          <time dateTime={feed.updatedAt}>
            {formatDateTime(feed.updatedAt)} UTC
          </time>
        </p>
      </section>

      {featured ? (
        <section aria-labelledby="latest-heading" className="mt-6">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="eyebrow mb-1.5">Latest</p>
              <h2 id="latest-heading" className="text-[30px]">
                Just announced
              </h2>
            </div>
            <span className="text-[12px] text-muted">
              Revalidates every 10 seconds
            </span>
          </div>

          <Link
            className="card grid md:grid-cols-[0.9fr_1.1fr]"
            href={`/news/${featured.slug}`}
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
                {formatDate(featured.publishedAt)} · {featured.readTime}
              </p>
              <h3 className="text-[28px] leading-[1.12] md:text-[32px]">
                {featured.title}
              </h3>
              <p className="mt-3 text-[13px] leading-[1.7] text-muted">
                {featured.excerpt}
              </p>
              <span className="text-link mt-3">Read announcement →</span>
            </div>
          </Link>
        </section>
      ) : null}

      <section aria-labelledby="archive-heading" className="mt-12">
        <div className="mb-2 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="eyebrow mb-1.5">Earlier</p>
            <h2 id="archive-heading" className="text-[30px]">
              More updates
            </h2>
          </div>
          <span className="text-[12px] text-muted">
            {feed.items.length} {feed.items.length === 1 ? "entry" : "entries"}
          </span>
        </div>

        {rest.length > 0 ? (
          <ul className="divide-y divide-line border-y border-line">
            {rest.map((item) => (
              <li key={item.slug}>
                <Link
                  className="group flex flex-col gap-2 py-5 sm:flex-row sm:items-baseline sm:gap-6"
                  href={`/news/${item.slug}`}
                >
                  <span className="shrink-0 text-[11px] uppercase tracking-[0.04em] text-[#92978e] sm:w-32">
                    {formatDate(item.publishedAt)}
                  </span>
                  <span className="flex-1">
                    <span className="block text-[10px] font-bold uppercase tracking-[0.12em] text-green">
                      {item.category}
                    </span>
                    <span className="mt-1 block font-serif text-lg leading-snug group-hover:text-green">
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
        ) : (
          <p className="rounded-xl border border-line bg-white p-6 text-sm text-muted">
            No further announcements yet. Check back after the next release.
          </p>
        )}
      </section>
    </main>
  );
}


import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { formatDate, formatDateTime } from "@/lib/format";
import { getNewsItem, getNewsSlugs } from "@/lib/news";

// The route must resolve the news item (or a 404) before responding, so it
// opts out of instant-navigation validation rather than streaming a shell.
export const instant = false;

type NewsParams = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getNewsSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: NewsParams): Promise<Metadata> {
  const { slug } = await params;
  const item = await getNewsItem(slug);

  return {
    title: item ? item.title : "News",
    description: item?.excerpt ?? "Project news from Fieldnotes.",
  };
}

export default async function NewsArticlePage({ params }: NewsParams) {
  const { slug } = await params;
  const item = await getNewsItem(slug);

  if (!item) {
    notFound();
  }

  return (
    <main className="container-page pb-16">
      <article className="mx-auto max-w-[720px] py-12 md:py-[65px] md:pb-[90px]">
        <Link className="text-link" href="/news">
          ← Back to the newsroom
        </Link>

        <p className="eyebrow mt-8">{item.category}</p>
        <p className="text-[10px] uppercase tracking-[0.04em] text-[#92978e]">
          {formatDate(item.publishedAt)} · {item.readTime} · {item.author}
        </p>
        <h1 className="mt-4 text-[clamp(38px,5.5vw,56px)] leading-[1.04]">
          {item.title}
        </h1>
        <p className="mt-5 text-lg leading-[1.65] text-muted">
          {item.excerpt}
        </p>

        <div className="art-block mt-8 min-h-[180px] rounded-xl p-[25px] md:min-h-[210px]">
          <span className="text-[10px] font-bold uppercase tracking-[0.12em]">
            {item.category}
          </span>
          <strong className="self-end font-serif text-[clamp(80px,13vw,120px)] font-medium leading-[0.8] opacity-50">
            {item.number}
          </strong>
        </div>

        <div className="article-body mt-8">
          {item.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {item.tag.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-line px-2.5 py-1 text-[11px] uppercase tracking-[0.08em] text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="mt-10 border-t border-line pt-5 text-[11px] uppercase tracking-[0.08em] text-muted">
          Published{" "}
          <time dateTime={item.publishedAt}>
            {formatDateTime(item.publishedAt)} UTC
          </time>
        </p>

        <Link className="text-link mt-6" href="/news">
          ← More news
        </Link>
      </article>
    </main>
  );
}

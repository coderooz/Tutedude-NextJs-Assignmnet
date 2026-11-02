import { cacheLife } from "next/cache";

import newsData from "@/data/news.json";
import type { NewsFeed, NewsItem } from "@/types/news.types";

const feed = newsData as NewsFeed;

// Ten-second revalidation makes these routes ISR: the cached feed is served
// immediately and refreshed in the background once it goes stale.
export async function getNewsFeed(): Promise<NewsFeed> {
  "use cache";
  cacheLife({ revalidate: 10 });

  return feed;
}

export async function getNewsItem(slug: string): Promise<NewsItem | null> {
  "use cache";
  cacheLife({ revalidate: 10 });

  return feed.items.find((item) => item.slug === slug) ?? null;
}

// Synchronous preview for pages that must stay static, like the home page.
export function getNewsPreview(limit = 3): NewsItem[] {
  return feed.items.slice(0, limit);
}

/** Used by `generateStaticParams`, which runs at build time. */
export function getNewsSlugs(): string[] {
  return feed.items.map((item) => item.slug);
}

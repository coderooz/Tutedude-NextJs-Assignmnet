
export interface NewsItem {
  id: number;
  slug: string;
  number: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: string;
  tag: string[];
  paragraphs: string[];
}

export interface NewsFeed {
  updatedAt: string;
  items: NewsItem[];
}

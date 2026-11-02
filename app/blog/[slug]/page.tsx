
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import BlogData from "@/data/blog.json";
import type { BlogTypes } from "@/types/blogs.types";
import { getPostBySlug } from "@/lib/blog";

type BlogParams = {
  params: Promise<{ slug: string }>;
};

const posts = BlogData as BlogTypes[];

export function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogParams): Promise<Metadata> {
  const { slug } = await params;
  const blog = getPostBySlug(slug);

  return {
    title: blog ? blog.title : "Blog Post",
    description: blog?.description ?? "Read our latest blog post.",
  };
}

export default async function BlogPost({ params }: BlogParams) {
  const { slug } = await params;
  const blog = getPostBySlug(slug);

  if (!blog) {
    notFound();
  }

  return (

    <main className="container-page pb-16">
      <article className="mx-auto max-w-[720px] py-12 md:py-[65px] md:pb-[90px]">
        <Link className="text-link" href="/blog">
          ← Back to all articles
        </Link>

        <p className="eyebrow mt-8">{blog.category}</p>
        <p className="text-[10px] uppercase tracking-[0.04em] text-[#92978e]">
          {blog.date} · {blog.readTime}
        </p>
        <h1 className="mt-4 text-[clamp(42px,6vw,62px)] leading-[1.03]">
          {blog.title}
        </h1>
        <p className="mt-5 text-lg leading-[1.65] text-muted">
          {blog.description}
        </p>

        <div className="art-block mt-8 min-h-[200px] rounded-xl p-[25px] md:min-h-[230px]">
          <span className="text-[10px] font-bold uppercase tracking-[0.12em]">
            {blog.category}
          </span>
          <strong className="self-end font-serif text-[clamp(84px,14vw,130px)] font-medium leading-[0.8] opacity-50">
            {blog.number}
          </strong>
        </div>

        <div className="article-body mt-8">
          {(blog.paragraphs?.length ? blog.paragraphs : blog.content.split("\n\n")).map(
            (paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ),
          )}
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {blog.tag.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-line px-2.5 py-1 text-[11px] uppercase tracking-[0.08em] text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        <Link className="text-link mt-10" href="/blog">
          ← More articles
        </Link>
      </article>
    </main>

  );
}


import type { Metadata } from "next";
import Link from "next/link";

import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Short reads about building for the web, learning new tools, and making useful things.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="container-page pb-16">
      <section className="max-w-[680px] py-12 md:py-[65px] md:pb-8">
        <p className="eyebrow">The journal</p>
        <h1 className="text-[clamp(38px,5vw,54px)] leading-[1.05]">
          Articles &amp; notes
        </h1>
        <p className="mt-3 leading-[1.75] text-muted">
          A collection of short reads about building for the web, learning new
          tools, and making useful things.
        </p>
      </section>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            className="card flex flex-col"
            href={`/blog/${post.slug}`}
            key={post.slug}
          >
            <div className="art-block min-h-[150px] p-[22px]">
              <span className="text-[10px] font-bold uppercase tracking-[0.12em]">
                {post.category}
              </span>
              <strong className="self-end font-serif text-[64px] font-medium leading-[0.8] opacity-50">
                {post.number}
              </strong>
            </div>

            <div className="flex flex-1 flex-col p-[22px]">
              <p className="mb-3 text-[10px] uppercase tracking-[0.04em] text-[#92978e]">
                {post.date} · {post.readTime}
              </p>
              <h2 className="text-2xl leading-[1.15]">{post.title}</h2>
              <p className="mt-2 flex-1 text-[13px] leading-[1.7] text-muted">
                {post.description}
              </p>
              <span className="text-link mt-4">Read more →</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

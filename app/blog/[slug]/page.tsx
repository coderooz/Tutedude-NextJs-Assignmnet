
import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import BlogData from "@/data/blog.json";
import type { BlogTypes } from "@/types/blogs.types";

type BlogParams = {
    params: Promise<{ slug: string }>;
};

function createSlug(title: string): string {
    return title.toLowerCase().replace(/\s+/g, "-");
}


export function generateStaticParams() {
    return BlogData.map((blog) => ({
        slug: createSlug(blog.title),
    }));
}

export async function generateMetadata({
    params,
}: BlogParams): Promise<Metadata> {
    const { slug } = await params;

    const blog = BlogData.find(
        (post) => createSlug(post.title) === slug
    );

    return {
        title: blog ? `${blog.title} | Blog` : "Blog Post",
        description:
            blog?.description ?? "Read our latest blog post.",
    };
}

async function fetchBlogData(slug: string): Promise<BlogTypes> {
    const baseUrl =
        process.env.NEXT_PUBLIC_SITE_URL ??
        "http://localhost:3000";

    const response = await fetch(
        `${baseUrl}/api/blogs/${encodeURIComponent(slug)}`,
        { cache: "no-store" }
    );

    if (response.status === 404) {
        notFound();
    }

    if (!response.ok) {
        throw new Error(
            `Failed to fetch blog post: HTTP ${response.status}`
        );
    }

    return response.json() as Promise<BlogTypes>;
}

async function BlogPostContent({ params }: BlogParams) {
    const { slug } = await params;
    const blog = await fetchBlogData(slug);

    return (
        <main className="min-h-screen p-8 md:p-14 bg-linear-to-r from-pink-100 to-pink-300">
            <article className="mx-auto max-w-4xl">
                <header className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900">
                        {blog.title}
                    </h1>

                    <p className="mt-3 text-lg text-gray-600">
                        {blog.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                        {blog.tag.map((tag) => (
                            <span
                                key={tag}
                                className="rounded-full bg-blue-500 px-3 py-1 text-sm font-medium text-white"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </header>

                <section className="mb-8">
                    <h2 className="mb-3 text-xl font-semibold text-blue-400">
                        Keywords
                    </h2>

                    <div className="flex flex-wrap gap-2">
                        {blog.keywords.map((keyword) => (
                            <span
                                key={keyword}
                                className="rounded-md bg-gray-100 px-2 py-1 text-sm text-gray-700"
                            >
                                {keyword}
                            </span>
                        ))}
                    </div>
                </section>

                <section>
                    <div className="whitespace-pre-wrap text-lg leading-8 text-gray-800">
                        {blog.content}
                    </div>
                </section>
            </article>
        </main>
    );
}

function BlogLoading() {
    return (
        <main
            className="min-h-screen p-8 md:p-14 bg-linear-to-r from-pink-100 to-pink-300"
            role="status"
            aria-live="polite"
        >
            Loading blog post...
        </main>
    );
}

export default function BlogPost({ params }: BlogParams) {
    return (
        <Suspense fallback={<BlogLoading />}>
            <BlogPostContent params={params} />
        </Suspense>
    );
}
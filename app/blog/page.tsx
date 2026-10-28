import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { BlogTypes } from "@/types/blogs.types";

export const metadata: Metadata = {
    title: "Blog",
    description: "Your source of knowledge.",
};

async function fetchBlogData(): Promise<BlogTypes[]> {
    const baseUrl : string  = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/blogs`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch blog data");
    }

    return res.json();
}

async function BlogList() {
    const BlogData = await fetchBlogData();

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BlogData.map((blog) => (
                <article
                    key={blog.id}
                    id={blog.id.toString()}
                    className="flex-1 rounded-lg bg-linear-to-bl from-white to-gray-400 p-8 shadow-lg"
                >
                    <h2 className="text-2xl font-bold text-gray-800">
                        {blog.title}
                    </h2>

                    <p className="text-gray-600">
                        {blog.description}
                    </p>

                    <div className="mt-2 flex gap-2">
                        {blog.tag.map((tag) => (
                            <span
                                key={tag}
                                className="rounded-full bg-blue-500 px-2 py-1 text-sm font-medium text-white"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <Link
                        className="text-link my-5"
                        href={`/blog/${blog.title
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                    >
                        Read More...
                    </Link>
                </article>
            ))}
        </div>
    );
}

function BlogLoading() {
    return (
        <p className="text-lg text-gray-700" role="status">
            Loading blogs...
        </p>
    );
}

export default function BlogPage() {
    return (
        <main className="flex-1 flex-col gap-6 items-center p-14 bg-linear-to-r from-pink-100 to-pink-300">
            <h2 className="text-3xl font-bold text-gray-800">
                Blog
            </h2>

            <p className="text-lg">
                Your source of knowledge.
            </p>

            <Suspense fallback={<BlogLoading />}>
                <BlogList />
            </Suspense>
        </main>
    );
}
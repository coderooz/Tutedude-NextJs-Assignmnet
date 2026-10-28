
"use client";

import useSWR from "swr";

type Post = {
    id: number;
    title: string;
};

async function fetcher(url: string): Promise<Post[]> {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Failed to fetch posts");
    }

    return response.json();
}

export default function DashboardPage() {
    const { data, error, isLoading } = useSWR<Post[]>(
        "https://jsonplaceholder.typicode.com/posts",
        fetcher,
        {
            refreshInterval: 10000,
        }
    );

    return (
        <main className="min-h-screen bg-slate-50 p-6 md:p-12">
            <div className="mx-auto max-w-4xl">
                <h1 className="text-3xl font-bold text-slate-900">
                    Dashboard
                </h1>

                <p className="mt-2 text-sm text-slate-600">
                    Posts refresh every 10 seconds.
                </p>

                {isLoading && (
                    <p className="mt-6" role="status">
                        Loading posts...
                    </p>
                )}

                {error && (
                    <p className="mt-6 text-red-600" role="alert">
                        Failed to load posts. Please try again.
                    </p>
                )}

                {data && (
                    <ul className="mt-6 space-y-3">
                        {data.slice(0, 10).map((post) => (
                            <li
                                key={post.id}
                                className="rounded-lg border bg-white p-4 shadow-sm"
                            >
                                <span className="mr-3 font-bold text-blue-700">
                                    {post.id}.
                                </span>
                                <span className="text-slate-800">
                                    {post.title}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </main>
    );
}

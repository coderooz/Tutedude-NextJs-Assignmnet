import BlogData from "@/data/blog.json";

function createSlug(title: string) {
    return title.toLowerCase().replace(/\s+/g, "-");
}

export async function generateStaticParams() {
    return BlogData.map((blog) => ({
        slug: createSlug(blog.title),
    }));
}

export default async function BlogPost({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const blog = BlogData.find(
        (post) => createSlug(post.title) === slug
    );

    if (!blog) {
        return (
            <main className="min-h-screen p-14 bg-linear-to-r from-pink-100 to-pink-300">
                <h1 className="text-3xl font-bold">Blog post not found</h1>
                <p className="mt-2 text-gray-600">
                    The blog post you are looking for does not exist.
                </p>
            </main>
        );
    }

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
                    <h2 className="mb-3 text-xl font-semibold text-blue-400">Keywords</h2>

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

import BlogData from "@/data/blog.json";
import Link from "next/link";

export default function BlogPage(){

    const blogCards = ({
    id,
    title,
    description,
    tag,
}: {
    id: number;
    title: string;
    description: string;
    tag: string[];
}) => {
    return (
        <article
            key={id}
            id={id.toString()}
            className="flex-1 rounded-lg bg-linear-to-bl from-white to-gray-400 p-8 shadow-lg"
        >
            <h2 className="text-2xl font-bold text-gray-800">
                {title}
            </h2>

            <p className="text-gray-600">{description}</p>

            <div className="mt-2 flex gap-2">
                {tag.map((t) => (
                    <span
                        key={t}
                        className="rounded-full bg-blue-500 px-2 py-1 text-sm font-medium text-white"
                    >
                        {t}
                    </span>
                ))}
            </div>

            <Link
                className="text-link my-5"
                href={`/blog/${title.toLowerCase().replace(/\s+/g, "-")}`}
            >
                Read More...
            </Link>
        </article>
    );
};
    


    return (
        <main className="flex-1 flex-col gap-6 items-center p-14 bg-linear-to-r from-pink-100 to-pink-300">
            <h2 className="text-3xl font-bold text-gray-800">Blog</h2>
            <p className="text-lg">Your source of knowledge.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
                {BlogData.map((blog) => (
                    blogCards(blog)
                ))}
            </div>
        </main>
    );
    
}
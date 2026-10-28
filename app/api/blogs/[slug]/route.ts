import { NextResponse } from "next/server";
import BlogData from "@/data/blog.json";

function createSlug(title: string): string {
    return title.toLowerCase().replace(/\s+/g, "-");
}


export async function GET(
    _request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;

    const blog = BlogData.find(
        (post) => createSlug(post.title) === slug
    );

    if (!blog) {
        return NextResponse.json(
            { error: "Blog post not found" },
            { status: 404 }
        );
    }

    return NextResponse.json(blog);
}
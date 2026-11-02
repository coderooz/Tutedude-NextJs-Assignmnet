import { NextResponse } from "next/server";

import { getPostBySlug } from "@/lib/blog";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return NextResponse.json(
      { error: "Blog post not found" },
      { status: 404 },
    );
  }

  return NextResponse.json(post);
}

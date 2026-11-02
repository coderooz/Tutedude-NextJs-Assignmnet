import { NextResponse } from "next/server";

import { getAllPosts } from "@/lib/blog";

/**
 * @returns The editorial blog collection from `data/blog.json`.
 */
export async function GET() {
  return NextResponse.json(getAllPosts());
}

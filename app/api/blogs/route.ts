
import { NextResponse } from "next/server";
import BlogData from "@/data/blog.json";



/**
 * 
 * @returns List of blogs from the blog.json file
 */
export async function GET() {
  return NextResponse.json(BlogData);
}


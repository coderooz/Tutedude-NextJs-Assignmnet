import { NextResponse } from "next/server";

import { getNewsFeed } from "@/lib/news";

/** The news feed, including the timestamp of the rendered dataset. */
export async function GET() {
  const feed = await getNewsFeed();

  return NextResponse.json(feed);
}

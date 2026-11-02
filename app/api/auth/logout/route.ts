import { NextResponse } from "next/server";

import { SESSION_COOKIE_NAME, sessionCookieOptions } from "@/lib/session";

export async function POST() {
  const response = NextResponse.json({ ok: true });

  // maxAge: 0 expires the cookie immediately on the client.
  response.cookies.set(SESSION_COOKIE_NAME, "", sessionCookieOptions(0));

  return response;
}

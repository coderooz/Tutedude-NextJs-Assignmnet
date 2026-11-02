import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { resolveNextPath } from "@/lib/redirects";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/session";


export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = await verifySessionToken(token);

  const isDashboardRoute =
    pathname === "/dashboard" || pathname.startsWith("/dashboard/");

  if (isDashboardRoute && !session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", `${pathname}${search}`);

    return NextResponse.redirect(loginUrl);
  }

  if (pathname === "/login" && session) {
    const nextPath = resolveNextPath(request.nextUrl.searchParams.get("next"));

    return NextResponse.redirect(new URL(nextPath, request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Static assets, image optimisation, and API routes never need this check,
  // and `/api/auth/*` must stay reachable while signed out.
  matcher: ["/dashboard", "/dashboard/:path*", "/login"],
};

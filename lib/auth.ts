import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  SESSION_COOKIE_NAME,
  verifySessionToken,
  type SessionUser,
} from "@/lib/session";

// Verifies the cookie rather than trusting that it exists; anything expired,
// forged, or malformed comes back as null.
export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  return verifySessionToken(token);
}

// proxy.ts checks this first, but layouts re-check so the guard survives matcher
// changes and direct RSC requests.
export async function requireSession(
  nextPath: string = "/dashboard",
): Promise<SessionUser> {
  const session = await getSession();

  if (!session) {
    redirect(`/login?next=${encodeURIComponent(nextPath)}`);
  }

  return session;
}

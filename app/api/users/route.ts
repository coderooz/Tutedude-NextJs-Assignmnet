import { NextResponse } from "next/server";

import { getDirectoryUsers } from "@/lib/users";

/**
 * Sample directory consumed by the protected dashboard.
 *
 * The payload is static JSON, so the route can be prerendered.
 */
export async function GET() {
  return NextResponse.json(getDirectoryUsers());
}

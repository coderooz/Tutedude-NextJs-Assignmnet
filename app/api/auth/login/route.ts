import { NextResponse } from "next/server";

import {
  SESSION_COOKIE_NAME,
  createSessionToken,
  sessionCookieOptions,
} from "@/lib/session";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_MIN_LENGTH = 2;
const NAME_MAX_LENGTH = 80;
const EMAIL_MAX_LENGTH = 254;

interface LoginRequestBody {
  name?: unknown;
  email?: unknown;
}

function isValidName(value: string): boolean {
  return value.length >= NAME_MIN_LENGTH && value.length <= NAME_MAX_LENGTH;
}

function isValidEmail(value: string): boolean {
  return value.length <= EMAIL_MAX_LENGTH && EMAIL_PATTERN.test(value);
}

export async function POST(request: Request) {
  let body: LoginRequestBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Request body must be valid JSON." },
      { status: 400 },
    );
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

  const fieldErrors: Record<string, string> = {};

  if (!isValidName(name)) {
    fieldErrors.name = `Name must be between ${NAME_MIN_LENGTH} and ${NAME_MAX_LENGTH} characters.`;
  }

  if (!isValidEmail(email)) {
    fieldErrors.email = "Enter a valid email address.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json(
      { error: "Check the highlighted fields and try again.", fieldErrors },
      { status: 400 },
    );
  }

  const token = await createSessionToken({ name, email });

  if (!token) {
    // Fail closed: never sign with a missing or weak secret.
    return NextResponse.json(
      {
        error:
          "Server session configuration is incomplete. SESSION_SECRET must be set to at least 32 characters.",
        code: "SESSION_SECRET_MISSING",
      },
      { status: 500 },
    );
  }

  const response = NextResponse.json({ user: { name, email } });
  response.cookies.set(
    SESSION_COOKIE_NAME,
    token,
    sessionCookieOptions(),
  );

  return response;
}

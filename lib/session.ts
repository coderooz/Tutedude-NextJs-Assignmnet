// Stateless session tokens: base64url claims plus an HMAC-SHA256 signature.
// No `next/headers` or Node-only APIs here, so `proxy.ts` can import it too.

export const SESSION_COOKIE_NAME = "session";

export const SESSION_TTL_SECONDS = 60 * 60 * 8;

const MIN_SECRET_LENGTH = 32;

export interface SessionUser {
  name: string;
  email: string;
}

interface SessionClaims extends SessionUser {
  iat: number;
  exp: number;
}

export interface SessionCookieOptions {
  httpOnly: true;
  secure: boolean;
  sameSite: "lax";
  path: "/";
  maxAge: number;
}

function readSecret(): string | null {
  const secret = process.env.SESSION_SECRET?.trim();

  if (!secret || secret.length < MIN_SECRET_LENGTH) {
    return null;
  }

  return secret;
}

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = "";

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function base64UrlToBytes(value: string): Uint8Array | null {
  try {
    const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
    const padding = (4 - (normalized.length % 4)) % 4;
    const binary = atob(normalized.padEnd(normalized.length + padding, "="));
    const bytes = new Uint8Array(binary.length);

    for (let index = 0; index < binary.length; index += 1) {
      bytes[index] = binary.charCodeAt(index);
    }

    return bytes;
  } catch {
    return null;
  }
}

async function importHmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

async function sign(value: string, secret: string): Promise<Uint8Array> {
  const key = await importHmacKey(secret);
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(value),
  );

  return new Uint8Array(signature);
}

// Constant-time compare; a plain === would leak timing information.
function signaturesMatch(left: Uint8Array, right: Uint8Array): boolean {
  if (left.length !== right.length) {
    return false;
  }

  let difference = 0;

  for (let index = 0; index < left.length; index += 1) {
    difference |= left[index] ^ right[index];
  }

  return difference === 0;
}

function isSessionClaims(value: unknown): value is SessionClaims {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const claims = value as Record<string, unknown>;

  return (
    typeof claims.name === "string" &&
    claims.name.length > 0 &&
    typeof claims.email === "string" &&
    claims.email.length > 0 &&
    typeof claims.iat === "number" &&
    Number.isFinite(claims.iat) &&
    typeof claims.exp === "number" &&
    Number.isFinite(claims.exp)
  );
}

// Returns null when the secret is missing or too short, so callers fail closed.
export async function createSessionToken(
  user: SessionUser,
): Promise<string | null> {
  const secret = readSecret();

  if (!secret) {
    return null;
  }

  const issuedAt = Math.floor(Date.now() / 1000);
  const claims: SessionClaims = {
    name: user.name,
    email: user.email,
    iat: issuedAt,
    exp: issuedAt + SESSION_TTL_SECONDS,
  };

  const encodedClaims = bytesToBase64Url(
    new TextEncoder().encode(JSON.stringify(claims)),
  );
  const signature = await sign(encodedClaims, secret);

  return `${encodedClaims}.${bytesToBase64Url(signature)}`;
}

// Rejects malformed, tampered, and expired tokens.
export async function verifySessionToken(
  token: string | null | undefined,
): Promise<SessionUser | null> {
  if (!token) {
    return null;
  }

  const secret = readSecret();

  if (!secret) {
    return null;
  }

  const parts = token.split(".");

  if (parts.length !== 2) {
    return null;
  }

  const [encodedClaims, encodedSignature] = parts;

  if (!encodedClaims || !encodedSignature) {
    return null;
  }

  const providedSignature = base64UrlToBytes(encodedSignature);

  if (!providedSignature) {
    return null;
  }

  const expectedSignature = await sign(encodedClaims, secret);

  if (!signaturesMatch(providedSignature, expectedSignature)) {
    return null;
  }

  const payloadBytes = base64UrlToBytes(encodedClaims);

  if (!payloadBytes) {
    return null;
  }

  let claims: unknown;

  try {
    claims = JSON.parse(new TextDecoder().decode(payloadBytes));
  } catch {
    return null;
  }

  if (!isSessionClaims(claims)) {
    return null;
  }

  if (claims.exp <= Math.floor(Date.now() / 1000)) {
    return null;
  }

  return { name: claims.name, email: claims.email };
}

export function sessionCookieOptions(
  maxAge: number = SESSION_TTL_SECONDS,
): SessionCookieOptions {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge,
  };
}

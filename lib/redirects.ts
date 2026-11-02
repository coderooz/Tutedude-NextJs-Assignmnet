
export const DEFAULT_AUTH_REDIRECT = "/dashboard";

/**
 * Accepts only same-origin, absolute-path targets.
 *
 * Rejects protocol-relative (`//evil.test`), backslash-smuggled, and
 * `/login` targets so the login redirect cannot loop or become an open
 * redirect.
 */
export function sanitizeNextPath(
  value: string | null | undefined,
): string | null {
  if (!value) {
    return null;
  }

  if (!value.startsWith("/") || value.startsWith("//")) {
    return null;
  }

  if (value.includes("\\")) {
    return null;
  }

  if (value === "/login" || value.startsWith("/login?") || value.startsWith("/login/")) {
    return null;
  }

  return value;
}

export function resolveNextPath(value: string | null | undefined): string {
  return sanitizeNextPath(value) ?? DEFAULT_AUTH_REDIRECT;
}

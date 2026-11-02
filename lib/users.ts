import usersData from "@/data/users.json";
import type { DirectoryUser } from "@/types/users.types";

const users = usersData as DirectoryUser[];

/** Sample directory used by the protected dashboard. */
export function getDirectoryUsers(): DirectoryUser[] {
  return users;
}

export function findDirectoryUserByEmail(
  email: string | null | undefined,
): DirectoryUser | null {
  if (!email) {
    return null;
  }

  const normalized = email.trim().toLowerCase();

  return (
    users.find((user) => user.email.toLowerCase() === normalized) ?? null
  );
}

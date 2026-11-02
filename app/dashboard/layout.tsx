import { requireSession } from "@/lib/auth";

// The guard reads cookies, so the segment cannot prerender a static shell.
export const instant = false;

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // proxy.ts checks first; this second check covers matcher changes and direct
  // RSC requests.
  await requireSession("/dashboard");

  return <>{children}</>;
}

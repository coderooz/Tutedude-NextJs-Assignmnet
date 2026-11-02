"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { useUserContext } from "@/context/UserProvider";

const navigationLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/news", label: "News" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { authenticated, isLoading, userData, logout } = useUserContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const firstName = userData?.name.split(" ")[0];

  async function handleLogout() {
    setIsMenuOpen(false);
    await logout();
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur">
      <div className="container-page flex min-h-[76px] flex-wrap items-center justify-between gap-x-6 py-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 text-[19px] font-bold tracking-[-0.04em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green"
          onClick={() => setIsMenuOpen(false)}
        >
          <span
            aria-hidden="true"
            className="grid size-[31px] place-items-center rounded-[9px] bg-green font-serif text-[19px] text-white"
          >
            F.
          </span>
          Fieldnotes
        </Link>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-lg text-ink/80 transition-colors hover:bg-wash focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green lg:hidden"
          aria-label={
            isMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? (
            <svg
              aria-hidden="true"
              className="size-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m6 6 12 12M18 6 6 18"
              />
            </svg>
          ) : (
            <svg
              aria-hidden="true"
              className="size-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 7h16M4 12h16M4 17h16"
              />
            </svg>
          )}
        </button>

        <nav
          id="primary-navigation"
          aria-label="Primary navigation"
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } w-full flex-col gap-1 border-t border-line pt-3 lg:flex lg:w-auto lg:flex-row lg:items-center lg:gap-[27px] lg:border-0 lg:pt-0`}
        >
          {navigationLinks.map(({ href, label }) => {
            const isActive =
              pathname === href || pathname.startsWith(`${href}/`);

            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-md px-1 py-2 text-[13px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green ${
                  isActive
                    ? "font-semibold text-green"
                    : "text-[#60665e] hover:text-green"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </Link>
            );
          })}

          <div className="mt-2 flex flex-wrap items-center gap-3 border-t border-line pt-3 lg:mt-0 lg:border-0 lg:pt-0">
            {isLoading ? (
              <span className="text-[11px] uppercase tracking-[0.08em] text-muted">
                Checking session…
              </span>
            ) : authenticated ? (
              <>
                <span className="hidden text-[12px] text-muted xl:inline">
                  Hi, {firstName}
                </span>
                <Link
                  href="/dashboard"
                  className="rounded-[7px] border border-[#d7dfd4] px-3 py-2 text-[13px] font-semibold text-green transition-colors hover:bg-wash focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-md px-1 py-2 text-[13px] text-[#60665e] transition-colors hover:text-green focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green"
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="rounded-[7px] border border-[#d7dfd4] px-3 py-2 text-[13px] font-semibold text-green transition-colors hover:bg-wash focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign in
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

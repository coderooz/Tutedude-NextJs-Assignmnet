
"use client";

import { useRouter } from "next/navigation";
import useSWR from "swr";

import { useUserContext } from "@/context/UserProvider";
import type { DirectoryUser } from "@/types/users.types";

type Post = {
  id: number;
  title: string;
};

async function fetcher<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export default function DashboardPage() {
  const router = useRouter();
  const { userData, logout } = useUserContext();

  const {
    data: posts,
    error: postsError,
    isLoading: postsLoading,
  } = useSWR<Post[]>(
    "https://jsonplaceholder.typicode.com/posts",
    fetcher<Post[]>,
    { refreshInterval: 10000 },
  );

  const {
    data: people,
    error: peopleError,
    isLoading: peopleLoading,
  } = useSWR<DirectoryUser[]>("/api/users", fetcher<DirectoryUser[]>, {
    refreshInterval: 10000,
  });

  async function handleSignOut() {
    await logout();
    router.push("/");
    router.refresh();
  }

  return (
    <main className="container-page pb-16">
      <section className="max-w-[680px] py-12 md:py-[65px] md:pb-8">
        <p className="eyebrow">Protected area</p>
        <h1 className="text-[clamp(38px,5vw,54px)] leading-[1.05]">
          Dashboard
        </h1>
        <p className="mt-3 leading-[1.75] text-muted">
          {userData
            ? `Welcome back, ${userData.name}.`
            : "Welcome back."}{" "}
          The posts below refresh every ten seconds, and this page is only
          reachable with a valid session cookie.
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <span className="inline-flex flex-wrap items-center gap-2 rounded-md border border-line bg-white px-3 py-2 text-[11px] uppercase tracking-[0.08em] text-muted">
            <span
              aria-hidden="true"
              className="inline-block size-1.5 rounded-full bg-green"
            />
            {userData ? `Signed in as ${userData.email}` : "Session verified"}
          </span>
          <button
            type="button"
            onClick={handleSignOut}
            className="rounded-md border border-line px-3 py-2 text-[12px] font-semibold text-green transition-colors hover:bg-wash focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green"
          >
            Sign out
          </button>
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <section aria-labelledby="posts-heading" className="card p-5 sm:p-6">
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
            <h2 id="posts-heading" className="text-2xl">
              Latest posts
            </h2>
            <span className="rounded-full bg-wash px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-green">
              SWR · 10s
            </span>
          </div>

          {postsLoading ? (
            <p role="status" className="text-sm text-muted">
              Loading posts…
            </p>
          ) : null}

          {postsError ? (
            <p role="alert" className="text-sm text-red-700">
              Failed to load posts. Please try again shortly.
            </p>
          ) : null}

          {posts ? (
            <ul className="divide-y divide-line">
              {posts.slice(0, 10).map((post) => (
                <li
                  key={post.id}
                  className="flex items-baseline gap-3 py-3 text-sm"
                >
                  <span className="w-6 shrink-0 text-right font-semibold text-green">
                    {post.id}
                  </span>
                  <span className="text-[#454b43]">{post.title}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </section>

        <section aria-labelledby="people-heading" className="card p-5 sm:p-6">
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
            <h2 id="people-heading" className="text-2xl">
              People
            </h2>
            <span className="rounded-full bg-wash px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-green">
              Sample directory
            </span>
          </div>

          <p className="mb-4 text-[12px] leading-[1.7] text-muted">
            Loaded from <code className="text-[11px]">/api/users</code>. The
            record matching your session is marked so you can see how the
            directory and the signed-in user relate.
          </p>

          {peopleLoading ? (
            <p role="status" className="text-sm text-muted">
              Loading directory…
            </p>
          ) : null}

          {peopleError ? (
            <p role="alert" className="text-sm text-red-700">
              Failed to load the directory.
            </p>
          ) : null}

          {people ? (
            <ul className="space-y-3">
              {people.map((person) => {
                const isCurrentUser =
                  person.email.toLowerCase() ===
                  userData?.email.toLowerCase();

                return (
                  <li
                    key={person.id}
                    className="flex items-center gap-3 rounded-lg border border-line p-3"
                  >
                    <span
                      aria-hidden="true"
                      className="grid size-9 shrink-0 place-items-center rounded-full bg-wash text-[11px] font-bold text-green"
                    >
                      {person.initials}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-semibold text-ink">
                          {person.name}
                        </span>
                        {isCurrentUser ? (
                          <span className="rounded-full border border-[#d7dfd4] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-green">
                            You
                          </span>
                        ) : null}
                      </span>
                      <span className="block truncate text-[12px] text-muted">
                        {person.role} · {person.location}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </section>
      </div>
    </main>
  );
}

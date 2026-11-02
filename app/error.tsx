"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled error:", error);
  }, [error]);

  return (
    <main className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="eyebrow">Something went wrong</p>
      <h1 className="text-[clamp(36px,6vw,54px)] leading-[1.05]">
        We hit an unexpected error
      </h1>
      <p className="mt-3 max-w-md text-[14px] leading-[1.75] text-muted">
        The page could not be rendered. Try again, or return to the homepage if
        the problem persists.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <button type="button" onClick={reset} className="btn btn-primary">
          Try again
        </button>
        <Link className="btn btn-ghost" href="/">
          Back home
        </Link>
      </div>
    </main>
  );
}

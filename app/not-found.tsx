import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="eyebrow">404</p>
      <h1 className="text-[clamp(40px,7vw,64px)] leading-[1.05]">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-[14px] leading-[1.75] text-muted">
        The page you are looking for does not exist, or it may have moved. Check
        the address or start again from the homepage.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link className="btn btn-primary" href="/">
          Back home
        </Link>
        <Link className="btn btn-ghost" href="/blog">
          Browse articles
        </Link>
      </div>
    </main>
  );
}

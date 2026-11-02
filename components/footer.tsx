import Link from "next/link";

export default function Footers() {
  return (
    <footer className="border-t border-line py-6 text-[11px] text-muted">
      <div className="container-page flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <span>© 2026 Fieldnotes. A small Next.js assignment project.</span>

        <nav aria-label="Footer navigation" className="flex flex-wrap gap-[18px]">
          <Link href="/blog" className="transition-colors hover:text-green">
            Articles
          </Link>
          <Link href="/news" className="transition-colors hover:text-green">
            News
          </Link>
          <Link href="/products" className="transition-colors hover:text-green">
            Products
          </Link>
          <Link href="/about" className="transition-colors hover:text-green">
            About
          </Link>
          <Link href="/contact" className="transition-colors hover:text-green">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}

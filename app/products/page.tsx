
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { getProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "A small product catalogue fetched at build time, cached for an hour, and backed by a labelled offline snapshot.",
};

export default async function ProductsPage() {
  const { products, source } = await getProducts();

  return (
    <main className="container-page pb-16">
      <section className="max-w-[680px] py-12 md:py-[65px] md:pb-8">
        <p className="eyebrow">The catalogue</p>
        <h1 className="text-[clamp(38px,5vw,54px)] leading-[1.05]">
          Products
        </h1>
        <p className="mt-3 leading-[1.75] text-muted">
          A small catalogue fetched from a public demo API, cached for an hour,
          and rendered with optimised imagery. Prices are shown in US dollars,
          as supplied by the API.
        </p>
      </section>

      {source === "fallback" ? (
        <div className="mt-4 flex items-start gap-3 rounded-xl border border-[#d7dfd4] bg-wash p-4 text-[13px] leading-[1.7] text-[#4f5c51]">
          <span aria-hidden="true" className="mt-1 text-green">
            ●
          </span>
          <p>
            <strong className="font-semibold text-ink">
              Showing the bundled catalogue.
            </strong>{" "}
            The live demo API was unreachable when this page was generated, so
            these products are a saved snapshot rather than live catalogue data.
          </p>
        </div>
      ) : (
        <p className="mt-4 text-[11px] uppercase tracking-[0.08em] text-muted">
          Live catalogue · revalidated hourly
        </p>
      )}

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product, index) => (
          <Link
            className="card group flex flex-col p-4"
            href={`/products/${product.id}`}
            key={product.id}
          >
            <div className="relative aspect-square w-full rounded-lg bg-white">
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                preload={index === 0}
                className="object-contain p-3"
              />
            </div>

            <p className="mt-4 line-clamp-1 text-[10px] uppercase tracking-[0.12em] text-muted">
              {product.category}
            </p>

            <h2 className="mt-1 line-clamp-2 text-lg leading-snug group-hover:text-green">
              {product.title}
            </h2>

            <p className="mt-2 font-serif text-xl text-green">
              ${product.price.toFixed(2)}
            </p>

            <span className="text-link mt-auto pt-4">View details →</span>
          </Link>
        ))}
      </div>
    </main>
  );
}

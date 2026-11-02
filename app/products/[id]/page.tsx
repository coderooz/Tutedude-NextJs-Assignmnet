
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getProductById } from "@/lib/products";

// The header's usePathname() cannot be prerendered for dynamic params, and this
// route must resolve the product (or a 404) before responding.
export const instant = false;

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const result = await getProductById(id);

  return {
    title: result ? result.product.title : "Product not found",
    description:
      result?.product.description ??
      "The requested product could not be found.",
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const result = await getProductById(id);

  if (!result) {
    notFound();
  }

  const { product, source } = result;

  return (
    <main className="container-page pb-16">
      <div className="py-8">
        <Link className="text-link" href="/products">
          ← Back to products
        </Link>
      </div>

      <article className="grid gap-8 md:grid-cols-2 md:gap-10">
        <div className="relative aspect-square w-full rounded-xl border border-line bg-white">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            preload
            className="object-contain p-8"
          />
        </div>

        <div className="self-center">
          <p className="eyebrow">{product.category}</p>

          <h1 className="text-[clamp(30px,4vw,44px)] leading-[1.08]">
            {product.title}
          </h1>

          <p className="mt-4 font-serif text-3xl text-green">
            ${product.price.toFixed(2)}
          </p>

          {source === "fallback" ? (
            <p className="mt-4 rounded-lg border border-[#d7dfd4] bg-wash p-3 text-[12px] leading-[1.7] text-[#4f5c51]">
              <strong className="font-semibold text-ink">
                Saved snapshot.
              </strong>{" "}
              The live product API was unreachable for this request, so this
              record comes from the bundled catalogue.
            </p>
          ) : null}

          <h2 className="mt-6 text-xl">Description</h2>
          <p className="mt-2 leading-[1.8] text-muted">
            {product.description}
          </p>

          <Link className="btn btn-primary mt-8" href="/products">
            Back to products
          </Link>
        </div>
      </article>
    </main>
  );
}

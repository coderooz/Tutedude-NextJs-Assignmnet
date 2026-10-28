
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/products";

// The header's usePathname() cannot be prerendered for dynamic params, and this
// route must resolve the product (or a 404) before responding.
export const instant = false;

type PageProps = {
    params: Promise<{ id: string }>;
};

async function ProductDetails({ params }: PageProps) {
    const { id } = await params;
    const product = await getProductById(id);

    if (!product) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-slate-50 p-6 md:p-12">
            <article className="mx-auto grid max-w-5xl gap-8 rounded-2xl border bg-white p-6 shadow-sm md:grid-cols-2 md:p-10">
                <div className="flex items-center justify-center">
                    <Image
                        src={product.image}
                        alt={product.title}
                        width={480}
                        height={480}
                        unoptimized
                        loading="eager"
                        className="max-h-96 w-full object-contain"
                    />
                </div>

                <div>
                    <p className="text-sm font-medium uppercase text-blue-700">
                        {product.category}
                    </p>

                    <h1 className="mt-3 text-3xl font-bold text-slate-900">
                        {product.title}
                    </h1>

                    <p className="mt-4 text-2xl font-bold text-blue-700">
                        ${product.price.toFixed(2)}
                    </p>

                    <h2 className="mt-6 font-semibold text-slate-900">
                        Description
                    </h2>
                    <p className="mt-2 leading-7 text-slate-600">
                        {product.description}
                    </p>

                    <Link
                        href="/products"
                        className="mt-8 inline-block rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
                    >
                        Back to Products
                    </Link>
                </div>
            </article>
        </main>
    );
}

function ProductLoading() {
    return (
        <main
            className="min-h-screen p-8 text-slate-700"
            role="status"
        >
            Loading product details...
        </main>
    );
}

export default function ProductPage({ params }: PageProps) {
    return (
        <Suspense fallback={<ProductLoading />}>
            <ProductDetails params={params} />
        </Suspense>
    );
}

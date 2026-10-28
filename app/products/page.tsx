

import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/lib/products";

export default async function ProductsPage() {
    const products = await getProducts();

    return (
        <main className="min-h-screen bg-slate-50 p-6 md:p-12">
            <div className="mx-auto max-w-7xl">
                <h1 className="text-3xl font-bold text-slate-900">
                    Products
                </h1>
                <p className="mt-2 text-slate-600">
                    Browse our product catalogue.
                </p>

                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {products.map((product) => (
                        <article
                            key={product.id}
                            className="flex flex-col rounded-xl border bg-white p-4 shadow-sm"
                        >
                            <Image
                                src={product.image}
                                alt={product.title}
                                width={240}
                                height={240}
                                unoptimized
                                loading="eager"
                                className="h-48 w-full object-contain"
                            />

                            <h2 className="mt-4 line-clamp-2 font-semibold text-slate-900">
                                {product.title}
                            </h2>

                            <p className="mt-2 font-bold text-blue-700">
                                ${product.price.toFixed(2)}
                            </p>

                            <Link
                                href={`/products/${product.id}`}
                                className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-center text-white hover:bg-blue-700"
                            >
                                View Details
                            </Link>
                        </article>
                    ))}
                </div>
            </div>
        </main>
    );
}

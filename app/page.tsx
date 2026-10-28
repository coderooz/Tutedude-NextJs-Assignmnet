
import Link from "next/link";
import HelloMessage from "@/components/hello-message";

const links = [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/blog", label: "Blog" },
    { href: "/products", label: "Products" },
    { href: "/dashboard", label: "Dashboard" },
];

export default function Home() {
    return (
        <main className="min-h-screen flex-1 bg-linear-to-r from-pink-100 to-pink-300 p-6 md:p-14">
            <section className="rounded-xl bg-linear-to-b from-blue-500 to-purple-600 p-8 shadow-lg md:p-12">
                <h1 className="text-3xl font-bold text-white md:text-4xl">
                    Welcome to My App
                </h1>

                <p className="mt-3 text-white">
                    Explore products, articles and live dashboard data.
                </p>

                <div className="mt-6 rounded-lg bg-white/15 p-4">
                    <h2 className="mb-2 font-semibold text-white">
                        API Response
                    </h2>
                    <HelloMessage />
                </div>

                <nav
                    aria-label="Main navigation"
                    className="mt-6 flex flex-wrap gap-3"
                >
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="rounded-lg bg-white px-4 py-2 font-medium text-blue-700 hover:bg-blue-50"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </section>

            <section className="mt-8 rounded-xl bg-white p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-slate-900">
                    About This Project
                </h2>

                <p className="mt-3 leading-7 text-slate-600">
                    This project demonstrates Next.js routing, data
                    fetching, rendering strategies and API routes.
                </p>
            </section>
        </main>
    );
}

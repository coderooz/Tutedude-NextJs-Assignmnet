import Link from "next/link";

export default function Home() {
    return (
        <main className="flex-1 flex-col p-14 bg-linear-to-r from-pink-100 to-pink-300">
            <div className="flex flex-col items-center justify-center gap-4 rounded-lg bg-linear-to-b from-blue-500 to-purple-600 p-8 shadow-lg">
                <h1 className="text-3xl font-bold text-white">
                    Welcome to My App
                </h1>

                <p className="text-md text-white">
                    Enjoy your stay!
                </p>

                <nav className="mt-4 flex gap-4">
                    <Link
                        href="/about"
                        className="rounded-lg bg-white px-4 py-2 text-blue-600 hover:bg-gray-100"
                    >
                        About
                    </Link>

                    <Link
                        href="/contact"
                        className="rounded-lg bg-white px-4 py-2 text-blue-600 hover:bg-gray-100"
                    >
                        Contact
                    </Link>

                    <Link
                        href="/blog"
                        className="rounded-lg bg-white px-4 py-2 text-blue-600 hover:bg-gray-100"
                    >
                        Blog
                    </Link>
                </nav>
            </div>

            <div className="mt-12 rounded-lg bg-linear-to-bl from-white to-gray-400 p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800">
                    About Me
                </h2>

                <p className="text-gray-600">
                    I am a passionate developer with experience in building
                    web applications using Next.js and React. I enjoy creating
                    beautiful and functional user interfaces.
                </p>
            </div>
        </main>
    );
}
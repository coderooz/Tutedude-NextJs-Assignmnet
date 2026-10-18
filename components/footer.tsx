import Link from "next/link";

export default function Footers () {
    return (
        <footer className="flex max-h-10 justify-between p-8 gap-4 bg-black">
            <Link href="/" className="text-2xl font-semibold hover:underline underline-offset-2 hover:text-blue-500">My App</Link>
            <p className="text-sm text-gray-400">© 2024 My App. All rights reserved.</p>
        </footer>
    );
}
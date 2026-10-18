
export default function AboutPage() {
    return (
        <main className="flex-1 flex-col items-center justify-between p-14 bg-linear-to-r from-pink-100 to-pink-300">
            <div className="flex flex-col items-center justify-center gap-4 bg-linear-to-b from-blue-500 to-purple-600 p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold">About Page</h1>
                <p className="text-md text-white">This is the about page of My App.</p>
            </div>
        </main>
    )
}
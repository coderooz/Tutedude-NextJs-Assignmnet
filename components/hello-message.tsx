
"use client";

import useSWR from "swr";

type HelloResponse = {
    message: string;
};

async function fetcher(url: string): Promise<HelloResponse> {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Failed to fetch greeting");
    }

    return response.json();
}

export default function HelloMessage() {
    const { data, error, isLoading } = useSWR<HelloResponse>(
        "/api/hello",
        fetcher
    );

    if (isLoading) {
        return <p role="status">Loading greeting...</p>;
    }

    if (error) {
        return (
            <p role="alert" className="text-red-700">
                Unable to load the greeting.
            </p>
        );
    }

    return (
        <p className="text-lg font-medium text-white">
            {data?.message}
        </p>
    );
}

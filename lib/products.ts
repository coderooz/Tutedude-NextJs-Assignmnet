
import { cacheLife } from "next/cache";

const API_URL = "https://fakestoreapi.com/products";

export type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
};

function isProduct(value: unknown): value is Product {
    if (typeof value !== "object" || value === null) {
        return false;
    }

    const product = value as Record<string, unknown>;

    return (
        typeof product.id === "number" &&
        typeof product.title === "string" &&
        typeof product.price === "number" &&
        typeof product.description === "string" &&
        typeof product.category === "string" &&
        typeof product.image === "string"
    );
}

/**
 * Fake Store API answers unknown product IDs with HTTP 200 and an empty body,
 * so the payload has to be read defensively before it is parsed.
 */
async function readJsonBody(response: Response): Promise<unknown> {
    const body = await response.text();

    if (!body.trim()) {
        return null;
    }

    try {
        return JSON.parse(body) as unknown;
    } catch {
        return null;
    }
}

export async function getProducts(): Promise<Product[]> {
    "use cache";
    cacheLife("hours");

    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error(
            `Failed to fetch products: HTTP ${response.status}`
        );
    }

    const data = await readJsonBody(response);

    if (!Array.isArray(data) || !data.every(isProduct)) {
        throw new Error("Received an invalid product collection from the API");
    }

    return data;
}

export async function getProductById(
    id: string
): Promise<Product | null> {
    if (!/^[1-9]\d*$/.test(id)) {
        return null;
    }

    const response = await fetch(
        `${API_URL}/${encodeURIComponent(id)}`,
        { cache: "no-store" }
    );

    // A 404 means the product genuinely does not exist.
    if (response.status === 404) {
        return null;
    }

    // Any other upstream failure must not be reported as a missing product.
    if (!response.ok) {
        throw new Error(
            `Failed to fetch product ${id}: HTTP ${response.status}`
        );
    }

    const product = await readJsonBody(response);

    // 200 with an empty or unparsable body is how the API reports an unknown id.
    if (product === null) {
        return null;
    }

    if (!isProduct(product) || product.id !== Number(id)) {
        return null;
    }

    return product;
}

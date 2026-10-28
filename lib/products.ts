
import { cacheLife } from "next/cache";
import { FALLBACK_PRODUCTS } from "./fallback-products";

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

/**
 * Fetches the live catalogue. Throws on any upstream or payload problem so the
 * caller can decide how to degrade instead of rendering partial data.
 */
async function fetchLiveProducts(): Promise<Product[]> {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error(
            `Failed to fetch products: HTTP ${response.status}`
        );
    }

    const data = await readJsonBody(response);

    if (!Array.isArray(data) || data.length === 0 || !data.every(isProduct)) {
        throw new Error("Received an invalid product collection from the API");
    }

    return data;
}

/**
 * Static product listing.
 *
 * The page is prerendered at build time, so an unreachable upstream (for
 * example HTTP 403 from a hosting provider's build network) would otherwise
 * fail the whole deployment. Live data keeps the assignment's one hour
 * revalidation; the bundled fallback is revalidated after a minute so the
 * live catalogue is picked up again as soon as it is reachable.
 */
export async function getProducts(): Promise<Product[]> {
    "use cache";

    try {
        const products = await fetchLiveProducts();
        cacheLife("hours");
        return products;
    } catch (error) {
        console.warn(
            `[products] Live catalogue unavailable, serving the bundled fallback: ${
                error instanceof Error ? error.message : String(error)
            }`
        );

        if (
            FALLBACK_PRODUCTS.length === 0 ||
            !FALLBACK_PRODUCTS.every(isProduct)
        ) {
            throw new Error("Bundled fallback catalogue is invalid");
        }

        cacheLife("minutes");
        return FALLBACK_PRODUCTS;
    }
}

export async function getProductById(
    id: string
): Promise<Product | null> {
    if (!/^[1-9]\d*$/.test(id)) {
        return null;
    }

    try {
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
    } catch (error) {
        // The detail route is rendered per request, but the upstream can be
        // unreachable from the hosting network. The bundled snapshot covers the
        // whole catalogue, so a hit is a real product and a miss means the id is
        // not a product at all - the same answer the API gives for unknown ids.
        const fallback = FALLBACK_PRODUCTS.find(
            (candidate) => candidate.id === Number(id)
        );

        console.warn(
            `[products] Live product ${id} unavailable (${
                error instanceof Error ? error.message : String(error)
            }); ${
                fallback
                    ? "serving the bundled fallback"
                    : "no bundled match, treating as not found"
            }`
        );

        return fallback ?? null;
    }
}

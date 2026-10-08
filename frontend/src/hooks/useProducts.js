import { useEffect, useState } from "react";
import { client } from "../shopify/client";

// Produkter med den här taggen visas inte i butiksvyn
const EXCLUDED_TAGS = ["Kurs", "Chokladprovning"];

const EXCLUDED_QUERY = EXCLUDED_TAGS
    .map((tag) => `tag_not:"${tag}"`)
    .join(" AND ");

const PRODUCTS_QUERY = `
  query ProductsQuery($limit: Int!, $query: String, $sortKey: ProductSortKeys, $reverse: Boolean)
  @inContext(language: SV) {
    products(first: $limit, query: $query, sortKey: $sortKey, reverse: $reverse) {
      nodes {
        id
        title
        images(first: 1) { nodes { url altText } }
        variants(first: 1) {
          nodes {
            price { amount }
            compareAtPrice { amount }
            availableForSale
            quantityAvailable
            currentlyNotInStock
          }
        }
      }
    }
  }
`;

function buildQuery({ productType, tag, inStockOnly, minPrice, maxPrice } = {}) {
    const parts = EXCLUDED_TAGS.map((t) => `tag_not:"${t}"`);

    if (productType) parts.push(`product_type:"${productType}"`);
    if (tag) parts.push(`tag:"${tag}"`);
    if (inStockOnly) parts.push("available_for_sale:true");
    if (minPrice != null) parts.push(`variants.price:>=${minPrice}`);
    if (maxPrice != null) parts.push(`variants.price:<=${maxPrice}`);

    return parts.join(" AND ");
}

export function useProducts(limit = 10, filters = {}) {
    const { productType, tag, inStockOnly, minPrice, maxPrice, sortKey, reverse } = filters;
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        async function load() {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(client.getStorefrontApiUrl(), {
                    method: "POST",
                    headers: client.getPublicTokenHeaders(),
                    body: JSON.stringify({
                        query: PRODUCTS_QUERY,
                        variables: {
                            limit,
                            query: buildQuery({ productType, tag, inStockOnly, minPrice, maxPrice }),
                            sortKey: sortKey ?? "BEST_SELLING", // eller "PRICE", "TITLE", "CREATED_AT"
                            reverse: reverse ?? false,
                        },
                    }),
                });

                const data = await response.json();

                if (data.errors) {
                    console.error("❌ GraphQL errors:", data.errors);
                    throw new Error("Produkter kunde inte hämtas.");
                }

                if (!data.data?.products) {
                    throw new Error("Produkter kunde inte hämtas.");
                }

                const productsWithStock = data.data.products.nodes.map((product) => {
                    const variant = product.variants?.nodes?.[0];
                    const price = variant?.price?.amount ? Number(variant.price.amount) : null;
                    const compareAtPrice = variant?.compareAtPrice?.amount
                        ? Number(variant.compareAtPrice.amount)
                        : null;

                    return {
                        ...product,
                        inStock: variant?.availableForSale ?? false,
                        quantityAvailable: variant?.quantityAvailable ?? null,
                        price,
                        compareAtPrice,
                        onSale: compareAtPrice !== null && price !== null && compareAtPrice > price,
                    };
                });

                if (!cancelled) setProducts(productsWithStock);

            } catch (err) {
                console.error("❌ useProducts crashed:", err);
                if (!cancelled) setError(err.message || "Ett oväntat fel inträffade.");
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        load();

        return () => { cancelled = true; };
    }, [limit, productType, tag, inStockOnly, minPrice, maxPrice, sortKey, reverse]);

    return { products, loading, error };
}
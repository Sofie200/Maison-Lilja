import { useState, useEffect } from "react";
import { client } from "../shopify/client";

const QUERY = `
  query CollectionCarousel($handle: String!, $first: Int!) @inContext(language: SV) {
    collection(handle: $handle) {
      title
      products(first: $first, sortKey: COLLECTION_DEFAULT) {
        nodes {
          id
          handle
          title
          description
          featuredImage {
            url(transform: { maxWidth: 800 })
            altText
          }
          priceRange {
            minVariantPrice { amount currencyCode }
          }
        }
      }
    }
  }
`;

export function useCollectionCarousel(handle, first = 8) {
    const [products, setProducts] = useState([]);
    const [title, setTitle] = useState("");
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
                    body: JSON.stringify({ query: QUERY, variables: { handle, first } }),
                });

                const data = await response.json();

                if (data.errors) {
                    console.error("❌ GraphQL errors:", data.errors);
                    throw new Error("Produkterna kunde inte hämtas.");
                }

                const collection = data.data?.collection;
                if (!collection) {
                    throw new Error(`Kollektionen "${handle}" hittades inte.`);
                }

                if (!cancelled) {
                    setTitle(collection.title);
                    setProducts(
                        collection.products.nodes.map((p) => ({
                            id: p.id.split("/").pop(), // gid://shopify/Product/123 → 123
                            title: p.title,
                            description: p.description,
                            imageUrl: p.featuredImage?.url ?? null,
                            imageAlt: p.featuredImage?.altText || p.title,
                            price: p.priceRange.minVariantPrice,
                        }))
                    );
                }
            } catch (err) {
                console.error("❌ useCollectionCarousel crashed:", err);
                if (!cancelled) setError(err.message);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        load();
        return () => { cancelled = true; };
    }, [handle, first]);

    return { title, products, loading, error };
}
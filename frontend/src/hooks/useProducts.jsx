import { useEffect, useState } from "react";
import { client } from "../../client";

export function useProducts(limit = 10) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function load() {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(client.getStorefrontApiUrl(), {
                    method: "POST",
                    headers: client.getPublicTokenHeaders(),
                    body: JSON.stringify({
                        query: `
              query ProductsQuery($limit: Int!) {
                products(first: $limit) {
                  nodes {
                    id
                    title
                    images(first: 1) { nodes { url } }
                    variants(first: 1) { nodes { price { amount } } }
                  }
                }
              }
            `,
                        variables: { limit }
                    })
                });

                const data = await response.json();

                if (!data.data || !data.data.products) {
                    throw new Error("Produkter kunde inte hämtas.");
                }

                setProducts(data.data.products.nodes);

            } catch (err) {
                setError(err.message || "Ett oväntat fel inträffade.");
            } finally {
                setLoading(false);
            }
        }

        load();
    }, [limit]);

    return { products, loading, error };
}

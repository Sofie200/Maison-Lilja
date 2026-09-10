import { useEffect, useState } from "react";
import { client } from "../shopify/client";

export function useProduct(id) {

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function load() {

            setLoading(true);
            setError(null);

            try {
                const gid = `gid://shopify/Product/${id}`;

                const response = await fetch(client.getStorefrontApiUrl(), {
                    method: "POST",
                    headers: client.getPublicTokenHeaders(),
                    body: JSON.stringify({
                        query: `
              query ProductQuery($id: ID!) {
                product(id: $id) {
                  id
                  title
                  descriptionHtml
                  availableForSale
                  images(first: 5) { nodes { url } }
                  variants(first: 5) {
                    nodes {
                        id
                        price { amount }
                        image { url }
                        availableForSale
                        quantityAvailable
                        currentlyNotInStock
                        selectedOptions {
                            name
                            value
                        }
                    }
                  }

                }
              }
            `,
                        variables: { id: gid }
                    })
                });

                const data = await response.json();

                if (data.errors) {
                    console.error("❌ GraphQL errors:", data.errors);
                    throw new Error("Produkten kunde inte hämtas.");
                }

                if (!data.data || !data.data.product) {
                    throw new Error("Produkten kunde inte hittas.");
                }

                setProduct(data.data.product);

            } catch (err) {
                console.error("❌ useProduct crashed:", err);
                setError("Produkten kunde inte hämtas. Försök igen om en liten stund.");
            } finally {
                setLoading(false);
            }
        }

        load();
    }, [id]);

    return { product, loading, error };
}
import { useEffect, useState } from "react";
import { client } from "../../client";

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

                if (!data.data || !data.data.product) {
                    throw new Error("Produkten kunde inte hämtas.");
                }

                setProduct(data.data.product);

            } catch (err) {
                setError(err.message || "Ett oväntat fel inträffade.");
            } finally {
                setLoading(false);
            }
        }

        load();
    }, [id]);

    return { product, loading, error };
}
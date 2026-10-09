// hooks/useProductTypes.js
import { useEffect, useState } from "react";
import { client } from "../shopify/client";

// Typer som inte ska synas i butiksmenyn
const EXCLUDED_TYPES = ["Kurs", "Chokladprovning"];

const PRODUCT_TYPES_QUERY = `
  query ProductTypes @inContext(language: SV) {
    productTypes(first: 250) {
      edges { node }
    }
  }
`;

export function useProductTypes() {
    const [types, setTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        async function load() {
            try {
                const response = await fetch(client.getStorefrontApiUrl(), {
                    method: "POST",
                    headers: client.getPublicTokenHeaders(),
                    body: JSON.stringify({ query: PRODUCT_TYPES_QUERY }),
                });
                const data = await response.json();

                if (data.errors || !data.data?.productTypes) {
                    console.error("❌ GraphQL errors:", data.errors);
                    throw new Error("Kategorierna kunde inte hämtas.");
                }

                const list = data.data.productTypes.edges
                    .map((edge) => edge.node)
                    .filter((type) => type && !EXCLUDED_TYPES.includes(type))
                    .sort((a, b) => a.localeCompare(b, "sv"));

                if (!cancelled) setTypes(list);
            } catch (err) {
                if (!cancelled) setError(err.message);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        load();
        return () => { cancelled = true; };
    }, []);

    return { types, loading, error };
}
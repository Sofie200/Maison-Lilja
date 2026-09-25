import { useEffect, useState } from "react";
import { client } from "../shopify/client";

const PAGE_QUERY = `
  query Page($handle: String!) @inContext(language: SV) {
    page(handle: $handle) {
      title
      body
    }
  }
`;

export function usePage(handle) {

    const [page, setPage] = useState(null);
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
                        query: PAGE_QUERY,
                        variables: { handle },
                    }),
                });

                const data = await response.json();

                if (data.errors) {
                    console.error("❌ GraphQL errors:", data.errors);
                    throw new Error("Sidan kunde inte hämtas.");
                }

                // null = fel handle eller sidan är inte publicerad
                if (!data.data?.page) {
                    throw new Error(`Sidan "${handle}" kunde inte hittas.`);
                }

                if (!cancelled) setPage(data.data.page);

            } catch (err) {
                console.error("❌ usePage crashed:", err);
                if (!cancelled) setError("Innehållet kunde inte hämtas.");
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        load();

        return () => { cancelled = true; };
    }, [handle]);

    return { page, loading, error };
}
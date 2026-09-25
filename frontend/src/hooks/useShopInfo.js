import { useEffect, useState } from "react";
import { client } from "../shopify/client";

const SHOP_INFO_QUERY = `
  query ShopInfo {
    shop {
      name
      besoksadress: metafield(namespace: "custom", key: "besoksadress") { value }
      telefon: metafield(namespace: "custom", key: "telefon") { value }
      email: metafield(namespace: "custom", key: "email") { value }
    }
  }
`;

export function useShopInfo() {

    const [shopInfo, setShopInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        async function load() {
            try {
                const response = await fetch(client.getStorefrontApiUrl(), {
                    method: "POST",
                    headers: client.getPublicTokenHeaders(),
                    body: JSON.stringify({ query: SHOP_INFO_QUERY }),
                });

                const data = await response.json();

                if (data.errors) {
                    console.error("❌ GraphQL errors:", data.errors);
                    throw new Error("Butiksinformationen kunde inte hämtas.");
                }

                const shop = data.data?.shop;
                if (!shop) throw new Error("Butiksinformationen saknas.");

                // Platta ut metafälten till enkla strängar (eller null)
                if (!cancelled) {
                    setShopInfo({
                        name: shop.name,
                        besoksadress: shop.besoksadress?.value ?? null,
                        telefon: shop.telefon?.value ?? null,
                        email: shop.email?.value ?? null,
                    });
                }

            } catch (err) {
                console.error("❌ useShopInfo crashed:", err);
                if (!cancelled) setError("Kontaktuppgifterna kunde inte hämtas.");
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        load();

        // Undvik setState om komponenten hunnit avmonteras
        return () => { cancelled = true; };
    }, []);

    return { shopInfo, loading, error };
}
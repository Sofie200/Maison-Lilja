import { useEffect, useState } from "react";
import { client } from "../shopify/client";

const HERO_COVER_QUERY = `
  query HeroCover($handle: String!) @inContext(language: SV) {
    collection(handle: $handle) {
      products(first: 1, sortKey: COLLECTION_DEFAULT) {
        nodes {
          id
          title
          featuredImage { url altText }
          bakgrund: metafield(namespace: "custom", key: "omslag_bakgrundsfarg") {
            reference {
              ... on Metaobject {
                fargkod: field(key: "fargkod") { value }
                tema: field(key: "tema") { value }
              }
            }
          }
          rubrik: metafield(namespace: "custom", key: "omslag_rubrik") { value }
          text: metafield(namespace: "custom", key: "omslag_text") { value }
          bild: metafield(namespace: "custom", key: "omslag_bild") {
            reference {
              ... on MediaImage {
                image { url altText }
              }
            }
          }
        }
      }
    }
  }
`;

// Fältet "fargkod" är ett textfält med en CSS-variabel.
// Tar emot både "--color-rose" och "var(--color-rose)" → "var(--color-rose)"
function toCssColor(value) {
    const trimmed = value?.trim();
    if (!trimmed) return null;
    if (trimmed.startsWith("--")) return `var(${trimmed})`;
    return trimmed;
}

export function useHeroCover(handle) {

    const [cover, setCover] = useState(null);
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
                        query: HERO_COVER_QUERY,
                        variables: { handle },
                    }),
                });

                const data = await response.json();

                if (data.errors) {
                    console.error("❌ GraphQL errors:", data.errors);
                    throw new Error("Hero-innehållet kunde inte hämtas.");
                }

                const product = data.data?.collection?.products?.nodes?.[0];
                if (!product) {
                    throw new Error(`Ingen produkt hittades i kollektionen "${handle}".`);
                }

                // Metafält i första hand, produktens egna fält som reserv
                const image = product.bild?.reference?.image ?? product.featuredImage;

                if (!cancelled) {
                    setCover({
                        productId: product.id.split("/").pop(), // gid://shopify/Product/123 → 123
                        title: product.rubrik?.value ?? product.title,
                        text: product.text?.value ?? null,
                        backgroundColor: product.bakgrund?.reference?.fargkod?.value,
                        theme: product.bakgrund?.reference?.tema?.value === "light" ? "light" : "dark",
                        imageUrl: image?.url ?? null,
                        imageAlt: image?.altText ?? "",
                    });
                }

            } catch (err) {
                console.error("❌ useHeroCover crashed:", err);
                if (!cancelled) setError(err.message);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        load();

        return () => { cancelled = true; };
    }, [handle]);

    return { cover, loading, error };
}
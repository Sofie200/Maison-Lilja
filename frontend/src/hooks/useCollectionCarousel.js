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
          availableForSale
          featuredImage {
            url(transform: { maxWidth: 800 })
            altText
          }
          images(first: 5) { nodes { url } }
          priceRange {
            minVariantPrice { amount currencyCode }
          }
          variants(first: 5) {
            nodes {
              id
              price { amount }
              compareAtPrice { amount }
              image { url }
              availableForSale
              quantityAvailable
              currentlyNotInStock
              weight
              weightUnit
              selectedOptions { name value }
            }
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
                    throw new Error("Kollektionen hittades inte.");
                }

                if (!cancelled) {
                    setTitle(collection.title);
                    setProducts(
                        collection.products.nodes.map((p) => {
                            // Platta ut pris/rea-info per variant, samma mönster som useProduct
                            const variants = p.variants.nodes.map((variant) => {
                                const price = variant.price?.amount ? Number(variant.price.amount) : null;
                                const compareAtPrice = variant.compareAtPrice?.amount
                                    ? Number(variant.compareAtPrice.amount)
                                    : null;

                                return {
                                    ...variant,
                                    price,
                                    compareAtPrice,
                                    onSale: compareAtPrice !== null && compareAtPrice > price,
                                };
                            });
                            const firstVariant = variants[0];

                            return {
                                ...p,
                                id: p.id.split("/").pop(), // gid://shopify/Product/123 → 123
                                variants: { nodes: variants },

                                // Same fields as before, so existing components keep working
                                imageUrl: p.featuredImage?.url ?? null,
                                imageAlt: p.featuredImage?.altText || p.title,
                                price: p.priceRange.minVariantPrice,

                                // Shortcuts for the card
                                currentPrice: firstVariant?.price ?? null,
                                compareAtPrice: firstVariant?.compareAtPrice ?? null,
                                onSale: variants.some((v) => v.onSale),
                            };
                        })
                    );
                }
            } catch (err) {
                console.error("❌ useCollectionCarousel crashed:", err);
                if (!cancelled) setError("Produkterna kunde inte hämtas. Försök igen om en liten stund.");
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        load();
        return () => { cancelled = true; };
    }, [handle, first]);

    return { title, products, loading, error };
}
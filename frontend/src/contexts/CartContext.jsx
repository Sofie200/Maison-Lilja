import { createContext, useContext, useEffect, useState } from "react";
import { client } from "../../client";

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [cartId, setCartId] = useState(null);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Load cartId from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("cartId");
        if (saved) {
            setCartId(saved);
        }
    }, []);

    // Fetch cart when cartId becomes available
    useEffect(() => {
        if (cartId) {
            fetchCart(cartId);
        }
    }, [cartId]);

    // Fetch cart contents
    async function fetchCart(id) {
        try {
            setLoading(true);

            const response = await fetch(client.getStorefrontApiUrl(), {
                method: "POST",
                headers: client.getPublicTokenHeaders(),
                body: JSON.stringify({
                    query: `
                        query GetCart($id: ID!) {
                            cart(id: $id) {
                                id
                                checkoutUrl
                                lines(first: 20) {
                                    nodes {
                                        id
                                        quantity
                                        merchandise {
                                            ... on ProductVariant {
                                                id
                                                title
                                                image { url }
                                                price { amount }
                                                product { title }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    `,
                    variables: { id }
                })
            });

            const data = await response.json();
            console.log("📦 fetchCart response:", data);

            if (data.errors) {
                console.error("❌ GraphQL errors:", data.errors);
                return;
            }

            const cartData = data?.data?.cart;

            if (!cartData) {
                console.error("❌ No cart returned");
                return;
            }

            setCart(cartData.lines.nodes);

        } catch (err) {
            console.error("❌ fetchCart crashed:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    // Create a new cart
    async function createCart() {
        console.log("➡️ Creating new cart...");

        const response = await fetch(client.getStorefrontApiUrl(), {
            method: "POST",
            headers: client.getPublicTokenHeaders(),
            body: JSON.stringify({
                query: `
                    mutation CreateCart {
                        cartCreate {
                            cart {
                                id
                            }
                            userErrors {
                                field
                                message
                            }
                        }
                    }
                `
            })
        });

        const data = await response.json();
        console.log("📦 cartCreate response:", data);

        if (data.errors) {
            console.error("❌ GraphQL errors:", data.errors);
            throw new Error("GraphQL error during cartCreate");
        }

        const result = data?.data?.cartCreate;

        if (!result) {
            console.error("❌ cartCreate returned null");
            throw new Error("cartCreate returned null");
        }

        if (result.userErrors?.length > 0) {
            console.error("❌ Shopify userErrors:", result.userErrors);
            throw new Error(result.userErrors[0].message);
        }

        const id = result.cart.id;

        console.log("✔️ Cart created:", id);

        localStorage.setItem("cartId", id);
        setCartId(id);

        return id;
    }

    // Add item to cart
    async function addToCart(variantId, quantity = 1) {
        console.log("➡️ addToCart called with:", variantId);

        try {
            setLoading(true);

            let id = cartId;

            if (!id) {
                id = await createCart();
            }

            const response = await fetch(client.getStorefrontApiUrl(), {
                method: "POST",
                headers: client.getPublicTokenHeaders(),
                body: JSON.stringify({
                    query: `
                        mutation AddLines($cartId: ID!, $lines: [CartLineInput!]!) {
                            cartLinesAdd(cartId: $cartId, lines: $lines) {
                                cart {
                                    id
                                    lines(first: 20) {
                                        nodes {
                                            id
                                            quantity
                                            merchandise {
                                                ... on ProductVariant {
                                                    id
                                                    title
                                                    image { url }
                                                    price { amount }
                                                    product { title }
                                                }
                                            }
                                        }
                                    }
                                }
                                userErrors {
                                    field
                                    message
                                }
                            }
                        }
                    `,
                    variables: {
                        cartId: id,
                        lines: [{ merchandiseId: variantId, quantity }]
                    }
                })
            });

            const data = await response.json();
            console.log("📦 cartLinesAdd response:", data);

            if (data.errors) {
                console.error("❌ GraphQL errors:", data.errors);
                return;
            }

            const result = data?.data?.cartLinesAdd;

            if (!result) {
                console.error("❌ cartLinesAdd returned null");
                return;
            }

            if (result.userErrors?.length > 0) {
                console.error("❌ Shopify userErrors:", result.userErrors);
                return;
            }

            setCart(result.cart.lines.nodes);

        } catch (err) {
            console.error("❌ addToCart crashed:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, loading, error }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}

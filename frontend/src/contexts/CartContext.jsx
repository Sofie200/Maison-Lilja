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
                                                product { id title }
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

    // Kollar om en variant faktiskt går att köpa just nu
    async function checkVariantAvailability(variantId) {
        const response = await fetch(client.getStorefrontApiUrl(), {
            method: "POST",
            headers: client.getPublicTokenHeaders(),
            body: JSON.stringify({
                query: `
                    query CheckVariant($id: ID!) {
                        node(id: $id) {
                            ... on ProductVariant {
                                id
                                availableForSale
                                quantityAvailable
                            }
                        }
                    }
                `,
                variables: { id: variantId }
            })
        });

        const data = await response.json();
        const variant = data?.data?.node;

        if (!variant) {
            throw new Error("Varianten kunde inte hittas.");
        }

        return variant;
    }

    // Add item to cart
    async function addToCart(variantId, quantity = 1) {
        console.log("➡️ addToCart called with:", variantId, quantity);

        try {
            setLoading(true);
            setError(null);

            // 🔒 Serverside-koll (så långt det går från klienten) innan vi lägger till
            const variant = await checkVariantAvailability(variantId);

            if (!variant.availableForSale) {
                setError("Varan finns tyvärr inte i lager längre.");
                return;
            }

            if (
                variant.quantityAvailable !== null &&
                variant.quantityAvailable < Number(quantity)
            ) {
                setError(`Endast ${variant.quantityAvailable} st finns i lager.`);
                return;
            }

            let id = cartId;
            if (!id) id = await createCart();

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
                                                product { id title }
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
                        lines: [
                            {
                                merchandiseId: variantId,
                                quantity: Number(quantity) || 1
                            }
                        ]
                    }
                })
            });

            const data = await response.json();
            console.log("📦 cartLinesAdd response:", data);

            if (data.errors) {
                console.error("❌ GraphQL errors:", data.errors);
                setError("Kunde inte lägga till varan i varukorgen.");
                return;
            }

            const result = data?.data?.cartLinesAdd;

            if (!result) {
                console.error("❌ cartLinesAdd returned null");
                setError("Kunde inte lägga till varan i varukorgen.");
                return;
            }

            if (result.userErrors?.length > 0) {
                console.error("❌ Shopify userErrors:", result.userErrors);
                setError(result.userErrors[0].message);
                return;
            }

            setCart(result.cart.lines.nodes);

        } catch (err) {
            console.error("❌ addToCart crashed:", err);
            setError(err.message || "Ett oväntat fel inträffade.");
        } finally {
            setLoading(false);
        }
    }

    // Remove a line from the cart
    async function removeFromCart(lineId) {
        console.log("➡️ removeFromCart called with:", lineId);

        if (!cartId) {
            console.error("❌ Ingen cartId satt");
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const response = await fetch(client.getStorefrontApiUrl(), {
                method: "POST",
                headers: client.getPublicTokenHeaders(),
                body: JSON.stringify({
                    query: `
                    mutation RemoveLines($cartId: ID!, $lineIds: [ID!]!) {
                        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
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
                                                product { id title }
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
                        cartId,
                        lineIds: [lineId]
                    }
                })
            });

            const data = await response.json();
            console.log("📦 cartLinesRemove response:", data);

            if (data.errors) {
                console.error("❌ GraphQL errors:", data.errors);
                setError("Kunde inte ta bort varan.");
                return;
            }

            const result = data?.data?.cartLinesRemove;

            if (!result) {
                console.error("❌ cartLinesRemove returned null");
                setError("Kunde inte ta bort varan.");
                return;
            }

            if (result.userErrors?.length > 0) {
                console.error("❌ Shopify userErrors:", result.userErrors);
                setError(result.userErrors[0].message);
                return;
            }

            setCart(result.cart.lines.nodes);

        } catch (err) {
            console.error("❌ removeFromCart crashed:", err);
            setError(err.message || "Ett oväntat fel inträffade.");
        } finally {
            setLoading(false);
        }
    }

    // Update the quantity of a line in the cart
    async function updateQuantity(lineId, quantity) {
        console.log("➡️ updateQuantity called with:", lineId, quantity);

        if (!cartId) {
            console.error("❌ Ingen cartId satt");
            return;
        }

        // Om kvantiteten blir 0 (eller mindre), ta bort raden helt istället
        if (Number(quantity) <= 0) {
            return removeFromCart(lineId);
        }

        try {
            setLoading(true);
            setError(null);

            // Hämta variant-id för raden så vi kan lagerkolla innan vi uppdaterar
            const line = cart.find((l) => l.id === lineId);

            if (line) {
                const variant = await checkVariantAvailability(line.merchandise.id);

                if (
                    variant.quantityAvailable !== null &&
                    variant.quantityAvailable < Number(quantity)
                ) {
                    setError(`Endast ${variant.quantityAvailable} st finns i lager.`);
                    return;
                }
            }

            const response = await fetch(client.getStorefrontApiUrl(), {
                method: "POST",
                headers: client.getPublicTokenHeaders(),
                body: JSON.stringify({
                    query: `
                    mutation UpdateLines($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
                        cartLinesUpdate(cartId: $cartId, lines: $lines) {
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
                                                product { id title }
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
                        cartId,
                        lines: [
                            {
                                id: lineId,
                                quantity: Number(quantity)
                            }
                        ]
                    }
                })
            });

            const data = await response.json();
            console.log("📦 cartLinesUpdate response:", data);

            if (data.errors) {
                console.error("❌ GraphQL errors:", data.errors);
                setError("Kunde inte uppdatera antalet.");
                return;
            }

            const result = data?.data?.cartLinesUpdate;

            if (!result) {
                console.error("❌ cartLinesUpdate returned null");
                setError("Kunde inte uppdatera antalet.");
                return;
            }

            if (result.userErrors?.length > 0) {
                console.error("❌ Shopify userErrors:", result.userErrors);
                setError(result.userErrors[0].message);
                return;
            }

            setCart(result.cart.lines.nodes);

        } catch (err) {
            console.error("❌ updateQuantity crashed:", err);
            setError(err.message || "Ett oväntat fel inträffade.");
        } finally {
            setLoading(false);
        }
    }


    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, loading, error }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
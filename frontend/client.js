import { createStorefrontClient } from "@shopify/hydrogen-react";

export const client = createStorefrontClient({
    storeDomain: import.meta.env.VITE_STORE_DOMAIN,
    publicStorefrontToken: import.meta.env.VITE_STOREFRONT_API_TOKEN,
    storefrontApiVersion: "2024-07",
});
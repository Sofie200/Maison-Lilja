export const client = {
    getStorefrontApiUrl() {
        return `https://${import.meta.env.VITE_STORE_DOMAIN}/api/2026-04/graphql.json`;
    },
    getPublicTokenHeaders() {
        return {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": import.meta.env.VITE_STOREFRONT_API_TOKEN
        };
    }
};

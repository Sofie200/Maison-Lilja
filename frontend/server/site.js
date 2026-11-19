/**
 * Delad konfiguration för serverkod (middleware.js och api/).
 * Håll ROUTE_TITLES i synk med document.title i src/pages/*.jsx och routes i App.jsx.
 */

export const SITE_NAME = "Maison Lilja";
export const SITE_URL = (process.env.SITE_URL ?? "https://maisonlilja.se").replace(/\/+$/, "");
export const API_VERSION = "2026-04";

// path → sidtitel (utan " | Maison Lilja")
export const ROUTE_TITLES = {
    "/": SITE_NAME,
    "/shop": "Alla produkter",
    "/shop/cart": "Varukorg",
    "/gifts": "Företagsgåvor",
    "/private-label": "Private Label",
    "/courses": "Kurser",
    "/tastings": "Chokladprovningar",
    "/contact": "Kontakt",
    "/integritetspolicy": "Integritetspolicy",
    "/kopvillkor": "Köp & leveransvillkor",
    "/returer": "Returer & reklamation",
    "/shipping": "Fraktinformation",
};

// Sidor som inte ska finnas i sitemapen
export const SITEMAP_EXCLUDE = ["/shop/cart"];

export async function shopifyQuery(query, variables = {}) {
    const domain = process.env.VITE_SHOP_DOMAIN;
    const token = process.env.VITE_STOREFRONT_API_TOKEN;
    if (!domain || !token) throw new Error("Shopify-miljövariabler saknas");

    const res = await fetch(`https://${domain}/api/${API_VERSION}/graphql.json`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": token,
        },
        body: JSON.stringify({ query, variables }),
    });

    if (!res.ok) throw new Error(`Shopify svarade ${res.status}`);
    const json = await res.json();
    if (json.errors) throw new Error(JSON.stringify(json.errors));
    return json.data;
}

// gid://shopify/Product/123 → 123
export const numericId = (gid) => gid.split("/").pop();

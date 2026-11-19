/**
 * Delad konfiguration för serverkod (middleware.js och api/).
 * Håll ROUTES i synk med document.title i src/pages/*.jsx och routes i App.jsx.
 */

export const SITE_NAME = "Maison Lilja";
export const SITE_URL = (process.env.SITE_URL ?? "https://maisonlilja.se").replace(/\/+$/, "");
export const API_VERSION = "2026-04";

export const DEFAULT_DESCRIPTION =
    "Handgjord choklad från vår chokladateljé i Malmö, gjord av premiumchoklad och naturliga ingredienser.";

// path → sidtitel (utan " | Maison Lilja") och beskrivning (meta description / og:description).
// Beskrivningar: helst 110–160 tecken, Google kortar längre texter.
export const ROUTES = {
    "/": {
        title: SITE_NAME,
        description: "Handgjord choklad från vår chokladateljé i Malmö, gjord av premiumchoklad och naturliga ingredienser. Beställ online eller ge bort som present.",
    },
    "/shop": {
        title: "Alla produkter",
        description: "Handla handgjord choklad från Maison Lilja. Allt tillverkas i vår egen chokladateljé på Mariedalsvägen i Malmö.",
    },
    "/shop/cart": {
        title: "Varukorg",
    },
    "/gifts": {
        title: "Företagsgåvor",
        description: "Företagsgåvor av handgjord choklad från Malmö – en uppskattad present till kunder, medarbetare och samarbetspartners.",
    },
    "/private-label": {
        title: "Private Label",
        description: "Choklad med ert eget varumärke. Vi tar fram handgjord private label-choklad i vår chokladateljé i Malmö.",
    },
    "/courses": {
        title: "Kurser",
        description: "Kurser i marsipan och pralintillverkning hos Maison Lilja i Malmö – för nybörjare och för dig som vill fördjupa din teknik.",
    },
    "/tastings": {
        title: "Chokladprovningar",
        description: "Chokladprovning med konditor- och bagarmästare Jan Hedh. Upptäck hur kakaons ursprung och tillverkning påverkar smak, doft och konsistens.",
    },
    "/contact": {
        title: "Kontakt",
        description: "Kontakta Maison Lilja – adress, telefon och e-post till vår chokladateljé på Mariedalsvägen i Malmö.",
    },
    "/integritetspolicy": {
        title: "Integritetspolicy",
        description: "Så hanterar Maison Lilja dina personuppgifter när du handlar och besöker vår webbplats.",
    },
    "/kopvillkor": {
        title: "Köp & leveransvillkor",
        description: "Köp- och leveransvillkor för beställningar i Maison Liljas webbshop.",
    },
    "/returer": {
        title: "Returer & reklamation",
        description: "Så gör du en retur eller reklamation av en beställning från Maison Lilja.",
    },
    "/shipping": {
        title: "Fraktinformation",
        description: "Leveranssätt, fraktkostnader och leveranstider för beställningar från Maison Lilja.",
    },
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

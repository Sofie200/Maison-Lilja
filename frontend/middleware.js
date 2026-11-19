/**
 * Vercel Routing Middleware – Open Graph per sida.
 *
 * Sidan är en SPA: titeln sätts med document.title i respektive page-komponent,
 * men Facebook, LinkedIn, Slack, iMessage m.fl. kör inte JavaScript. De ser bara
 * index.html. Därför fångar vi upp förfrågningar från sådana crawlers här och
 * skriver om blocket mellan <!-- seo:start --> och <!-- seo:end --> i index.html
 * så att og:title blir samma som sidans <title>.
 *
 * Vanliga besökare påverkas inte (vi returnerar undefined → requesten går vidare som vanligt).
 *
 * Titlar och beskrivningar finns i server/site.js (delas med api/sitemap.js).
 */

import { SITE_NAME, SITE_URL, ROUTES, DEFAULT_DESCRIPTION, shopifyQuery } from "./server/site.js";

const CRAWLER_UA = /facebookexternalhit|facebot|twitterbot|linkedinbot|slackbot|discordbot|whatsapp|telegrambot|pinterest|redditbot|applebot|skypeuripreview|embedly|vkshare|googlebot|bingbot|snapchat|mastodon|bluesky|iframely|opengraph/i;

// Kör inte på /api/ eller filer (allt med en punkt i sökvägen, t.ex. /index.html, /assets/x.js, /og-image.jpg)
export const config = {
    matcher: ["/((?!api/|.*\\.).*)"],
};

export default async function middleware(request) {
    const ua = request.headers.get("user-agent") ?? "";
    if (!CRAWLER_UA.test(ua)) return;

    try {
        const url = new URL(request.url);
        const path = url.pathname.replace(/\/+$/, "") || "/";

        const meta = await getMeta(path, url.origin);
        if (!meta) return;

        const res = await fetch(new URL("/index.html", url.origin));
        if (!res.ok) return;
        const html = await res.text();

        const out = html.replace(
            /<!-- seo:start[\s\S]*?<!-- seo:end -->/,
            renderTags({ ...meta, url: SITE_URL + (path === "/" ? "/" : path) })
        );

        return new Response(out, {
            status: 200,
            headers: {
                "content-type": "text/html; charset=utf-8",
                "cache-control": "public, max-age=0, s-maxage=600",
            },
        });
    } catch (err) {
        console.error("OG middleware:", err);
        return; // vid fel: servera vanliga index.html
    }
}

async function getMeta(path, origin) {
    const fallbackImage = `${origin}/og-image.jpg`;

    const productMatch = path.match(/^\/shop\/product\/([^/]+)$/);
    if (productMatch) {
        const product = await fetchProduct(productMatch[1]);
        if (!product) return null;
        return {
            title: `${product.title} | ${SITE_NAME}`,
            description: truncate(product.description, 160) || DEFAULT_DESCRIPTION,
            image: product.featuredImage?.url ?? fallbackImage,
            imageAlt: product.featuredImage?.altText || product.title,
            type: "product",
        };
    }

    const route = ROUTES[path];
    if (!route) return null;

    return {
        title: route.title === SITE_NAME ? SITE_NAME : `${route.title} | ${SITE_NAME}`,
        description: route.description ?? DEFAULT_DESCRIPTION,
        image: fallbackImage,
        imageWidth: 1200,
        imageHeight: 630,
        imageAlt: SITE_NAME,
        type: "website",
    };
}

async function fetchProduct(id) {
    if (!/^\d+$/.test(id)) return null;

    const data = await shopifyQuery(
        `query OgProduct($id: ID!) @inContext(language: SV) {
            product(id: $id) {
                title
                description
                featuredImage { url altText }
            }
        }`,
        { id: `gid://shopify/Product/${id}` }
    );
    return data?.product ?? null;
}

function renderTags({ title, description, image, imageWidth, imageHeight, imageAlt, type, url }) {
    const t = escapeHtml(title);
    const tags = [
        `<title>${t}</title>`,
        `<link rel="canonical" href="${escapeHtml(url)}" />`,
        `<meta property="og:type" content="${type}" />`,
        `<meta property="og:site_name" content="${SITE_NAME}" />`,
        `<meta property="og:locale" content="sv_SE" />`,
        `<meta property="og:title" content="${t}" />`,
        `<meta property="og:url" content="${escapeHtml(url)}" />`,
        `<meta property="og:image" content="${escapeHtml(image)}" />`,
        `<meta name="twitter:card" content="summary_large_image" />`,
        `<meta name="twitter:title" content="${t}" />`,
        `<meta name="twitter:image" content="${escapeHtml(image)}" />`,
    ];
    if (imageWidth && imageHeight) {
        tags.push(
            `<meta property="og:image:width" content="${imageWidth}" />`,
            `<meta property="og:image:height" content="${imageHeight}" />`
        );
    }
    if (imageAlt) tags.push(`<meta property="og:image:alt" content="${escapeHtml(imageAlt)}" />`);
    if (description) {
        const d = escapeHtml(description);
        tags.push(
            `<meta name="description" content="${d}" />`,
            `<meta property="og:description" content="${d}" />`,
            `<meta name="twitter:description" content="${d}" />`
        );
    }
    return tags.join("\n\t");
}

function truncate(text, max) {
    if (!text) return "";
    const clean = text.replace(/\s+/g, " ").trim();
    return clean.length > max ? clean.slice(0, max - 1).trimEnd() + "…" : clean;
}

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

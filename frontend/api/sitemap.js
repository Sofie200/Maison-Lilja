import { SITE_URL, ROUTE_TITLES, SITEMAP_EXCLUDE, shopifyQuery, numericId } from "../server/site.js";

const PRODUCTS_QUERY = `
    query SitemapProducts($cursor: String) {
        products(first: 250, after: $cursor) {
            pageInfo { hasNextPage endCursor }
            nodes { id updatedAt }
        }
    }
`;

async function getAllProducts() {
    const products = [];
    let cursor = null;

    do {
        const data = await shopifyQuery(PRODUCTS_QUERY, { cursor });
        products.push(...data.products.nodes);
        cursor = data.products.pageInfo.hasNextPage ? data.products.pageInfo.endCursor : null;
    } while (cursor);

    return products;
}

function urlEntry(loc, lastmod) {
    return [
        "  <url>",
        `    <loc>${loc}</loc>`,
        lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
        "  </url>",
    ].filter(Boolean).join("\n");
}

export async function GET() {
    const staticUrls = Object.keys(ROUTE_TITLES)
        .filter((path) => !SITEMAP_EXCLUDE.includes(path))
        .map((path) => urlEntry(SITE_URL + (path === "/" ? "/" : path)));

    let productUrls = [];
    try {
        const products = await getAllProducts();
        productUrls = products.map((p) =>
            urlEntry(`${SITE_URL}/shop/product/${numericId(p.id)}`, p.updatedAt.slice(0, 10))
        );
    } catch (err) {
        // Hellre en sitemap utan produkter än ingen alls
        console.error("Sitemap: kunde inte hämta produkter:", err);
    }

    const xml = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...staticUrls,
        ...productUrls,
        "</urlset>",
    ].join("\n");

    return new Response(xml, {
        headers: {
            "Content-Type": "application/xml; charset=utf-8",
            // Cacha i Vercels CDN i en timme, servera gammal version medan ny hämtas
            "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
        },
    });
}

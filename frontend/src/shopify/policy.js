export async function getShopPolicy(policyType) {
    const response = await fetch(
        `https://${import.meta.env.VITE_SHOP_DOMAIN}/api/2026-04/graphql.json`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept-Language": "sv",
                "X-Shopify-Storefront-Access-Token": import.meta.env.VITE_STOREFRONT_API_TOKEN,
            },
            body: JSON.stringify({
                query: `
                    query getPolicy @inContext(language: SV) {
                        shop {
                            ${policyType} { title body url }
                        }
                    }
                `,
            }),
        }
    );

    const { data } = await response.json();
    return data.shop[policyType];
}
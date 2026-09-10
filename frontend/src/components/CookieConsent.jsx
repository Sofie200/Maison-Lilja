import { useEffect, useState } from "react";

const STOREFRONT_ACCESS_TOKEN = import.meta.env.VITE_STOREFRONT_API_TOKEN;
const STOREFRONT_ROOT_DOMAIN = import.meta.env.VITE_STORE_DOMAIN;
const CHECKOUT_ROOT_DOMAIN = import.meta.env.VITE_STORE_CHECKOUT_DOMAIN; // lägg tillbaka
const scriptPromises = {};

function loadScript(src) {
    if (scriptPromises[src]) {
        return scriptPromises[src];
    }

    scriptPromises[src] = new Promise((resolve, reject) => {
        const existing = document.querySelector(`script[src="${src}"]`);

        if (existing) {
            // Skriptet kan redan vara klart (om window.Shopify redan är satt),
            // annars vänta på dess load-event istället för att anta att det är klart.
            if (window.Shopify?.customerPrivacy) {
                resolve();
            } else {
                existing.addEventListener("load", () => resolve());
                existing.addEventListener("error", () => reject(new Error(`Kunde inte ladda ${src}`)));
            }
            return;
        }

        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Kunde inte ladda ${src}`));
        document.head.appendChild(script);
    });

    return scriptPromises[src];
}

export default function CookieConsent() {
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        async function init() {
            try {
                await loadScript(
                    "https://cdn.shopify.com/shopifycloud/consent-tracking-api/v0.1/consent-tracking-api.js"
                );

                if (cancelled) return;

                // Sätt butikskontext INNAN vi frågar om bannern behövs
                const current = window.Shopify.customerPrivacy.currentVisitorConsent();
                await new Promise((resolve) => {
                    window.Shopify.customerPrivacy.setTrackingConsent(
                        {
                            ...current,
                            headlessStorefront: true,
                            checkoutRootDomain: STOREFRONT_ROOT_DOMAIN,
                            storefrontRootDomain: CHECKOUT_ROOT_DOMAIN,
                            storefrontAccessToken: STOREFRONT_ACCESS_TOKEN,
                        },
                        () => resolve()
                    );
                });

                if (cancelled) return;

                const shouldShow = window.Shopify.customerPrivacy.shouldShowBanner();

                if (!shouldShow) {
                    console.log("ℹ️ Ingen cookie-banner behövs för den här besökaren.");
                    return;
                }

                // 2. Bara om bannern faktiskt ska visas: ladda Shopifys färdiga banner-UI
                await loadScript(
                    "https://cdn.shopify.com/shopifycloud/privacy-banner/storefront-banner.js"
                );

                if (cancelled) return;

                await window.privacyBanner.loadBanner({
                    storefrontAccessToken: STOREFRONT_ACCESS_TOKEN,
                    checkoutRootDomain: CHECKOUT_ROOT_DOMAIN,
                    storefrontRootDomain: STOREFRONT_ROOT_DOMAIN
                });

            } catch (err) {
                console.error("❌ CookieConsent init crashed:", err);
                setError(err.message);
            }
        }

        init();

        return () => {
            cancelled = true;
        };
    }, []);

    // Shopify renderar sin banner-UI direkt i <body> via sitt eget script,
    // så den här komponenten behöver inte rendera någon egen UI själv.
    return null;
}
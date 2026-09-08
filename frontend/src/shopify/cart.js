import { client } from "../../client";

export async function addToCart(variantId, quantity = 1) {
    let checkoutId = localStorage.getItem("checkoutId");

    if (!checkoutId) {
        const response = await fetch(client.getStorefrontApiUrl(), {
            method: "POST",
            headers: client.getPublicTokenHeaders(),
            body: JSON.stringify({
                query: `
          mutation {
            checkoutCreate(input: {}) {
              checkout { id }
            }
          }
        `
            })
        });

        const data = await response.json();
        checkoutId = data.data.checkoutCreate.checkout.id;
        localStorage.setItem("checkoutId", checkoutId);
    }

    const response = await fetch(client.getStorefrontApiUrl(), {
        method: "POST",
        headers: client.getPublicTokenHeaders(),
        body: JSON.stringify({
            query: `
        mutation checkoutLineItemsAdd($checkoutId: ID!, $lineItems: [CheckoutLineItemInput!]!) {
          checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
            checkout { id webUrl }
          }
        }
      `,
            variables: {
                checkoutId,
                lineItems: [{ variantId, quantity }]
            }
        })
    });

    const data = await response.json();
    return data.data.checkoutLineItemsAdd.checkout;
}
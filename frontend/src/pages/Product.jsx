import "./Product.css";
import { client } from "../../client";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../components/Button";


export default function Product() {

    const { id } = useParams(); // clean ID från URL
    const [product, setProduct] = useState(null);

    async function addToCart(variantId, quantity = 1) {
        // 1. Hämta befintlig checkout eller skapa ny
        let checkoutId = localStorage.getItem("checkoutId");

        if (!checkoutId) {
            const response = await fetch(client.getStorefrontApiUrl(), {
                method: "POST",
                headers: client.getPublicTokenHeaders(),
                body: JSON.stringify({
                    query: `
          mutation {
            checkoutCreate(input: {}) {
              checkout {
                id
              }
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
            checkout {
              id
              webUrl
            }
          }
        }
      `,
                variables: {
                    checkoutId,
                    lineItems: [
                        {
                            variantId,
                            quantity
                        }
                    ]
                }
            })
        });

        const data = await response.json();
        return data.data.checkoutLineItemsAdd.checkout;
    }

    useEffect(() => {
        async function load() {
            const gid = `gid://shopify/Product/${id}`;
            const response = await fetch(client.getStorefrontApiUrl(), {
                method: "POST",
                headers: client.getPublicTokenHeaders(),
                body: JSON.stringify({
                    query: `
            query ProductQuery($id: ID!) {
              product(id: $id) {
                id
                title
                descriptionHtml
                images(first: 5) { nodes { url } }
                variants(first: 5) { nodes { price { amount } } }
              }
            }
          `,
                    variables: { id: gid }
                }),
            });

            const data = await response.json();
            console.log(data);
            setProduct(data.data.product);
        }

        load();
    }, [id]);

    if (!product) return <p>Loading...</p>;

    return (

        <section className="product-page">
            <div className="product-image">
                <img src={product.images.nodes[0].url} alt={product.title} />
            </div>

            <div className="product-info">
                <h1>{product.title}</h1>
                <div className="description" dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}></div>
                <div className="price">{Number(product.variants.nodes[0].price.amount)} kr</div>

                <Button children={"Lägg i varukorg"} onClick={() => addToCart(product.variants.nodes[0].id)} />

            </div>

        </section>
    );

}
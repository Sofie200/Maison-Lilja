import { client } from "../../client";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

export default function Shop() {

    const [products, setProducts] = useState([]);


    async function getProducts() {
        const response = await fetch(client.getStorefrontApiUrl(), {
            method: "POST",
            headers: client.getPublicTokenHeaders(),
            body: JSON.stringify({
                query: `
        query {
          products(first: 10) {
            nodes {
              id
              title
              images(first: 1) { nodes { url } }
              variants(first: 1) { nodes { price { amount } } }
            }
          }
        }
      `,
            }),
        });

        const data = await response.json();
        return data.data.products.nodes;
    }


    useEffect(() => {
        getProducts().then(setProducts);
    }, []);

    return (
        <section><h1>Handla nu</h1>

            <div className="product-grid">


                {products.map(p => {

                    { console.log(p) }
                    return <ProductCard key={p.id} product={p} />;

                })}

            </div>
        </section>);
}

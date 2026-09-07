import { client } from "../../client";
import { useEffect, useState } from "react";

export default function About() {

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
        <div className="products">
            <section><h1>Om oss</h1></section>
            {products.map(p => (
                <div key={p.id} className="product">
                    <img src={p.images.nodes[0].url} alt={p.title} />
                    <h3>{p.title}</h3>
                    <p>{p.variants.nodes[0].price.amount} kr</p>
                </div>
            ))}
        </div>
    );
}

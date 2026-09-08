import { useParams } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";
import { addToCart } from "../shopify/cart";

import "./Product.css";
import Button from "../components/ui/Button";
import Loader from "../components/ui/Loader";
import ErrorMessage from "../components/ui/ErrorMessage";

export default function Product() {

    const { id } = useParams();
    const { product, loading, error } = useProduct(id);

    if (loading) return <section><Loader /></section>;
    if (error == false) return <section><ErrorMessage message={error} /></section>;

    return (
        <section className="product-page">
            <div className="product-image">
                <img src={product.images.nodes[0].url} alt={product.title} />
            </div>

            <div className="product-info">
                <h1>{product.title}</h1>

                <div
                    className="description"
                    dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                />

                <div className="price">
                    {Number(product.variants.nodes[0].price.amount)} kr
                </div>

                <Button onClick={() => addToCart(product.variants.nodes[0].id)}>
                    Lägg i varukorg
                </Button>
            </div>
        </section>
    );
}

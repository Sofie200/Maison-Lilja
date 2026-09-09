import { useParams } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";
import { useCart } from "../contexts/CartContext";

import "./Product.css";
import Button from "../components/ui/Button";
import Loader from "../components/ui/Loader";
import ErrorMessage from "../components/ui/ErrorMessage";

export default function Product() {

    const { id } = useParams();
    const { product, loading, error } = useProduct(id);
    const { addToCart, loading: cartLoading } = useCart();

    if (loading) return <section><Loader /></section>;
    if (error) return <section><ErrorMessage message={error} /></section>;

    const variant = product.variants.nodes[0];
    const inStock = variant.availableForSale;
    const quantity = variant.quantityAvailable;

    return (
        <section className="product-page">
            <div className="product-image">
                <img src={product.images.nodes[0].url} alt={product.title} />
            </div>

            <div className="product-info">
                <h1>{product.title}</h1>

                <div>
                    <div
                        className="description"
                        dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                    />

                    <div className="price">
                        {Number(variant.price.amount)} kr
                    </div>

                    <div className={`stock-status ${inStock ? "in-stock" : "out-of-stock"}`}>
                        {inStock
                            ? (quantity !== null && quantity <= 5
                                ? `Endast ${quantity} kvar i lager`
                                : "I lager")
                            : "Slut i lager"}
                    </div>

                </div>

                {inStock && (
                    <Button
                        loading={cartLoading}
                        disabled={cartLoading}
                        onClick={() => addToCart(variant.id, 1)}
                    >
                        Lägg i varukorg
                    </Button>
                )}

            </div>
        </section>
    );
}
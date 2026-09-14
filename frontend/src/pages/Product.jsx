import { useParams } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";
import { useCart } from "../contexts/CartContext";

import "./Product.css";
import Button from "../components/ui/Button";
import QuantitySelector from "../components/ui/QuantitySelector";
import ImageGallery from "../components/ui/ImageGallery";
import Loader from "../components/ui/Loader";
import ErrorMessage from "../components/ui/ErrorMessage";
import Price from "../components/ui/Price";

export default function Product() {

    const { id } = useParams();
    const { product, loading, error } = useProduct(id);
    const { cart, addToCart, updateQuantity, loading: cartLoading } = useCart();

    if (loading) return <section className="section-center"><Loader /></section>;
    if (error) return <section className="section-center"><ErrorMessage message={error} /></section>;

    const variant = product.variants.nodes[0];
    const inStock = variant.availableForSale;

    const cartLine = cart.find((line) => line.merchandise.id === variant.id);
    const quantityInCart = cartLine?.quantity ?? 0;

    const hasUnlimitedStock = variant.quantityAvailable === null;
    const remainingStock = hasUnlimitedStock
        ? Infinity
        : variant.quantityAvailable - quantityInCart;

    const canAddToCart = inStock && remainingStock > 0;

    return (

        <section className="section-standard product-page">
            <ImageGallery images={product.images.nodes} fallbackAlt={product.title} />

            <div className="product-info">
                <h2>{product.title}</h2>

                <div
                    dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                />

                <div className="price">
                    <Price price={variant.price} compareAtPrice={variant.compareAtPrice} onSale={variant.onSale} />
                </div>

                {inStock && (
                    cartLine ? (
                        <QuantitySelector
                            quantity={cartLine.quantity}
                            onIncrease={() => updateQuantity(cartLine.id, cartLine.quantity + 1)}
                            onDecrease={() => updateQuantity(cartLine.id, cartLine.quantity - 1)}
                            disabled={cartLoading}
                            size="lg"
                        />
                    ) : (
                        <Button
                            loading={cartLoading}
                            disabled={cartLoading || !canAddToCart}
                            onClick={() => addToCart(variant.id, 1)}
                        >
                            Lägg i varukorg
                        </Button>
                    )
                )}

                {!inStock && (
                    <span className="out-of-stock">Slut i lager</span>
                )}

                {inStock && !hasUnlimitedStock && remainingStock <= 0 && (
                    <ErrorMessage message={"Du har max antal av denna vara i varukorgen"} />
                )}

            </div>
        </section>
    );
}
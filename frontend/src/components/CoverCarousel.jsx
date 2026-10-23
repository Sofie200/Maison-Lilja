import { useRef } from "react";
import { Link } from "react-router-dom";
import { useCollectionCarousel } from "../hooks/useCollectionCarousel";
import { useCart } from "../contexts/CartContext";
import QuantitySelector from "./ui/QuantitySelector";
import Loader from "./ui/Loader";
import Button from "./ui/Button";
import ErrorMessage from "./ui/ErrorMessage";
import "./CoverCarousel.css";

const formatPrice = ({ amount, currencyCode }) =>
    new Intl.NumberFormat("sv-SE", { style: "currency", currency: currencyCode, maximumFractionDigits: 0 })
        .format(Number(amount));

export default function CoverCarousel({ handle }) {
    const { title, products, loading, error } = useCollectionCarousel(handle);
    const trackRef = useRef(null);
    const { cart, addToCart, updateQuantity, loading: cartLoading } = useCart();

    // Bläddra en "sida" (= två produkter på desktop, en på mobil)
    const scroll = (direction) => {
        const track = trackRef.current;
        // -1 för avrundning: scrollLeft blir ibland 0.5 px från exakt slut
        const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
        const atStart = track.scrollLeft <= 1;

        if (direction > 0 && atEnd) {
            track.scrollTo({ left: 0, behavior: "smooth" });
        } else if (direction < 0 && atStart) {
            track.scrollTo({ left: track.scrollWidth, behavior: "smooth" });
        } else {
            track.scrollBy({ left: direction * track.clientWidth, behavior: "smooth" });
        }
    };

    if (loading) return <section className="section-center"><Loader /></section>;
    if (error) return <section className="section-center"><ErrorMessage message={error} /></section>;
    if (products.length === 0) return null;

    return (
        <div className="bg-slate-light">
            <section className="section-standard cover-carousel" aria-label={title}>

                <h2 className="cover-title">Utvalt hos Maison Lilja</h2>

                <div className="cover-carousel__controls">
                    
                    <div className="cover-carousel__nav cover-carousel__nav--prev">
                        <button type="button" onClick={() => scroll(-1)} aria-label="Föregående">
                            <span className="material-symbols-rounded" aria-hidden="true">arrow_back</span>
                        </button>
                    </div>

                    <ul className="cover-carousel__track" ref={trackRef}>
                        {products.map((product) => {
                            const variant = product.variants.nodes[0];
                            const cartLine = cart?.lines?.nodes?.find(
                                (line) => line.merchandise.id === variant?.id
                            );
                            const inCart = cartLine?.quantity ?? 0;
                            // quantityAvailable kan vara null om lagret inte är publicerat för Storefront API
                            const remainingStock =
                                variant?.quantityAvailable != null
                                    ? variant.quantityAvailable - inCart
                                    : Infinity;
                            const canAdd = variant?.availableForSale && remainingStock > 0;

                            return (
                                <li key={product.id} className="cover-carousel__item">
                                    <div className="cover-carousel__card">
                                        {product.imageUrl && (
                                            <img src={product.imageUrl} alt={product.imageAlt} loading="lazy" />
                                        )}
                                        <div className="cover-carousel__text">
                                            <h3>
                                                <Link to={`/shop/product/${product.id}`} className="cover-carousel__link">
                                                    {product.title}
                                                </Link>
                                            </h3>
                                            <p>{product.description}</p>
                                            <span className="cover-carousel__price">{formatPrice(product.price)}</span>

                                            {variant && product.availableForSale && (
                                                <div className="cover-carousel__actions">
                                                    {cartLine ? (
                                                        <QuantitySelector
                                                            quantity={cartLine.quantity}
                                                            onIncrease={() => updateQuantity(cartLine.id, cartLine.quantity + 1)}
                                                            onDecrease={() => updateQuantity(cartLine.id, cartLine.quantity - 1)}
                                                            disabled={cartLoading || remainingStock <= 0}
                                                            size="lg"
                                                        />
                                                    ) : (
                                                        <Button
                                                            icon="add"
                                                            size="sm"
                                                            loading={cartLoading}
                                                            disabled={cartLoading || !canAdd}
                                                            onClick={() => addToCart(variant.id, 1)}
                                                        >
                                                            Köp
                                                        </Button>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>

                    <div className="cover-carousel__nav cover-carousel__nav--next">
                        <button type="button" onClick={() => scroll(1)} aria-label="Nästa">
                            <span className="material-symbols-rounded" aria-hidden="true">arrow_forward</span>
                        </button>
                    </div>

                </div>
            </section>
        </div>
    );
}
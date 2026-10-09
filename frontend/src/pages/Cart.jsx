import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import Price from "../components/ui/Price";
import Button from "../components/ui/Button";
import Loader from "../components/ui/Loader";
import QuantitySelector from "../components/ui/QuantitySelector";
import "./Cart.css";

const Cart = () => {
    const { cart, checkoutUrl, updateQuantity, removeFromCart, loading, error } = useCart();

    useEffect(() => {
        document.title = `Varukorg | Maison Lilja`;
    }, []);

    if (loading && cart.length === 0) {
        return (
            <section className="section-center">
                <Loader />
            </section>
        );
    }

    if (cart.length === 0) {
        return (
            <section className="section-center">
                <h1>Varukorg</h1>
                <p className="cart-empty">Din varukorg är tom.</p>
            </section>
        );
    }

    const cartTotal = cart.reduce((sum, item) => {
        return sum + Number(item.merchandise.price.amount) * item.quantity;
    }, 0);

    return (
        <section className="section-center">

            <h1>Varukorg</h1>

            <div className="section-cart">

                {/* Generella fel (utan koppling till en specifik rad) visas överst */}
                {error && !error.id && <p className="cart-error">{error.message}</p>}

                <div className="cart-items">
                    {cart.map(item => {
                        const merch = item.merchandise;
                        const lineTotal = Number(merch.price.amount) * item.quantity;
                        const productUrl = `/shop/product/${merch.product.id.split("/").pop()}`;
                        const itemError = error?.id === item.id ? error.message : null;

                        return (
                            <div key={item.id} className="cart-item">

                                <Link to={productUrl}>
                                    <img
                                        className="cart-item-image"
                                        src={merch.image?.url || "/placeholder.png"}
                                        alt={merch.product?.title || merch.title}
                                    />
                                </Link>

                                <div className="cart-item-info">
                                    <Link to={productUrl} className="cart-item-name-link">
                                        <h3 className="cart-item-name">
                                            {merch.product?.title || merch.title}
                                        </h3>
                                    </Link>

                                    <p className="cart-item-price">
                                        <Price
                                            price={Number(merch.price.amount)}
                                            compareAtPrice={merch.onSale ? Number(merch.compareAtPrice.amount) : null}
                                            onSale={merch.onSale}
                                        />
                                    </p>

                                    <div>

                                        <div className="cart-item-qty-error">
                                            <QuantitySelector
                                                quantity={item.quantity}
                                                onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                                                onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
                                                disabled={loading}
                                                size="sm"
                                            />

                                            {itemError && (
                                                <p className="cart-item-error fineprint">{itemError}</p>
                                            )}
                                        </div>
                                        
                                    </div>

                                </div>
                                <div>
                                    <button
                                        className="remove-btn"
                                        disabled={loading}
                                        onClick={() => removeFromCart(item.id)}
                                        aria-label="Ta bort produkt"
                                    >
                                        <span className="material-symbols-rounded">delete</span>
                                    </button>

                                    <p className="cart-item-line-total">
                                        {lineTotal.toFixed(2)} kr
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="cart-summary">
                    <span className="cart-summary-label"></span>
                    <span className="cart-summary-total">Totalt {cartTotal.toFixed(2)} kr</span>
                </div>

                <center>
                    <Button
                        to={checkoutUrl}
                        size="lg"
                        disabled={!checkoutUrl || loading}
                    >
                        Till kassan
                    </Button>
                </center>
            </div>
        </section>
    );
};

export default Cart;
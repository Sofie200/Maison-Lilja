import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import Button from "../components/ui/Button";
import "./Cart.css";

const Cart = () => {
    const { cart, checkoutUrl, updateQuantity, removeFromCart, loading, error } = useCart();

    if (cart.length === 0) {
        return (
            <section className="cart-section">
                <h1 className="cart-title">Varukorg</h1>
                <p className="cart-empty">Din varukorg är tom.</p>
            </section>
        );
    }

    const cartTotal = cart.reduce((sum, item) => {
        return sum + Number(item.merchandise.price.amount) * item.quantity;
    }, 0);

    return (
        <section className="section-standard">
            <div className="cart-section">
                <h1 className="cart-title">Varukorg</h1>

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
                                        {Number(merch.price.amount)} kr/st
                                    </p>

                                    <div>
                                        <div className="cart-item-qty-error">
                                            <div className="cart-item-qty-controls">
                                                <button
                                                    className="qty-btn"
                                                    disabled={loading}
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    aria-label="Minska antal"
                                                >
                                                    <span className="material-symbols-rounded">remove</span>
                                                </button>

                                                <span className="cart-item-qty">{item.quantity} st</span>

                                                <button
                                                    className="qty-btn"
                                                    disabled={loading}
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    aria-label="Öka antal"
                                                >
                                                    <span className="material-symbols-rounded">add</span>
                                                </button>

                                            </div>

                                            {itemError && (
                                                <p className="cart-item-error">{itemError}</p>
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
                    <span className="cart-summary-label">Totalt</span>
                    <span className="cart-summary-total">{cartTotal.toFixed(2)} kr</span>
                </div>

                <div className="section-center">
                    <Button
                        to={checkoutUrl}
                        size="lg"
                        disabled={!checkoutUrl || loading}
                    >
                        Till kassan
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default Cart;
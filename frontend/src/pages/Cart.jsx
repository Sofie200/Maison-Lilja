import { useCart } from "../contexts/CartContext";
import "./Cart.css";

const Cart = () => {
    const { cart } = useCart();

    return (
        <section className="cart-section">
            <h1 className="cart-title">Varukorg</h1>

            <div className="cart-items">
                {cart.map(item => {
                    const merch = item.merchandise;

                    return (
                        <div key={item.id} className="cart-item">
                            <img
                                className="cart-item-image"
                                src={merch.image?.url || "/placeholder.png"}
                                alt={merch.product?.title || merch.title}
                            />

                            <div className="cart-item-info">
                                <h3 className="cart-item-name">
                                    {merch.product?.title || merch.title}
                                </h3>

                                <p className="cart-item-qty">{item.quantity} st</p>

                                <p className="cart-item-price">{merch.price.amount} kr</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default Cart;
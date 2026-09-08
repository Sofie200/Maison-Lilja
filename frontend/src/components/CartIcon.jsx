import "./CartIcon.css";
import { useCart } from "../contexts/CartContext";

export default function CartIcon() {
    const { cart } = useCart();

    const count = cart?.reduce((sum, item) => sum + item.quantity, 0) || 0;

    return (
        <div className="cart-icon-wrapper">

            <a href="/shop/cart">
                <span className="material-symbols-rounded">shopping_bag</span>
                <span className="cart-badge">{count}</span>
                {//count > 0 && (
                    //<span className="cart-badge">{count}</span>  
                //)
                }
            </a>
        </div>
    );
}

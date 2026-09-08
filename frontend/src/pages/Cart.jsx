import { useCart } from "../contexts/CartContext";

const Cart = () => {
    const { cart } = useCart();
    console.log("Cart contents:", cart);

    return (
        <section>
            <h1>Varukorg</h1>
            {cart.map(item => {
                const merch = item.merchandise;

                return (
                    <div key={item.id}>
                        <img
                            src={merch.image?.url || "/placeholder.png"}
                            alt={merch.product?.title || merch.title}
                        />

                        <h3>{merch.product?.title || merch.title}</h3>

                        <p>{item.quantity} st</p>

                        <p>{merch.price.amount} kr</p>
                    </div>
                );
            })}

        </section>
    );
};

export default Cart;

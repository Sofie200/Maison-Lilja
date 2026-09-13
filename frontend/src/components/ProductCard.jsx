import "./ProductCard.css";
import Price from "./ui/Price";

const ProductCard = ({ product }) => {

    const inStock = product.inStock;

    return (

        <a href={`/shop/product/${product.id.split("/").pop()}`}
            key={product.id}
            className={`product-card ${!inStock ? "out-of-stock" : ""}`}
        >

            <div className="image-wrapper">
                <img src={product.images.nodes[0].url} alt={product.title} />

                {!inStock && (
                    <span className="stock-badge out"><div>Slut i lager</div></span>
                )}
            </div>

            <div className="info">
                <h3>{product.title}</h3>
                
                <div className="price-block">

                    <Price price={product.price} compareAtPrice={product.compareAtPrice} onSale={product.onSale} />

                </div>
            </div>

        </a>
    );
}

export default ProductCard
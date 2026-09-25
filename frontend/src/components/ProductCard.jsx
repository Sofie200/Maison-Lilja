import { Link } from "react-router-dom";
import "./ProductCard.css";
import Price from "./ui/Price";

const ProductCard = ({ product }) => {
    if (!product?.id) return null;

    const inStock = product.inStock;
    const productId = product.id.split("/").pop();
    const image = product.images?.nodes?.[0];

    return (
        <Link
            to={`/shop/product/${productId}`}
            className={`product-card ${!inStock ? "out-of-stock" : ""}`}
        >

            <div className="image-wrapper">
                {image?.url ? (
                    <img src={image.url} alt={image.altText || product.title} />
                ) : (
                    <div className="image-placeholder" aria-hidden="true" />
                )}

                {!inStock && (
                    <span className="stock-badge out"><div>Slut i lager</div></span>
                )}
            </div>

            <div className="info">
                <h3>{product.title}</h3>

                {product.price != null && (
                    <div className="price-block">
                        <Price price={product.price} compareAtPrice={product.compareAtPrice} onSale={product.onSale} />
                    </div>
                )}
            </div>

        </Link>
    );
}

export default ProductCard
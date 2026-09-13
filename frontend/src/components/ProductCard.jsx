import "./ProductCard.css";

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

                    <span className={`price-current ${product.onSale ? "price-discounted" : ""}`}>
                        {Number.isInteger(product.price) ? product.price : product.price.toFixed(2)} kr
                    </span>

                    {product.onSale && (
                        <span className="price-original">{Number.isInteger(product.compareAtPrice) ? product.compareAtPrice : product.compareAtPrice.toFixed(2)} kr</span>
                    )}

                </div>
            </div>

        </a>
    );
}

export default ProductCard
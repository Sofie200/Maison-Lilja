import "./ProductCard.css";

const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
            <div className="image-wrapper">
                <img src={product.image} alt={product.name} />
            </div>

            <div className="info">
                <h3 className="name">{product.name}</h3>

                <div className="price-block">
                    {product.discount > 0 ? (
                        <>
                            <span className="price-discounted">
                                {product.price - product.discount} kr
                            </span>
                            <span className="price-original">
                                {product.price} kr
                            </span>
                        </>
                    ) : (
                        <span className="price-normal">{product.price} kr</span>
                    )}
                </div>

                <button className="add-btn">Lägg i varukorg</button>
            </div>
        </div>
    );
}

export default ProductCard
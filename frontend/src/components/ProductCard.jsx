import "./ProductCard.css";

const ProductCard = ({ product }) => {

    const price = Number(product.variants.nodes[0].price.amount);
    const inStock = product.inStock; // från useProducts-hooken
    const quantity = product.quantityAvailable;

    return (

        <a href={`/shop/product/${product.id.split("/").pop()}`}
            key={product.id}
            className={`product-card ${!inStock ? "out-of-stock" : ""}`}
        >

            <div className="image-wrapper">
                <img src={product.images.nodes[0].url} alt={product.title} />

                {!inStock && (
                    <span className="stock-badge out">Slut i lager</span>
                )}

                {inStock && quantity !== null && quantity <= 5 && (
                    <span className="stock-badge low">Endast {quantity} kvar</span>
                )}
            </div>

            <div className="info">
                <h3 className="name">{product.title}</h3>

                <div className="price-block">
                    <span className="price-normal">
                        {Number.isInteger(price) ? price : price.toFixed(2)} kr
                    </span>
                </div>
            </div>

        </a>
    );
}

export default ProductCard
import "./Price.css";

const Price = ({ price, compareAtPrice, onSale }) => {
    return (
        <>
            <span className={`price-current ${onSale ? "price-discounted" : ""}`}>
                {Number.isInteger(price) ? price : price.toFixed(2)} kr
            </span>

            {onSale && (
                <span className="price-original">{Number.isInteger(compareAtPrice) ? compareAtPrice : compareAtPrice.toFixed(2)} kr</span>
            )}
        </>
    )
}

export default Price

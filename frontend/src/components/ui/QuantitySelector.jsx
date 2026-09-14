import "./QuantitySelector.css";

export default function QuantitySelector({
    quantity,
    onIncrease,
    onDecrease,
    disabled = false,
    size = "sm",
}) {
    return (
        <div className={`qty-controls qty-controls--${size}`}>
            <button
                className="qty-btn"
                disabled={disabled}
                onClick={onDecrease}
                aria-label="Minska antal"
            >
                <span className="material-symbols-rounded">remove</span>
            </button>

            <span className="qty-value">{quantity} st</span>

            <button
                className="qty-btn"
                disabled={disabled}
                onClick={onIncrease}
                aria-label="Öka antal"
            >
                <span className="material-symbols-rounded">add</span>
            </button>
        </div>
    );
}
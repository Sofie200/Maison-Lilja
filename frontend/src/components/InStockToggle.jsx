import "./InStockToggle.css";

export default function InStockToggle({ checked, onChange }) {
    return (
        <label className="in-stock-toggle">
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
            />
            <span>Produkter i lager</span>
        </label>
    );
}
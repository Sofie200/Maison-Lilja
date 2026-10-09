import "./SortSelect.css";

export const SORT_OPTIONS = [
    { id: "best-selling", label: "Populärast", sortKey: "BEST_SELLING", reverse: false },
    { id: "newest", label: "Nyast", sortKey: "CREATED_AT", reverse: true },
    { id: "price-asc", label: "Pris (lägst först)", sortKey: "PRICE", reverse: false },
    { id: "price-desc", label: "Pris (högst först)", sortKey: "PRICE", reverse: true },
];

export default function SortSelect({ value, onChange }) {
    return (
        <div className="sort-select">
            <label htmlFor="sort">Sortera på:</label>
            <select id="sort" value={value} onChange={(e) => onChange(e.target.value)}>
                {SORT_OPTIONS.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
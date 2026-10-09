import "./CategoryMenu.css";

export default function CategoryMenu({ categories, value, onChange }) {
    return (
        <nav className="category-menu" aria-label="Kategorier">
            <button className="btn"
                type="button"
                aria-pressed={value === null}
                onClick={() => onChange(null)}
            >
                Alla
            </button>
            {categories.map((category) => (
                <button className="btn"
                    key={category}
                    type="button"
                    aria-pressed={value === category}
                    onClick={() => onChange(category)}
                >
                    {category}
                </button>
            ))}
        </nav>
    );
}
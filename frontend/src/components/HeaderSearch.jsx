import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import Loader from "./ui/Loader";
import "./HeaderSearch.css";

const formatPrice = (amount) =>
    new Intl.NumberFormat("sv-SE", { style: "currency", currency: "SEK", maximumFractionDigits: 0 })
        .format(amount);

// Egen komponent så att hooken bara körs när det finns en sökterm
function SearchResults({ term, onSelect }) {
    const { products, loading, error } = useProducts(6, { search: term });

    if (loading) return <p className="header-search__status"><Loader small /></p>;
    if (error) return <p className="header-search__status">{error}</p>;
    if (products.length === 0) return <p className="header-search__status">Inga träffar för "{term}".</p>;

    return (
        <ul className="header-search__list">
            {products.map((product) => {
                const image = product.images?.nodes?.[0];
                return (
                    <li key={product.id}>
                        <Link
                            to={`/shop/product/${product.id.split("/").pop()}`}
                            className="header-search__item"
                            onClick={onSelect}
                        >
                            {image && <img src={image.url} alt="" />}
                            <span className="header-search__title">{product.title}</span>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}

export default function HeaderSearch() {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const [term, setTerm] = useState("");

    const wrapperRef = useRef(null);
    const inputRef = useRef(null);
    const buttonRef = useRef(null);

    // Debounce: sök först när användaren slutat skriva
    useEffect(() => {
        const timer = setTimeout(() => setTerm(input.trim()), 300);
        return () => clearTimeout(timer);
    }, [input]);

    // Fokus i fältet när det öppnas
    useEffect(() => {
        if (open) inputRef.current?.focus();
    }, [open]);

    // Stäng vid klick utanför
    useEffect(() => {
        if (!open) return;
        const handleClick = (e) => {
            if (!wrapperRef.current?.contains(e.target)) close();
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [open]);

    function close() {
        setOpen(false);
        setTerm(""); // döljer resultaten direkt
    }

    function handleKeyDown(e) {
        if (e.key === "Escape") {
            close();
            buttonRef.current?.focus();
        }
    }

    return (
        <div
            ref={wrapperRef}
            className={`header-search ${open ? "is-open" : ""}`}
            onKeyDown={handleKeyDown}
        >
            <button
                ref={buttonRef}
                type="button"
                className="header-search__toggle"
                onClick={() => setOpen(true)}
                aria-label="Sök"
                aria-expanded={open}
                aria-controls="header-search-panel"
            >
                <span className="material-symbols-rounded" aria-hidden="true">search</span>
            </button>

            <div
                id="header-search-panel"
                className="header-search__panel"
                onTransitionEnd={(e) => {
                    // Töm texten först när panelen har glidit ihop
                    if (!open && e.propertyName === "width") setInput("");
                }}
            >
                <input
                    ref={inputRef}
                    type="search"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Sök produkter…"
                    aria-label="Sök produkter"
                />

                {term && (
                    <div className="header-search__results">
                        <SearchResults term={term} onSelect={close} />
                    </div>
                )}
            </div>
        </div>
    );
}
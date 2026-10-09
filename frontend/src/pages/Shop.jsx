import { useState, useEffect } from "react";
import "./Shop.css";
import ProductCard from "../components/ProductCard";
import Loader from "../components/ui/Loader";
import ErrorMessage from "../components/ui/ErrorMessage";
import { useProducts } from "../hooks/useProducts";
import { useProductTypes } from "../hooks/useProductTypes";
import SortSelect, { SORT_OPTIONS } from "../components/SortSelect";
import InStockToggle from "../components/InStockToggle";
import CategoryDrawer from "../components/CategoryDrawer";

export default function Shop() {
    const [category, setCategory] = useState(null);
    const { types } = useProductTypes();

    const [sortId, setSortId] = useState("best-selling");
    const [inStockOnly, setInStockOnly] = useState(false);

    const { sortKey, reverse } = SORT_OPTIONS.find((o) => o.id === sortId);
    const { products, loading, error } = useProducts(200, {
        sortKey,
        reverse,
        inStockOnly,
        productType: category ?? undefined,
    });

    useEffect(() => {
        document.title = `${category ?? "Alla produkter"} | Maison Lilja`;
    }, [category]);

    if (loading) return <section className="section-center"><Loader /></section>;
    if (error == false) return <section className="section-center"><ErrorMessage message={error} /></section>;

    return (
        <>
            <CategoryDrawer categories={types} value={category} onChange={setCategory} />
            <section className="section-standard">

                <div className="shop-header">
                    <h1>{category ?? "Alla produkter"}</h1>

                    <div className="shop-filters">
                        <InStockToggle checked={inStockOnly} onChange={setInStockOnly} />
                        <SortSelect value={sortId} onChange={setSortId} />
                    </div>
                </div>

                <div className="product-grid">
                    {products.map(p => {
                        console.log(p);
                        return <ProductCard key={p.id} product={p} />;
                    })}
                </div>

            </section>
        </>
    );
}
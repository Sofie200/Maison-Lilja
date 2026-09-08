import ProductCard from "../components/ProductCard";
import Loader from "../components/ui/Loader";
import ErrorMessage from "../components/ui/ErrorMessage";
import { useProducts } from "../hooks/useProducts";

export default function Shop() {
    const { products, loading, error } = useProducts(10);

    if (loading) return <section><Loader /></section>;
    if (error == false) return <section><ErrorMessage message={error} /></section>;

    return (
        <section>
            <h1>Handla nu</h1>

            <div className="product-grid">
                {products.map(p => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>
        </section>
        
    );
}
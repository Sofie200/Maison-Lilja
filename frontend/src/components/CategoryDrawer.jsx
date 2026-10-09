import { useEffect, useId, useState } from "react";
import CategoryMenu from "./CategoryMenu";
import "./CategoryDrawer.css";

export default function CategoryDrawer({ categories, value, onChange }) {
    const [open, setOpen] = useState(false);
    const panelId = useId();

    // Stäng med Esc
    useEffect(() => {
        if (!open) return;
        function onKey(e) {
            if (e.key === "Escape") setOpen(false);
        }
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open]);

    function handleSelect(category) {
        onChange(category);
        setOpen(false); // fäll ihop efter val
    }

    return (
        <div className={`category-drawer${open ? " is-open" : ""}`}>
            <div className="category-drawer__panel" id={panelId} inert={!open}>
                <div className="category-drawer__inner">
                    <CategoryMenu categories={categories} value={value} onChange={handleSelect} />
                </div>
            </div>

            <button
                type="button"
                className="category-drawer__tab"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpen((o) => !o)}
            >
                
            </button>
        </div>
    );
}
import { useState, useRef, useEffect } from "react";
import "./NavMenu.css";

const NavMenu = () => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);
    const hamburgerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target) &&
                hamburgerRef.current &&
                !hamburgerRef.current.contains(e.target)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav>
            {/* Hamburger button */}
            <button
                ref={hamburgerRef}
                className={`hamburger ${open ? "open" : ""}`}
                onClick={() => setOpen(!open)}
                aria-label="Meny"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            {/* Menu */}
            <div ref={menuRef} className={`menu ${open ? "show" : ""}`}>
                <div className="menu-inner">
                    <ul>
                        <li><a href="/">Hem</a></li>
                        <li><a href="/shop">Handla nu</a></li>
                        <li><a href="/gifts">Företagsgåvor</a></li>
                        <li><a href="/private-label">Private label</a></li>
                        <li><a href="/courses">Kurser</a></li>
                        <li><a href="/tastings">Chokladprovningar</a></li>
                        <li><a href="/contact">Kontakt</a></li>
                        {/*
                        <li><a href="#">Bli återförsäljare</a></li>                        
                        */}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavMenu;
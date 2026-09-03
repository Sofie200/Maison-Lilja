import { useState } from "react";
import "./NavMenu.css";

export default function NavMenu() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="nav">
            {/* Hamburger button */}
            <button
                className={`hamburger ${open ? "open" : ""}`}
                onClick={() => setOpen(!open)}
                aria-label="Meny"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            {/* Menu */}
            <ol className={`menu ${open ? "show" : ""}`}>
                <li><a href="/shop">Handla nu</a></li>
                <li><a href="/seasonal">Säsong</a></li>
                <li><a href="/gifts">Företagsgåvor</a></li>
                <li><a href="/private-label">Private label</a></li>
                <li><a href="/courses">Kurser</a></li>
                <li><a href="/tastings">Chokladprovningar</a></li>
                <li><a href="/about">Om oss</a></li>
                <li><a href="/contact">Kontakt</a></li>
            </ol>
        </nav>
    );
}

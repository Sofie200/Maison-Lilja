import { useState } from "react";
import "./NavMenu.css";

const NavMenu = () => {
    const [open, setOpen] = useState(false);

    return (
        <nav>
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
            <div className={`menu ${open ? "show" : ""}`}>
            <ul>
                <li><a href="/">Hem</a></li>
                <li><a href="/shop">Handla nu</a></li>
                <li><a href="/seasonal">Säsong</a></li>
                <li><a href="/gifts">Företagsgåvor</a></li>
                <li><a href="/private-label">Private label</a></li>
                <li><a href="/courses">Kurser</a></li>
                <li><a href="/tastings">Chokladprovningar</a></li>
            </ul>
            </div>
        </nav>
    );
}

export default NavMenu
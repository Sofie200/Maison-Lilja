import { useState, useRef, useEffect, useId } from "react";
import { NavLink } from "react-router-dom";
import "./NavMenu.css";

const LINKS = [
    { to: "/", label: "Hem" },
    { to: "/shop", label: "Handla nu" },
    { to: "/gifts", label: "Företagsgåvor" },
    { to: "/private-label", label: "Private label" },
    { to: "/courses", label: "Kurser" },
    { to: "/tastings", label: "Chokladprovningar" },
    { to: "/contact", label: "Kontakt" },
];

const NavMenu = () => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);
    const hamburgerRef = useRef(null);
    const menuId = useId();

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
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav>
            <button
                ref={hamburgerRef}
                className={`hamburger ${open ? "open" : ""}`}
                onClick={() => setOpen(!open)}
                aria-label="Meny"
                aria-expanded={open}
                aria-controls={menuId}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            <div ref={menuRef} id={menuId} className={`menu ${open ? "show" : ""}`}>
                <div className="menu-inner">
                    <ul>
                        {LINKS.map(({ to, label }) => (
                            <li key={to}>
                                <NavLink to={to} end={to === "/"} onClick={() => setOpen(false)}>
                                    {label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavMenu;
import CartIcon from "./CartIcon";
import "./Header.css";
import HeaderSearch from "./HeaderSearch";
import NavMenu from "./NavMenu";

const Header = () => {
    return (
        <header>

            <div className="header-top">
                <div className="header-logo">
                    <a href="/"><img src="/logo.png" alt="Logo" /></a>
                </div>

                <div className="header-icons">
                    {/*
                    <a href="/profile">
                        <span className="material-symbols-rounded">person</span>
                    </a>*/}
                    <HeaderSearch />
                    <CartIcon />
                </div>
            </div>

            {/* Bottom row: navigation */}
            <NavMenu />

        </header>
    )
}

export default Header;

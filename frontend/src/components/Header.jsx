import "./Header.css"; 
import NavMenu from "./NavMenu";

const Header = () => {
    return (
        <header>
            <a href="/"><img src="../../logo.png" /></a>

            <NavMenu />
            
        </header>
    )
}

export default Header

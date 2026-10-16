import "./Footer.css";
import Button from "./ui/Button";
import { InstagramIcon } from "./ui/InstagramIcon";

const Footer = () => {
    
    return (
        <footer className="footer">
            <section className="footer-inner">

                <div className="footer-grid">

                    {/* Brand */}
                    <div className="footer-brand">
                        <h3><img src="/logo_symbol.png" alt="Logo" /></h3>
                        {
                            //<a href="/about">Om oss</a><br />
                        }
                        <a href="/contact">Kontakt</a><br />
                        <a
                            href="https://instagram.com/maisonlilja"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link"
                            aria-label="Följ oss på Instagram"
                        >
                            <span>Följ oss</span>
                            <span><InstagramIcon /></span>
                        </a>
                    </div>


                    {/* Info / Policies */}
                    <div className="footer-info">
                        <h3>Information</h3>
                        {
                            //<a href="/faq">Vanliga frågor</a><br />
                        }
                        <a href="/shipping">Fraktinformation</a>
                        <a href="/kopvillkor">Köp & leveransvillkor</a><br />
                        <a href="/returer">Returer & reklamation</a>
                        <a href="/integritetspolicy">Integritetspolicy</a><br />
                    </div>


                </div>

                <div className="footer-bottom">
                    © {new Date().getFullYear()} Maison Lilja - Alla rättigheter förbehållna.
                </div>

            </section>

            
        </footer>
    );
}

export default Footer;
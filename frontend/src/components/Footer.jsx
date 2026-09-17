import "./Footer.css";
import Button from "./ui/Button";

const Footer = () => {
    return (
        <footer className="footer">
            <section className="footer-inner">

                <div className="footer-grid">

                    {/* Brand */}
                    <div className="footer-brand">
                        <h3><img src="/logo_symbol.png" alt="Logo" /></h3>
                        <a href="/about">Om oss</a><br />
                        <a href="/contact">Kontakt</a><br />
                        <a
                            href="https://instagram.com/maisonlilja"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link"
                            aria-label="Följ oss på Instagram"
                        >
                            <span>Följ oss</span>
                            <svg
                                viewBox="0 0 24 24"
                                width="20"
                                height="20"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
                            </svg>
                        </a>
                    </div>


                    {/* Info / Policies */}
                    <div className="footer-info">
                        <h3>Information</h3>
                        <a href="/faq">Vanliga frågor</a><br />
                        <a href="/integritetspolicy">Integritetspolicy</a><br />
                        <a href="/kopvillkor">Köpvillkor</a><br />
                        <a href="/returer">Returer & reklamation</a>
                    </div>


                </div>

                <div className="footer-bottom">
                    © {new Date().getFullYear()} Maison Lilja — Alla rättigheter förbehållna.
                </div>

            </section>

            
        </footer>
    );
}

export default Footer;
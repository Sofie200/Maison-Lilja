import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <section className="section-standard footer-inner">

                {/* Brand */}
                <div className="footer-brand">
                    <h3>Maison Lilja</h3>
                    <br />
                    <a href="/about">Om oss</a><br />
                    <a href="/contact">Kontakt</a>
                </div>


                {/* Info / Policies */}
                <div className="footer-info">
                    <h3>Information</h3>
                    <br />
                    <a href="/faq">Vanliga frågor</a><br />
                    <a href="/integritetspolicy">Integritetspolicy</a><br />
                    <a href="/kopvillkor">Köpvillkor</a><br />
                    <a href="/returer">Returer & reklamation</a>
                </div>

                {/* Social */}
                <div className="footer-social">
                    <h3>Följ oss</h3>
                    <br />
                    <a
                        href="https://instagram.com/maisonlilja"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="instagram-icon"
                    >
                        <svg
                            width="28"
                            height="28"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8"></path>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                    </a>
                </div>

            </section>

            <div className="footer-bottom">
                © {new Date().getFullYear()} Maison Lilja — Alla rättigheter förbehållna.
            </div>
        </footer>
    );
}

export default Footer;
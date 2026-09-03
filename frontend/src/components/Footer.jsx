import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-inner">

                {/* Brand */}
                <div className="footer-brand">
                    <h2>Maison Lilja</h2>
                    <p>Mariedalsvägen 66<br />Malmö, Sverige</p>
                </div>

                {/* Contact */}
                <div className="footer-contact">
                    <h3>Kontakt</h3>
                    <p>kontakt@maisonlilja.se</p>
                    <p>+46 (0) 70 123 45 67</p>
                </div>

                {/* Social */}
                <div className="footer-social">
                    <h3>Följ oss</h3>

                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="instagram-icon"
                    >
                        {/* Instagram SVG */}
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

            </div>

            <div className="footer-bottom">
                © {new Date().getFullYear()} Maison Lilja — Alla rättigheter förbehållna.
            </div>
        </footer>
    );
}

export default Footer
import "./USPSection.css";

const USPSection = () => {

    return (
        <section className="usp">
            <h2 className="usp-title">Handgjort i vår chokladateljé i Malmö</h2>

            <div className="usp-grid">

                <div className="usp-item">
                    <div className="usp-icon">
                        {/* Handgjort ikon */}
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" />
                        </svg>
                    </div>
                    <h3>Handgjorda praliner</h3>
                    <p>Varje pralin formas, fylls och dekoreras för hand av våra chocolatiers.</p>
                </div>

                <div className="usp-item">
                    <div className="usp-icon">
                        {/* Malmö ikon */}
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <circle cx="12" cy="10" r="3" />
                            <path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.5 7.5l-1.5-1.5M6 6L4.5 4.5m13 0L16.5 6M6 18l-1.5 1.5" />
                        </svg>
                    </div>
                    <h3>Tillverkat i Malmö</h3>
                    <p>All choklad skapas lokalt i vår egen ateljé på Mariedalsvägen.</p>
                </div>

                <div className="usp-item">
                    <div className="usp-icon">
                        {/* Naturliga ingredienser ikon */}
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                    </div>
                    <h3>Noga utvalda råvaror</h3>
                    <p>Vi använder endast premiumchoklad och naturliga ingredienser.</p>
                </div>

                <div className="usp-item">
                    <div className="usp-icon">
                        {/* Hantverk ikon */}
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path d="M3 3l18 18M9 9l6 6" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                    </div>
                    <h3>Äkta hantverk</h3>
                    <p>Varje bit choklad är resultatet av passion, precision och tradition.</p>
                </div>

            </div>
        </section>
    );
}

export default USPSection
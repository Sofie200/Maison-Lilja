import "./USPSection.css";

const USPSection = () => {

    return (
        <section className="section-standard usp">
            <h2>Handgjort i vår chokladateljé i Malmö</h2>

            <div className="usp-grid">

                <div className="usp-item">
                    <div className="usp-icon">
                        <span className="material-symbols-rounded">location_on</span>
                    </div>
                    <div className="usp-text">
                        <h3>Tillverkat i Malmö</h3>
                        <p>All choklad skapas lokalt i vår egen ateljé på Mariedalsvägen.</p>
                    </div>
                </div>

                <div className="usp-item">
                    <div className="usp-icon">
                        <span className="material-symbols-rounded">eco</span>
                    </div>
                    <div className="usp-text">
                        <h3>Noga utvalda råvaror</h3>
                        <p>Vi använder endast premiumchoklad och naturliga ingredienser.</p>
                    </div>
                </div>

                <div className="usp-item">
                    <div className="usp-icon">
                        <span className="material-symbols-rounded">volunteer_activism</span>
                    </div>
                    <div className="usp-text">
                        <h3>Äkta hantverk</h3>
                        <p>Varje bit choklad är resultatet av passion, precision och tradition.</p>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default USPSection
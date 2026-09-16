import "./USPSection.css";
import Button from "./ui/Button"

const USPSection = () => {

    return (

        <section className="section-standard">
            <center>
                <h1>Handgjort i vår chokladateljé i Malmö</h1>
            </center>

            <div className="usp-grid">

                <div className="usp-item">
                    <div className="usp-icon">
                        <span className="material-symbols-rounded">location_on</span>
                    </div>
                    <div className="usp-text">
                        <h3>Tillverkat i Malmö</h3>
                        <div className="fineprint">All choklad skapas lokalt i vår egen ateljé på Mariedalsvägen.</div>
                    </div>
                </div>

                <div className="usp-item">
                    <div className="usp-icon">
                        <span className="material-symbols-rounded">eco</span>
                    </div>
                    <div className="usp-text">
                        <h3>Noga utvalda råvaror</h3>
                        <div className="fineprint">Vi använder endast premiumchoklad och naturliga ingredienser.</div>
                    </div>
                </div>

                <div className="usp-item">
                    <div className="usp-icon">
                        <span className="material-symbols-rounded">volunteer_activism</span>
                    </div>
                    <div className="usp-text">
                        <h3>Äkta hantverk</h3>
                        <div className="fineprint">Varje bit choklad är resultatet av passion, precision och tradition.</div>
                    </div>
                </div>

            </div>
            <Button />
        </section>
    );
}

export default USPSection
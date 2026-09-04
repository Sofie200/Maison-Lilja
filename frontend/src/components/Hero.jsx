import "./Hero.css";

const Hero = () => {

    return (
        <div className="calendar-hero">
            <div className="calendar-image-wrapper">
                <img src="/chokladkalender.png" className="calendar-image" />
            </div>

            <div className="calendar-content">
                <h1 className="calendar-title">Begränsad upplaga: Chokladkalender 2026</h1>
                <p className="calendar-text">
                    Handgjord i vår chokladateljé i Malmö — 24 exklusiva praliner.
                </p>
                <div className="calendar-price">650 kr</div>
                <a href="/chokladkalender" className="calendar-cta">Köp kalendern</a>
            </div>
        </div>
    );
}

export default Hero
import Button from "./ui/Button";
import "./Hero.css";

const Hero = () => {

    return (
        <div className="hero">

            <div className="image-wrapper">
                <img src="/kalender.jpg" className="image" />
            </div>

            <div className="content">
                <h1 className="title">I begränsad upplaga: Chokladkalender 2026<br /></h1>
                <p className="text">
                    Unna dig <i>En Magisk December</i>.<br />Handgjord i vår chokladateljé i Malmö - 24 exklusiva praliner.
                </p>
                <Button children="Beställ nu" color="default" size="lg" to="/shop/product/10613076656394" />
            </div>
        </div>
    );
}

export default Hero
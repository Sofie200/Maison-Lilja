import "./HeroGifts.css";
import Button from "./ui/Button";

const HeroFade = () => {

    return (
        <div className="hero-gifts">

            <div className="image-wrapper">
                <img src="/gifts.jpg" className="image" />
            </div>

            <div className="content">
                <div>
                    <h1 className="title">Företagsgåvor som gör intryck<br />- Ge choklad som uppskattning</h1>
                    <p className="text">
                        Att ge choklad som företagsgåva är ett enkelt sätt att skapa genuin uppskattning. En vacker ask med hantverkschoklad känns både personlig och lyxig, och blir en gåva som mottagaren verkligen njuter av.
                    </p>
                    <p className="text">
                        Perfekt som tackgåva, julpresent eller som en varm gest i vardagen - choklad är alltid rätt och alltid uppskattat.
                    </p>
                    <div><Button children="Kontakta oss" to="/contact" icon="arrow_forward" /></div>
                </div>
            </div>
        </div>
    );
}

export default HeroFade
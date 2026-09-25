import Button from "./ui/Button";
import { useHeroCover } from "../hooks/useHeroCover";
import "./Hero.css";

const COVER_COLLECTION = "frontpage";

const Hero = () => {
    const { cover } = useHeroCover(COVER_COLLECTION);

    // Tom platshållare med samma yta, så att sidan inte hoppar när datan kommer
    if (!cover) return <div className="hero is-loading" aria-hidden="true" />;

    const isLight = cover.theme === "light";

    return (
        <div
            className="hero"
            data-theme={cover.theme}
            style={cover.backgroundColor ? { "--hero-bg": "var(--" + cover.backgroundColor + ")" } : undefined}
        >

            {cover.imageUrl && (
                <div className="image-wrapper">
                    <img src={cover.imageUrl} alt={cover.imageAlt} className="image" />
                </div>
            )}

            <div className="content">
                <h1 className="title">{cover.title}</h1>

                {cover.text && (
                    <p className="text" dangerouslySetInnerHTML={{ __html: cover.text }} />
                )}

                <Button
                    icon="arrow_forward"
                    color={isLight ? undefined : "inverted"}
                    size="lg"
                    to={`/shop/product/${cover.productId}`}
                >
                    Beställ nu
                </Button>
            </div>
        </div>
    );
}

export default Hero
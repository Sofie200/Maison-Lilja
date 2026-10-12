import "./HeroGifts.css";
import Button from "./ui/Button";
import { usePage } from "../hooks/usePage";
import Loader from "./ui/Loader";

const PAGE_HANDLE = "foretagsgavor";

const HeroGifts = () => {
    const { page, loading } = usePage(PAGE_HANDLE);

    if (loading) return (
        <Loader />
    );

    return (
        <div className="hero-gifts">

            <div className="image-wrapper">
                <img src="/gifts.jpg" className="image" alt="" />
            </div>

            <div className="content">
                <div>
                    {page && (
                        <>
                            <h1 className="title" dangerouslySetInnerHTML={{ __html: page.title }}></h1>
                            <p 
                                dangerouslySetInnerHTML={{ __html: page.body }}
                            />
                        </>
                    )}
                    <div>
                        <Button to="/contact" icon="arrow_forward">Kontakta oss</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeroGifts
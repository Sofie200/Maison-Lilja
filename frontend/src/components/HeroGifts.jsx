import "./HeroGifts.css";
import Button from "./ui/Button";
import { usePage } from "../hooks/usePage";

const PAGE_HANDLE = "foretagsgavor";

const HeroGifts = () => {
    const { page } = usePage(PAGE_HANDLE);

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
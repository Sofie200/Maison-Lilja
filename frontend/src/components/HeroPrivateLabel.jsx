import "./HeroPrivateLabel.css";
import Button from "./ui/Button";
import { usePage } from "../hooks/usePage";

const PAGE_HANDLE = "private-label";

const HeroPrivateLabel = () => {
    const { page } = usePage(PAGE_HANDLE);

    return (
        <div className="hero-private-label">

            <div className="content">
                <div>
                    {page && (
                        <>
                            <h1 className="title" dangerouslySetInnerHTML={{ __html: page.title }}></h1>
                            <p
                                className="body"
                                dangerouslySetInnerHTML={{ __html: page.body }}
                            />
                        </>
                    )}
                    <div>
                        <Button to="/contact" icon="arrow_forward">Kontakta oss</Button>
                    </div>
                </div>
            </div>

            <div className="image-wrapper">
                <img src="/dummy3.png" className="image" alt="" />
            </div>

        </div>
    );
}

export default HeroPrivateLabel
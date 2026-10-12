import "./HeroPrivateLabel.css";
import Button from "./ui/Button";
import { usePage } from "../hooks/usePage";
import Loader from "./ui/Loader";

const PAGE_HANDLE = "private-label";

const HeroPrivateLabel = () => {
    const { page, loading } = usePage(PAGE_HANDLE);

    if (loading) return (
        <Loader />
    );

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
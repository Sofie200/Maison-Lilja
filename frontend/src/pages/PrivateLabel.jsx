import { useEffect } from "react";
import HeroPrivateLabel from "../components/HeroPrivateLabel";

export default function PrivateLabel() {

    useEffect(() => {
        document.title = `Private Label | Maison Lilja`;
    }, []);

    return <><HeroPrivateLabel /></>;
}
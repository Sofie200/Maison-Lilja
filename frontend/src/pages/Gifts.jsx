import { useEffect } from "react";
import HeroGifts from "../components/HeroGifts";

export default function Gifts() {

    useEffect(() => {
        document.title = `Företagsgåvor | Maison Lilja`;
    }, []);

    return <>
        <HeroGifts />
    </>
}
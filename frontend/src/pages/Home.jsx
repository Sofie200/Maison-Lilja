import { useEffect } from "react";
import Hero from "../components/Hero";
import CoverCarousel from "../components/CoverCarousel";
import USPSection from "../components/USPSection";

export default function Home() {

    useEffect(() => {
        document.title = `Maison Lilja`;
    }, []);
    
    return <>
        <Hero />
        <CoverCarousel handle="selected-products" />
        <USPSection />
    </>;
}
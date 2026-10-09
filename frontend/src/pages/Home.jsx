import { useEffect } from "react";
import Hero from "../components/Hero";
import USPSection from "../components/USPSection";

export default function Home() {

    useEffect(() => {
        document.title = `Maison Lilja`;
    }, []);
    
    return <>
        <Hero />
        <USPSection />
    </>;
}
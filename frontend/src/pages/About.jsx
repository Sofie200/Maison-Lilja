import { useEffect } from "react";

export default function About() {

    useEffect(() => {
        document.title = `Om oss | Maison Lilja`;
    }, []);
        
    return (
        <section className="section-standard"><h1>Om oss</h1></section>);
}

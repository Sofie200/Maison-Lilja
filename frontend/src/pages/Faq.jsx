import { useEffect } from "react";
export default function Faq() {

    useEffect(() => {
            document.title = `FAQ | Maison Lilja`;
        }, []);

    return <section className="section-standard"><h1>FAQ</h1></section>;
}
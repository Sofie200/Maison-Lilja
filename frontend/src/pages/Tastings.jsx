import { useEffect } from "react";
import "./Tastings.css";

export default function Tastings() {

    useEffect(() => {
        document.title = `Chokladprovningar | Maison Lilja`;
    }, []);

    return (
        <div className="bg-slate-dark bg-slate-dark-tastings">
            <section className="section-standard section-tastings">
                <p className="meta">kommer inom kort</p>
                <h1>Chokladprovningar</h1>
                <p>
                    Smaka, upptäck och njut! Följ med på en smakresa där vår konsult Jan Hedh, konditor- och bagarmästare, guidar dig genom chokladens värld. Vi provar olika chokladsorter och utforskar hur kakaons ursprung och tillverkning påverkar smak, doft och konsistens.
                </p>
                <p>
                    En stund för dig som älskar choklad och är nyfiken på hantverket bakom varje bit. Inga förkunskaper behövs.
                </p>
                <p>
                    Datum, priser och bokning kommer inom kort.
                </p>
            </section>
        </div>
    );
}
import { useState, useEffect } from "react";
import { useShopInfo } from "../hooks/useShopInfo";
import ErrorMessage from "../components/ui/ErrorMessage";
import "./Contact.css";

// Flerradiga adresser blir en rad: "Gata 1\nMalmö" → "Gata 1, Malmö"
function toSingleLine(text) {
    return text.split("\n").map((line) => line.trim()).filter(Boolean).join(", ");
}

function toMapsUrl(besoksadress) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(besoksadress)}`;
}

// "08-123 45 67" → "tel:+4681234567"
function toTelHref(telefon) {
    const digits = telefon.replace(/[^\d+]/g, "");
    if (digits.startsWith("+")) return `tel:${digits}`;
    if (digits.startsWith("0")) return `tel:+46${digits.slice(1)}`;
    return `tel:${digits}`;
}

export default function Contact() {
    const { shopInfo, error: shopError } = useShopInfo();

    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState("idle"); // idle | sending | success | error

    useEffect(() => {
        document.title = `Kontakt | Maison Lilja`;
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setStatus("sending");

        try {
            const response = await fetch(import.meta.env.VITE_CONTACT_FORM_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                throw new Error("Kunde inte skicka meddelandet");
            }

            setStatus("success");
            setForm({ name: "", email: "", message: "" });
        } catch (err) {
            setStatus("error");
        }
    }

    const besoksadress = shopInfo?.besoksadress ? toSingleLine(shopInfo.besoksadress) : null;

    const contactRows = [
        besoksadress && {
            icon: "location_on",
            label: "Besöksadress",
            value: besoksadress,
            href: toMapsUrl(besoksadress),
            external: true,
        },
        shopInfo?.telefon && {
            icon: "call",
            label: "Telefon",
            value: shopInfo.telefon,
            href: toTelHref(shopInfo.telefon),
        },
        shopInfo?.email && {
            icon: "mail",
            label: "E-post",
            value: shopInfo.email,
            href: `mailto:${shopInfo.email}`,
        },
    ].filter(Boolean);

    return (
        <section className="section-standard section-center">
            <div className="contact-intro">


            </div>

            <div className="contact-grid">
                <div className="contact-location">
                    <img src="/location.jpg" alt={besoksadress ? `Butiken på ${besoksadress}` : "Butiken"} />
                </div>

                <div className="contact-info">
                    <h1>Kontakt</h1>
                    <p>
                        Hör av dig om du har frågor om beställningar, kurser eller provningar.
                    </p>

                    {shopError && <ErrorMessage message={shopError} />}

                    {contactRows.length > 0 && (
                        <ul className="contact-details">
                            {contactRows.map((row) => (
                                <li key={row.label}>
                                    <span className="material-symbols-rounded" aria-hidden="true">
                                        {row.icon}
                                    </span>
                                    <div>
                                        <span className="meta">{row.label}</span>
                                        <a
                                            href={row.href}
                                            className="contact-value"
                                            {...(row.external && {
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                            })}
                                        >
                                            {row.value}
                                        </a>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </section>
    );
}
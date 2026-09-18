import { useState } from "react";
import "./Contact.css";

const ADDRESS = "Mariedalsvägen 66, Malmö";
const MAPS_QUERY = encodeURIComponent(ADDRESS);
const MAPS_LINK_URL = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;

const PHONE = "08-123 45 67";
const PHONE_HREF = "tel:+468123456";
const EMAIL = "info@maisonlilja.se";

export default function Contact() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState("idle"); // idle | sending | success | error

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

    return (
        <section className="section-standard section-center">
            <div className="contact-intro">

                
            </div>

            <div className="contact-grid">
                <div className="contact-location"><img src="/location.jpg" /></div>
                <div className="contact-info">
                    

                    <h1>Kontakt</h1>
                    <p>
                        Hör av dig om du har frågor om beställningar, kurser eller provningar.
                    </p>
                    
                    <ul className="contact-details">
                        <li>
                            <span className="material-symbols-rounded" aria-hidden="true">location_on</span>
                            <div>
                                <span className="meta">Besöksadress</span>

                                <a href={MAPS_LINK_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="contact-value"
                                >
                                    {ADDRESS}
                                </a>
                            </div>
                        </li>

                        <li>
                            <span className="material-symbols-rounded" aria-hidden="true">call</span>
                            <div>
                                <span className="meta">Telefon</span>
                                <a href={PHONE_HREF} className="contact-value">{PHONE}</a>
                            </div>
                        </li>

                        <li>
                            <span className="material-symbols-rounded" aria-hidden="true">mail</span>
                            <div>
                                <span className="meta">E-post</span>
                                <a href={EMAIL} className="contact-value">{EMAIL}</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
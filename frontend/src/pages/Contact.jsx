import { useState } from "react";
import "./Contact.css";

const ADDRESS = "Mariedalsvägen 66";
// Lägg gärna till postnummer/ort för en mer exakt kartnål,
// t.ex. "Mariedalsvägen 66, 123 45 Stockholm"
const MAPS_QUERY = encodeURIComponent(ADDRESS);
const MAPS_EMBED_URL = `https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`;
const MAPS_LINK_URL = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;

const PHONE = "08-123 45 67";
const PHONE_HREF = "tel:+468123456";
const EMAIL = "a.e.sofie@hotmail.com";

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
        <section className="section-standard ">
            <div className="contact-intro">
                <h1>Kontakt</h1>
                <p>
                    Hör av dig om du har frågor om beställningar, kurser eller provningar.
                </p>
            </div>

            <div className="contact-grid">
                <div className="contact-info">
                    <ul className="contact-details">
                        <li>
                            <span className="material-symbols-rounded" aria-hidden="true">location_on</span>
                            <div>
                                <span className="contact-label">Besöksadress</span>

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
                                <span className="contact-label">Telefon</span>
                                <a href={PHONE_HREF} className="contact-value">{PHONE}</a>
                            </div>
                        </li>

                        <li>
                            <span className="material-symbols-rounded" aria-hidden="true">mail</span>
                            <div>
                                <span className="contact-label">E-post</span>
                                <a href={`mailto:info@maisonlilja.se`} className="contact-value">info@maisonlilja.se</a>
                            </div>
                        </li>
                    </ul>

                    <div className="contact-map-wrap">
                        <iframe
                            className="contact-map"
                            src={MAPS_EMBED_URL}
                            title="Karta till Maison Lilja"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>

                <form className="contact-form" onSubmit={handleSubmit}>
                    <label className="contact-field">
                        <span>Namn</span>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label className="contact-field">
                        <span>E-post</span>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label className="contact-field">
                        <span>Meddelande</span>
                        <textarea
                            name="message"
                            rows={5}
                            value={form.message}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <button
                        type="submit"
                        className="contact-submit"
                        disabled={status === "sending"}
                    >
                        {status === "sending" ? "Skickar…" : "Skicka meddelande"}
                    </button>

                    {status === "success" && (
                        <p className="contact-status contact-status-success">
                            Tack! Vi hör av oss så snart vi kan.
                        </p>
                    )}

                    {status === "error" && (
                        <p className="contact-status contact-status-error">
                            Något gick fel. Prova gärna igen, eller mejla oss direkt på{" "}
                            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
                        </p>
                    )}
                </form>
            </div>
        </section>
    );
}
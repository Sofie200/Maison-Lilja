import { useState } from "react";
import "./ImageGallery.css";

export default function ImageGallery({ images, fallbackAlt = "" }) {
    const [activeIndex, setActiveIndex] = useState(0);

    if (!images || images.length === 0) {
        return null;
    }

    const activeImage = images[activeIndex] ?? images[0];

    return (
        <div className="image-gallery">
            <div className="image-gallery-main">
                <img src={activeImage.url} alt={activeImage.altText || fallbackAlt} />
            </div>

            {images.length > 1 && (
                <div className="image-gallery-thumbnails">
                    {images.map((image, index) => (
                        <button
                            key={image.id}
                            type="button"
                            className={`gallery-thumbnail ${index === activeIndex ? "gallery-thumbnail--active" : ""}`}
                            onClick={() => setActiveIndex(index)}
                            aria-label={`Visa bild ${index + 1} av ${images.length}`}
                        >
                            <img src={image.url} alt="" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
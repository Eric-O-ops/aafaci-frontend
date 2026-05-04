import React from 'react';
import './Lightbox.css';

export default function Lightbox({ image, onClose }) {
    if (!image) return null;

    return (
        <div className="lightbox-overlay" onClick={onClose}>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                <img src={image} alt="Enlarged" />
                <button className="lightbox-close" onClick={onClose}>✕</button>
            </div>
        </div>
    );
}

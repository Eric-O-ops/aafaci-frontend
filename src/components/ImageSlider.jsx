// src/components/ImageSlider.jsx
import React, { useRef, useState } from 'react';
import './ImageSlider.css';

export default function ImageSlider({ urls = [], height = 200 }) {
    const [current, setCurrent] = useState(0);
    const containerRef = useRef(null);

    const handleMouseMove = e => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;            // положение курсора внутри
        const segment = rect.width / urls.length;   // ширина одного сегмента
        let idx = Math.floor(x / segment);
        if (idx < 0) idx = 0;
        if (idx >= urls.length) idx = urls.length - 1;
        setCurrent(idx);
    };

    const handleMouseLeave = () => {
        // опционально сбрасываем на первый слайд:
        setCurrent(0);
    };

    return (
        <div
            className="segmented-slider-wrapper"
            ref={containerRef}
            style={{ height: `${height}px` }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className="segmented-slider-track"
                style={{
                    transform: `translateX(-${current * 100}%)`
                }}
            >
                {urls.map((url, i) => (
                    <img
                        key={i}
                        src={url}
                        alt=""
                        className="segmented-slider-image"
                        style={{ height: `${height}px` }}
                    />
                ))}
            </div>
        </div>
    );
}
